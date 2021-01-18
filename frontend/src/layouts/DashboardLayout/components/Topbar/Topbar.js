import React from 'react';
import {
  AppBar,
  Avatar,
  Grid,
  Hidden,
  IconButton,
  Toolbar,
  Tooltip,
  Icon,
  makeStyles,
  Slide,
} from '@material-ui/core';
import useUser from 'context/UserProvider';

const Topbar = (props) => {
  const classes = useStyles();
  const { onDrawerToggle } = props;
  const { user } = useUser();

  return (
    <Slide in={true}>
      <AppBar position='sticky' elevation={2} className={classes.appBar}>
        <Toolbar disableGutters className={classes.toolBar}>
          <Grid container spacing={1} alignItems='center'>
            <Hidden smUp>
              <Grid item>
                <IconButton onClick={onDrawerToggle}>
                  <Icon>menu</Icon>
                </IconButton>
              </Grid>
            </Hidden>
            <Grid item xs />
            <Grid item>
              <Tooltip title='Alerts • No alters'>
                <IconButton>
                  <Icon>notifications</Icon>
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton className={classes.iconButtonAvatar}>
                <Avatar src='https://i.stack.imgur.com/nxthu.jpg?s=48&g=1' alt={user.name} />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: '#fafafa',
    color: theme.colors.bodyColor,
  },
  toolBar: {
    padding: theme.spacing(0, 1, 0, 1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
}));

export default Topbar;
