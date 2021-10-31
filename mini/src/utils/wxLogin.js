/**
 * 包装一下微信登录接口
 * @return {Promise<string>}
 */
function wxLogin() {
  return new Promise((resolve, reject) => {
    uni.login({
      success: ({ code }) => {
        resolve(code);
      },
      fail: () => {
        reject(new Error('登录失败'));
      },
    });
  });
}

export default wxLogin;
