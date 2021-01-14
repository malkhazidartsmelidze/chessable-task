import React, { lazy } from 'react';
import { Redirect, Route as ReactRouter, Switch } from 'react-router-dom';

import useUser from 'context/UserProvider';
import { guestRedirect, userRedirect } from 'consts';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import DashboardPage from 'pages/DashboardPage';
import P from 'urls';

const defaultRoutes = [
  {
    path: P.HOME,
    exact: true,
    component: HomePage,
  },
  {
    path: P.LOGIN,
    guest: true,
    component: LoginPage,
  },
  {
    path: P.DASHBOARD,
    secured: true,
    component: DashboardPage,
    routes: [
      {
        path: P.ALL_DEPARTMENTS,
        exact: true,
        component: lazy(() => import('pages/Department/ListDepartmentPage')),
      },
      {
        path: P.CREATE_DEPARTMENT,
        exact: true,
        component: lazy(() => import('pages/Department/CreateDepartmentPage')),
      },
    ],
  },
];

export const renderRoutes = (routes = defaultRoutes, extraProps = {}, switchProps = {}) => {
  return (
    <Switch {...switchProps}>
      {routes.map((route, ind) => {
        const render = (props) => {
          if (route.render) {
            return route.render({ ...props, ...extraProps, route: route });
          } else if (route.component) {
            return <route.component {...props} {...extraProps} route={route} />;
          }
        };

        return (
          <Route
            key={route.key || ind}
            path={route.path}
            exact={route.exact}
            guest={route.guest}
            secured={route.secured}
            strict={route.strict}
            render={render}
          />
        );
      })}
    </Switch>
  );
};

export const Route = ({ secured, guest, ...props }) => {
  const { auth, loading } = useUser();
  if (secured && !auth && !loading) return <Redirect to={guestRedirect} />;
  if (guest && auth && !loading) return <Redirect to={userRedirect} />;

  return <ReactRouter {...props} />;
};
