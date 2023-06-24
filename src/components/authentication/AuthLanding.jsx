import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { Navigate, Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAuthContext } from '../../context/AuthProvider';
import JPaper from '../../styles/jPaper';

export default function AuthLanding() {
  const { isAuth } = useAuthContext();
  const { t } = useTranslation();

  if (!isAuth) {
    return (
      <Box sx={{
        display: 'flex', flexDirection: 'column', minHeight: '65vh', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <JPaper>
          <Box>
            <Typography variant="h4">{t('LoginRequired')}</Typography>
            <Typography variant="p">{t('YouNeedToLoginToAccessThisPage')}</Typography>
          </Box>
          <Button component={RouterLink} to="/login">{t('GoToLogin')}</Button>
        </JPaper>
      </Box>
    );
  }
  return <Navigate to="/account" />;
}