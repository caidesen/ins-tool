import Http from './api-wrapper';

export function loginByWxJsCode(code) {
  return Http.post('/auth/login_by_wx', { code });
}

export function getUserInfo() {
  return Http.get('/user/get_user_info');
}

export function updateBaseUserInfo(data) {
  return Http.post('/user/update_base', data);
}

export function doRefreshToken(token) {
  return Http.post('/auth/refresh_token', { refreshToken: token });
}
