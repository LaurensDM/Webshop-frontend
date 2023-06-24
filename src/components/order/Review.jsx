import {
  Container, Grid, List, ListItem, ListItemText, Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import accounting from 'accounting-js';
import { useCartContext } from '../../context/CartProvider';

export default function Review({
  state, addressDetails,
  packagingMethod,
  paymentDetails,
}) {
  const { getCart } = useCartContext();
  const products = getCart();
  const { t } = useTranslation();

  return (
    <Container>
      <Typography variant="h6" gutterBottom>{t('OrderSummary')}</Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem sx={{ py: 1 }}>
            <ListItemText primary={product[0].name} secondary={`x${product[1]}`} />
            <Typography variant="body2">
              {accounting.formatMoney(product[0].price, { symbol: '€', format: '%s%v' })}
            </Typography>
          </ListItem>
        ))}
        <ListItem>
          <ListItemText primary={packagingMethod.name} />
          <Typography variant="body2">
            {accounting.formatMoney(packagingMethod.price, { symbol: '€', format: '%s%v' })}
          </Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <Typography variant="h6">
            {t('Total')}
          </Typography>
          <Typography variant="subtitle1" sx={{ marginLeft: 'auto', fontWeight: 700 }}>
            {accounting.formatMoney((state.netto + packagingMethod.price) + (state.netto + packagingMethod.price) * 0.06, { symbol: '€', format: '%s%v' })}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t('Shipping')}
          </Typography>

          <Typography gutterBottom>
            {addressDetails.firstName}
            {' '}
            {addressDetails.lastName}
          </Typography>

          <Typography gutterBottom>

            {addressDetails.street}
            {' '}
            {addressDetails.streetNumber}
          </Typography>
          {addressDetails.city}
          {' '}
          {addressDetails.zipCode}
          <Typography gutterBottom>
            {addressDetails.country}

          </Typography>
        </Grid>
        <Grid container item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t('PaymentDetails')}
          </Typography>
          <Grid container>

            <>
              <Grid item xs={6}>
                <Typography gutterBottom>{t('CardType')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>Visa</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{t('CardHolder')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>
                  {t('MrMs')}

                  {' '}
                  {paymentDetails.nameOnCard}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography gutterBottom>{t('CardNumber')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>

                  {paymentDetails.cardNumber}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>{t('ExpiryDate')}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography gutterBottom>

                  {paymentDetails.expiryDate}
                </Typography>
              </Grid>
            </>

          </Grid>
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Packaging Option
          </Typography>

          <Typography gutterBottom>
            {packagingMethod}
          </Typography>

        </Grid> */}
      </Grid>
    </Container>
  );
}