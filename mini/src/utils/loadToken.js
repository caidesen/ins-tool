import { getAccessToken, getRefreshToken, setAuthorization } from '@/utils/token';
import service from '@/service';
import wxLogin from '@/utils/wxLogin';

async function reLogin() {
  const code = await wxLogin();
  const { data: tokenGroup } = await service.user.loginByWxJsCode(code);
  setAuthorization(tokenGroup);
}

async function refresh(refreshToken) {
  const { data: tokenGroup } = await service.user.doRefreshToken(refreshToken);
  setAuthorization(tokenGroup);
}

let promise;

/**
 * 拉取最新的 accessToken
 * @return {Promise<string>}
 */
export async function loadToken() {
  let accessToken = getAccessToken();
  if (accessToken) {
    return accessToken;
  }
  if (!promise) {
    let refreshToken = getRefreshToken();
    if (refreshToken) {
      promise = refresh(refreshToken);
    } else {
      promise = reLogin();
    }
  }
  try {
    await promise;
    promise = undefined;
  } catch {
    await reLogin();
  }
  return getAccessToken();
}
