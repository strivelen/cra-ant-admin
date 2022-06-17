import { message } from 'antd';
import { HttpStatusCode } from 'app/global';
import { persistor } from 'app/store';

// 获取http状态码提示信息
const getHttpStatusCodeMessage = function (
  code: HttpStatusCode,
  resmessage: string | undefined
): string {
  if (resmessage) return resmessage;
  let errorMessage = '';
  switch (code) {
    case 400:
      errorMessage = '请求错误(400)';
      break;
    case 401:
      errorMessage = '未授权，请重新登录(401)';
      break;
    case 403:
      errorMessage = '拒绝访问(403)';
      break;
    case 404:
      errorMessage = '请求失败(404)';
      break;
    case 408:
      errorMessage = '请求超时(408)';
      break;
    case 500:
      errorMessage = '服务器发生错误(500)';
      break;
    case 501:
      errorMessage = '服务未实现(501)';
      break;
    case 502:
      errorMessage = '网络错误(502)';
      break;
    case 503:
      errorMessage = '服务不可用(503)';
      break;
    case 504:
      errorMessage = '网络超时(504)';
      break;
    case 505:
      errorMessage = 'HTTP版本不受支持(505)';
      break;
    default:
      errorMessage = `连接出错!`;
  }
  return errorMessage;
};

// 处理异常状态码副作用
export const handleHttpStatusCodeEffect = function (
  code: HttpStatusCode,
  statusMessage: string | undefined
) {
  const errorMessage = getHttpStatusCodeMessage(code, statusMessage);
  message.error(errorMessage);
  if (code === 401) {
    persistor.purge(); // 清空localStorage并清空redux state.user
  }
};
