<template>
  <view class="form"><meta-setting v-if="type === settingsEnum.TYPE_ENUM.MATE_ACCOUNT" /></view>
</template>

<script>
import MetaSetting from '@/pages/settings/components/MetaSetting';
import settingsEnum from './enum';
export default {
  name: 'setting',
  components: { MetaSetting },
  data() {
    return {
      type: '',
      settingsEnum,
    };
  },
  onLoad({ type }) {
    this.type = type;
  },
};
</script>

<style scoped>
.form {
  padding: 0 20rpx;
}
</style>
