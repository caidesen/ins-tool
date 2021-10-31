<template>
  <view class="page-wrapper safe-area-inset-bottom">
    <view class="header u-flex u-row-right">
      <view class="icon-btn" @click="datePickerVisible = true">
        <u-icon name="shaixuan" custom-prefix="custom-icon" size="40" />
      </view>
      <u-picker
        v-model="datePickerVisible"
        :default-time="currentDate"
        :params="params"
        mode="time"
        safe-area-inset-bottom
        confirm-color
        @confirm="onCurrentDateChange"
      ></u-picker>
    </view>
    <lesson-card v-for="lesson in list" :key="lesson.lessonId" :lesson="lesson" />
    <view style="height: 100rpx"></view>
    <view class="action-wrapper safe-area-inset-bottom">
      <view class="row u-flex u-p-20">
        <view @click="selectAll"><u-checkbox :value="allSelected">全选</u-checkbox></view>
        <view class="action-btn u-flex" :class="{ disable: actionBtnDisable }" @click="submit">
          确认
        </view>
      </view>
    </view>
    <u-toast ref="uToast" />
    <u-top-tips ref="uTips" />
  </view>
</template>

<script>
import dayjs from 'dayjs';
import { mapActions, mapState } from 'vuex';
import LessonCard from '@/pages/lesson-choose/components/LessonCard';
import service from '@/service';
import { REFRESH_LESSON_RECORD } from '@/utils/eventNameEnum';
export default {
  name: 'lesson-choose',
  components: { LessonCard },
  provide() {
    return { selectedList: this.selectedList };
  },
  data() {
    return {
      datePickerVisible: false,
      currentDate: dayjs().format('YYYY-MM-DD'),
      selectedList: [],
      params: {
        year: true,
        month: true,
        day: true,
      },
    };
  },
  computed: {
    ...mapState('lesson', ['lessonMap']),
    list() {
      return this.lessonMap[this.currentDate] || [];
    },
    allSelected() {
      const selectedList = this.selectedList;
      if (this.list.length === 0) return false;
      return this.list.every((it) => selectedList.includes(it.lessonId));
    },
    actionBtnDisable() {
      return this.selectedList.length === 0;
    },
  },
  watch: {
    currentDate: {
      immediate: true,
      async handler(val) {
        uni.setNavigationBarTitle({
          title: val,
        });
        if (this.lessonMap[val]) return;
        try {
          uni.showNavigationBarLoading();
          await this.fetchLessonByDate(val);
          if (this.list.length === 0) {
            this.$refs.uToast.show({
              title: `无更多数据`,
            });
          } else {
            const time = dayjs(this.list[0].gmtModified).format('YYYY-MM-DD HH:mm:ss');
            this.$nextTick(() => {
              this.$refs.uTips.show({
                type: 'success',
                title: `数据拉取于${time}`,
              });
            });
          }
        } catch (e) {
          this.$refs.uToast.show({
            title: `操作失败：${e.message}`,
            type: 'error',
          });
        } finally {
          uni.hideNavigationBarLoading();
        }
      },
    },
  },
  async onPullDownRefresh() {
    try {
      uni.showNavigationBarLoading();
      await this.pullAndFetchLessByDate(this.currentDate);
      this.$refs.uTips.show({
        title: '已从mate系统中获取最新数据',
        type: 'success',
        duration: 1500,
      });
    } catch (e) {
      this.$refs.uToast.show({
        title: `查询失败：${e.message}`,
        type: 'error',
      });
    } finally {
      uni.stopPullDownRefresh();
      uni.hideNavigationBarLoading();
    }
  },
  methods: {
    ...mapActions('lesson', ['pullAndFetchLessByDate', 'fetchLessonByDate']),
    onCurrentDateChange({ year, month, day }) {
      this.currentDate = `${year}-${month}-${day}`;
    },
    selectAll() {
      if (this.allSelected) {
        this.selectedList.splice(0);
      } else {
        this.selectedList.splice(0);
        this.list.forEach((it) => this.selectedList.push(it.lessonId));
      }
    },
    async submit() {
      if (this.actionBtnDisable) return;
      if (this.submitloading) return;
      this.submitloading = true;
      uni.showNavigationBarLoading();
      try {
        await service.lessonRecord.pushLessonRecordByLessonIds({
          ids: this.selectedList,
        });
        this.$refs.uToast.show({
          title: '导入成功',
          type: 'success',
        });
        uni.$emit(REFRESH_LESSON_RECORD);
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
      } catch (e) {
        this.$refs.uToast.show({
          title: `提交失败：${e.message}`,
          type: 'error',
        });
      } finally {
        this.submitloading = false;
        uni.hideNavigationBarLoading();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.page-wrapper {
  min-height: 100vh;
  background-color: $u-bg-color;
}
.header {
  background-color: $u-type-primary;
  width: 100vw;
  height: 88rpx;
  position: relative;
  color: #fff;
  .icon-btn {
    padding: 10rpx 20rpx;
  }
}
.action-wrapper {
  width: 100vw;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  .row {
    height: 88rpx;
    .action-btn {
      transition: background-color 0.3s;
      background-color: $u-type-primary;
      color: #fff;
      position: absolute;
      right: 0;
      height: 88rpx;
      padding: 0 80rpx;
      &.disable {
        background-color: $u-type-info-dark;
      }
    }
  }
}
</style>
