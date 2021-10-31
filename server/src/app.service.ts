import { ConfigService, ConfigType } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import databaseConfig from './config/database.config';

@Injectable()
export class AppService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
}
