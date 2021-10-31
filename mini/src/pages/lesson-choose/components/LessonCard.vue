<template>
  <view class="card" @click="select">
    <view class="title u-flex">
      <u-checkbox :value="selected" shape="circle">{{ lesson.courseCode }}</u-checkbox>
    </view>
    <row label="时间：">{{ lesson.startTime }} ~ {{ lesson.endTime }}</row>
    <row label="学员：">
      <view class="baby-info u-flex" v-for="(item, index) in babyList" :key="index">
        <view class="name">{{ item.name }}</view>
        <view class="book-way">{{ item.bookWay }}</view>
        <view class="status">{{ item.status }}</view>
      </view>
    </row>
  </view>
</template>

<script>
import Row from './Row';
export default {
  name: 'LessonCard',
  components: { Row },
  inject: ['selectedList'],
  props: {
    /**
     * @type {API.Lesson}
     */
    lesson: Object,
  },
  data() {
    return {};
  },
  computed: {
    babyList() {
      if (!this.lesson.babyList) return [];
      return this.lesson.babyList.map((it) => ({
        name: it.babyName,
        bookWay: { 26001: 'R', 26002: 'M', 26003: 'P' }[it.bookWay],
        status: { 25001: '未上', 25002: '已上', 25003: '请假', 25004: '旷课' }[it.attendanceStatus],
      }));
    },
    selected() {
      return this.selectedList.includes(this.lesson.lessonId);
    },
  },
  methods: {
    select() {
      if (this.selected) {
        const index = this.selectedList.findIndex((it) => it === this.lesson.lessonId);
        this.selectedList.splice(index, 1);
      } else {
        this.selectedList.push(this.lesson.lessonId);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';

.card {
  background-color: #fff;
  margin: 20rpx;
  padding: 10rpx 20rpx;
  border-radius: 10rpx;
  .title {
    height: 56rpx;
    border-bottom: 1px solid $u-border-color;
    margin-bottom: 10rpx;
  }
}
.baby-info {
  .name {
    width: 200rpx;
  }
  .book-way {
    width: 40rpx;
    text-align: center;
  }
  .status {
    margin-left: 40rpx;
  }
}
</style>
