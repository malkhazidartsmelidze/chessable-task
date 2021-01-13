import React from 'react';
import { Redirect, Route as ReactRouter, Switch } from 'react-router-dom';

import useUser from 'context/UserProvider';
import { guestRedirect, userRedirect } from 'consts';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';

const defaultRoutes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/login',
    guest: true,
    component: LoginPage,
  },
];

export const renderRoutes = (routes = defaultRoutes, extraProps = {}, switchProps = {}) => {
  return (
    <Switch {...switchProps}>
      {routes.map((route, ind) => {
        const render = (props) => {
          return <route.component {...props} {...extraProps} route={route} />;
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
