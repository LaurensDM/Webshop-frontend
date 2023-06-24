import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import { Colors } from '../theme';

export const PromotionsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    padding: '10px 0px 10px 0px',
    fontSize: '30px',
  },
  borderRadius: '0 0 25px 25px',
  fontSize: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 0px 10px 0px',
  overflow: 'hidden',
  background: '#ec4842',
}));

export const MessageText = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    fontSize: '3rem',
  },
  color: Colors.white,
  fontSize: '1.5rem',
}));