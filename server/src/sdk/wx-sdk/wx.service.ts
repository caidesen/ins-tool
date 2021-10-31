import { HttpService, Inject, Injectable } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import wxConfig from '../../config/wx.config';
import { BizException } from '../../core/exception/biz-exception';
import { ErrorCode } from '../../core/constants/error';

@Injectable()
export class WxService {
  constructor(
    @Inject(wxConfig.KEY)
    private config: ConfigType<typeof wxConfig>,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * 登录凭证校验。获取openid
   */
  async code2Session(code: string) {
    const { data } = await this.httpService
      .get<WxApi.Code2SessionResult>('https://api.weixin.qq.com/sns/jscode2session', {
        params: {
          appid: this.config.appId,
          secret: this.config.secret,
          js_code: code,
          grant_type: 'authorization_code',
        },
      })
      .toPromise();
    if (data.errcode) {
      throw new BizException(ErrorCode.RpcError);
    }
    return data;
  }
}
