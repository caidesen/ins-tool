import service from '@/service';
const setting = {
  namespaced: true,
  state: {
    setting: undefined,
    metaInfo: undefined,
  },
  mutations: {
    setSettingInfo(state, payload) {
      state.setting = { ...payload };
    },
    setMetaInfo(state, payload) {
      state.metaInfo = { ...payload };
    },
  },
  actions: {
    async fetchSettingInfo({ commit }) {
      const { data: setting } = await service.setting.getSettingsInfo();
      commit('setSettingInfo', setting);
      const { data: metaInfo } = await service.setting.getMateUserInfo();
      commit('setMetaInfo', metaInfo);
    },
  },
};

export default setting;
