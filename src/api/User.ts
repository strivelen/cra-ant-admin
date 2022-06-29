import axios from 'util/axios';
import type { MenuItem } from 'app/config';

export type User = {
  CompanyName: string;
  Name: string;
};

interface LoginResponse {
  SessionKey: string;
  User: User;
}

export type LoginParams = {
  email: string;
  password: string;
};

/**
 * 登录
 */
export const fetchLogin = async (params: Expand<LoginParams>) => {
  const res = await axios.post<any, ExpandRecursively<LoginResponse>>(
    '/User/Login',
    params
  );
  return res;
};

/**
 * 获取用户菜单
 */
export const fetchUserMenu = async () => {
  const res = await axios.get<any, ExpandRecursively<MenuItem[]>>(
    '/User/PageList'
  );
  return res;
};
