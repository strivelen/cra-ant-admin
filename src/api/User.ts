import axios from 'util/axios';

interface LoginResponse {
  SessionKey: string;
  User: {
    CompanyName: string;
    Name: string;
  };
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
