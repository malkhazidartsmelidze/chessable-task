import React from 'react';

import ResourceForm from 'components/ResourceForm';
import CompanyService from 'services/CompanyService';

const CompanyForm = (props) => {
  return (
    <ResourceForm
      Service={CompanyService}
      fields={[
        {
          name: 'name',
          label: 'Company Name',
          sizes: { xs: 12, md: 6 },
          autoFocus: true,
          required: true,
        },
        { name: 'code', label: 'Company Code', sizes: { xs: 12, md: 6 }, required: true },
        { name: 'address', label: 'Company Address', required: true },
        { name: 'email', type: 'email', label: 'Company Email' },
        { name: 'phone_number', type: 'phone_number', label: 'Phone Number' },
      ]}
      {...props}
    />
  );
};

export default CompanyForm;
