import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from 'context/UserProvider';
import theme from 'common/theme';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';

const Bootstrap = (props) => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          {props.children}
        </MuiThemeProvider>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default Bootstrap;
