import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useDataLayer } from '../DataLayer/DataLayer';

export default function SnackError () {
  const { state, dispatch } = useDataLayer();

  const handleClose = () => dispatch({ type: 'OPEN_LOGIN_SNACK', payload: false });

  return (
    <Snackbar
        open={state.openLoginSnack || false}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MuiAlert
        elevation={6}
        variant='filled'
        onClose={handleClose}
        severity={state.snackType}
      >
        {state.snackMessage}
      </MuiAlert>
    </Snackbar>
  );
}
