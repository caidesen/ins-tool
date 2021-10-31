import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Settings } from './entity/settings.entity';
import { MateSdkModule } from '../sdk/mate-sdk/mate-sdk.module';
import { MateUserInfo } from './entity/mate-user-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Settings, MateUserInfo]), MateSdkModule],
  providers: [SettingsService],
  controllers: [SettingsController],
  exports: [SettingsService],
})
export class SettingsModule {}
