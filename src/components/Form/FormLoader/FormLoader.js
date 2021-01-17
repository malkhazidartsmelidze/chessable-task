import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const FormLoader = (props) => {
  const classes = useStyles();

  if (!props.show) return null;

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
};

export default FormLoader;

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'absolute',
    top: '0px',
    left: '0px',
    background: 'rgba(255, 255, 255,0.8)',
    height: '100%',
    width: '100%',
    zIndex: '10000',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
