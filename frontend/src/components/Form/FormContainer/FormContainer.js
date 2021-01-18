import React from 'react';
import { Card, CardActions, CardContent, CardHeader, Grid, makeStyles } from '@material-ui/core';

import FormTitle from 'components/Form/FormTitle';
import FormLoader from '../FormLoader';

const FormContainer = (props) => {
  const classes = useStyles();

  return (
    <Grid container justify='center'>
      <Grid item xs={12} md={8} className={classes.gridItem} lg={6} {...props.gridProps}>
        <FormLoader show={props.loading} />
        <Card elevation={10} className={classes.paper} {...props.paperProps}>
          <CardHeader
            className={classes.cardHeader}
            title={props.title && <FormTitle title={props.title} />}
          />
          <CardContent className={classes.cardContent}>{props.children}</CardContent>
          <CardActions className={classes.cardActions}>{props.actions}</CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FormContainer;

const useStyles = makeStyles((theme) => ({
  gridItem: {
    position: 'relative',
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: 'auto',
    background: '#fff',
  },
  cardContent: {
    paddingTop: theme.spacing(),
  },
  cardHeader: {
    paddingBottom: theme.spacing(),
  },
  cardActions: {
    justifyContent: 'flex-end',
    paddingBottom: theme.spacing(2),
  },
}));
