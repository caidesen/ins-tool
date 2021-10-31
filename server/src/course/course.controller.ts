import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { UserId } from '../core/decorator/user-id.decorator';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';

@Controller('course')
@UseGuards(JWTAuthGuard)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @Get('list')
  async getCourseList(@UserId() userId) {
    return await this.courseService.listByUserId(userId);
  }
  @Post('refresh')
  async refresh(@UserId() userId) {
    await this.courseService.pullByUserId(userId);
  }
}
