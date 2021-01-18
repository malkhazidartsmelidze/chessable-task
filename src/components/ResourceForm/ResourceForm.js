import React, { forwardRef, Fragment, useEffect, useState } from 'react';
import { Button, Grid, MenuItem } from '@material-ui/core';

import FormContainer from 'components/Form/FormContainer';
import TextField from 'components/Inputs/TextField';
import AutoComplete from 'components/Inputs/AutoComplete';
import useApp from 'context/AppProvider';
import catchFieldErrors from 'common/errors/catchFieldErrors';
import { useHistory } from 'react-router';

const ResourceForm = (props, ref) => {
  const { catchApiSuccess, notificate } = useApp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const history = useHistory();
  const { Service, resourceName, editing, id } = props;

  /**
   * If editing fetch info to edit
   */
  useEffect(() => {
    if (!editing || !id) return;
    setLoading(true);
    Service.get(id)
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch(() => {
        notificate(`Error While Editing ${resourceName}`, 'error');
      });
    /* eslint-disable-next-line */
  }, [editing, id]);

  /**
   * When form submitted
   * @param {Event} e form Submit event
   */
  const onFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formData = new FormData(e.target);
    let method = () => Promise(() => {});
    if (editing && typeof Service.edit === 'function') {
      method = Service.edit;
    } else if (!editing && typeof Service.save === 'function') {
      method = Service.save;
    } else {
      setLoading(false);
      return;
    }

    method(formData)
      .then(catchApiSuccess)
      .then(() => !editing && resetForm())
      .then(() => {
        editing ? onUpdate() : onCreate();
      })
      .catch((...data) => catchFieldErrors(setErrors, ...data))
      .then(() => {
        setLoading(false);
      });
  };

  /**
   * Reset Current form to default values
   */
  const resetForm = () => {
    ref?.current && ref.current.reset();
  };

  const onCreate = () => {
    if (props.onCreate === 'show_list' && props.urls && props.urls.list) {
      history.push(props.urls.list);
    }
  };

  const onUpdate = () => {
    if (props.onUpdate === 'show_list' && props.urls && props.urls.list) {
      history.push(props.urls.list);
    }
  };

  const renderFormActions = () => {
    return (
      <Fragment>
        {!props.dasableReset && (
          <Button variant='contained' onClick={resetForm}>
            {props.resetButtonText || 'Reset'}
          </Button>
        )}
        {!props.disableSubmit && (
          <Button disabled={loading} type='submit' variant='contained' color='primary'>
            {props.submitButtonText ? props.submitButtonText : editing ? 'Update' : 'Create'}
          </Button>
        )}
      </Fragment>
    );
  };

  return (
    <form ref={ref} onSubmit={onFormSubmit}>
      <FormContainer
        loading={loading}
        key={Object.keys(data).length} /* To refresh defaultValues of field when data is fetched */
        gridProps={{
          xs: 12,
          md: 6,
          lg: 4,
          ...(props.formGridProps || {}) /* May not use and delete efter */,
        }}
        title={props.title}
        actions={renderFormActions()}
        {...props.formProps}
      >
        <Grid container spacing={props.formSpacing || 1}>
          {data.id && editing ? <input type='hidden' name='id' value={data.id} /> : null}

          {(props.fields || []).map((field) => {
            const { options, sizes, name, autocomplete, service, ...rest } = field;
            const Component = autocomplete ? AutoComplete : TextField;

            if (rest.type === 'hidden') {
              return <input type='hidden' name={name} value={data[name]} />;
            }

            return (
              <Grid key={name} item {...(sizes || { xs: 12 })}>
                <Component
                  name={name}
                  err={errors[name]}
                  defaultValue={data[name]}
                  fullWidth
                  service={service}
                  {...rest}
                >
                  {(Array.isArray(options) || []).map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Component>
              </Grid>
            );
          })}
        </Grid>
      </FormContainer>
    </form>
  );
};

export default forwardRef(ResourceForm);
