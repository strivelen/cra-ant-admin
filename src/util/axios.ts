import axios from 'axios';
import { handleHttpStatusCodeEffect, HttpStatusCode } from './axios.helper';
import Config from 'app/config';
import { selectToken } from 'features/user/userSlice';
import { store } from 'app/store';

export interface ResponseData<DataContent> {
  Code: HttpStatusCode;
  Data: DataContent;
  Message: string | undefined;
  Success: boolean;
}

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
    const data: ResponseData<any> = response.data;
    if (data?.Code !== 200) {
      handleHttpStatusCodeEffect(data?.Code, data?.Message);
      return Promise.reject(data?.Message);
    }
    return data.Data;
  },
  function (error) {
    // console.log('response错误: ', error.toJSON());
    return Promise.reject(error);
  }
);

export default axios;
