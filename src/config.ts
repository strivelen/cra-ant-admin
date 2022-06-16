export interface Route {
  element: string;
  file: string;
  path?: string;
  index?: boolean;
  children?: Array<Route>;
  auth?: boolean;
}

interface Config {
  routes: Array<Route>;
}

const config: Config = {
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
