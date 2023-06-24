import {
  AppBar, Box, Button, Container, Paper, Step, StepLabel, Stepper, Toolbar, Typography,
} from '@mui/material';
import { round } from 'lodash';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router';

import useOrders from '../../api/order';
import { useCartContext } from '../../context/CartProvider';
import { useDialogContext } from '../../context/ui/DialogProvider';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

import AddressForm from './AddressForm';
import PackagingMethod from './PackagingMethod';
import PaymentForm from './PaymentForm';
import Review from './Review';

export default function Checkout() {
  const steps = ['Shipping address', 'Packaging Method', 'Payment Details', 'Review your order'];
  const { handleDialog } = useDialogContext();
  const { t } = useTranslation();
  const { handleSnackbar } = useSnackbarContext();
  const { state } = useLocation();
  const { getCart, resetCart } = useCartContext();
  const orderApi = useOrders();
  const products = getCart();
  const [disabled, setDisabled] = useState(true);
  const [addressDetails, setAddressDetails] = useState({
    firstName: '',
    lastName: '',
    street: '',
    streetNumber: '',
    zipCode: '',
    city: '',
    country: '',
  });
  const [packagingMethod, setPackagingMethod] = useState('');
  const [paymentDetails, setPaymentDetails] = useState({
    NameOnCard: '',
    CardNumber: '',
    ExpiryDate: '',
    CVV: '',
  });
  const [order, setOrder] = useState({
    orderReference: '',
  });

  const handleAddress = (newAddress) => {
    const newAddressObject = {
      firstName: newAddress.get('firstName'),
      lastName: newAddress.get('lastName'),
      street: newAddress.get('street'),
      streetNumber: newAddress.get('streetNumber'),
      zipCode: newAddress.get('zipCode'),
      city: newAddress.get('city'),
      country: newAddress.get('country'),
    };
    setAddressDetails(newAddressObject);
  };
  const handlePaymentDetails = (newPayment) => {
    const newPaymentDetailsObject = {
      nameOnCard: newPayment.get('NameOnCard'),
      cardNumber: newPayment.get('CardNumber'),
      expiryDate: newPayment.get('ExpiryDate'),
      CVV: newPayment.get('CVV'),

    };
    setPaymentDetails(newPaymentDetailsObject);
  };

  const handlePackaging = (newPackaging) => {
    setPackagingMethod(newPackaging);
  };

  const getStepContent = (step) => {
    switch (step) {
    case 0:
      return <AddressForm setDisabled={setDisabled} handleAddress={handleAddress} addressDetails={addressDetails} />;
    case 1:
      return <PackagingMethod setDisabled={setDisabled} handlePackaging={handlePackaging} />;
    case 2:
      return <PaymentForm setDisabled={setDisabled} handlePaymentDetails={handlePaymentDetails} paymentDetails={paymentDetails} />;
    case 3:
      return <Review state={state} addressDetails={addressDetails} packagingMethod={packagingMethod} paymentDetails={paymentDetails} />;
    default:
      throw new Error('Unknown step');
    }
  };
  const [activeStep, setActiveStep] = useState(0);
  const handleCancelOrder = () => {
    handleSnackbar({ content: 'Cancelled placing order', severity: 'error' });
  };
  const handlePlaceOrder = async () => {
    const pr = [];
    products.forEach((product) => {
      const newProduct = {
        id: product[0].id,
        quantity: product[1],
        netPrice: product[0].price,
      };
      pr.push(newProduct);
    });
    const tax = round((state.netto + packagingMethod.price) * 0.06, 2);
    const newOrder = {
      packagingId: packagingMethod.id,
      netPrice: state.netto,
      taxPrice: tax,
      totalPrice: state.netto + packagingMethod.price + tax,
      products: pr,
      street: addressDetails.street,
      number: addressDetails.streetNumber,
      zipCode: addressDetails.zipCode,
      city: addressDetails.city,
      country: addressDetails.country,
      additionalInformation: '',

    };
    const data = await orderApi.create(newOrder);
    setOrder(data);
    setActiveStep(activeStep + 1);
    handleSnackbar({ content: t('SuccesfullyPlacedOrder'), severity: 'success' });
    resetCart();
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleDialog({
        title: t('PlaceOrder'),
        content: t('OrderPlaceConfirmation'),
        confirmText: t('PLACEORDER'),
        ifErrorText: t('FailedToPlaceOrder'),
        onabort: handleCancelOrder,
        onConfirm: handlePlaceOrder,
      });
    } else {
      setActiveStep(activeStep + 1);
      setDisabled(true);
    }
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    setDisabled(false);
  };

  return (
    <Container sx={{
      mx: 'auto',
      marginBottom: '80px',

    }}
    >
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative', width: '300px', margin: '0 auto', padding: '5px', borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar sx={{ textAlign: 'center' }}>
          <Typography sx={{ textAlign: 'center', mx: 'auto' }} variant="h6">Qwict</Typography>
        </Toolbar>

      </AppBar>
      <Container maxWidth="md" sx={{ mb: 4 }}>
        <Paper sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            {t('Checkout')}
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: { sm: 3 }, pb: { sm: 5 }, display: { xs: 'block', sm: 'flex' } }}>
            {steps.map((label) => (
              <Step sx={{ mb: { xs: '10px', md: 0 } }} key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Container>
              <Typography variant="h5" gutterBottom>
                {t('ThankYouForYourOrder')}
              </Typography>
              <Typography variant="subtitle1">
                {`${t('YourOrderNumber')} ${order.map((el) => `${el.orderReference} `)}. ${t('OrderConfirmation')}`}
              </Typography>
            </Container>
          ) : (
            <Container>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    {t('Back')}
                  </Button>
                )}

                <Button
                  variant="contained"
                  disabled={activeStep === steps.length - 1 ? false : disabled}
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>

              </Box>
            </Container>
          )}
        </Paper>
      </Container>
    </Container>
  );
}