import {
  Button,
  Checkbox, FormControlLabel, Grid, TextField, Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

export default function PaymentForm({ setDisabled, handlePaymentDetails, paymentDetails }) {
  const { t } = useTranslation();
  const { handleSnackbar } = useSnackbarContext();
  const submit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('NameOnCard', e.target[0].value);
    data.append('CardNumber', e.target[1].value);
    data.append('ExpiryDate', e.target[2].value);
    data.append('CVV', e.target[3].value);
    handlePaymentDetails(data);
    if (paymentDetails.nameOnCard) {
      handleSnackbar({
        content: t('Succesfully saved payment option'),
        severity: t('success'),
      });
    }

    setDisabled(false);
  };

  return (
    <Container>
      <form onSubmit={submit}>
        <Typography variant="h6">
          {t('PaymentMethod')}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField required name="Name on card" label={t('NameOnCard')} fullWidth variant="standard" defaultValue={paymentDetails.nameOnCard} />

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField required name="CardNumber" label={t('CardNumber')} fullWidth variant="standard" defaultValue={paymentDetails.cardNumber} />

          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Expiry date"
              name="Expiry date"
              label={t('ExpiryDate')}
              fullWidth
              variant="standard"
              defaultValue={paymentDetails.expiryDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="CVV"
              name="CVV"
              label="CVV"
              helperText={t('LastThreeDigitsOnSignatureStrip')}
              fullWidth
              variant="standard"
              defaultValue={paymentDetails.CVV}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveCard" value="yes" />}
              label={t('RememberCreditCardDetailsForNextTime')}
            />
          </Grid>
        </Grid>
        <Button type="submit">{t('Save')}</Button>
      </form>
    </Container>
  );
}