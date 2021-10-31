import { registerAs } from '@nestjs/config';
export default registerAs('authConfig', () => ({
  secret: process.env.AUTH_JWT_SECRET,
  expires: process.env.AUTH_JWT_EXPIRES,
  refreshTokenExpires: Number(process.env.AUTH_REFRESH_TOKEN_EXPIRES),
}));
