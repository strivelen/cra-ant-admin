import { Pathname } from 'react-router-dom';
import type { MergeExclusive } from 'type-fest';
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

interface PageOptions {
  pageSize: number;
}

export interface MenuItem {
  Name: string;
  Icon?: string;
  Url?: Pathname;
  Children?: MenuItem[];
}

interface Config {
  appName: string;
  apiBaseURL: string;
  apiTimeout: number;
  apiSessionKey: string;
  pageOptions: PageOptions;
  routes: Route[];
  isUseServerMenu: boolean;
  menu: MenuItem[];
}

const config: Config = {
  appName: 'Admin Name',
  apiBaseURL: 'http://psyManageApi.lkha.net',
  apiTimeout: 30000,
  apiSessionKey: 'psyweb-sessionkey',
  pageOptions: {
    pageSize: 12
  },
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
          path: '/list',
          element: 'List',
          file: 'page/List'
        }
      ]
    },
    { path: '/login', element: 'Login', file: 'page/Login' },
    { path: '*', element: 'NotFound', file: 'page/404' }
  ],
  isUseServerMenu: false,
  menu: [
    {
      Name: '用户管理',
      Icon: 'TeamOutlined',
      Url: '/test'
      // Children: [
      //   {
      //     Name: '用户管理',
      //   }
      // ]
    }
  ]
};

export default config;
