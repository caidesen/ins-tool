import service from '@/service';
const setting = {
  namespaced: true,
  state: {
    workRecordSetting: undefined,
    setting: undefined,
    metaInfo: undefined,
  },
  mutations: {
    setWorkRecordSetting(state, payload) {
      state.workRecordSetting = { ...payload };
    },
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
    async fetchWorkRecordSetting({ commit }) {
      const { data: setting } = await service.workRecord.getWorkRecordSetting();
      commit('setWorkRecordSetting', setting);
      return setting;
    },
  },
};

export default setting;
