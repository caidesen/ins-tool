import Http from '@/service/api-wrapper';

export function getLesson(data) {
  return Http.get('/lesson/list/oneself', data);
}

export function pullLesson(data) {
  return Http.post('/lesson/pull', data);
}
