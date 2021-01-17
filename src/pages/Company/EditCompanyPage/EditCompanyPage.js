import React from 'react';
import { Grow } from '@material-ui/core';

import CompanyForm from '../components/CompanyForm';

const EdutCompanyPage = (props) => {
  const id = parseInt(props.match?.params?.id);

  return (
    <Grow in={true}>
      <div>
        <CompanyForm title='Edit Company' editing={true} id={id} />
      </div>
    </Grow>
  );
};

export default EdutCompanyPage;
