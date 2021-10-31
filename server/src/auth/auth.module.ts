import { JwtStrategy } from './jwt.strategy';
import { RefreshToken } from './entity/refresh-token.entity';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { UserAuth } from './entity/user-auth.entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import authConfig from '../config/auth.config';
import { WxModule } from '../sdk/wx-sdk/wx.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserAuth, RefreshToken]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get<ConfigType<typeof authConfig>>('authConfig'),
    }),
    UserModule,
    PassportModule,
    WxModule,
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
