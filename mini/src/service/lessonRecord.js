import Http from '@/service/api-wrapper';

export function createLessonRecord(data) {
  return Http.post('/lesson-record/create', data);
}

export function modifyLessonRecord(data) {
  return Http.post('/lesson-record/modify', data);
}

export function deleteLessonRecord(id) {
  return Http.post('/lesson-record/delete', { id });
}

export function getLessonRecordList(data) {
  return Http.get('/lesson-record/list', data);
}

export function pushLessonRecordByLessonIds(data) {
  return Http.post('/lesson-record/by_lesson_ids', data);
}

export function getMonthlyReport(data) {
  return Http.get('/lesson-record/monthly_report', data);
}
