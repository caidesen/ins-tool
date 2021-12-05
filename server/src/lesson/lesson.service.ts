import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MateSdkService } from '../sdk/mate-sdk/mate-sdk.service';
import { Lesson } from './entity/lesson.entity';
import { SettingsService } from '../settings/settings.service';
import * as dayjs from 'dayjs';
import { plainToClass } from 'class-transformer';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson) private readonly lessonRepository: Repository<Lesson>,
    private readonly mateSdkService: MateSdkService,
    private readonly settingsService: SettingsService,
  ) {}

  /**
   * 传入条件查找本地的课表信息
   * @param option
   */
  async list(option: { centerId: string; date: string; mateUserId: string }) {
    return await this.lessonRepository.find({
      where: [
        {
          centerId: option.centerId,
          date: option.date,
          assistantInsStaffId: option.mateUserId,
        },
        {
          centerId: option.centerId,
          date: option.date,
          primaryInsStaffId: option.mateUserId,
        },
      ],
      order: {
        startTime: 'ASC',
      },
    });
  }

  /**
   * 拉取mate中的课表信息
   * @param option
   */
  async pullLessons(option: { userId: number; date: string }) {
    const { primaryCenterId } = await this.settingsService.findMateUserInfoByUserId(option.userId);
    // 这里的date 要转成 毫秒值，用dayjs操作一波
    const ms = dayjs(option.date).unix() * 1000;
    const res = await this.mateSdkService.getMateLesson(
      { currentCenterId: primaryCenterId, date: ms },
      option.userId,
    );
    // lesson 展开
    const lessonFormApi: MateApi.Lesson[] = [];
    if (!res.signInLessonList) return;
    res.signInLessonList.forEach(it => {
      lessonFormApi.push(...it.lessonList);
    });
    // 转换
    const lesson = plainToClass(
      Lesson,
      lessonFormApi.filter(it => it.lessonId).map(it => ({ ...it, centerId: primaryCenterId })),
    );
    // 保存
    await this.lessonRepository.save(lesson);
    return { isHoliday: res.isHoliday };
  }
}
