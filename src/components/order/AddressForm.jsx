import {
  Button,
  Checkbox,
  Container, FormControlLabel, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

export default function AddressForm({ handleAddress, setDisabled, addressDetails }) {
  const { t } = useTranslation();
  const { handleSnackbar } = useSnackbarContext();
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('firstName', e.target[0].value);
    data.append('lastName', e.target[1].value);
    data.append('street', e.target[2].value);
    data.append('streetNumber', e.target[3].value);
    data.append('city', e.target[4].value);
    data.append('zipCode', e.target[5].value);
    data.append('country', e.target[6].value);
    data.append('saveDetails', e.target[7].checked);

    if (e.target[7].checked) {
      handleSnackbar({
        content: t('SuccesfullySavedAddress'),
        severity: t('success'),
      });
    } else {
      handleSnackbar({
        content: t('SuccesfullyReceivedAddress'),
        severity: t('success'),
      });
    }

    handleAddress(data);
    setDisabled(false);
  };

  return (
    <Container>
      <form onSubmit={submit}>
        <Typography variant="h6">
          {t('ShippingAddress')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField required name="firstName" label={t('FirstName')} fullWidth autoComplete="givenName" variant="standard" defaultValue={addressDetails.firstName} />

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required name="lastName" label={t('LastName')} fullWidth autoComplete="givenName" variant="standard" defaultValue={addressDetails.lastName} />

          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="Street"
              name="Street"
              label={t('AddressLine1')}
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              defaultValue={addressDetails.street}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="StreetNumber"
              name="StreetNumber"
              label={t('AddressLine2')}
              fullWidth
              autoComplete="TBD"
              variant="standard"
              defaultValue={addressDetails.streetNumber}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="City"
              name="City"
              label={t('City')}
              fullWidth
              autoComplete="TBD"
              variant="standard"
              defaultValue={addressDetails.city}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Zip / Postal Code"
              name="Zip / Postal Code"
              label={t('ZipPostalCode')}
              fullWidth
              autoComplete="TBD"
              variant="standard"
              defaultValue={addressDetails.zipCode}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Country"
              name="Country"
              label={t('Country')}
              fullWidth
              autoComplete="TBD"
              variant="standard"
              defaultValue={addressDetails.country}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="saveAddress" />}
              label={t('UseThisAddressForPaymentDetails')}
            />
          </Grid>
        </Grid>
        <Button type="submit">{t('Save')}</Button>
      </form>
    </Container>
  );
}