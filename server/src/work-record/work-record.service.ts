import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkRecord, WorkRecordRecordType } from './entity/work.record.entity';
import * as dayjs from 'dayjs';
import { WorkRecordSetting } from './entity/work-record-setting.entity';
import { SettingsService } from '../settings/settings.service';
import { LessonService } from '../lesson/lesson.service';
import { MateUserInfo } from '../settings/entity/mate-user-info.entity';
import { Cron, CronExpression, Interval } from '@nestjs/schedule';

@Injectable()
export class WorkRecordService {
  constructor(
    private readonly settingsService: SettingsService,
    private readonly lessonService: LessonService,
    @InjectRepository(WorkRecord) private readonly workRecordRepository: Repository<WorkRecord>,
    @InjectRepository(WorkRecordSetting)
    private readonly workRecordSettingRepository: Repository<WorkRecordSetting>,
  ) {}

  /**
   * 生成记录
   */
  async generateRecord(
    options: WorkRecordSetting,
    mateInfo: MateUserInfo,
    targetDate: Date,
    isHoliday: boolean,
  ) {
    const workRecord = new WorkRecord();
    const fixedPlan = options.fixedWeekWorkPlan?.split('/');
    if (fixedPlan.length !== 7) throw new Error('fixedWeekWorkPlan failed');
    workRecord.recordType = fixedPlan[dayjs(targetDate).weekday()] as WorkRecordRecordType;
    workRecord.date = targetDate;
    workRecord.userId = options.userId;
    workRecord.remark = '自动同步';
    const lessons = await this.lessonService.list({
      centerId: mateInfo.primaryCenterId,
      mateUserId: mateInfo.mateUserId,
      date: dayjs(targetDate).format('YYYY-MM-DD'),
    });
    /* 放假 */
    if (isHoliday) workRecord.recordType = '休';
    if (lessons.length !== 0) {
      const offTime = dayjs(
        lessons.reduce(
          (a, b) => (dayjs(a, 'HH:mm').isAfter(dayjs(b.endTime, 'HH:mm')) ? a : b.endTime),
          '00:00',
        ),
        'HH:mm',
      )
        .add(30, 'minute')
        .hour();
      const onTime = dayjs(
        lessons.reduce(
          (a, b) => (dayjs(a, 'HH:mm').isBefore(dayjs(b.startTime, 'HH:mm')) ? a : b.startTime),
          '23:59',
        ),
        'HH:mm',
      ).hour();
      const standard = { A: 18, B: 19, C: 20 };

      /* 计算加班时间 */
      if (['A', 'B', 'C'].includes(workRecord.recordType)) {
        const overtime = offTime - standard[workRecord.recordType];
        if (overtime > 0) workRecord.changeValue = overtime;
      } else {
        let overtime = offTime - onTime;
        if (onTime < 12) overtime -= 1;
        if (overtime > 0) workRecord.changeValue = overtime;
      }
    } else if (['A', 'B', 'C'].includes(workRecord.recordType)) {
      workRecord.recordType = '';
    }
    await this.workRecordRepository.save(workRecord);
  }

  /**
   * 自动运行
   */
  @Cron(CronExpression.EVERY_DAY_AT_9PM)
  async autoSchedule() {
    const list = await this.workRecordSettingRepository.find({ autoGenerateSwitch: true });
    const targetDate = dayjs()
      .startOf('day')
      .toDate();
    const centerIsHoliday = new Map<string, boolean>();
    for (const workRecordSetting of list) {
      try {
        const record = await this.workRecordRepository.find({
          userId: workRecordSetting.userId,
          date: targetDate,
        });
        if (record.length === 0) {
          const mateInfo = await this.settingsService.findMateUserInfoByUserId(
            workRecordSetting.userId,
          );
          const centerId = mateInfo.primaryCenterId;
          if (!centerIsHoliday.has(centerId)) {
            const { isHoliday } = await this.lessonService.pullLessons({
              userId: workRecordSetting.userId,
              date: targetDate.toJSON(),
            });
            centerIsHoliday.set(centerId, isHoliday);
          }
          await this.generateRecord(
            workRecordSetting,
            mateInfo,
            targetDate,
            centerIsHoliday.get(centerId),
          );
        }
      } catch (e) {
        console.error('自动任务出错：' + e);
      }
    }
  }
}
