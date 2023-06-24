import React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import logo from '../../images/Delaware-logoBlack.svg.png';
import {
  BannerContainer,
  BannerContent,
  BannerDescription,
  BannerImage,
  BannerTitle,
} from '../../styles/banner';

export default function Banner() {
  const { t } = useTranslation();
  return (
    <BannerContainer sx={{
      color: 'white', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundImage: 'url("https://www.delaware.pro/r-images/banner-20y/banner-20y.webp?mode=autocrop&w=1600&h=450&attachmenthistoryguid=0baa7531-7259-47d0-a4ae-4028d23ab671&v=&focusX=1004&focusY=193&c=c8a95def077d9d878f8ff263fecb2a826f2b0840e3b5adb0957d1d46bdd2175a")',
    }}
    >
      <BannerContent sx={{ mr: 'auto' }}>
        <Typography variant="h6" data-cy="homeBanner">{t('ShipWithConfidence')}</Typography>
        <BannerTitle variant="h2" data-cy="translateHeader">{t('Interested')}</BannerTitle>

        <BannerDescription variant="subtitle" sx={{ fontSize: '20px' }}>
          {t('BannerDescription')}
        </BannerDescription>
      </BannerContent>
    </BannerContainer>
  );
}