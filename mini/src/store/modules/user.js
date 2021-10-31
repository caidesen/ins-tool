import service from '@/service';

const user = {
  namespaced: true,
  state: {
    userInfo: {},
    userInfoLoading: false,
  },
  getters: {
    isVerify(state) {
      return state.userInfo?.isVerify;
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    toggleUserInfoLoading(state, payload) {
      if (typeof payload === 'boolean') {
        state.userInfoLoading = payload;
      } else {
        state.userInfoLoading = !state.userInfoLoading;
      }
    },
  },
  actions: {
    async fetchUserInfo({ commit }) {
      commit('toggleUserInfoLoading', true);
      try {
        const res = await service.user.getUserInfo();
        commit('setUserInfo', res.data);
      } finally {
        commit('toggleUserInfoLoading', false);
      }
    },
  },
};
export default user;
