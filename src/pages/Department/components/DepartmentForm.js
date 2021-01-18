import React from 'react';

import ResourceForm from 'components/ResourceForm';
import DepartmentService from 'services/DepartmentService';

const DepartmentForm = (props) => {
  return (
    <ResourceForm
      Service={DepartmentService}
      onCreate='show_list'
      onUpdate='show_list'
      fields={[
        {
          name: 'name',
          label: 'Department Name',
          autoFocus: true,
          required: true,
        },
      ]}
      {...props}
    />
  );
};

export default DepartmentForm;
