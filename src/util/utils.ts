// @ts-nocheck
// 验证手机号
export const isPhone = function (strNumber) {
  if (strNumber.length !== 11) {
    return false;
  }
  if (!/^1[3456789]\d{9}$/.test(strNumber)) {
    return false;
  }
  return true;
};

// 打开新开窗口并监听关闭
export const openNewWindow = function (url, callback) {
  window.name = 'origin';
  let windowObjectReference;
  // var strWindowFeatures =
  //   "width=1000,height=500,menubar=yes,location=yes,resizable=yes,scrollbars=true,status=true"; //窗口设置
  // url需打开的窗口路径例如：www.baidu.com
  function openRequestedPopup(url) {
    windowObjectReference = window.open(
      url,
      'name' + Math.random()
      // strWindowFeatures
    );
  }
  // 循环监听
  let loop = setInterval(() => {
    if (windowObjectReference.closed) {
      clearInterval(loop); // 停止定时器
      callback && callback();
      // location.reload(); //刷新当前页面
    }
  }, 600);
  openRequestedPopup(url);
};

/**
 * 防抖(debounce)
 * @param {Function} fn
 * @param {Number} delay
 * @description 1.解决this指向问题 2.解决 event 事件对象问题
 */
export const debounce = function (fn, wait) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, arguments); // 把参数传进去
    }, wait);
  };
};

/**
 * 节流(throttle)
 * @param {Function} fn
 * @param {Number} delay
 * @description 请注意，节流函数并不止上面这种实现方案,例如可以完全不借助setTimeout，可以把状态位换成时间戳，然后利用时间戳差值是否大于指定间隔时间来做判定。
 * 也可以直接将setTimeout的返回的标记当做判断条件-判断当前定时器是否存在，如果存在表示还在冷却，并且在执行fn之后消除定时器表示激活，原理都一样
 */
export const throttle = function (fn, delay) {
  let valid = true;
  return function () {
    if (!valid) {
      // 休息时间 暂不接客
      return false;
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false;
    setTimeout(() => {
      fn();
      valid = true;
    }, delay);
  };
};

/**
 * 复制文本
 * @param {String} text
 * @param {Function} callback
 */
export function copyText(text, callback) {
  const tag = document.createElement('textarea');
  tag.setAttribute('id', 'cp_hgz_input');
  tag.value = text;
  document.getElementsByTagName('body')[0].appendChild(tag);
  document.getElementById('cp_hgz_input').select();
  document.execCommand('copy');
  document.getElementById('cp_hgz_input').remove();
  if (callback) {
    callback(text);
  }
}

/**
 * 下载文件
 * @param {String} href
 * @param {String} fileName
 */
export function downloadFile(href, fileName) {
  const a = document.createElement('a');
  a.href = href;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

/**
 * 下载流数据文件
 * @param {FileStream} data
 * @param {String} fileName
 * @param {ContentType} type
 */
export function downloadStreamDataFile(data, fileName = '', type?) {
  let blob = new Blob([data], { type });
  const fileUrl = window.URL.createObjectURL(blob);
  downloadFile(fileUrl, fileName);
  window.URL.revokeObjectURL(fileUrl); // 释放内存
}

/**
 * 处理长文本显示
 * @param {String} text
 * @param {Number} length
 * @return
 */
export function handleLongText(text, length, icon) {
  return text && text.length > length
    ? text.slice(0, length) + (icon || '...')
    : text;
}

/**
 * 处理Api类型取值
 * @param {Api} api
 * @return
 **/
export function getApiTypesValue(api: Api) {
  let url: string, params: object;
  if (typeof api === 'string') {
    url = api;
  }
  if (typeof api === 'object') {
    url = api.url;
    params = api.params || {};
  }
  return { url, params };
}
