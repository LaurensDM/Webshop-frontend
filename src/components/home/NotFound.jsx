import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button, Box, Typography,
} from '@mui/material';
import JPaper from '../../styles/jPaper';
import { PageContainer } from '../../styles/appbar';

export default function NotFound() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '65vh',
        }}
      >
        <JPaper>
          <Typography variant="h1">
            404
          </Typography>
          <Typography variant="h5">
            {t('ThePageYourLookingForDoesntExist')}
          </Typography>
          <Button variant="contained" LinkComponent={RouterLink} to="/home">{t('BackHome')}</Button>
        </JPaper>

      </Box>

    </PageContainer>
  );
}