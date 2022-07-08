import { Pathname } from 'react-router-dom';
import type { MergeExclusive } from 'type-fest';

const config: Config = {
  appName: 'Admin Name',
  apiTimeout: 30000,
  apiSessionKey: 'psyweb-sessionkey',
  pageSize: 20,
  routes: [
    {
      path: '/',
      element: 'Layout',
      file: 'component/Layout',
      children: [
        { index: true, element: 'Home', file: 'page/Home' },
        {
          path: '/home',
          element: 'Home',
          file: 'page/Home'
        },
        {
          path: 'list',
          element: 'List',
          file: 'page/List',
          children: [
            {
              path: ':id',
              element: 'List',
              file: 'page/List'
            }
          ]
        }
      ]
    },
    { path: '/login', element: 'Login', file: 'page/Login' },
    { path: '*', element: 'NotFound', file: 'page/404' }
  ],
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
  apiTimeout: number;
  apiSessionKey: string;
  pageSize: number;
  routes: Route[];
  isUseServerMenu: boolean;
  menu: MenuItem[];
}

interface IndexRoute {
  element: string;
  file: string;
  index?: boolean;
  auth?: boolean;
}
interface PathRoute {
  element: string;
  file: string;
  path?: string;
  children?: Route[];
  auth?: boolean;
}

export type Route = MergeExclusive<IndexRoute, PathRoute>;

export interface MenuItem {
  key?: string;
  Name: string;
  Icon?: string;
  Url?: Pathname;
  Children?: MenuItem[];
}
