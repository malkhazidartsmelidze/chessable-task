import React from 'react';
import { Grow } from '@material-ui/core';

import EmployeeForm from '../components/EmployeeForm';

const CreateEmployeePage = () => {
  return (
    <Grow in={true}>
      <EmployeeForm title='Create Employee' resourceName='Employee' editing={false} />
    </Grow>
  );
};

export default CreateEmployeePage;
