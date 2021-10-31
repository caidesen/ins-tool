<template>
  <view class="block safe-area-inset-bottom">
    <view class="add-btn-wrapper u-flex u-row-center safe-area-inset-bottom">
      <view class="add-btn u-flex u-row-center" @click="actionSheetVisible = true">
        <u-icon name="plus" color="#ffffff" size="60"></u-icon>
      </view>
    </view>
    <u-action-sheet
      safe-area-inset-bottom
      :list="addActionList"
      v-model="actionSheetVisible"
      @click="onActionSheetClick"
    ></u-action-sheet>
  </view>
</template>
<script>
const addActionList = [
  {
    text: '手动键入',
  },
  {
    text: '通过课表',
  },
];
export default {
  name: 'AddButton',
  data() {
    return { addActionList, actionSheetVisible: false };
  },
  methods: {
    onActionSheetClick(index) {
      this.$emit('add', index);
    },
  },
};
</script>
<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.block {
  height: 140rpx;
}
.add-btn-wrapper {
  position: fixed;
  bottom: 20rpx;
  width: 100vw;
  .add-btn {
    background-color: $u-type-primary;
    box-shadow: 0 5px 8px 1px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    height: 120rpx;
    width: 120rpx;
  }
}
</style>
