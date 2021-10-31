import { HttpModule, Module } from '@nestjs/common';
import { WxService } from './wx.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
  ],
  providers: [WxService],
  exports: [WxService],
})
export class WxModule {}
