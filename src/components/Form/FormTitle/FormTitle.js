import React from 'react';
import { Grid, Divider, Typography, useTheme } from '@material-ui/core';

const FormTitle = (props) => {
  const { title } = props;
  const theme = useTheme();

  return (
    <Grid item xs={12}>
      <Typography variant='h5' style={{ paddingTop: 0 }}>
        {title}
      </Typography>
      <Divider style={{ margin: theme.spacing(1, 0) }} />
    </Grid>
  );
};

export default FormTitle;
