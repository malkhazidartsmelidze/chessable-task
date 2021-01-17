import React from 'react';

import ResourceForm from 'components/ResourceForm';
import DepartmentService from 'services/DepartmentService';
import CompanyService from 'services/CompanyService';

const DepartmentForm = (props) => {
  return (
    <ResourceForm
      Service={DepartmentService}
      fields={[
        {
          name: 'name',
          label: 'Department Name',
          autoFocus: true,
          required: true,
        },
        {
          name: 'company_id',
          label: 'Company',
          required: true,
          autocomplete: true,
          column: 'name',
          service: CompanyService,
        },
      ]}
      {...props}
    />
  );
};

export default DepartmentForm;
