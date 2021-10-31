import { forwardRef, HttpService, Inject, Injectable } from '@nestjs/common';
import { BizException } from '../../core/exception/biz-exception';
import { ErrorCode } from '../../core/constants/error';
import { SettingsService } from '../../settings/settings.service';

@Injectable()
export class MateSdkService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(forwardRef(() => SettingsService))
    private readonly settingsService: SettingsService,
  ) {}

  /**
   * 封装一下post请求
   */
  async doPost<T>(url: string, data: any, userId: number) {
    let token = (await this.settingsService.findMateUserInfoByUserId(userId)).token;
    let res = await this.httpService
      .post<MateApi.BaseResponse<T>>(url, data, token ? { headers: { token } } : undefined)
      .toPromise();
    // token过期时重试
    if (res.data.code === 2) {
      await this.settingsService.pullMateUserInfo(userId);
      token = (await this.settingsService.findMateUserInfoByUserId(userId)).token;
      res = await this.httpService
        .post<MateApi.BaseResponse<T>>(url, data, token ? { headers: { token } } : undefined)
        .toPromise();
    }
    if (res.data.code !== 1) {
      throw new BizException({
        ...ErrorCode.RpcError,
        message: res.data.msg ?? ErrorCode.RpcError.message,
      });
    }
    return res.data.data;
  }

  /**
   * mate系统登录
   */
  async mateLogin(data: { username: string; password: string }) {
    const res = await this.httpService
      .post<MateApi.BaseResponse<MateApi.Login>>(
        'https://cos.gymbomate.com/api/mate-basic/mate/login',
        data,
      )
      .toPromise();
    if (res.data.code !== 1) {
      throw new BizException({
        ...ErrorCode.RpcError,
        message: res.data.msg ?? ErrorCode.RpcError.message,
      });
    }
    return res.data.data;
  }

  /**
   * 拉取课程信息
   * @param data
   * @param userId 登录用户
   */
  getMateCourse(data: { currentCenterId: string }, userId: number) {
    return this.doPost<MateApi.Course[]>(
      'https://cos.gymbomate.com/api/mate-teach/teach/course/info/list',
      data,
      userId,
    );
  }

  /**
   * 拉取课表信息
   * @param data
   * @param userId
   */
  getMateLesson(data: { currentCenterId: string; date: number }, userId: number) {
    return this.doPost<MateApi.MateLessonRes>(
      'https://cos.gymbomate.com/api/mate-teach/signIn/list',
      data,
      userId,
    );
  }
}
