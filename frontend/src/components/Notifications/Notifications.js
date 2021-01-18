import React from 'react';
import { Snackbar, Fade } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

import useApp from 'context/AppProvider';

const Notifications = () => {
  const { notifications, onNotificationClose } = useApp();

  return Object.values(notifications).map((n) => (
    <Snackbar
      anchorOrigin={{
        vertical: n.vertical || 'bottom',
        horizontal: n.horizontal || 'right',
      }}
      open={true}
      autoHideDuration={n.hideIn || 3000}
      onClose={() => onNotificationClose(n.id)}
      transitioncomponent={Fade}
      key={n.id}
    >
      <Alert
        elevation={6}
        variant='filled'
        onClose={() => onNotificationClose(n.id)}
        severity={n.status || 'success'}
      >
        {n.text}
      </Alert>
    </Snackbar>
  ));
};

export default Notifications;
