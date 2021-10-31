import request from '@/utils/request';

/**
 * 对request包装一下方便使用
 */
export default class Http {
  /**
   *
   * @param {string} url
   * @param {any?} data
   * @return {API.ApiPromise<any>}
   */
  static get(url, data) {
    return request.request({ url, method: 'GET', params: data });
  }

  /**
   *
   * @param {string} url
   * @param {any?} data
   * @return {API.ApiPromise<any>}
   */
  static post(url, data) {
    return request.request({ url, method: 'POST', data });
  }
}
