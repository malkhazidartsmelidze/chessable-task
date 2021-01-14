import React from 'react';
import { Drawer, List, ListItem } from '@material-ui/core';
import clsx from 'clsx';
import NavbarMenu from './components/NavbarMenu';
import { drawerWidth } from 'consts';
import { makeStyles } from '@material-ui/styles';

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <Drawer classes={{ paper: classes.drawerPaper }} variant='permanent' anchor='left' {...props}>
      <List disablePadding>
        <ListItem
          data-pointer={1}
          className={clsx(classes.logo, classes.item, classes.itemCategory)}
        >
          HR System
        </ListItem>
        <NavbarMenu />
      </List>
    </Drawer>
  );
};

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    color: '#fff',
    borderColor: theme.colors.borderColor,
    backgroundAttachment: 'fixed',
    backgroundPosition: 'left 0 bottom 0',
    backgroundColor: theme.colors.borderColor,
    backgroundImage: `url(/images/sidebarbackground.png)`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '256px 556px',
    transition: '0.5s all ease-in-out',
    width: drawerWidth,
  },
  logo: {
    color: theme.palette.common.white,
    height: theme.spacing(6),
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      height: theme.spacing(4),
    },
    boxShadow: '0 -1px 0 #404854 inset',
  },
}));

export default Navbar;
