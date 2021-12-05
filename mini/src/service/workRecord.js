import Http from '@/service/api-wrapper';

export function getWorkRecordSetting() {
  return Http.get('/work-record/get_setting');
}
export function setWorkRecordSetting(data) {
  return Http.post('/work-record/save_setting', data);
}
export function saveWorkRecord(data) {
  return Http.post('/work-record/save_record', data);
}
export function getWorkRecord(date) {
  return Http.get('/work-record/find_record', { date });
}
