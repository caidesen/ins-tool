import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from './entity/settings.entity';
import { BizException } from '../core/exception/biz-exception';
import { ErrorCode } from '../core/constants/error';
import { MateSdkService } from '../sdk/mate-sdk/mate-sdk.service';
import { MateUserInfo } from './entity/mate-user-info.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: Repository<Settings>,
    @InjectRepository(MateUserInfo)
    private readonly mateUserInfoRepository: Repository<MateUserInfo>,
    @Inject(forwardRef(() => MateSdkService))
    private readonly mateSdkService: MateSdkService,
  ) {}
  async findByUserId(userId: number) {
    return await this.settingsRepository.findOne({
      where: { userId },
    });
  }
  async findById(id: number) {
    return await this.settingsRepository.findOne(id);
  }
  async save(settings: Settings) {
    return await this.settingsRepository.save(settings);
  }

  async saveEmptyByUserId(userId: number) {
    const settings = new Settings();
    settings.userId = userId;
    return await this.settingsRepository.save(settings);
  }

  async saveByUserId(settings: Settings, userId: number) {
    const localSetting = await this.settingsRepository.findOne({
      where: {
        userId,
      },
    });
    localSetting.autoSync = settings.autoSync;
    localSetting.gymboMateUsername = settings.gymboMateUsername;
    localSetting.gymboMatePassword = settings.gymboMatePassword;
    await this.save(localSetting);
  }

  /**
   * 获取本地的Mate用户信息
   * @param userId
   */
  async findMateUserInfoByUserId(userId: number) {
    const info = await this.mateUserInfoRepository.findOne({
      where: {
        userId,
      },
    });
    if (!info) throw new BizException({ code: 4000, message: '未配置mate账号' });
    return info;
  }

  /**
   * 刷新制定用户mate系统中的用户信息，重新登录
   * @param userId
   */
  async pullMateUserInfo(userId: number) {
    const settings = await this.findByUserId(userId);
    const { gymboMateUsername, gymboMatePassword } = settings;
    // 调用mate接口重新登录
    const {
      token,
      userId: mateUserId,
      username,
      chineseName,
      englishName,
      primaryCenterCode,
      primaryCenterId,
      primaryCenterName,
    } = await this.mateSdkService.mateLogin({
      username: gymboMateUsername,
      password: gymboMatePassword,
    });
    return await this.mateUserInfoRepository.save({
      ...settings,
      userId,
      token,
      mateUserId,
      username,
      chineseName,
      englishName,
      primaryCenterCode,
      primaryCenterId,
      primaryCenterName,
    });
  }
}
