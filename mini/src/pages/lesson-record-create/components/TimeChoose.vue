<template>
  <view class="time-choose" @click="goToChoose">
    {{ value }}
    <u-picker
      v-model="datePickerVisible"
      :default-time="value"
      :params="params"
      mode="time"
      safe-area-inset-bottom
      confirm-color
      @confirm="onCurrentDateChange"
    />
  </view>
</template>

<script>
export default {
  name: 'TimeChoose',
  props: {
    value: String,
  },
  data() {
    return {
      datePickerVisible: false,
      params: {
        year: true,
        month: true,
        day: true,
        hour: true,
        minute: true,
      },
    };
  },
  methods: {
    goToChoose() {
      this.datePickerVisible = true;
    },
    onCurrentDateChange({ year, month, day, hour, minute }) {
      this.$emit('input', `${year}-${month}-${day} ${hour}:${minute}`);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme.scss';
.time-choose {
  height: 70rpx;
  color: $u-tips-color;
}
</style>
