import { Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import JPaper from '../../styles/jPaper';

export default function Wishlist() {
  const { t } = useTranslation();
  return (
    <JPaper>
      <Typography variant="h4">{t('MyWishlist')}</Typography>
    </JPaper>
  );
}