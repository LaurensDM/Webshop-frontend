import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { Colors } from '../theme';

export const BannerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  marginTop: '100px',
  borderRadius: '25px 25px 0 0',
  background: Colors.light_gray,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const BannerContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  maxWidth: 420,
  padding: '30px',
}));

export const BannerTitle = styled(Typography)(({ theme }) => ({
  lineHeight: 1.5,
  fontSize: '72px',
  marginBottom: '20px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '42px',
  },
}));

export const BannerImage = styled('img')(({ src, theme }) => ({
  src: `${src}`,
  width: '630px',
  [theme.breakpoints.down('md')]: {
    width: '50%',
    height: '50%',
  },
  [theme.breakpoints.down('sm')]: {
    width: '50%',
    height: '50%',
    alignItems: 'center',
  },
}));

export const BannerDescription = styled(Typography)(({ theme }) => ({
  lineHeight: 1.25,
  letterSpacing: 1.25,
  marginBottom: '3em',
  [theme.breakpoints.down('md')]: {
    lineHeight: 1.15,
    letterSpacing: 1.15,
    marginBottom: '1.5em',
  },
}));