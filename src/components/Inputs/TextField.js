import React from 'react';
import { TextField as MatTextField } from '@material-ui/core';

const TextField = (props) => {
  return (
    <MatTextField
      variant='outlined'
      size='small'
      margin='dense'
      {...props}
      error={Boolean(props.error || props.err)}
      helperText={props.err ? props.err : props.helperText}
    />
  );
};

export default TextField;
