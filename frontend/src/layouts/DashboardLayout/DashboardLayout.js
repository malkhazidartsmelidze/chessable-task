import React, { Suspense, useState } from 'react';
import { LinearProgress, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';

import { drawerWidth } from 'consts';
import { Topbar, Navbar } from './components';
import { renderRoutes } from 'common/router';
import { AppContextProvider } from 'context/AppProvider';
import Notifications from 'components/Notifications';

const DashboardLayout = (props) => {
  const classes = useStyles();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <AppContextProvider>
      <div className={classes.root}>
        <nav className={classes.nav}>
          <Hidden smUp implementation='js'>
            <Navbar variant='temporary' open={navbarOpen} onClose={toggleNavbar} />
          </Hidden>
          <Hidden xsDown implementation='js'>
            <Navbar />
          </Hidden>
        </nav>
        <div className={classes.app}>
          <Topbar onDrawerToggle={toggleNavbar} />

          <Suspense fallback={<LinearProgress />}>
            <main className={clsx(classes.main, classes.mainBackground)}>
              {Array.isArray(props.route?.routes)
                ? renderRoutes(props.route.routes)
                : props.children}
            </main>
          </Suspense>
        </div>
      </div>
      <Notifications />
    </AppContextProvider>
  );
};

export default DashboardLayout;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  nav: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: theme.spacing(2),
    background: '#fafafa',
  },
}));
