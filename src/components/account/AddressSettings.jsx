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

export default function AddressSettings() {
  const { t } = useTranslation();
  const { handleSnackbar } = useSnackbarContext();
  const userApi = useUser();
  const [changed, setChanged] = useState(false);
  const [oldValue, setOldValue] = useState({});

  const [editing, setEditing] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [saving, setSaving] = useState(false);

  const [street, setStreet] = useState('');
  const [streetNumber, setStreetNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const setAll = (address) => {
    setStreet(address.street || '');
    setStreetNumber(address.streetNumber || '');
    setZipCode(address.zipCode || '');
    setCity(address.city || '');
    setCountry(address.country || '');
  };

  async function getCurrentUser() {
    const newFormattedUser = await userApi.getFormattedUserWithToken();
    const { address } = newFormattedUser;
    setOldValue(address);
    setAll(address);
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
      street,
      streetNumber,
      zipCode,
      city,
      country,
    };
    try {
      await userApi.update(changedValues);
      handleSnackbar({
        content: t('AddressInfoSaved'),
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
              : <TextField id="standard-basic" disabled={!editing} value={street} onChange={handleChange(setStreet, oldValue.street)} label={t('Street')} variant="standard" />
          }
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={streetNumber} onChange={handleChange(setStreetNumber, oldValue.streetNumber)} label={t('Number')} variant="standard" />
          }
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={zipCode} onChange={handleChange(setZipCode, oldValue.zipCode)} label={t('ZipCode')} variant="standard" />
          }
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={city} onChange={handleChange(setCity, oldValue.city)} label={t('City')} variant="standard" />
          }
          {
            loadingAddress
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={country} onChange={handleChange(setCountry, oldValue.country)} label={t('Country')} variant="standard" />
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