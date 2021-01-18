import React, { useState } from 'react';
import { Button, CircularProgress, Container, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import useUser from 'context/UserProvider';
import UserService from 'services/UserService';
import TextField from 'components/Inputs/TextField';
import catchFieldErrors from 'common/errors/catchFieldErrors';

const LoginPage = () => {
  const classes = useStyles();
  const { userAuthenticated } = useUser();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    setLoading(true);
    setErrors({});

    UserService.login(data)
      .then((user) => {
        userAuthenticated(user);
      })
      .catch((...data) => catchFieldErrors(setErrors, ...data))
      .then(() => setLoading(false));
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <img
          className={classes.logo}
          alt='avatar'
          src='https://avatars3.githubusercontent.com/u/63467770?s=400&u=0305324cc94aa96af2dbed2106a05e8017573fe4&v=4'
        />
        <Typography component='h1' variant='h5'>
          Sign In To Your Account
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            required
            err={errors.email}
            fullWidth
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            err={errors.password}
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {loading ? <CircularProgress color='inherit' size={'2rem'} /> : 'Sign In'}
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    margin: theme.spacing(1),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));
