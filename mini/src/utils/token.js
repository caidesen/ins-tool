import { getStorage, setLocalStorageWithExp } from '@/utils/storage';

const ACCESS_TOKEN_EXP = 5 * 60 * 1000; // 5 分钟
const REFRESH_TOKEN_EXP = 15 * 86400000; // 15天
const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN';
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN';

/**
 * 获取 access_token
 */
export function getAccessToken() {
  const token = getStorage(ACCESS_TOKEN_KEY);
  return token ? `Bearer ${token}` : '';
}

/**
 * 获取 refresh_token
 */
export function getRefreshToken() {
  return getStorage(REFRESH_TOKEN_KEY);
}

/**
 * 设置授权信息, 可选项是否记住登录信息
 * @param {object} data
 * @param {string} data.accessToken
 * @param {string} data.refreshToken
 */
export function setAuthorization({ accessToken, refreshToken }) {
  if (refreshToken) setLocalStorageWithExp(REFRESH_TOKEN_KEY, refreshToken, REFRESH_TOKEN_EXP);
  if (accessToken) setLocalStorageWithExp(ACCESS_TOKEN_KEY, accessToken, ACCESS_TOKEN_EXP);
}
