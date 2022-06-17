import axios from 'util/axios';
/**
 * 登录
 */
export const fetchLogin = async (params = {}) => {
  const res = await axios.post('/User/Login', params);
  return res;
};
