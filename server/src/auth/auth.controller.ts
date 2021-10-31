import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * 账号密码登录
   */
  @Post('login_by_account')
  @UseGuards(AuthGuard('local'))
  async loginByUsernameAndPassword(
    @Request() req,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = req.user;
    return await this.authService.login(user.id);
  }

  /**
   * 微信小程序登录
   */
  @Post('login_by_wx')
  async loginByWxJsCode(
    @Body() { code },
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this.authService.validateUserByWxJsCode(code);
    return await this.authService.login(user.id);
  }

  /**
   * token刷新
   */
  @Post('refresh_token')
  async refreshToken(@Body() { refreshToken }): Promise<{ accessToken: string }> {
    return await this.authService.refreshToken(refreshToken);
  }
}
