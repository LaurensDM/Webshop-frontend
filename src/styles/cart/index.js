import { Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Colors } from '../theme';

export const ProductCartImage = styled('img')(({ src, theme }) => ({
  src: `url(${src})`,
  width: '40%',
  margin: '25px',
  padding: '10px',
  [theme.breakpoints.down('md')]: {
    width: '75px',
    padding: '12px',
  },
}));

export const ProductCartContainer = styled(Paper)(({ theme }) => ({

  margin: '20px auto',
  padding: '20px',
  fontSize: '1em',
  width: '80%',
  borderRight: `1px solid ${Colors.primary}`,
  borderRadius: '10px',
  textAlign: 'center',

}));