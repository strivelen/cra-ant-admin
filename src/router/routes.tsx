import { FC, Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './generateRoutes';

// const Layout = lazy(() => import('component/Layout'));
// const Home = lazy(() => import('page/Home'));
// const Login = lazy(() => import('page/Login'));
// const NotFound = lazy(() => import('page/404'));

// let routes: RouteObject[] = [
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       { index: true, element: <Home /> },
//       {
//         path: '/home',
//         element: <Home />
//       }
//     ]
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '*',
//     element: <NotFound />
//   }
// ];

const Routes: FC = () => {
  let element = useRoutes(routes);
  return <Suspense fallback={<div>加载中...</div>}>{element}</Suspense>;
};

export default Routes;
