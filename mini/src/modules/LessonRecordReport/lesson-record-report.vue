<template>
  <view>
    <view class="title">课时统计（{{ monthText }}）</view>
    <view class="u-flex">
      <view class="card u-flex-1 u-flex-col u-col-center u-row-center">
        <view>本月总课时(节)</view>
        <view class="total u-font-40">{{ reportData.total }}</view>
      </view>
      <view class="card u-flex-1 u-flex-col u-col-center u-row-center">
        <view>预计课时费(元)</view>
        <view class="total u-font-40">***</view>
      </view>
    </view>
    <view class="sub-title u-flex">
      <view class="point"></view>
      按课程分类
    </view>
    <view class="table">
      <u-table :th-style="{ background: 'rgba(255,107,107,0.2)' }">
        <u-tr>
          <u-th>课程</u-th>
          <u-th>课时(节)</u-th>
        </u-tr>

        <u-tr v-for="item in reportData.totalByCourseCode" :key="item.courseCode">
          <u-td>{{ item.courseCode }}</u-td>
          <u-td>{{ item.total }}</u-td>
        </u-tr>
      </u-table>
    </view>
    <view class="sub-title u-flex">
      <view class="point"></view>
      按类别分类
    </view>
    <view class="table">
      <u-table :th-style="{ background: 'rgba(255,107,107,0.2)' }">
        <u-tr>
          <u-th>课程类别</u-th>
          <u-th>课时(节)</u-th>
        </u-tr>

        <u-tr v-for="item in reportData.totalByCourseType" :key="item.courseTypeName">
          <u-td>{{ item.courseTypeName }}</u-td>
          <u-td>{{ item.total }}</u-td>
        </u-tr>
      </u-table>
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'LessonRecordReport',
  props: {
    month: {
      type: String,
      default: () => dayjs().startOf('month').toDate(),
    },
  },
  computed: {
    ...mapState('lessonRecord', ['reportMap']),
    reportData() {
      return this.reportMap[this.month];
    },
    monthText() {
      return dayjs(this.month).format('YYYY年M月');
    },
  },
  mounted() {
    this.fetchMonthlyReportByMonth({ month: new Date(this.month) });
  },
  methods: {
    ...mapActions('lessonRecord', ['fetchMonthlyReportByMonth']),
  },
};
</script>

<style lang="scss">
@import '~@/uni.scss';

.title {
  line-height: 88rpx;
  font-size: 32rpx;
  padding: 0 $uni-spacing-row-base;
  //color: $u-type-primary;
  color: $u-type-primary;
  font-weight: bold;
  background: $u-type-primary3;
}
.sub-title {
  padding: $uni-spacing-col-base $uni-spacing-row-base;
  font-weight: bold;
  .point {
    height: 40rpx;
    border-radius: 10rpx;
    width: 12rpx;
    background: $u-type-primary;
    margin-right: $uni-spacing-row-sm;
  }
}
.card {
  height: 110rpx;
  width: 0;
  background: rgba(255, 240, 109, 0.2);
  border-radius: 20rpx;
  margin: $uni-spacing-row-base;
  color: $u-type-primary;
  .card-content {
    opacity: 1;
  }
  .total {
    font-weight: bold;
  }
}
.table {
  padding: 0 $uni-spacing-row-base;
  ::v-deep .u-th {
    background: $u-type-primary !important;
  }
}
</style>
