import Http from '@/service/api-wrapper';

/**
 * 获取课程表
 */
export function getCourseList() {
  return Http.get('/course/list');
}

/**
 * 从mate系统中拉取最新
 */
export function pullCourseListFormMate() {
  return Http.post('/course/refresh');
}
