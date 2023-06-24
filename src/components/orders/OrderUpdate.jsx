import {
  Box, Button, Grid, IconButton, Menu, MenuItem, Skeleton, TextField, Typography,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Save as SaveIcon, Edit as EditIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import JPaper from '../../styles/jPaper';
import LPaper from '../../styles/lPaper';
import usePackage from '../../api/packaging';
import useOrders from '../../api/order';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

export default function OrderUpdate() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { getAll } = usePackage();
  const [option, setOption] = useState('Choose your packaging method');
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [editing, setEditing] = useState(false);
  const [changed, setChanged] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const [saving, setSaving] = useState(false);
  const [street, setStreet] = useState(state.order.street);
  const [streetNumber, setStreetNumber] = useState(state.order.streetNumber);
  const [zipCode, setZipCode] = useState(state.order.zipCode);
  const [city, setCity] = useState(state.order.city);
  const [country, setCountry] = useState(state.order.country);
  const [packaging, setPackaging] = useState([]);
  const [packageOption, setPackageOption] = useState({});
  const orderApi = useOrders();
  const { handleSnackbar } = useSnackbarContext();

  const setAll = () => {
    setStreet(state.order.street);
    setStreetNumber(state.order.streetNumber);
    setZipCode(state.order.zipCode);
    setCity(state.order.city);
    setCountry(state.order.country);
  };

  const handleCancelEdit = () => {
    setAll();
    setEditing(false);
  };
  const saveChanges = async () => {
    setSaving(true);
    const changedValues = {
      id: state.order.orderId,
      packagingId: packageOption.id,
      street,
      number: streetNumber,
      zipCode,
      city,
      country,
    };
    try {
      await orderApi.update(changedValues);
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
    // setOldValue(changedValues);
    setChanged(false);
    setEditing(false);
    setSaving(false);
  };

  const handleChange = (setter, original) => (event) => {
    setChanged(true);
    setter(event.target.value);
    if (event.target.value === original) {
      setChanged(false);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (packageOptione) => {
    if (packageOptione.name) {
      setOption(packageOptione.name);
    }
    setPackageOption(packageOptione);
    setAnchorEl(null);
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
    async function handleSetup() {
      const data = await getAll();
      setPackaging(data);
      setLoadingOrder(false);
    }
    handleSetup();
  }, []);

  return (
    <>
      <LPaper>
        <Typography variant="h4">Update</Typography>
      </LPaper>
      {' '}
      <JPaper sx={{ height: '300px' }}>
        <IconButton onClick={handleIconButton}>
          {editing ? <CancelIcon /> : <EditIcon />}
        </IconButton>
        <Box>
          {
            loadingOrder
              ? <Skeleton sx={{ m: 1 }} />
              : (
                <TextField
                  id="standard-basic"
                  disabled={!editing}
                  value={street}
                  onChange={handleChange(setStreet, state.order.street)}
                  label={t('Street')}
                  variant="standard"
                />
              )
          }
          {
            loadingOrder
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={streetNumber} onChange={handleChange(setStreetNumber, state.order.streetNumber)} label={t('Number')} variant="standard" />
          }
          {
            loadingOrder
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={zipCode} onChange={handleChange(setZipCode, state.order.zipCode)} label={t('ZipCode')} variant="standard" />
          }
          {
            loadingOrder
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={city} onChange={handleChange(setCity, state.order.city)} label={t('City')} variant="standard" />
          }
          {
            loadingOrder
              ? <Skeleton sx={{ m: 1 }} />
              : <TextField id="standard-basic" disabled={!editing} value={country} onChange={handleChange(setCountry, state.order.country)} label={t('Country')} variant="standard" />
          }
          <Grid item xs={12} sm={12} sx={{}} marginTop="20px">
            <Button
              id="demo-customized-button"
              aria-controls={open ? 'demo-customized-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              variant="contained"
              disableElevation
              onClick={handleClick}
              endIcon={<KeyboardArrowDownIcon />}
            >
              {option}
            </Button>
            <Menu
              id="demo-customized-menu"
              MenuListProps={{
                'aria-labelledby': 'demo-customized-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              {packaging.map((packageOptione) => (
                <MenuItem key={packageOptione.id} onClick={() => handleClose(packageOptione)} disableRipple>
                  {`${packageOptione.name} €${packageOptione.price}`}
                </MenuItem>
              ))}
            </Menu>

          </Grid>
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