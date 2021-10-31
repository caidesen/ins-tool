import Http from '@/service/api-wrapper';

export function getSettingsInfo() {
  return Http.get('/settings/get_settings_info');
}

export function saveSettingsInfo(data) {
  return Http.post('/settings/save_settings_info', data);
}

export function saveMateAccount(data) {
  return Http.post('/settings/save_mate_account', data);
}

export function getMateUserInfo() {
  return Http.get('/settings/get_mate_user_info');
}

export function refreshMateUserInfo() {
  return Http.post('/settings/refresh_mate_user_info');
}
