import { Copyright } from '@mui/icons-material';
import {
  Box, Grid, Link, List, ListItemText, Typography, useMediaQuery,
} from '@mui/material';

import React from 'react';
import { useTranslation } from 'react-i18next';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { useNavigate } from 'react-router-dom';

import theme, { Colors } from '../../styles/theme';
import FooterTitle from '../../styles/footer';

export default function StickyFooter() {
  const { t } = useTranslation();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  function HandleAboutClick() {
    navigate('/home');
    setTimeout(() => {
      const aboutUsPaper = document.getElementById('AboutUsPaper');
      aboutUsPaper.scrollIntoView({
        behavior: 'smooth',
      }, true);
    }, 300);
  }
  return (
    <>
      <Box
        sx={{
          background: Colors.bottom,

          color: Colors.white,
          p: { xs: 4, md: 4 },
          pt: 6,
          pb: 6,
          fontSize: { xs: '12px', md: '14px' },
        }}
      >

        <Link variant="h4" href="https://www.delaware.pro/en-be" sx={{ color: 'inherit' }}>delaware</Link>

        <Grid container spacing={2} justifyContent="center">
          <Grid item md={6} lg={4}>
            <FooterTitle variant="body1">{t('AboutUs')}</FooterTitle>
            <Typography variant="caption2">
              {t('FooterCap')}
            </Typography>
            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,

              }}
            >
              <Link
                sx={{
                  color: 'inherit',
                  mr: 1,
                  '&:hover': {
                    color: Colors.primary,
                    cursor: 'pointer',
                  },
                }}
                href="https://www.facebook.com/delawareBeLux"
              >
                <FacebookIcon />

              </Link>
              <Link
                sx={{
                  color: 'inherit',
                  mr: 1,
                  '&:hover': {
                    color: Colors.primary,
                    cursor: 'pointer',
                  },
                }}
                href="https://twitter.com/delawareBeLux"
              >
                <TwitterIcon />

              </Link>
              <Link
                sx={{
                  color: 'inherit',
                  '&:hover': {
                    color: Colors.primary,

                    cursor: 'pointer',
                  },
                }}
                href="https://www.instagram.com/delawarebelux/"
              >
                {' '}
                <InstagramIcon />

              </Link>
            </Box>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant="body1">{t('information')}</FooterTitle>
            <List>
              <ListItemText>
                <Typography
                  sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}
                  lineHeight={2}
                  variant="caption2"
                  onClick={() => HandleAboutClick()}
                >
                  {t('AboutUs')}
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }} lineHeight={2} variant="caption2" onClick={() => navigate('/track')}>
                  {t('OrderTracking')}
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }} lineHeight={2} variant="caption2" onClick={() => navigate('/about')}>
                  {t('PrivacyPolicy')}
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography lineHeight={2} variant="caption2" onClick={() => navigate('/about')}>
                  {t('TermsConditions')}
                </Typography>
              </ListItemText>
            </List>
          </Grid>
          <Grid item md={6} lg={2}>
            <FooterTitle variant="body1">{t('myaccount')}</FooterTitle>
            <List>
              <ListItemText>
                <Typography sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }} lineHeight={2} variant="caption2" onClick={() => navigate('/authentication')}>
                  {t('Login')}
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }} lineHeight={2} variant="caption2" onClick={() => navigate('/cart')}>
                  {t('MyCart')}
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }} lineHeight={2} variant="caption2" onClick={() => navigate('/account')}>
                  {t('MyAccount')}
                </Typography>
              </ListItemText>
              <ListItemText>
                <Typography sx={{ '&:hover': { cursor: 'pointer', textDecoration: 'underline' } }} lineHeight={2} variant="caption2" onClick={() => navigate('/notifications')}>
                  {t('Notifications')}
                </Typography>
              </ListItemText>
            </List>
          </Grid>

        </Grid>
      </Box>

      <Box sx={{

        backgroundColor: Colors.white,

      }}
      >
        <Typography
          variant="body1"
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: { lg: '30px', sm: '15px' },

          }}
        >
          <Copyright fontSize="sm" />
          2023 Delaware Consulting CV - BE 0479 117 543
        </Typography>

      </Box>
    </>
  );
}