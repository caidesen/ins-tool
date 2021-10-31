export function navWithParams(query) {
  if (typeof query !== 'object') {
    return '';
  }
  return (
    '?' +
    Object.keys(query)
      .map((it) => `${it}=${query[it]}`)
      .join('&')
  );
}
export const Navigation = {
  /**
   * 跳转到
   * @param {Object} query
   */
  goLessonRecordForm(query) {
    uni.navigateTo({
      url: `/pages/lesson-record-create/lesson-record-create${navWithParams(query)}`,
    });
  },
};
