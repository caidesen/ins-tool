<template>
  <view class="form">
    <u-form :model="form" ref="form" label-position="top">
      <u-form-item label="开始时间" prop="startDate">
        <time-choose v-model="form.startDate" />
      </u-form-item>
      <u-form-item label="选择课程" prop="courseId">
        <course-choose v-model="form.courseId" />
      </u-form-item>
      <u-form-item label="应到人数" prop="selectNum">
        <u-input v-model="form.selectNum" type="number" placeholder="请输入应到人数" />
      </u-form-item>
      <u-form-item label="实到人数" prop="presentNum">
        <u-input v-model="form.presentNum" type="number" placeholder="请输入实到人数" />
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
import CourseChoose from '@/pages/lesson-record-create/components/CourseChoose';
import TimeChoose from '@/pages/lesson-record-create/components/TimeChoose';
import dayjs from 'dayjs';
import service from '@/service';
import { REFRESH_LESSON_RECORD } from '@/utils/eventNameEnum';
const rules = {
  courseId: [
    {
      required: true,
      message: '请选择',
      trigger: 'change',
    },
  ],
};
export default {
  name: 'lesson-record-create',
  components: { TimeChoose, CourseChoose },
  data() {
    return {
      form: {
        startDate: dayjs().format('YYYY-MM-DD HH:00'),
        courseId: undefined,
        selectNum: 0,
        presentNum: 0,
      },
      submitLoading: false,
    };
  },
  onLoad(options) {
    if (!options.id) return;
    this.oldRecord = options;
    this.form.startDate = dayjs(options.startDate).format('YYYY-MM-DD HH:00');
    this.form.courseId = options.courseId;
    this.form.selectNum = options.selectNum;
    this.form.presentNum = options.presentNum;
  },
  mounted() {
    this.$refs.form.setRules(rules);
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) this.doPost(this.form);
      });
    },
    async doPost(values) {
      try {
        this.submitLoading = true;
        const promise = this.oldRecord
          ? service.lessonRecord.modifyLessonRecord({ ...this.oldRecord, ...values })
          : service.lessonRecord.createLessonRecord(values);
        await promise;
        this.$refs.uToast.show({
          title: `${this.oldRecord ? '修改' : '创建'}成功`,
          type: 'success',
        });
        uni.$emit(REFRESH_LESSON_RECORD);
        setTimeout(() => {
          uni.navigateBack();
        }, 1000);
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
@import '~@/uni.scss';

.form {
  padding: 0 $uni-spacing-row-sm;
}

.btn-wrapper {
  width: 100%;
  padding-left: 20rpx;
  padding-right: 20rpx;
  position: absolute;
  bottom: 20rpx;
  left: 0;
}
</style>
