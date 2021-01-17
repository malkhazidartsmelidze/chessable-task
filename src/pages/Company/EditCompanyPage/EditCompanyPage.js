import React from 'react';
import { Grow } from '@material-ui/core';

import CompanyForm from '../components/CompanyForm';
import P from 'urls';

const EdutCompanyPage = (props) => {
  const id = parseInt(props.match?.params?.id);

  return (
    <Grow in={true}>
      <CompanyForm
        onUpdate='show_list'
        title='Edit Company'
        urls={P.COMPANY}
        editing={true}
        id={id}
      />
    </Grow>
  );
};

export default EdutCompanyPage;
