<template>
  <view class="page-wrapper">
    <view class="steps-wrapper">
      <u-steps :list="steps" :current="current" mode="number" active-color="#ffafcc"></u-steps>
    </view>
    <u-gap height="20" bg-color="#f2f2f2"></u-gap>
    <template v-show="current === 0">
      <view class="cell-wrapper">
        头像：
        <u-avatar class="u-skeleton-circle" :src="userInfo.avatarUrl"></u-avatar>
      </view>
      <view class="cell-wrapper">
        昵称：
        <text>{{ nickname }}</text>
      </view>
      <view class="cell-wrapper">
        同步：
        <u-button
          type="success"
          size="mini"
          open-type="getUserInfo"
          @getuserinfo.stop="onGetUserInfo"
        >
          授权获取
        </u-button>
      </view>
    </template>
    <view class="btn-wrapper safe-area-inset-bottom">
      <u-button class="btn" throttle-time="100" @click="prev">
        {{ current === 0 ? '取消' : '上一步' }}
      </u-button>
      <u-button class="btn" throttle-time="100" type="primary" @click="next">
        {{ current === 1 ? '完成' : '下一步' }}
      </u-button>
    </view>
  </view>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'validation',
  data() {
    return {
      steps: [{ name: '补全用户信息' }, { name: '须知' }],
      current: 0,
    };
  },
  computed: {
    ...mapState('user', ['userInfo']),
    nickname() {
      return this.userInfo.nickName ?? '无';
    },
  },
  methods: {
    onGetUserInfo({ target }) {
      console.log(target.userInfo);
    },
    prev() {
      if (this.current === 0) {
        uni.navigateBack({ delta: 1 });
        return;
      }
      this.current -= 1;
    },
    next() {
      this.current += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
.page-wrapper {
}

.steps-wrapper {
  padding: 80rpx 40rpx;
}

.cell-wrapper {
  padding-left: 30rpx;
  display: flex;
  align-items: center;
  height: 140rpx;
}

.btn-wrapper {
  position: absolute;
  bottom: 20rpx;
  padding-left: 20rpx;
  padding-right: 20rpx;
  width: 100vw;
  display: flex;
  justify-content: space-around;

  .btn {
    width: 200rpx;
  }
}
</style>
