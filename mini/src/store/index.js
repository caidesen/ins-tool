import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import course from './modules/course';
import lessonRecord from './modules/lessonRecord';
import lesson from './modules/lesson';
import setting from '@/store/modules/setting';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: { user, course, lessonRecord, lesson, setting },
});
export default store;
