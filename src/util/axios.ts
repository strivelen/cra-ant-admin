import axios, { AxiosResponse } from 'axios';
import {
  handleHttpStatusCodeEffect,
  HttpStatusCode,
  showFullScreenLoading,
  tryHideFullScreenLoading
} from './axios.helper';
import Config from 'app/config';
import { selectToken } from 'features/user/userSlice';
import { store } from 'app/store';
import { message } from 'antd';

interface DTOModel<DataContent = any> {
  Code: HttpStatusCode;
  Data: DataContent;
  Message: string | undefined;
  Success: boolean;
}

axios.defaults.baseURL = Config.apiHosts;
axios.defaults.timeout = Config.apiTimeout;

// 请求拦截器 - 添加sessionKey & 显示loading
axios.interceptors.request.use(
  function (config) {
    showFullScreenLoading();
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

// 响应拦截器 - 错误处理 & 关闭loading
axios.interceptors.response.use(
  function (response: AxiosResponse<DTOModel>) {
    tryHideFullScreenLoading();
    const { data, headers } = response;
    if (headers['content-type'].indexOf('application/json') === -1) {
      return response;
    }
    if (data?.Code !== 200) {
      handleHttpStatusCodeEffect(data?.Code, data?.Message);
      return Promise.reject(data?.Message);
    }
    return data.Data;
  },
  function (error) {
    tryHideFullScreenLoading();
    error.name === 'AxiosError' && message.error(error.message);
    // console.log('response错误: ', error.toJSON());
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理Blob数据
axios.interceptors.response.use(
  function (response) {
    if (
      response.status &&
      response.headers &&
      response.headers['content-type'] === 'application/octet-stream'
    ) {
      const { data, headers } = response;
      const filename = headers['content-disposition'].split('=')[1];
      return { blob: data, filename };
    }
    return response;
  },
  function (error) {
    tryHideFullScreenLoading();
    error.name === 'AxiosError' && message.error(error.message);
    // console.log('response错误: ', error.toJSON());
    return Promise.reject(error);
  }
);

export default axios;
