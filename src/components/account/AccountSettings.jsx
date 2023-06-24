import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {
  Skeleton, TextField, Box, IconButton,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save as SaveIcon, Edit as EditIcon, Cancel as CancelIcon } from '@mui/icons-material';

import JPaper from '../../styles/jPaper';
import useUser from '../../api/user';

import { useSnackbarContext } from '../../context/ui/SnackbarProvider';
import { useAuthContext } from '../../context/AuthProvider';

export default function AccountSettings() {
  const { t } = useTranslation();
  const { handleSnackbar } = useSnackbarContext();
  const { verify } = useAuthContext();

  const userApi = useUser();
  const [changed, setChanged] = useState(false);
  const [oldValue, setOldValue] = useState({});

  const [editing, setEditing] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const setAll = (user) => {
    setName(user.name || '');
    setEmail(user.email || '');
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
  };

  async function getCurrentUser() {
    const newFormattedUser = await userApi.getFormattedUserWithToken();
    setOldValue(newFormattedUser);
    setAll(newFormattedUser);
    setLoadingAddress(false);
  }

  const handleChange = (setter, original) => (event) => {
    setChanged(true);
    setter(event.target.value);
    if (event.target.value === original) {
      setChanged(false);
    }
  };

  const saveChanges = async () => {
    setSaving(true);
    const changedValues = {
      name,
      email,
      firstName,
      lastName,
    };
    try {
      await userApi.update(changedValues);
      await verify();
      handleSnackbar({
        content: t('UserInfSaved'),
        severity: t('success'),
      });
    } catch (e) {
      handleSnackbar({
        content: `Failed to updated: ${e.message}`,
        severity: 'error',
      });
    }
    setOldValue(changedValues);
    setChanged(false);
    setEditing(false);
    setSaving(false);
  };

  const handleCancelEdit = () => {
    setAll(oldValue);
    setEditing(false);
  };

  const handleIconButton = () => {
    if (editing) {
      handleCancelEdit();
      setChanged(false);
    } else {
      setEditing(true);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <>
      <JPaper sx={{ height: '300px' }}>
        <IconButton onClick={handleIconButton}>
          {editing ? <CancelIcon /> : <EditIcon />}
        </IconButton>
        <Box>
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField data-cy="testChangeUsername" id="standard-basic" disabled={!editing} value={name} onChange={handleChange(setName, oldValue.name)} label="Alias" variant="standard" />
          }
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField data-cy="testChangeEmail" id="standard-basic" disabled={!editing} value={email} onChange={handleChange(setEmail, oldValue.email)} label={t('Email')} variant="standard" />
          }
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={firstName} onChange={handleChange(setFirstName, oldValue.firstName)} label={t('FirstName')} variant="standard" />
          }
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={lastName} onChange={handleChange(setLastName, oldValue.lastName)} label={t('LastName')} variant="standard" />
          }
        </Box>
      </JPaper>
      <LoadingButton
        loading={saving}
        onClick={saveChanges}
        disabled={!changed}
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
      >
        {t('Save')}
      </LoadingButton>
    </>
  );
}