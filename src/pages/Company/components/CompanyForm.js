import React, { Fragment, useEffect, useState } from 'react';
import { Button, Grid } from '@material-ui/core';

import FormContainer from 'components/Form/FormContainer';
import TextField from 'components/Inputs/TextField';
import CompanyService from 'services/CompanyService';
import useApp from 'context/AppProvider';
import catchFieldErrors from 'common/errors/catchFieldErrors';

const CompanyForm = (props) => {
  const { catchApiSuccess, notificate } = useApp();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({});
  const { editing, id } = props;

  useEffect(() => {
    console.log(editing, id);
    if (!editing || !id) return;
    setLoading(true);
    CompanyService.get(id)
      .then((company) => {
        setData(company);
        setLoading(false);
      })
      .catch(() => {
        notificate('Error While Editing Company', 'error');
      });
  }, [editing, id]);

  /**
   * When create company form submitted
   * @param {Event} e form Submit event
   */
  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);

    (editing ? CompanyService.edit(formData) : CompanyService.save(formData))
      .then(catchApiSuccess)
      .then(() => !editing && e.target.reset())
      .catch((...data) => catchFieldErrors(setErrors, ...data))
      .then(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <FormContainer
        loading={loading}
        key={Object.keys(data).length}
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
          {data.id && editing ? <input type='hidden' name='id' value={data.id} /> : null}
          <Grid item xs={12} md={6}>
            <TextField
              required
              err={errors.name}
              defaultValue={data.name}
              fullWidth
              label='Company Name'
              name='name'
              autoFocus
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              err={errors.code}
              defaultValue={data.code}
              fullWidth
              label='Company Code'
              name='code'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              err={errors.address}
              defaultValue={data.address}
              fullWidth
              label='Company Address'
              name='address'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              err={errors.email}
              defaultValue={data.email}
              fullWidth
              label='Contact Email'
              name='email'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              err={errors.phone_number}
              defaultValue={data.phone_number}
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
