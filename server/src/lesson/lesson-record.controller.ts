import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { LessonRecordService } from './lesson-record.service';
import { UserId } from '../core/decorator/user-id.decorator';
import { LessonRecordDTO } from './model/LessonRecordCreateDTO';

@Controller('lesson-record')
@UseGuards(JWTAuthGuard)
export class LessonRecordController {
  constructor(private readonly lessonRecordService: LessonRecordService) {}

  @Post('by_lesson_ids')
  async pushByLessonIds(@UserId() userId, @Body() data: { ids: string[] }) {
    await this.lessonRecordService.pushByLessonIds(data.ids, userId);
  }

  @Post('create')
  async create(@UserId() userId, @Body() data: LessonRecordDTO) {
    await this.lessonRecordService.create(data, userId);
  }

  @Post('modify')
  async modify(@UserId() userId, @Body() data: LessonRecordDTO) {
    await this.lessonRecordService.update(data);
  }

  @Post('delete')
  async delete(@Body() data: { id: number }) {
    await this.lessonRecordService.deleteById(data.id);
  }

  @Get('list')
  async list(@UserId() userId, @Query() { start, end }: { start: Date; end: Date }) {
    return await this.lessonRecordService.list({ userId, start, end });
  }

  @Get('monthly_report')
  async getMonthlyReport(@UserId() userId, @Query() { month }: { month: Date }) {
    console.log(month);
    return await this.lessonRecordService.getReportData(userId, month);
  }
}
