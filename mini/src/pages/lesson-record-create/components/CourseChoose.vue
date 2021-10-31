<template>
  <view class="course-choose u-flex" :class="{}" @click="goToChoose">{{ text }}</view>
</template>

<script>
import { CHOOSE_COURSE } from '@/utils/eventNameEnum';
import { mapState } from 'vuex';

export default {
  name: 'CourseChoose',
  props: {
    value: String,
  },
  computed: {
    ...mapState('course', ['courseList']),
    text() {
      const index = this.courseList.findIndex((it) => it.courseId === this.value);
      if (index === -1) return '点击选择课程';
      return this.courseList[index].courseCode;
    },
  },
  methods: {
    goToChoose() {
      uni.$once(CHOOSE_COURSE, (data) => {
        console.log(data);
        this.$emit('input', data);
      });
      uni.navigateTo({ url: '/pages/course-choose/course-choose' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.course-choose {
  height: 70rpx;
  color: $u-tips-color;
}
</style>
