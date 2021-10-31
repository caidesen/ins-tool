<template>
  <u-grid :col="3" @click="navTo">
    <u-grid-item v-for="(item, index) in items" :key="index" :index="item.path">
      <u-icon :name="item.icon" :size="90"></u-icon>
      <view>{{ item.label }}</view>
    </u-grid-item>
  </u-grid>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      items: [
        { label: '记课', path: '/pages/lesson-record/lesson-record', icon: 'edit-pen' },
        {
          label: '课时月报',
          path: '/pages/lesson-record-report/lesson-record-report',
          icon: 'calendar',
        },
      ],
    };
  },
  methods: {
    navTo(index) {
      uni.navigateTo({
        url: index,
      });
    },
  },
};
</script>

<style scoped>
.grid-content {
  text-align: center;
}
</style>
