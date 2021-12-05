<template>
  <view class="page">
    <ren-calendar
      :collapsible="false"
      :markData="markData"
      @onDayClick="onDayClick"
      @monthChange="onMonthChange"
    />
    <view class="form" v-if="ready">
      <u-form>
        <u-form-item label="类型">
          <view style="width: 90%">
            <u-radio-group v-model="form.recordType">
              <u-radio v-for="item in list" :key="item" :name="item">
                <view style="line-height: 80rpx">
                  {{ item }}
                </view>
              </u-radio>
            </u-radio-group>
          </view>
        </u-form-item>
        <u-form-item label="增减" :border-bottom="false">
          <uni-number-box v-model="form.changeValue" :min="-8" :max="8" />
        </u-form-item>
        <view style="margin-top: 40rpx">
          <u-button type="primary" @click="onSave" :loading="loadingMap[chooseDate]">保存</u-button>
        </view>
      </u-form>
    </view>
    <u-toast ref="uToast" />
  </view>
</template>

<script>
import RenCalendar from './components/lx-calendar/lx-calendar';
import settingEnum from '@/pages/settings/enum';
import { mapState, mapActions } from 'vuex';
import debounce from 'lodash/debounce';
import service from '@/service';
import dayjs from 'dayjs';
import UniNumberBox from '@/pages/work-record/list/components/uni-number-box/uni-number-box';
export default {
  components: { RenCalendar, UniNumberBox },
  data() {
    return {
      list: ['A', 'B', 'C', '公', '休', '调', '旷', '年', '产', '婚'],
      chooseDate: '',
      form: { recordType: '', changeValue: 0 },
      dataSource: {},
      markData: {},
      loadingMap: {},
      ready: false,
    };
  },
  computed: {
    ...mapState('setting', ['workRecordSetting']),
  },
  watch: {
    chooseDate(val) {
      this.mergeFormState(val);
    },
  },
  methods: {
    ...mapActions('setting', ['fetchWorkRecordSetting']),
    mergeFormState(date) {
      delete this.form.id;
      Object.assign(this.form, this.dataSource[date] ?? { recordType: '', changeValue: 0 });
    },
    onSave() {
      this.syncChangedRecord({ ...this.form, chooseDate: this.chooseDate });
    },
    syncChangedRecord(values) {
      this.$set(this.loadingMap, values.chooseDate, true);
      service.workRecord
        .saveWorkRecord({
          ...values,
          date: dayjs(values.chooseDate, 'YYYY-MM-DD').toDate(),
        })
        .then(({ data }) => {
          this.$set(this.dataSource, data.chooseDate, data);
          this.$set(this.markData, data.chooseDate, this.formatMarkContent(data));
        })
        .catch((e) => {
          this.$refs.uToast.show({
            title: `操作失败：${e.message}`,
            type: 'error',
          });
        })
        .finally(() => {
          this.$set(this.loadingMap, values.chooseDate, false);
          if (values.chooseDate === this.chooseDate) this.mergeFormState(this.chooseDate);
        });
    },
    onDayClick({ date }) {
      this.chooseDate = date;
    },
    onMonthChange(date) {
      this.fetchData(date);
    },
    formatMarkContent({ recordType, changeValue }) {
      return [recordType, changeValue].filter((it) => it).join(changeValue > 0 ? '+' : '');
    },
    async fetchData(date) {
      try {
        uni.showNavigationBarLoading();
        const { data } = await service.workRecord.getWorkRecord(date);
        this.ready = true;
        data.forEach((it) => {
          this.$set(this.dataSource, dayjs(it.date).format('YYYY-MM-DD'), it);
          this.$set(this.markData, dayjs(it.date).format('YYYY-MM-DD'), this.formatMarkContent(it));
        });
        this.mergeFormState(this.chooseDate);
      } catch (e) {
        this.$refs.uToast.show({
          title: `加载失败：${e.message}`,
          type: 'error',
        });
      } finally {
        uni.hideNavigationBarLoading();
      }
    },
  },
  async onShow() {
    if (this.workRecordSetting) return;
    const setting = await this.fetchWorkRecordSetting();
    if (!setting)
      uni.showModal({
        title: '提示',
        content: '当前还没有设置基准调休时间，设置后才能使用此功能',
        confirmText: '前往设置',
        success: (result) => {
          if (result.confirm) {
            uni.navigateTo({
              url: `/pages/settings/settings?type=${settingEnum.TYPE_ENUM.WORK_RECORD_SETTING}`,
            });
          } else {
            uni.navigateBack();
          }
        },
      });
  },
};
</script>

<style scoped>
.page {
  background: #f2f3f5;
  min-height: 100vh;
}
.form {
  background: #fff;
  margin: 50rpx 20rpx 0;
  padding: 20rpx;
  border-radius: 20rpx;
}
</style>
