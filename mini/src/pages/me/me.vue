<template>
  <view class="wrapper">
    <view class="header">
      <view class="userinfo" @click="onUserInfoClick">
        <!--        <u-avatar :src="userInfo.avatarUrl"></u-avatar>-->
        <open-data class="avatar" type="userAvatarUrl"></open-data>
        <open-data class="username" type="userNickName"></open-data>
        <text class="username">
          <!--          <template v-if="!userInfoLoading && !isVerify">账户未验证，前往验证</template>-->
        </text>
      </view>
    </view>
    <u-cell-group>
      <template v-for="(item, index) in menus">
        <navigator :url="item.url" :key="index">
          <u-cell-item :icon="item.icon" :title="item.title"></u-cell-item>
        </navigator>
      </template>
    </u-cell-group>
  </view>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import settingEnum from '@/pages/settings/enum';
export default {
  data() {
    return {
      title: 'Hello',
      menus: [
        {
          icon: 'setting-fill',
          title: 'mate设置',
          url: `/pages/settings/settings?type=${settingEnum.TYPE_ENUM.MATE_ACCOUNT}`,
        },
      ],
    };
  },
  computed: {
    ...mapState('user', ['userInfo', 'userInfoLoading']),
    ...mapGetters('user', ['isVerify']),
  },
  watch: {
    userInfoLoading: {
      immediate: true,
      handler(val) {
        if (val) uni.showNavigationBarLoading();
        else uni.hideNavigationBarLoading();
      },
    },
  },
  onLoad() {},
  methods: {
    onUserInfoClick() {
      if (this.userInfoLoading) return;
      // if (!this.isVerify) {
      //   uni.navigateTo({
      //     url: '/pages/validation/validation',
      //   });
      // }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/uview.theme';

.content {
}

.header {
  background-color: $u-type-primary;
  width: 100vw;
  height: 300rpx;
  position: relative;
  color: #fff;

  .userinfo {
    position: absolute;
    bottom: 0;
    padding: 20rpx;
    display: flex;
    align-items: center;
    .avatar {
      height: 90rpx;
      width: 90rpx;
      border-radius: 50%;
      overflow: hidden;
    }
    .username {
      margin-left: 18rpx;
    }
  }
}
</style>
