import React from 'react';
import { Grid, Zoom } from '@material-ui/core';
import CompaniesTable from '../components/CompanyTable';

const ListCompanyPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Zoom in={true}>
          <CompaniesTable />
        </Zoom>
      </Grid>
    </Grid>
  );
};

export default ListCompanyPage;
