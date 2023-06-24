import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useLocation, useParams } from 'react-router';
import { Container, Typography } from '@mui/material';
import { React, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RedeemIcon from '@mui/icons-material/Redeem';
import HomeIcon from '@mui/icons-material/Home';
import JPaper from '../../styles/jPaper';
import useDelivery from '../../api/delivery';
import LPaper from '../../styles/lPaper';
import { Colors } from '../../styles/theme';

export default function Track() {
  const { t } = useTranslation();
  const { state } = useLocation();
  const { track } = useDelivery();
  const params = useParams();
  const [delivery, setDelivery] = useState({
    transporter: {
      name: '',
      email: '',
      phone: '',
    },
    street: '',
    number: '',
    zipCode: '',
    city: '',
    country: '',
    additionalInformation: '',
    deliveryStatus: 0,
  });

  const steps = [
    { icon: <RedeemIcon />, id: 1 },
    { icon: <LocalShippingIcon />, id: 2 },
    { icon: <HomeIcon />, id: 3 },

  ];

  useEffect(() => {
    async function fetchDelivery() {
      if (!state) {
        const data = await track(params.trackCode, params.verificationCode);

        setDelivery(data);
      } else {
        setDelivery(state.delivery);
      }
    }
    fetchDelivery();
  }, []);

  console.log(delivery);
  return (
    <Container>

      <LPaper>
        <Typography variant="h4">Shipment Track</Typography>
      </LPaper>
      <JPaper sx={{ backgroundColor: Colors.light_gray, padding: '0' }}>
        <Box sx={{
          backgroundColor: '#c42828', color: 'white', borderRadius: '25px 25px 0 0',
        }}
        >
          <Typography variant="h4">
            Order Tracking:
            {params.trackCode}
            {' '}
          </Typography>

        </Box>
        <Box sx={{ backgroundColor: '#ec4842', color: 'white' }}>
          <Typography variant="h6">
            {t('TransportService')}
            :
            <br />
            {delivery.transporter.name}
          </Typography>
          <br />
          <Typography variant="body1">
            {t('Address')}
            :
            <br />
            {`${delivery.street} ${delivery.number}, ${delivery.zipCode} ${delivery.city}, ${delivery.country}`}
          </Typography>
          <br />
          <Typography>
            {t('AdditionalInformation')}
            :
            <br />
            {delivery.additionalInformation ? delivery.additionalInformation : 'No additional information'}
          </Typography>

        </Box>

        <Box sx={{ marginTop: '5%' }}>
          <Stepper activeStep={delivery.deliveryStatus} alternativeLabel>
            {steps.map((label) => (
              <Step key={label.id}>
                <StepLabel>{label.icon}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </JPaper>
    </Container>
  );
}