import React from 'react';
import { Grow } from '@material-ui/core';

import P from 'urls';
import DepartmentForm from '../components/DepartmentForm';

const CreateDepartmentPage = () => {
  return (
    <Grow in={true}>
      <DepartmentForm
        title='Create Department'
        onCreate='show_list'
        resourceName='Department'
        editing={false}
        urls={P.DEPARTMENT}
      />
    </Grow>
  );
};

export default CreateDepartmentPage;
