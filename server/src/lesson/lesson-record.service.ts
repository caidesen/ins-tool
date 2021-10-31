import { Injectable } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entity/lesson.entity';
import { Between, Repository } from 'typeorm';
import { LessonRecord } from './entity/lesson-record.entity';
import { plainToClass } from 'class-transformer';
import { CourseService } from '../course/course.service';
import * as dayjs from 'dayjs';
import { LessonRecordDTO } from './model/LessonRecordCreateDTO';
import { LessonRecordTotal } from './model/LessonRecordTotal';
import { LessonRecordPresentTotal } from './model/LessonRecordPresentTotal';
import { BizException } from '../core/exception/biz-exception';
import * as _ from 'lodash';

@Injectable()
export class LessonRecordService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(LessonRecord)
    private readonly lessonRecordRepository: Repository<LessonRecord>,
    private readonly lessonService: LessonService,
    private readonly courseService: CourseService,
  ) {}

  /**
   * 生成课程相关报表数据
   */
  async getReportData(userId: number, monthDate: Date) {
    const startDate = new Date(monthDate);
    const endDate = dayjs(monthDate)
      .add(1, 'month')
      .toDate();
    const totalByCourseCode = plainToClass(
      LessonRecordTotal,
      await this.lessonRecordRepository
        .createQueryBuilder('lr')
        .select('lr.courseCode', 'courseCode')
        .addSelect('lr.courseTypeName', 'courseTypeName')
        .addSelect('count(0)', 'total')
        .where({ userId, startDate: Between(startDate, endDate) })
        .addGroupBy('lr.courseCode')
        .addGroupBy('lr.courseTypeName')
        .getRawMany(),
    );
    const totalByCourseType = plainToClass(
      LessonRecordTotal,
      await this.lessonRecordRepository
        .createQueryBuilder('lr')
        .select('lr.courseTypeName', 'courseTypeName')
        .addSelect('count(0)', 'total')
        .where({ userId, startDate: Between(startDate, endDate) })
        .addGroupBy('lr.courseTypeName')
        .getRawMany(),
    );
    const presentByCourseCode = plainToClass(
      LessonRecordPresentTotal,
      await this.lessonRecordRepository
        .createQueryBuilder('lr')
        .select('lr.courseCode', 'courseCode')
        .addSelect('sum(lr.selectNum)', 'selectNum')
        .addSelect('sum(lr.presentNum)', 'presentNum')
        .where({ userId, startDate: Between(startDate, endDate) })
        .addGroupBy('lr.courseCode')
        .addGroupBy('lr.courseTypeName')
        .getRawMany(),
    );
    const presentByCourseType = plainToClass(
      LessonRecordPresentTotal,
      await this.lessonRecordRepository
        .createQueryBuilder('lr')
        .select('lr.courseTypeName', 'courseTypeName')
        .addSelect('sum(lr.selectNum)', 'selectNum')
        .addSelect('sum(lr.presentNum)', 'presentNum')
        .where({ userId, startDate: Between(startDate, endDate) })
        .addGroupBy('lr.courseTypeName')
        .getRawMany(),
    );
    return {
      month: monthDate,
      total: totalByCourseCode.map(it => it.total).reduce((total, current) => total + current, 0),
      totalByCourseCode,
      totalByCourseType,
      presentByCourseCode,
      presentByCourseType,
    };
  }

  /**
   * 根据 课 id 直接生成上课记录
   * @param ids
   * @param userId
   */
  async pushByLessonIds(ids: string[], userId: number) {
    const lessons = await this.lessonRepository.findByIds(ids);
    await Promise.all(
      lessons.map(async it => {
        const conflict = await this.lessonRecordRepository.findOne({
          where: {
            userId,
            lessonId: it.lessonId,
            startDate: dayjs(`${it.date} ${it.startTime}`, 'YYYY-MM-DD HH:mm').toDate(),
          },
        });
        if (conflict)
          throw new BizException({
            code: 4000,
            message: `${dayjs(conflict.startDate).format('YYYY-MM-DD HH:mm')}存在时段冲突！`,
          });
      }),
    );

    const record = plainToClass(
      LessonRecord,
      await Promise.all(
        lessons.map(async it => {
          const course = await this.courseService.findById(it.courseId);
          const startDate = dayjs(`${it.date} ${it.startTime}`, 'YYYY-MM-DD HH:mm').toDate();
          let selectNum = 0;
          let presentNum = 0;
          if (it.babyList)
            for (const baby of it.babyList) {
              const { attendanceStatus, bookWay } = baby;
              if (bookWay === '26003') {
              } else if (attendanceStatus === '25002') {
                // 已上课
                selectNum += 1;
                presentNum += 1;
              } else if (bookWay === '26001') {
                // 如果是国定学位
                selectNum += 1;
              }
            }
          return {
            ..._.omit(it, ['gmtCreate', 'gmtModified']),
            userId,
            startDate,
            ..._.pick(course, [
              'courseName',
              'courseCode',
              'courseTypeId',
              'courseTypeName',
              'minutes',
            ]),
            selectNum,
            presentNum,
          };
        }),
      ),
    );
    await this.lessonRecordRepository.save(record);
  }

  /**
   * 创建一条新的上课记录
   */
  async create(dto: LessonRecordDTO, userId: number) {
    const course = await this.courseService.findById(dto.courseId);
    const item = plainToClass(LessonRecord, {
      ...dto,
      userId,
      courseName: course.courseName,
      courseCode: course.courseCode,
      courseTypeId: course.courseTypeId,
      courseTypeName: course.courseTypeName,
      minutes: course.minutes,
    });
    await this.lessonRecordRepository.save(item);
  }

  async deleteById(id: number) {
    await this.lessonRecordRepository.delete(id);
  }

  async list(options: { start: Date; end: Date; userId: any }) {
    return await this.lessonRecordRepository.find({
      where: {
        startDate: Between(new Date(options.start), new Date(options.end)),
        userId: options.userId,
      },
      order: {
        startDate: 'ASC',
      },
    });
  }

  async update(data: LessonRecordDTO) {
    const lessonRecord = await this.lessonRecordRepository.findOne(data.id);
    const course = await this.courseService.findById(data.courseId);
    await this.lessonRecordRepository.save({
      ...lessonRecord,
      selectNum: data.selectNum,
      presentNum: data.presentNum,
      startDate: data.startDate,
      courseId: course.courseId,
      courseName: course.courseName,
      courseTypeId: course.courseTypeId,
      courseTypeName: course.courseTypeName,
      minutes: course.minutes,
    });
  }
}
