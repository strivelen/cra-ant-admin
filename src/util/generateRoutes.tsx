import type { RouteObject } from 'react-router-dom';
import { lazy, LazyExoticComponent, FunctionComponent } from 'react';
import config from 'app/config';
import type { Route } from 'app/config';

type routeElement = {
  [propName: string]: LazyExoticComponent<FunctionComponent>;
};

const routeElements: routeElement = {};
function getRouteElements(routesConf: Array<Route>): void {
  routesConf.forEach((conf) => {
    if (!routeElements[conf.element]) {
      routeElements[conf.element] = lazy(() => import('../' + conf.file));
      if (conf.children && conf.children.length > 0) {
        getRouteElements(conf.children);
      }
    }
  });
}
getRouteElements(config.routes);

function parseRouteChildren(child: Array<Route>) {
  let routes;
  if (child.length > 0) {
    routes = child.map((conf) => {
      return parseRoute(conf);
    });
  }
  return routes;
}

function parseRoute(conf: Route): RouteObject {
  const Element = routeElements[conf.element];
  const route = {
    ...conf,
    element: <Element />,
    children: parseRouteChildren(conf.children || []),
    file: undefined
  };
  return route;
}

const routes = config.routes.map((routeConf) => parseRoute(routeConf));

export default routes;
