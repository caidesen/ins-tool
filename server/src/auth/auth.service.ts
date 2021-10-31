import { ErrorCode } from '../core/constants/error';
import { BizException } from '../core/exception/biz-exception';
import { ConfigType } from '@nestjs/config';
import * as dayjs from 'dayjs';
import * as bcryptjs from 'bcryptjs';
import { RefreshToken } from './entity/refresh-token.entity';
import { UserService } from '../user/user.service';
import { User } from '../user/entity/user.entity';
import { UserAuth } from './entity/user-auth.entity';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import authConfig from '../config/auth.config';
import { WxService } from '../sdk/wx-sdk/wx.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(authConfig.KEY)
    private config: ConfigType<typeof authConfig>,
    @InjectRepository(UserAuth)
    private readonly userAuthRepository: Repository<UserAuth>,
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly wxService: WxService,
  ) {}

  /**
   * 通过本地数据验证用户（账号密码）
   */
  async validateUserByLocalDb(username: string, password: string): Promise<User> {
    const userAuth = await this.userAuthRepository.findOne({
      where: { username: username },
      relations: ['user'],
    });
    if (!userAuth) {
      throw new BizException({
        ...ErrorCode.AccountNotExist,
      });
    }
    console.log(bcryptjs.hashSync(password, 10));
    if (!bcryptjs.compareSync(password, userAuth.password)) {
      throw new BizException({
        ...ErrorCode.AuthenticationError,
      });
    }
    return userAuth.user;
  }

  /**
   * 通过小程序中的jscode验证用户（微信小程序登录）
   */
  async validateUserByWxJsCode(code: string): Promise<User> {
    const { openid } = await this.wxService.code2Session(code);
    let userAuth = await this.userAuthRepository.findOne({
      where: { wxOpenId: openid },
      relations: ['user'],
    });
    if (!userAuth) {
      // 能执行到这里说明登录的用户经过认证的，但是系统找不到信息，是第一次登录
      // 给他创建一个未通过验证的用户记录
      let user = new User();
      userAuth = new UserAuth();
      userAuth.wxOpenId = openid;
      user.userAuths = Promise.resolve([userAuth]);
      user = await this.userService.saveUser(user);
      return user;
    }
    return userAuth.user;
  }

  /**
   * 用户验证完成后的登录逻辑
   * @param userId
   */
  async login(userId: number) {
    const exp = dayjs()
      .add(this.config.refreshTokenExpires, 'day')
      .toDate();
    const refreshToken = new RefreshToken();
    refreshToken.userId = userId;
    refreshToken.expDate = exp;
    await this.refreshTokenRepository.save(refreshToken);
    return {
      accessToken: this.jwtService.sign({ userId: userId }),
      refreshToken: refreshToken.code,
    };
  }

  /**
   * token的刷新
   * @param code
   */
  async refreshToken(code: string) {
    const refreshToken = await this.refreshTokenRepository.findOne({ code });
    if (refreshToken) {
      refreshToken.expDate = dayjs()
        .add(this.config.refreshTokenExpires, 'day')
        .toDate();
      await this.refreshTokenRepository.save(refreshToken);
      return {
        accessToken: this.jwtService.sign({ userId: refreshToken.userId }),
      };
    }
    throw new UnauthorizedException();
  }
}
