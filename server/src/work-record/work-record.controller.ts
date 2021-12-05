import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WorkRecordService } from './work-record.service';
import { UserId } from '../core/decorator/user-id.decorator';
import { Between, Repository } from 'typeorm';
import { WorkRecord } from './entity/work.record.entity';
import { WorkRecordSetting } from './entity/work-record-setting.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import * as dayjs from 'dayjs';
import * as _ from 'lodash';

@Controller('work-record')
@UseGuards(JWTAuthGuard)
export class WorkRecordController {
  constructor(
    private readonly workRecordService: WorkRecordService,
    @InjectRepository(WorkRecord) private readonly workRecordRepository: Repository<WorkRecord>,
    @InjectRepository(WorkRecordSetting)
    private readonly workRecordSettingRepository: Repository<WorkRecordSetting>,
  ) {}
  @Get('get_setting')
  getSetting(@UserId() userId: number) {
    return this.workRecordSettingRepository.findOne({ userId: +userId });
  }
  @Post('save_setting')
  saveSetting(@UserId() userId: number, @Body() dto: WorkRecordSetting) {
    return this.workRecordSettingRepository.save({ ...dto, userId });
  }
  @Post('save_record')
  saveRecord(@UserId() userId: number, @Body() dto: WorkRecord) {
    let record =
      this.workRecordRepository.find({
        userId,
        date: dto.date,
      }) ?? {};
    record = { ...record, ...dto, userId };
    return this.workRecordRepository.save(record);
  }
  @Get('find_record')
  findRecord(@UserId() userId: number, @Query('date') date) {
    const month = dayjs(date, 'YYYY-MM');
    return this.workRecordRepository.find({
      date: Between(month.startOf('month').toDate(), month.endOf('month').toDate()),
    });
  }
}
