import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { Repository } from 'typeorm';
import { SettingsService } from '../settings/settings.service';
import { MateSdkService } from '../sdk/mate-sdk/mate-sdk.service';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private readonly courseRepository: Repository<Course>,
    private readonly settingsService: SettingsService,
    private readonly mateSdkService: MateSdkService,
  ) {}

  async findById(id: string) {
    return await this.courseRepository.findOneOrFail(id);
  }

  /**
   * 根据中心id获取课程信息
   * @param centerId 中心id
   */
  async listByCenterId(centerId: string) {
    return await this.courseRepository.find({ where: { centerId } });
  }

  /**
   * 根据用户id获取相关中心的课程信息
   * @param userId 用户id
   */
  async listByUserId(userId: number) {
    // 默认为 415中心 的 primaryCenterId
    let primaryCenterId = '39579F43-FD21-4794-B8DF-84DA810999F3';
    try {
      const data = await this.settingsService.findMateUserInfoByUserId(userId);
      primaryCenterId = data.primaryCenterId;
    } catch {}
    return await this.listByCenterId(primaryCenterId);
  }

  /**
   * 根据用户id拉取课程信息的数据库
   * @param userId
   */
  async pullByUserId(userId: number) {
    const { primaryCenterId } = await this.settingsService.findMateUserInfoByUserId(userId);
    const courses = await this.mateSdkService.getMateCourse(
      { currentCenterId: primaryCenterId },
      userId,
    );
    const entities = plainToClass(
      Course,
      courses.map(it => ({
        ...it,
        centerId: primaryCenterId,
      })),
    );
    await this.courseRepository.save<Course>(entities);
  }
}
