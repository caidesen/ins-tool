<template>
  <view v-if="reportData" class="page safe-area-inset-bottom">
    <template v-if="reportData.total">
      <view class="title">课时统计</view>
      <view class="data-wrapper">
        <u-row gutter="20">
          <u-col span="6">
            <view class="card u-flex-1 u-flex-col u-col-center u-row-center">
              <view>本月总课时(节)</view>
              <view class="total u-font-40">{{ reportData.total }}</view>
            </view>
          </u-col>
          <u-col span="6">
            <view class="card u-flex-1 u-flex-col u-col-center u-row-center">
              <view>预计课时费(元)</view>
              <view class="total u-font-40">{{ reportData.total * 45 }}</view>
            </view>
          </u-col>
        </u-row>
      </view>
      <view class="sub-title u-flex">
        <view class="point"></view>
        按课程分类
      </view>
      <view class="table">
        <u-table>
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
        <u-table>
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
      <view class="title u-margin-top-40">出席情况</view>
      <view class="data-wrapper">
        <u-row gutter="10">
          <u-col span="4">
            <view class="card u-flex-1 u-flex-col u-col-center u-row-center">
              <view>累计应到(人)</view>
              <view class="total u-font-40">{{ selectNumberTotal }}</view>
            </view>
          </u-col>
          <u-col span="4">
            <view class="card u-flex-1 u-flex-col u-col-center u-row-center">
              <view>累计实到(人)</view>
              <view class="total u-font-40">{{ presentNumberTotal }}</view>
            </view>
          </u-col>
          <u-col span="4">
            <view class="card u-flex-1 u-flex-col u-col-center u-row-center">
              <view>本月出席率(%)</view>
              <view class="total u-font-40">{{ presentRate }}</view>
            </view>
          </u-col>
        </u-row>
      </view>

      <view class="sub-title u-flex">
        <view class="point"></view>
        按课程分类
      </view>
      <view class="table">
        <u-table>
          <u-tr>
            <u-th>课程</u-th>
            <u-th>应到</u-th>
            <u-th>实到</u-th>
          </u-tr>

          <u-tr v-for="item in reportData.presentByCourseCode" :key="item.courseCode">
            <u-td>{{ item.courseCode }}</u-td>
            <u-td>{{ item.selectNum }}</u-td>
            <u-td>{{ item.presentNum }}</u-td>
          </u-tr>
        </u-table>
      </view>
      <view class="sub-title u-flex">
        <view class="point"></view>
        按类别分类
      </view>
      <view class="table">
        <u-table>
          <u-tr>
            <u-th>课程</u-th>
            <u-th>应到</u-th>
            <u-th>实到</u-th>
          </u-tr>

          <u-tr v-for="item in reportData.presentByCourseType" :key="item.courseCode">
            <u-td>{{ item.courseTypeName }}</u-td>
            <u-td>{{ item.selectNum }}</u-td>
            <u-td>{{ item.presentNum }}</u-td>
          </u-tr>
        </u-table>
      </view>
    </template>
    <template v-else>
      <view class="empty-hint">
        <navigator url="/pages/lesson-record/lesson-record" open-type="redirect">
          <u-empty text="本无暂无数据，去添加" mode="list"></u-empty>
        </navigator>
      </view>
    </template>
    <view class="u-text-center u-margin-top-40">
      <u-button type="primary" size="mini" shape="square" @click="datePickerVisible = true">
        查看往月
      </u-button>
      <u-picker
        v-model="datePickerVisible"
        :default-time="currentDateDefault"
        :params="params"
        mode="time"
        safe-area-inset-bottom
        confirm-color
        @confirm="onCurrentDateChange"
      />
    </view>
  </view>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'LessonRecordReport',
  data() {
    return {
      month: dayjs().startOf('month').toDate(),
      currentDate: dayjs().format('YYYY-MM'),
      datePickerVisible: false,
      params: {
        year: true,
        month: true,
      },
    };
  },
  watch: {
    monthText: {
      handler(val) {
        uni.setNavigationBarTitle({
          title: `课时月报（${val}）`,
        });
      },
      immediate: true,
    },
  },
  computed: {
    ...mapState('lessonRecord', ['reportMap']),
    currentDateDefault() {
      console.log(this.currentDate);
      return this.currentDate + '-01 00:00';
    },
    reportData() {
      return this.reportMap[this.month.toJSON()];
    },
    monthText() {
      return dayjs(this.month).format('YYYY年M月');
    },
    selectNumberTotal() {
      return this.reportData?.presentByCourseCode
        .map((it) => it.selectNum)
        .reduce((total, current) => total + current, 0);
    },
    presentNumberTotal() {
      return this.reportData?.presentByCourseType
        .map((it) => it.presentNum)
        .reduce((total, current) => total + current, 0);
    },
    presentRate() {
      return (
        this.reportData && ((this.presentNumberTotal / this.selectNumberTotal) * 100).toFixed(2)
      );
    },
  },
  onLoad() {
    if (!this.reportData) this.reFetch();
  },
  async onPullDownRefresh() {
    this.resetReportMap(this.month.toJSON());
    await this.reFetch();
    uni.stopPullDownRefresh();
  },
  methods: {
    ...mapActions('lessonRecord', ['fetchMonthlyReportByMonth']),
    ...mapMutations('lessonRecord', ['resetReportMap']),
    async reFetch() {
      uni.showNavigationBarLoading();
      await this.fetchMonthlyReportByMonth({ month: this.month });
      uni.hideNavigationBarLoading();
    },
    onCurrentDateChange({ year, month }) {
      this.currentDate = `${year}-${month}`;
      this.month = dayjs(`${year}-${month}`, 'YYYY-MM').toDate();
      this.reFetch();
    },
  },
};
</script>
<style lang="scss">
@import '~@/uni.scss';

.title {
  line-height: 88rpx;
  font-size: 32rpx;
  padding: 0 $uni-spacing-row-base;
  margin-bottom: $uni-spacing-col-base;
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
.data-wrapper {
  width: 100%;
  padding: 0 $uni-spacing-row-base;
}
.card {
  height: 110rpx;
  background: rgba(255, 240, 109, 0.2);
  border-radius: 20rpx;
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
    background: rgba(255, 107, 107, 0.2) !important;
  }
}
.empty-hint {
  margin-top: calc(50vh - 100px);
}
</style>
