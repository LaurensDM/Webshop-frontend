import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

import {
  Snackbar, Alert, Slide, useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { SnackbarProvider, useSnackbar } from 'notistack';
export const SnackbarContext = createContext();
export const useSnackbarContext = () => useContext(SnackbarContext);

function Transition(props) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  return <Slide {...props} direction={matches ? 'left' : 'up'} />;
}

export function SnackbarProvider({ children }) {
  // for custom snackbar component
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [severity, setSeverity] = useState('success');
  const [autoHideDuration, setAutoHideDuration] = useState(3000);
  const [transition, setTransition] = useState(undefined);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const handleSnackbar = async (params) => {
    setContent(params.content);
    setSeverity(params.severity || 'success');
    setAutoHideDuration(params.duration || 3000);
    setOpen(true);
    setTransition(() => Transition);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const value = useMemo(() => ({
    handleSnackbar,
  }), [handleSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        sx={{ mt: { xs: '60px', md: '60px' } }}
        open={open}
        anchorOrigin={matches ? { vertical: 'top', horizontal: 'center' } : { vertical: 'bottom', horizontal: 'left' }}
        // TransitionComponent={transition}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }} data-cy="testSnack">
          {content}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}