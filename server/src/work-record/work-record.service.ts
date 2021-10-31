import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from '../lesson/entity/lesson.entity';
import { Between, Repository } from 'typeorm';
import { WorkRecord } from './entity/work.record.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class WorkRecordService {
  constructor(
    @InjectRepository(WorkRecord) private readonly workRecordRepository: Repository<WorkRecord>,
  ) {}

  /**
   * 按月获取
   * @param monthDate 一个月中任意时间
   * @param userId 用户id
   */
  listByMonth(monthDate: Date, userId: number) {
    const startDate = dayjs(monthDate)
      .startOf('month')
      .toDate();
    const endDate = dayjs(monthDate)
      .add(1, 'month')
      .toDate();
    return this.workRecordRepository.find({ where: { date: Between(startDate, endDate), userId } });
  }

  /**
   * 保存实体，修改或新增
   * @param item
   */
  save(item: WorkRecord) {
    return this.workRecordRepository.save(item);
  }
}
