import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { SettingsModule } from './settings/settings.module';
import { MateSdkModule } from './sdk/mate-sdk/mate-sdk.module';
import { CourseModule } from './course/course.module';
import { LessonModule } from './lesson/lesson.module';
import { LessonRecordController } from './lesson/lesson-record.controller';
import { WxModule } from './sdk/wx-sdk/wx.module';
import { WorkRecordModule } from './work-record/work-record.module';
import databaseConfig from './config/database.config';
import wxConfig from './config/wx.config';
import authConfig from './config/auth.config';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
      load: [databaseConfig, wxConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return configService.get<ConfigType<typeof databaseConfig>>(
          'dbConfig',
        ) as TypeOrmModuleAsyncOptions;
      },
    }),
    AuthModule,
    SettingsModule,
    MateSdkModule,
    CourseModule,
    LessonModule,
    WxModule,
    WorkRecordModule,
  ],
  controllers: [AppController, LessonRecordController],
  providers: [AppService],
})
export class AppModule {}
