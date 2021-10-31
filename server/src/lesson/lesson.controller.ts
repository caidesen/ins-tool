import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { UserId } from '../core/decorator/user-id.decorator';
import { SettingsService } from '../settings/settings.service';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

@Controller('lesson')
@UseGuards(JWTAuthGuard)
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly settingsService: SettingsService,
  ) {}
  @Get('list/oneself')
  async getLesson(@UserId() userId, @Query() { date }: { date: string }) {
    const { primaryCenterId, mateUserId } = await this.settingsService.findMateUserInfoByUserId(
      userId,
    );
    return this.lessonService.list({ centerId: primaryCenterId, mateUserId, date });
  }
  @Post('pull')
  async refresh(@UserId() userId, @Body() { date }: { date: string }) {
    await this.lessonService.pullLessons({ userId, date });
  }
}
