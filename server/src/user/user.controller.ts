import { UserService } from './user.service';
import { Controller, Get, UseGuards, Req, Post, Body } from '@nestjs/common';
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './entity/user.entity';
import { BizException } from '../core/exception/biz-exception';
import { ErrorCode } from '../core/constants/error';

@Controller('user')
@UseGuards(JWTAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('get_user_info')
  async getUserInfo(@Req() req) {
    const { avatar, nickname, isVerify } = await this.userService.findById(req.user.userId);
    return { avatar, nickname, isVerify };
  }

  @Post('update_base')
  async updateBaseUserInfo(@Req() req, @Body() user: User) {
    if (req.user.userId !== user.id) {
      throw new BizException({ code: ErrorCode.Rejected.code });
    }
    await this.userService.updateBaseUserInfo(user);
  }
}
