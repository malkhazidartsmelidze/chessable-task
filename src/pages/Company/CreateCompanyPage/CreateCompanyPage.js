import React from 'react';
import { Grow } from '@material-ui/core';

import CompanyForm from '../components/CompanyForm';

const CreateCompanyPage = () => {
  return (
    <Grow in={true}>
      <div>
        <CompanyForm />
      </div>
    </Grow>
  );
};

export default CreateCompanyPage;
