import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JWTAuthGuard } from '../auth/jwt-auth.guard';
import { SettingsService } from './settings.service';
import { Settings } from './entity/settings.entity';
import { UserId } from '../core/decorator/user-id.decorator';

@Controller('settings')
@UseGuards(JWTAuthGuard)
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @Get('get_settings_info')
  async getSettingsInfo(@UserId() userId) {
    return (
      (await this.settingsService.findByUserId(userId)) ??
      (await this.settingsService.saveEmptyByUserId(userId))
    );
  }
  @Post('save_mate_account')
  async saveSettingsInfo(@UserId() userId, @Body() settings: Settings) {
    await this.settingsService.saveByUserId(settings, userId);
    await this.settingsService.pullMateUserInfo(userId);
  }
  /**
   * 获取Mate用户信息
   */
  @Get('get_mate_user_info')
  async getMateUserInfo(@UserId() userId) {
    try {
      return await this.settingsService.findMateUserInfoByUserId(userId);
    } catch {
      return;
    }
  }

  @Post('refresh_mate_user_info')
  async refreshMateUserInfo(@UserId() userId) {
    await this.settingsService.pullMateUserInfo(userId);
    return await this.settingsService.findMateUserInfoByUserId(userId);
  }
}
