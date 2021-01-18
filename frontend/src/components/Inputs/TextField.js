import React from 'react';
import { MenuItem, TextField as MatTextField } from '@material-ui/core';

const TextField = (props) => {
  return (
    <MatTextField
      variant='outlined'
      size='small'
      margin='dense'
      select={Array.isArray(props.options)}
      {...props}
      error={Boolean(props.error || props.err)}
      helperText={props.err ? props.err : props.helperText}
    >
      {(Array.isArray(props.options) ? props.options : []).map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </MatTextField>
  );
};

export default TextField;
