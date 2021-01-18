import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Divider, Grid, makeStyles, Paper, Typography } from '@material-ui/core';

import DepartmentService from 'services/DepartmentService';
import formatCurrency from 'common/formatters/formatCurrency';
import ResourceTable from 'components/ResourceTable';
import P from 'urls';
import TextField from 'components/Inputs/TextField';

const DepartmentTable = (props) => {
  const classes = useStyles();
  const filterFormRef = useRef();

  return (
    <Grid direction='column' container spacing={2}>
      <Grid item>
        <Paper elevation={5} className={classes.filterPaper}>
          <form ref={filterFormRef}>
            <Typography variant='h6'>Filter</Typography>
            <Divider />
            <Typography variant='body2'>
              List Only Those departments which has employees with minimum salary
            </Typography>
            <Grid container alignItems='center'>
              <TextField name='min_employees' label='Min. employees' defaultValue='' />
              <Typography variant='body2'>Has</Typography>
              <TextField name='min_salary' label='Min. Salary' defaultValue='' />
            </Grid>
            <Divider />
            <Button type='submit' variant='contained' color='primary'>
              Filter
            </Button>
          </form>
        </Paper>
      </Grid>

      <Grid item>
        <ResourceTable
          enableCreate
          enableEdit
          enableRefresh
          enableDelete
          filterFormRef={filterFormRef?.current}
          urls={P.DEPARTMENT}
          resourceName='Department'
          Service={DepartmentService}
          columns={[
            { title: 'ID', field: 'id', filtering: false },
            { title: 'Name', field: 'name' },
            {
              title: 'Total Employees',
              field: 'total_employee',
              filtering: false,
              render: (rowData) => (
                <Link to={`${P.EMPLOYEE.list}?department_name=${rowData.name}`}>
                  {rowData.total_employee}
                </Link>
              ),
            },
            {
              title: 'Max Salary',
              field: 'max_salary',
              filtering: false,
              render: (rowData) => formatCurrency(rowData.max_salary),
            },
            {
              title: 'Total Salary',
              field: 'total_salary',
              filtering: false,
              render: (rowData) => formatCurrency(rowData.total_salary),
            },
          ]}
          options={{
            filtering: true,
          }}
          {...props}
        />
      </Grid>
    </Grid>
  );
};

export default DepartmentTable;

const useStyles = makeStyles((theme) => ({
  filterPaper: {
    padding: theme.spacing(2, 2),
    '& .MuiTextField-root:first-child': {
      marginLeft: 0,
    },
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiDivider-root': {
      margin: theme.spacing(1, 0),
    },
  },
}));
