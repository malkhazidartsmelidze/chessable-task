import React, { Suspense, useState } from 'react';
import { LinearProgress, Hidden } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { drawerWidth } from 'consts';
import clsx from 'clsx';
import { Topbar, Navbar } from './components';

const DashboardLayout = (props) => {
  const { children } = props;
  const classes = useStyles();
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
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
          <main className={clsx(classes.main, classes.mainBackground)}>{children}</main>
        </Suspense>
      </div>
    </div>
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
