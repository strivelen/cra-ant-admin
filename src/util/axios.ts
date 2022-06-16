import axios from 'axios';
import { handleHttpStatusCodeEffect } from './axios.helper';
import Config from 'config';
import { selectToken } from 'features/user/userSlice';
import { store } from 'app/store';

axios.defaults.baseURL = Config.apiBaseURL;
axios.defaults.timeout = Config.apiTimeout;

// 请求拦截器 - 添加sessionKey
axios.interceptors.request.use(
  function (config) {
    const token = selectToken(store.getState());
    if (token) {
      config.headers = {
        ...(config.headers || {}),
        [Config.apiSessionKey]: token
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 错误处理
axios.interceptors.response.use(
  function (response) {
    if (response.data?.id !== 1) {
      const statusCode = 401;
      const statusMessage = '登录失效' || response.data.title;
      handleHttpStatusCodeEffect(statusCode, statusMessage);
      return Promise.reject(statusMessage);
    }
    return response.data;
  },
  function (error) {
    // console.log('response错误: ', error.toJSON());
    return Promise.reject(error);
  }
);

export default axios;
