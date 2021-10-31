import Vue from 'vue';
import service from '@/service';
const lesson = {
  namespaced: true,
  state: {
    lessonMap: {},
  },
  mutations: {
    setLessonMap(state, payload) {
      Vue.set(state.lessonMap, payload.key, payload.value);
    },
  },
  actions: {
    /**
     * 根据日期获取内容 YYYY-MM-DD
     * @param commit
     * @param {string} payload
     */
    async fetchLessonByDate({ commit }, payload) {
      const res = await service.lesson.getLesson({ date: payload });
      commit('setLessonMap', { key: payload, value: res.data });
    },
    /**
     * 重新拉取
     * @param dispatch
     * @param {string} payload
     */
    async pullAndFetchLessByDate({ dispatch }, payload) {
      await service.lesson.pullLesson({ date: payload });
      await dispatch('fetchLessonByDate', payload);
    },
  },
};
export default lesson;
