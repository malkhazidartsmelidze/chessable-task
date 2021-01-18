import React from 'react';
import { Grow } from '@material-ui/core';

import CompanyForm from '../components/CompanyForm';
import P from 'urls';

const CreateCompanyPage = () => {
  return (
    <Grow in={true}>
      <CompanyForm
        title='Create Company'
        onCreate='show_list'
        resourceName='Company'
        editing={false}
        urls={P.COMPANY}
      />
    </Grow>
  );
};

export default CreateCompanyPage;
