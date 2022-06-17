export interface Route {
  element: string;
  file: string;
  path?: string;
  index?: boolean;
  children?: Array<Route>;
  auth?: boolean;
}

interface PageOptions {
  pageSize: number;
}

interface Config {
  appName: string;
  apiBaseURL: string;
  apiTimeout: number;
  apiSessionKey: string;
  pageOptions: PageOptions;
  routes: Array<Route>;
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
  ]
};

export default config;
