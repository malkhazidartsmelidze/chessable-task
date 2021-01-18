import React, { Fragment, useEffect, useRef, useState } from 'react';
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
  const [value, setValue] = useState(defaultValue || {});
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const [query, setQuery] = useState('');
  const ref = useRef();

  /**
   * @return {FormData}
   */
  const getFormData = () => {
    if (ref && ref.current) {
      const form = ref.current.closest('form');
      const formData = new FormData(form);
      return formData;
    } else {
      return new FormData();
    }
  };

  useEffect(() => {
    let active = true;

    const formData = getFormData();
    formData.append('q', query);

    service.autoComplete(formData).then((data) => {
      if (!data.data || !Array.isArray(data.data) || !active) return;
      setOptions(data.data);
    });

    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, query]);

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
        ref={ref}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onBlur={() => {
          setQuery('');
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
