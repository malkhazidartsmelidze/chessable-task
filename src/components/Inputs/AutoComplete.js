import React, { Fragment, useEffect, useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from './TextField';
import Autocomplete from '@material-ui/lab/Autocomplete/Autocomplete';

const AutoComplete = (props) => {
  const {
    service,
    name,
    defaultValue,
    column: autoField,
    options: autocompleteoptionid,
    ...rest
  } = props;
  const [value, setValue] = useState(props.value || {});
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [query, setQuery] = useState('');

  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    service.autoComplete(query).then((data) => {
      if (!data.data || !Array.isArray(data.data) || !active) return;
      setOptions(data.data);
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const id = typeof value === 'object' && value?.id ? value.id : null;

  return (
    <Fragment>
      {id ? <input type='hidden' name={name} value={id} /> : null}
      <Autocomplete
        id={`autocomplete_${autocompleteoptionid}`}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        defaultValue={defaultValue}
        getOptionSelected={(option, value) => option.id === value.id}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.name || '')}
        options={options}
        loading={loading}
        size='small'
        onChange={(_e, value) => {
          setValue(value);
        }}
        renderInput={(params) => {
          return (
            <TextField
              {...params}
              {...rest}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <Fragment>
                    {loading ? <CircularProgress color='inherit' size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </Fragment>
                ),
              }}
            />
          );
        }}
      />
    </Fragment>
  );
};

export default AutoComplete;
