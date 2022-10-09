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
const Components = lazy(() => import('page/Components'));
const CRUDTemplate = lazy(() => import('page/CRUDTemplate'));
const Filter = lazy(() => import('page/Filter'));
const Table = lazy(() => import('page/Table'));
const CustomBreadcrumb = lazy(() => import('page/CustomBreadcrumb'));

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
          },
          {
            path: 'components',
            element: <Components />,
            children: [
              { index: true, element: <Components /> },
              { path: 'crudTemplate', element: <CRUDTemplate /> },
              { path: 'filter', element: <Filter /> },
              { path: 'table', element: <Table /> },
              { path: 'customBreadcrumb', element: <CustomBreadcrumb /> }
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
