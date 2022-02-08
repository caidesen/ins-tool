import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('dbConfig', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  database: process.env.DATABASE_DATABASE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  insecureAuth: false,
  entities: [join(__dirname, '../') + '/**/entity/*.entity{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development' ? 'all' : 'none',
  timezone: '+08:00',
}));
