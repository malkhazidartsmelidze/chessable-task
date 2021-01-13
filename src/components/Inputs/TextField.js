import React from 'react';
import { TextField as MatTextField } from '@material-ui/core';

const TextField = (props) => {
  return <MatTextField variant='outlined' size='small' margin='normal' {...props} />;
};

export default TextField;
