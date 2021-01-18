import React from 'react';
import { Grid, Zoom } from '@material-ui/core';
import DepartmentTable from '../components/DepartmentTable';

const ListDepartmentPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Zoom in={true}>
          <DepartmentTable />
        </Zoom>
      </Grid>
    </Grid>
  );
};

export default ListDepartmentPage;
