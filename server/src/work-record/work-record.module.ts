import { Module } from '@nestjs/common';
import { WorkRecordService } from './work-record.service';
import { WorkRecordController } from './work-record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkRecord } from './entity/work.record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkRecord])],
  providers: [WorkRecordService],
  controllers: [WorkRecordController],
})
export class WorkRecordModule {}
