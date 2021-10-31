import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { getLogger } from 'log4js';
import { JWTAuthGuard } from './auth/jwt-auth.guard';

@UseGuards(JWTAuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req): string {
    getLogger().error('测试');
    return this.appService.getHello();
  }
}
