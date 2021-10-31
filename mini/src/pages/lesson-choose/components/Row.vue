<template>
  <view class="row-wrapper u-font-sm">
    <view class="label">{{ label }}</view>
    <view><slot /></view>
  </view>
</template>

<script>
export default {
  name: 'Row',
  props: {
    label: String,
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.row-wrapper {
  min-height: 40rpx;
  color: $u-content-color;
  display: flex;
  .label {
    width: 134rpx;
  }
}
</style>
