import React from 'react';
import { Grow } from '@material-ui/core';

import P from 'urls';
import EmployeeForm from '../components/EmployeeForm';

const CreateEmployeePage = (props) => {
  const id = props.match?.params?.id;

  return (
    <Grow in={true}>
      <EmployeeForm
        title='Edit Employee'
        editing={true}
        id={id}
        onCreate='show_list'
        onUpdate='show_list'
        resourceName='Employee'
        urls={P.EMPLOYEE}
      />
    </Grow>
  );
};

export default CreateEmployeePage;
