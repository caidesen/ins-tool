import { forwardRef, HttpModule, Module } from '@nestjs/common';
import { MateSdkService } from './mate-sdk.service';
import { SettingsModule } from '../../settings/settings.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    forwardRef(() => SettingsModule),
  ],
  providers: [MateSdkService],
  exports: [MateSdkService],
})
export class MateSdkModule {}
