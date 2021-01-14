import React from 'react';
import { IconButton, Icon, makeStyles } from '@material-ui/core';

export default (props) => {
  const classes = useStyles();

  return (
    <IconButton color='main' aria-label='delete' size='small' className={classes.button} {...props}>
      <Icon className={classes.icon}>{props.icon}</Icon>
    </IconButton>
  );
};

const useStyles = makeStyles((theme) => ({
  button: {
    padding: '4px',
    color: theme.colors.mainText,
    '&:hover': {
      background: theme.colors.secondaryText,
    },
  },
  icon: {
    fontSize: '1.1rem',
  },
}));
