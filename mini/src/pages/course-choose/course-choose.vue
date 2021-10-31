<template>
  <view class="u-p-20">
    <u-collapse class="collapse" :accordion="false" hover-class="none" :head-style="{}">
      <template v-for="(item, index) in courseGroup">
        <u-collapse-item :key="index" :title="item.label">
          <u-grid :col="2" :border="false">
            <template v-for="course in item.courseList">
              <u-grid-item :key="course.courseId" @click="choose(course.courseId)">
                <view class="grid-text">{{ course.courseCode }}</view>
              </u-grid-item>
            </template>
          </u-grid>
        </u-collapse-item>
      </template>
    </u-collapse>
    <u-toast ref="uToast" />
    <u-top-tips ref="uTips" />
  </view>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { CHOOSE_COURSE } from '@/utils/eventNameEnum';

export default {
  name: 'course-choose',
  data() {
    return {};
  },
  computed: {
    ...mapState('course', ['courseList']),
    ...mapGetters('course', ['courseGroup']),
  },
  watch: {
    courseGroup(val) {
      console.log(val);
    },
  },
  onLoad() {
    if (this.courseGroup.length === 0) {
      this.fetchCourseList();
    }
  },
  async onPullDownRefresh() {
    try {
      await this.pullAndFetchCourseList();
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
    }
  },
  methods: {
    ...mapActions('course', ['pullAndFetchCourseList', 'fetchCourseList']),
    choose(data) {
      uni.$emit(CHOOSE_COURSE, data);
      uni.navigateBack();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.collapse {
  ::v-deep .u-collapse-head {
    border-top: $u-border-color solid 1px;
    padding-left: 10rpx;
    padding-right: 10rpx;
  }
  ::v-deep .grid-text {
    text-align: center;
  }
}
</style>
