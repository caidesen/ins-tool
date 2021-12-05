<template>
  <view class="form">
    <meta-setting v-if="type === settingsEnum.TYPE_ENUM.MATE_ACCOUNT" />
    <work-record-setting v-else-if="type === settingsEnum.TYPE_ENUM.WORK_RECORD_SETTING" />
  </view>
</template>

<script>
import MetaSetting from '@/pages/settings/components/MetaSetting';
import settingsEnum from './enum';
import WorkRecordSetting from '@/pages/settings/components/WorkRecordSetting';
export default {
  name: 'setting',
  components: { WorkRecordSetting, MetaSetting },
  data() {
    return {
      type: '',
      settingsEnum,
    };
  },
  onLoad({ type }) {
    this.type = type;
    const title = settingsEnum.TYPE_NAME_ENUM[type];
    if (title) uni.setNavigationBarTitle({ title });
  },
};
</script>

<style scoped>
.form {
  padding: 0 20rpx;
}
</style>
