import { Module } from '@nestjs/common';
import { WorkRecordService } from './work-record.service';
import { WorkRecordController } from './work-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRecord } from './entity/work.record.entity';
import { WorkRecordSetting } from './entity/work-record-setting.entity';
import { LessonModule } from '../lesson/lesson.module';
import { SettingsModule } from '../settings/settings.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkRecord, WorkRecordSetting]),
    LessonModule,
    SettingsModule,
  ],
  providers: [WorkRecordService],
  controllers: [WorkRecordController],
})
export class WorkRecordModule {}
