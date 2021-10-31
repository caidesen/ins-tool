<template>
  <view class="page-wrapper">
    <view class="header">
      <view class="total-wrapper">
        <view class="u-font-lg u-flex u-row-between">
          <text>月总课时</text>
          <view class="icon-btn" @click="datePickerVisible = true">
            <u-icon name="shaixuan" custom-prefix="custom-icon" size="40" />
          </view>
        </view>
        <view class="big-num">
          {{ dataTotal.recordTotal }}
        </view>
        <view class="u-m-t-20">出席率: {{ dataTotal.rate || 0 }}%</view>
      </view>
    </view>
    <day-card
      v-for="item in dayDetailList"
      :key="item.title"
      :whole-day-data="item"
      @record-click="onRecordClick"
    />
    <add-button @add="onAdd" />
    <u-picker
      v-model="datePickerVisible"
      :default-time="currentDateDefault"
      :params="params"
      mode="time"
      safe-area-inset-bottom
      confirm-color
      @confirm="onCurrentDateChange"
    ></u-picker>
    <u-action-sheet
      safe-area-inset-bottom
      :list="recordActionList"
      v-model="actionSheetVisible"
      @click="onActionSheetClick"
    ></u-action-sheet>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions, mapMutations, mapState } from 'vuex';
import service from '@/service';
import DayCard from '@/pages/lesson-record/components/DayCard';
import { REFRESH_LESSON_RECORD } from '@/utils/eventNameEnum';
import AddButton from '@/pages/lesson-record/components/AddButton';
import { Navigation } from '@/utils/navigation';
const recordActionList = [
  {
    text: '修改',
  },
  {
    text: '删除',
  },
];
export default {
  name: 'lesson-record',
  components: { AddButton, DayCard },
  data() {
    return {
      currentDate: dayjs().format('YYYY-MM'),
      datePickerVisible: false,
      params: {
        year: true,
        month: true,
      },
      recordActionList,
      actionSheetVisible: false,
    };
  },
  computed: {
    ...mapState('lessonRecord', ['lessonRecordMap']),
    currentDateDefault() {
      return this.currentDate + '-01 00:00';
    },
    dataTotal() {
      let recordTotal = 0;
      let selectNum = 0;
      let presentNum = 0;
      let rate = 0;
      const map = this.lessonRecordMap[this.currentDate];
      if (map) {
        const dayKeys = Object.keys(map);
        for (let dayKey of dayKeys) {
          const records = map[dayKey].records;
          recordTotal += records.length;
          records.forEach((it) => {
            selectNum += it.selectNum;
            presentNum += it.presentNum;
          });
        }
      }
      if (selectNum && presentNum) {
        rate = ((presentNum / selectNum) * 100).toFixed(2);
      }
      return { recordTotal, rate };
    },
    dayDetailList() {
      const map = this.lessonRecordMap[this.currentDate];
      if (!map) return [];
      const dayKeys = Object.keys(map).sort((a, b) => Number(b) - Number(a));
      return dayKeys.map((it) => {
        return {
          ...map[it],
          title: `${this.currentDate}-${it}`,
        };
      });
    },
  },
  watch: {
    currentDate: {
      immediate: true,
      handler(val) {
        uni.setNavigationBarTitle({
          title: val,
        });
        if (!this.lessonRecordMap[val]) {
          this.reFetch();
        }
      },
    },
  },
  async onPullDownRefresh() {
    await this.reFetch();
    uni.stopPullDownRefresh();
  },
  onPageScroll(res) {
    // console.log(res);
  },
  onLoad() {
    uni.$on(REFRESH_LESSON_RECORD, this.reFetch);
  },
  onUnload() {
    uni.$off(REFRESH_LESSON_RECORD, this.reFetch);
  },
  methods: {
    ...mapMutations('lessonRecord', ['resetLessonRecordMap']),
    ...mapActions('lessonRecord', ['fetchLessonRecordByDate']),
    async reFetch() {
      uni.showNavigationBarLoading();
      const month = dayjs(this.currentDate, 'YYYY-MM');
      const start = month.startOf('month').toDate();
      const end = month.endOf('month').toDate();
      try {
        await this.fetchLessonRecordByDate({ start, end });
      } catch (e) {
        this.$refs.uToast.show({
          title: `查询失败：${e.message}`,
          type: 'error',
        });
      } finally {
        uni.hideNavigationBarLoading();
      }
    },
    onCurrentDateChange({ year, month }) {
      this.currentDate = `${year}-${month}`;
    },
    onAdd(index) {
      if (index === 0) {
        //  手动
        uni.navigateTo({
          url: '/pages/lesson-record-create/lesson-record-create',
        });
      } else {
        // 课表
        uni.navigateTo({
          url: '/pages/lesson-choose/lesson-choose',
        });
      }
    },
    onRecordClick(item) {
      this.currentSelectedRecord = item;
      this.actionSheetVisible = true;
    },
    onActionSheetClick(index) {
      if (index === 0) {
        //  修改
        Navigation.goLessonRecordForm(this.currentSelectedRecord);
      } else {
        // 删除
        uni.showModal({
          title: '警告',
          content: `确认删除${dayjs(this.currentSelectedRecord.startDate).format('M月DD日H点')}的${
            this.currentSelectedRecord.courseName
          }？`,
          success: (res) => {
            if (res.confirm) {
              this.doDelete(this.currentSelectedRecord.id);
            }
          },
        });
      }
    },
    async doDelete(id) {
      try {
        uni.showLoading({
          mask: true,
        });
        await service.lessonRecord.deleteLessonRecord(id);
        this.$refs.uToast.show({
          title: `删除成功`,
          type: 'success',
        });
        await this.reFetch();
      } catch (e) {
        this.$refs.uToast.show({
          title: `删除失败：${e.message}`,
          type: 'error',
        });
      } finally {
        uni.hideLoading();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.page-wrapper {
  min-height: 100vh;
  background-color: #f2f2f2;
}
.header {
  background-color: $u-type-primary;
  width: 100vw;
  height: 300rpx;
  position: relative;
  color: #fff;
  .icon-btn {
    padding: 10rpx 20rpx;
  }
  .total-wrapper {
    padding: 0 20rpx;
    .big-num {
      font-size: 70rpx;
    }
  }
}
</style>
