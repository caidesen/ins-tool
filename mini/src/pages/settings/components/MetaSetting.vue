<template>
  <view>
    <u-form :model="form" ref="form" label-position="top">
      <u-form-item label="mate账号" prop="gymboMateUsername">
        <u-input v-model="form.gymboMateUsername" placeholder="请输入mate账号" />
      </u-form-item>
      <u-form-item label="mate密码" prop="gymboMatePassword">
        <u-input
          v-model="form.gymboMatePassword"
          placeholder="请输入mate密码"
          type="password"
          :password-icon="true"
        />
      </u-form-item>
    </u-form>
    <view class="btn-wrapper safe-area-inset-bottom">
      <u-button type="primary" :loading="submitLoading" @click="submit">保存设置</u-button>
    </view>
    <u-toast ref="uToast" />
    <u-top-tips ref="uTips" />
  </view>
</template>

<script>
import service from '@/service';
const rules = {
  gymboMateUsername: [
    {
      required: true,
      message: '请输入mate账号',
      trigger: 'change',
    },
  ],
  gymboMatePassword: [
    {
      required: true,
      message: '请输入mate密码',
      trigger: 'change',
    },
  ],
};
export default {
  name: 'meta',
  data() {
    return {
      form: {
        gymboMateUsername: '',
        gymboMatePassword: '',
        autoSync: false,
      },
      submitLoading: false,
    };
  },
  mounted() {
    this.$refs.form.setRules(rules);
    Promise.all([this.fetchMetaUserInfo(), this.fetchMetaSettings()])
      .then(() => {})
      .catch((e) => {
        this.$refs.uToast.show({
          title: `加载信息失败：${e.message}`,
          type: 'error',
        });
      });
  },
  methods: {
    async fetchMetaSettings() {
      const res = await service.setting.getSettingsInfo();
      Object.assign(this.form, res.data);
    },
    async fetchMetaUserInfo() {
      const res = await service.setting.getMateUserInfo();
      if (res.data) {
        const { chineseName, primaryCenterName } = res.data;
        this.$refs.uTips.show({
          title: `当前登录：${chineseName}-${primaryCenterName}`,
          type: 'success',
          duration: 4000,
        });
      } else {
        this.$refs.uTips.show({
          title: '没有找到正确的信息，设置账号密码后同步',
          type: 'warning',
          duration: 2000,
        });
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) this.doPost(this.form);
      });
    },
    async doPost(values) {
      try {
        this.submitLoading = true;
        await service.setting.saveMateAccount(values);
        this.$refs.uToast.show({
          title: `成功`,
          type: 'success',
        });
        await this.fetchMetaUserInfo();
      } catch (e) {
        this.$refs.uToast.show({
          title: `操作失败：${e.message}`,
          type: 'error',
        });
      } finally {
        this.submitLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.btn-wrapper {
  width: 100%;
  padding-left: 20rpx;
  padding-right: 20rpx;
  position: absolute;
  bottom: 20rpx;
  left: 0;
}
</style>
