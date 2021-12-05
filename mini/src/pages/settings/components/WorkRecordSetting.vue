<template>
  <view>
    <u-form :model="form" ref="form" label-position="top">
      <u-form-item label="上月剩余调休时间" prop="lastMonthRestDuration">
        <u-input
          v-model="form.lastMonthRestDuration"
          type="number"
          placeholder="请输入整数"
          :maxlength="4"
        />
      </u-form-item>

      <u-form-item label="是否开启自动同步" prop="autoGenerateSwitch">
        <u-switch v-model="form.autoGenerateSwitch"></u-switch>
      </u-form-item>
      <u-form-item label="每周固定排班" prop="fixedWeekWorkPlan">
        <u-input v-model="form.fixedWeekWorkPlan" type="text" placeholder="例如：A/A/A/A/A/休/休" />
      </u-form-item>
    </u-form>
    <div class="description">
      <p class="title">设置说明</p>
      <p>
        1. 上月剩余调休时间：截止上月月底 剩余的休息时间。
        这个值会在每个自然月一日凌晨1点自动更新。数据如有纰漏，请在月初自行修改
      </p>
      <p>
        2. 是否开启自动同步：开启后将会在每日9点根据当日课表生成考勤记录。
        <!--        <br />-->
        <!--        规则：按照最早上课时间-->
      </p>
      <p>
        3. 每周固定排班:
        如果开启自动同步功能，此项必须设置！以周一为第一项，每项使用'/'符合链接。如果为空值或填写错误，同步将不会进行！
        <br />
        例如：A/A/A/A/A/休/休
      </p>
    </div>
    <view class="btn-wrapper safe-area-inset-bottom">
      <u-button type="primary" :loading="submitLoading" @click="submit">保存设置</u-button>
    </view>
    <u-toast ref="uToast" />
    <u-top-tips ref="uTips" />
  </view>
</template>

<script>
import service from '@/service';
import { mapActions } from 'vuex';
const rules = {
  lastMonthRestDuration: [
    {
      required: true,
      type: 'number',
      message: '不能为空',
      trigger: 'change',
    },
  ],
};
export default {
  name: 'WorkRecordSetting',
  data() {
    return {
      form: {
        lastMonthRestDuration: 0,
        autoGenerateSwitch: false,
        fixedWeekWorkPlan: '',
      },
      submitLoading: false,
    };
  },
  mounted() {
    this.$refs.form.setRules(rules);
    Promise.all([this.fetchSettings()])
      .then(() => {})
      .catch((e) => {
        this.$refs.uToast.show({
          title: `加载信息失败：${e.message}`,
          type: 'error',
        });
      });
  },
  methods: {
    ...mapActions('setting', ['fetchWorkRecordSetting']),
    async fetchSettings() {
      const res = await this.fetchWorkRecordSetting();
      Object.assign(this.form, res);
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) this.doPost(this.form);
      });
    },
    async doPost(values) {
      try {
        this.submitLoading = true;
        await service.workRecord.setWorkRecordSetting(values);
        this.$refs.uToast.show({
          title: `成功`,
          type: 'success',
        });
        await this.fetchWorkRecordSetting();
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

<style lang="scss" scoped>
.btn-wrapper {
  width: 100%;
  padding-left: 20rpx;
  padding-right: 20rpx;
  position: absolute;
  bottom: 20rpx;
  left: 0;
}
.description {
  margin-top: 40rpx;
  color: #909399;
  line-height: 40rpx;
  p {
    margin-bottom: 20rpx;
  }
}
</style>
