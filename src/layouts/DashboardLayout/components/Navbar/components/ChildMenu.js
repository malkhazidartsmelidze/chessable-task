import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import MenuIcon from './MenuIcon';
import { ListItem, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const ChildMenu = (p) => {
  const { leftIcon, rightIcon, url, title } = p;
  const classes = useStyles();

  return (
    <ListItem
      button
      className={classes.item}
      component={NavLink}
      to={url}
      activeClassName={classes.navLinkActive}
    >
      {typeof leftIcon == 'string' ? <MenuIcon icon={leftIcon} /> : leftIcon}
      <ListItemText disableTypography primary={title} />
      {typeof rightIcon == 'string' ? <MenuIcon icon={rightIcon} /> : rightIcon}
    </ListItem>
  );
};

const useStyles = makeStyles((theme) => ({
  item: {
    paddingTop: 3,
    paddingBottom: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  navLinkActive: {
    '& *': {
      color: '#4fc3f7 !important',
    },
  },
  itemIcon: {
    minWidth: 'auto',
    color: 'inherit',
    marginRight: theme.spacing(1),
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
}));

export default ChildMenu;
