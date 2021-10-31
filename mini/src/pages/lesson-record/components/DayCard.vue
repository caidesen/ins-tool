<template>
  <view class="card-wrapper">
    <view class="title-wrapper">
      <text style="font-weight: bold">{{ wholeDayData.title }}</text>
      <text>课时：{{ wholeDayData.records.length }}，出席率：{{ rate }}%</text>
    </view>
    <view>
      <view
        class="records-row"
        v-for="item in wholeDayData.records"
        :key="item.id"
        @click="onRowClick(item)"
      >
        <view>
          <text>{{ item.courseCode }}\n</text>
          <text class="situation">{{ getStartTime(item) }}</text>
        </view>
        <text class="situation">应到：{{ item.selectNum }}\n实到：{{ item.presentNum }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs';

export default {
  name: 'DayCard',
  props: {
    wholeDayData: Object,
  },
  computed: {
    rate() {
      let selectNum = 0;
      let presentNum = 0;
      for (const record of this.wholeDayData.records) {
        selectNum += record.selectNum;
        presentNum += record.presentNum;
      }
      return ((presentNum / selectNum) * 100).toFixed(2);
    },
  },
  methods: {
    onRowClick(item) {
      this.$emit('record-click', item);
    },
    getStartTime(item) {
      return dayjs(item.startDate).format('HH:mm');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.card-wrapper {
  background: #fff;
  margin: 20rpx;
  border-radius: 20rpx;
  padding: 20rpx;
}
.title-wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}
.records-row {
  margin-top: 14rpx;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-weight: bold;
  .situation {
    font-weight: normal;
    color: $u-tips-color;
    font-size: 24rpx;
  }
}
</style>
