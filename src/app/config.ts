import { Pathname } from 'react-router-dom';

const config: Config = {
  appName: '后台管理系统',
  apiHosts:
    'https://www.fastmock.site/mock/d6f0134049a0e22b01d7aae6fafc9045/api',
  // apiHosts: 'https://debug.baidu.com/api',
  // apiHosts: 'https://release.baidu.com/api',
  apiTimeout: 30000,
  apiSessionKey: 'psyweb-sessionkey',
  pageSize: 20,
  isUseServerMenu: false,
  menu: [
    {
      Name: '首页',
      Icon: 'icon-fenlei',
      Url: '/'
    },
    {
      Name: '订单管理',
      Icon: 'icon-xihuan',
      Children: [
        {
          Name: '销售订单',
          Url: '/order/1'
        }
      ]
    },
    {
      Name: '用户管理',
      Icon: 'icon-gerenzhongxin',
      Children: [
        {
          Name: '角色管理',
          Url: '/list/1'
        }
      ]
    },
    {
      Name: '系统设置',
      Icon: 'icon-gengduo',
      Url: '/system'
    }
  ]
};

export default config;

interface Config {
  appName: string;
  apiHosts: string;
  apiTimeout: number;
  apiSessionKey: string;
  pageSize: number;
  isUseServerMenu: boolean;
  menu: MenuItem[];
}

export interface MenuItem {
  key?: string;
  Name: string;
  Icon?: string;
  Url?: Pathname;
  Children?: MenuItem[];
}
