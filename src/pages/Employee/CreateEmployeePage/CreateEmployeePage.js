import React from 'react';
import { Grow } from '@material-ui/core';

import P from 'urls';
import EmployeeForm from '../components/EmployeeForm';

const CreateEmployeePage = () => {
  return (
    <Grow in={true}>
      <EmployeeForm
        title='Create Employee'
        onCreate='show_list'
        resourceName='Employee'
        editing={false}
        urls={P.DEPARTMENT}
      />
    </Grow>
  );
};

export default CreateEmployeePage;
