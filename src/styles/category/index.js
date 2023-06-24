import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Colors } from '../theme';

export const CategoryContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '2rem 2rem 2rem 2rem',
  padding: '25px',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '10px',
  flexDirection: 'column',
  cursor: 'pointer',
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.09)',

    },

  },
  [theme.breakpoints.down('md')]: {
    margin: '50px',
    fontSize: '12px',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  transition: 'transform 0.3s ease',
}));

export const CategoryImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  height: '100%',
  borderRadius: '10px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '100%',

  },
}));

export const CategoryHeader = styled(Typography)(({ theme }) => ({
  fontSize: '50px',
  width: '100%',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '40px',
    width: '100%',
    height: '100%',

  },

}));