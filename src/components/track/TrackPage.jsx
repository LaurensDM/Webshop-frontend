import {
  Box, Link, TextField, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { React, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import useDelivery from '../../api/delivery';
import JPaper from '../../styles/jPaper';
import LPaper from '../../styles/lPaper';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

export default function TrackPage() {
  const { t } = useTranslation();
  const [trackAndtrace, setTrack] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const navigate = useNavigate();
  const { track } = useDelivery();
  const { handleSnackbar } = useSnackbarContext();

  const handleTrackChange = (e) => {
    setTrack(e.target.value);
  };

  const handleVerificationChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleClick = async () => {
    try {
      const delivery = await track(trackAndtrace, verificationCode);
      navigate(`/track/${trackAndtrace}/${verificationCode}`, { state: { delivery } });
    } catch (error) {
      handleSnackbar({
        content: `${error.response.data.code} ${error.message}`,
        severity: 'error',
      });
    }
  };

  return (
    <>
      <LPaper>
        <Typography variant="h4">Shipment Track</Typography>
      </LPaper>
      <JPaper>

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
        >
          <TextField
            id="standard-basic"
            label="Track&Trace"
            required
            type="email"
            data-cy=""
            variant="standard"
            autoComplete=""
            onChange={handleTrackChange}
          />
          <TextField
            id="standard-input"
            label={t('VerificationCode')}
            required
            type="text"
            data-cy=""
            variant="standard"
            autoComplete=""
            onChange={handleVerificationChange}
          />
          <LoadingButton variant="contained" data-cy="submit_login" onClick={handleClick}>
            Track
          </LoadingButton>

        </Box>
        <Typography variant="p">
          Do you have an account? Try viewing your
          {' '}
          <Link sx={{ mx: 'auto', width: '100%' }} component={RouterLink} to="/orders">orders</Link>
          .
        </Typography>
      </JPaper>
    </>
  );
}