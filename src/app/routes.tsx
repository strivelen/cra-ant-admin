import { FC, Suspense, lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import Loading from 'component/Loading';

const RequireAuth = lazy(() => import('component/RequireAuth'));
const Layout = lazy(() => import('component/Layout'));
const Home = lazy(() => import('page/Home'));
const Login = lazy(() => import('page/Login'));
const NotFound = lazy(() => import('page/404'));
const List = lazy(() => import('page/List'));

export const routes: RouteObject[] = [
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <Home /> },
          {
            path: 'home',
            element: <Home />
          },
          {
            path: 'list',
            element: <List />,
            children: [
              {
                path: ':id',
                element: <List />
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

const Routes: FC = () => {
  let element = useRoutes(routes);
  return <Suspense fallback={<Loading />}>{element}</Suspense>;
};

export default Routes;
