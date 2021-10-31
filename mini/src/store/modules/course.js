import service from '@/service';
import { getStorage, setLocalStorageWithExp } from '@/utils/storage';

const course = {
  namespaced: true,
  state: {
    /**
     * @type {API.CourseInfo[]}
     */
    courseList: getStorage('COURSE_LIST') || [],
  },
  getters: {
    /**
     * 根据课程类别分别
     * @return {{label: string,courseList:API.CourseInfo[]}[]}
     */
    courseGroup: (state) => {
      if (!state.courseList) {
        return [];
      }
      const group = {};
      state.courseList.forEach((it) => {
        if (!group[it.courseTypeId])
          group[it.courseTypeId] = {
            label: it.courseTypeName,
            courseList: [],
          };
        group[it.courseTypeId].courseList.push(it);
        console.log(group);
      });
      return Object.values(group);
    },
  },
  mutations: {
    setCourseList(state, payload) {
      state.courseList = payload;
      setLocalStorageWithExp('COURSE_LIST', payload);
    },
  },
  actions: {
    async fetchCourseList({ commit }) {
      const res = await service.course.getCourseList();
      commit('setCourseList', res.data);
    },
    async pullAndFetchCourseList({ dispatch }) {
      await service.course.pullCourseListFormMate();
      dispatch('fetchCourseList');
    },
  },
};

export default course;
