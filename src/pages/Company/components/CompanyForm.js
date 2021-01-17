import React, { Fragment, useState } from 'react';
import { Button, Grid } from '@material-ui/core';

import FormContainer from 'components/Form/FormContainer';
import TextField from 'components/Inputs/TextField';
import CompanyService from 'services/CompanyService';
import useApp from 'context/AppProvider';
import catchFieldErrors from 'common/errors/catchFieldErrors';

const CompanyForm = () => {
  const { catchApiSuccess, notificate } = useApp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  /**
   * When create company form submitted
   * @param {Event} e form Submit event
   */
  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);

    CompanyService.save(formData)
      .then(catchApiSuccess)
      .then(() => e.target.reset())
      .catch((...data) => catchFieldErrors(setErrors, ...data))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormContainer
        loading={loading}
        gridProps={{
          xs: 12,
          md: 6,
          lg: 4,
        }}
        title='Create Company'
        actions={
          <Fragment>
            <Button variant='contained'>Cancel</Button>
            <Button type='submit' variant='contained' color='primary'>
              Create
            </Button>
          </Fragment>
        }
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              err={errors.name}
              fullWidth
              label='Company Name'
              name='name'
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField required err={errors.code} fullWidth label='Company Code' name='code' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              err={errors.address}
              fullWidth
              label='Company Address'
              name='address'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField required err={errors.email} fullWidth label='Contact Email' name='email' />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              err={errors.phone_number}
              fullWidth
              label='Phone Number'
              name='phone_number'
            />
          </Grid>
        </Grid>
      </FormContainer>
    </form>
  );
};

export default CompanyForm;
