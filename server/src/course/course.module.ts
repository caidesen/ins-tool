import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MateSdkModule } from '../sdk/mate-sdk/mate-sdk.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entity/course.entity';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [MateSdkModule, SettingsModule, TypeOrmModule.forFeature([Course])],
  providers: [CourseService],
  controllers: [CourseController],
  exports: [CourseService],
})
export class CourseModule {}
