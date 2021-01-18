import React from 'react';
import { Grid, Zoom } from '@material-ui/core';
import EmployeeTable from '../components/EmployeeTable';

const ListEmployeePage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Zoom in={true}>
          <EmployeeTable />
        </Zoom>
      </Grid>
    </Grid>
  );
};

export default ListEmployeePage;
