import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, TextField,
} from '@mui/material';
import { useSnackbarContext } from './SnackbarProvider';

export const DialogContext = createContext();
export const useDialogContext = () => useContext(DialogContext);

export default function DialogProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [object, setObject] = useState({});
  const [isCart, setIsCart] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [moreInfo, setMoreInfo] = useState('');
  const [cancelText, setCancelText] = useState('');
  const [confirmText, setConfirmText] = useState('');
  const [ifErrorText, setIfErrorText] = useState('');
  const [ifSuccessText, setIfSuccessText] = useState('');

  const { handleSnackbar } = useSnackbarContext();

  const handleDialog = async (params) => {
    setObject(params);
    setIsCart(params.isCart);
    setTitle(params.title || '');
    setContent(params.content || '');
    setMoreInfo(params.moreInfo || '');
    setCancelText(params.cancelText || 'cancel');
    setConfirmText(params.confirmText || 'confirm');
    setIfErrorText(params.ifErrorText || 'Operation failed!');
    setIfSuccessText(params.ifSuccessText || 'Operation succeeded!');
    setOpen(true);
  };

  const clearAllUseStates = () => {
    setObject({});
    setIsCart(false);
    // setOnConfirm(null);
    setTitle('');
    setContent('');
    setMoreInfo('');
    setCancelText('');
    setConfirmText('');
    setIfErrorText('');
    setIfSuccessText('');
    setLoading(false);
    setOpen(false);
  };

  const handlePassedFunction = async () => {
    setLoading(true);
    if (object.onConfirm) {
      try {
        if (object.isCart) {
          const amount = document.getElementById('amount').value;
          object.onConfirm(amount);
        } else {
          await object.onConfirm();
        }
      } catch (error) {
        clearAllUseStates();
        handleSnackbar({
          content: `${ifErrorText}`,
          severity: 'error',
        });
        return;
      }
    } else {
      handleSnackbar({
        content: 'Operation failed: no function was defined please report this!',
        severity: 'warning',
      });
    }
    if (ifSuccessText) {
      handleSnackbar({
        content: ifSuccessText,
        severity: 'success',
      });
    }
    setLoading(false);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handlePassedFunction();
  };

  const value = useMemo(() => ({
    handleDialog,
  }), [handleDialog]);

  return (
    <DialogContext.Provider value={value}>
      {children}
      <Dialog
        open={open}
        onClose={handleCancel}
        fullWidth
        sx={{ backdropFilter: 'blur(5px)' }}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {moreInfo}
          </DialogContentText>
          {isCart ? (
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              data-cy="amountField"
            />
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>{cancelText}</Button>
          <LoadingButton data-cy="confirmButton" variant="contained" onClick={handleConfirm} loading={loading} autoFocus>
            {confirmText}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </DialogContext.Provider>
  );
}