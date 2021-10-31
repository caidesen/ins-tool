import { registerAs } from '@nestjs/config';
export default registerAs('wxConfig', () => ({
  appId: process.env.WX_APPID,
  secret: process.env.WX_SECRET,
}));
