const EXP_SUFFIX = '_EXP';

/**
 * 设置长期保存的内容
 * @param {string} key
 * @param {any} data
 * @param {number?} exp
 */
export function setLocalStorageWithExp(key, data, exp) {
  uni.setStorageSync(key, data ?? '');
  if (exp) {
    uni.setStorageSync(key + EXP_SUFFIX, exp + Date.now());
  }
}

/**
 * 在storage中取值, 无值或过期的情况返回空
 * @param {string} key
 */
export function getStorage(key) {
  const item = uni.getStorageSync(key);
  if (!item) return;
  const itemExp = uni.getStorageSync(key + EXP_SUFFIX);
  if (itemExp && itemExp < Date.now()) {
    return;
  }
  return item;
}
