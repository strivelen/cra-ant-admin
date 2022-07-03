import axios from 'util/axios';

type EnumResponse = Array<{ Key: string; Value: string }>;

/**
 * 获取枚举数据通用方法
 * @param { string } url
 * @returns
 */
export const fetchEnums = function (url: string) {
  return axios.get<any, ExpandRecursively<EnumResponse>>(url);
};
