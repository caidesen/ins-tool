import Vue from 'vue';
import service from '@/service';
import dayjs from 'dayjs';

const lessonRecord = {
  namespaced: true,
  state: {
    lessonRecordMap: {},
    reportMap: {},
  },
  getters: {
    getReport: (state) => (month) => state[month],
  },
  mutations: {
    /**
     * 载入
     * @param state
     * @param {API.LessonRecord[]} payload
     */
    pushLessonRecord(state, payload) {
      const map = state.lessonRecordMap;
      for (const lessonRecord of payload) {
        const time = dayjs(lessonRecord.startDate);
        const monthKey = time.format('YYYY-MM');
        const dayKey = time.format('DD');
        if (!map[monthKey]) Vue.set(state.lessonRecordMap, monthKey, {});
        const monthMap = map[monthKey];
        if (!monthMap[dayKey]) Vue.set(monthMap, dayKey, { records: [] });
        const dayMap = monthMap[dayKey];
        dayMap.records.push(lessonRecord);
      }
    },
    /**
     * 重置
     */
    resetLessonRecordMap(state, payload) {
      if (payload) {
        Vue.delete(state.lessonRecordMap, payload);
      } else {
        state.lessonRecordMap = {};
      }
    },
    setReport(state, payload) {
      Vue.set(state.reportMap, payload.month, payload);
    },
    /**
     * 重置
     */
    resetReportMap(state, payload) {
      if (payload) {
        Vue.delete(state.reportMap, payload);
      } else {
        state.reportMap = {};
      }
    },
  },
  actions: {
    /**
     * 加载上课记录并处理
     * @param commit
     * @param {Object} payload
     * @param {Date} payload.start
     * @param {Date} payload.end
     */
    async fetchLessonRecordByDate({ commit }, payload) {
      const res = await service.lessonRecord.getLessonRecordList(payload);
      commit('resetLessonRecordMap', dayjs(payload.start).format('YYYY-MM'));
      commit('pushLessonRecord', res.data);
    },
    /**
     * 加载上课记录月报
     * @param commit
     * @param {Object} payload
     * @param {Date} payload.month
     */
    async fetchMonthlyReportByMonth({ commit }, payload) {
      const res = await service.lessonRecord.getMonthlyReport(payload);
      commit('setReport', res.data);
    },
  },
};
export default lessonRecord;
