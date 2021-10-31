import Request from 'luch-request';
import { loadToken } from '@/utils/loadToken';

const BASE_URL = process.env.VUE_APP_BASE_URL ?? '';
const request = new Request({
  baseURL: BASE_URL,
  timeout: 6000,
});

const authorizationIgnoreList = ['/auth/login_by_wx', '/auth/refresh_token'];
request.interceptors.request.use(
  async (config) => {
    if (authorizationIgnoreList.includes(config.url)) return config;
    config.header['Authorization'] = await loadToken();
    return config;
  },
  (config) => {
    return Promise.reject(config);
  }
);

const codeMessage = {
  401: '访问被禁止，未登录或过期',
  404: '发出的请求是针对不存在的记录，服务器未进行操作',
  405: '请求方法不被允许',
  500: '服务器发生灾难级错误，请联系技术人员',
  502: '服务网关发生错误，请联系技术人员',
};

request.interceptors.response.use(
  (res) => {
    const { statusCode, message, errorCode } = res.data;
    if (errorCode === 0) return res.data;
    // 如果 statusCode 不存在，则异常为业务异常
    const isBizError = statusCode === undefined;
    const errorMessage = isBizError ? message : codeMessage[statusCode];
    const error = new Error(errorMessage);
    error.code = errorCode || statusCode;
    return Promise.reject(error);
  },
  (error) => {
    const errorMessage = error.message || codeMessage[error.statusCode] || '未知错误';
    return Promise.reject(new Error(errorMessage));
  }
);
export default request;
