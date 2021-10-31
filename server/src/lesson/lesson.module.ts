import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entity/lesson.entity';
import { MateSdkModule } from '../sdk/mate-sdk/mate-sdk.module';
import { SettingsModule } from '../settings/settings.module';
import { LessonRecordController } from './lesson-record.controller';
import { LessonRecord } from './entity/lesson-record.entity';
import { LessonRecordService } from './lesson-record.service';
import { CourseModule } from '../course/course.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, LessonRecord]),
    MateSdkModule,
    SettingsModule,
    CourseModule,
  ],
  providers: [LessonService, LessonRecordService],
  controllers: [LessonController, LessonRecordController],
  exports: [LessonService, LessonRecordService],
})
export class LessonModule {}
