import React from 'react';
import { Grow } from '@material-ui/core';

import P from 'urls';
import DepartmentForm from '../components/DepartmentForm';

const CreateDepartmentPage = (props) => {
  const id = props.match?.params?.id;

  return (
    <Grow in={true}>
      <DepartmentForm
        title='Edit Department'
        editing={true}
        id={id}
        onCreate='show_list'
        resourceName='Department'
        urls={P.DEPARTMENT}
      />
    </Grow>
  );
};

export default CreateDepartmentPage;
