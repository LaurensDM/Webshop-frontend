import {
  Button,
  IconButton,
  Paper,
} from '@mui/material';
import {
  Box,
  styled,
} from '@mui/system';
import slideInRight from '../../components/animation/animation';
import {
  Colors,
} from '../theme';

export const ProductContainer = styled(Paper)(({
  theme,
}) => ({
  display: 'flex',
  width: '2rem 2rem 2rem 2rem',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '12px 10px 10px 10px ',
  flexDirection: 'column',
  cursor: 'pointer',
  [theme.breakpoints.up('md')]: {
    position: 'relative',
    '&:hover': {
      transform: 'scale(1.09)',

    },
  },
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  transition: 'transform 0.3s ease',

}));

export const ProductImage = styled('img')(({
  src,
  theme,
}) => ({
  src: `url(${src})`,
  width: '50%',
  height: '50%',
  borderRadius: '0 0 25px 0',
  [theme.breakpoints.down('lg')]: {
    width: '80%',
    height: '80%',

  },

}));
export const ProductDetailImage = styled('img')(({
  src,
  theme,
}) => ({
  src: `url(${src})`,

  height: '100%',

  borderRadius: '0 0 25px 0',
  [theme.breakpoints.down('md')]: {

    height: '50%',
    padding: '12px',
  },
}));

export const ProductActionButton = styled(IconButton)(() => ({
  background: Colors.white,
  margin: 4,
}));

export const ProductInfoWrapper = styled(Box)(() => ({
  padding: 4,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

export const ProductActionsWrapper = styled(Box, { shouldForwardProp: (prop) => prop !== 'show' })(({
  show,
  theme,
}) => ({
  [theme.breakpoints.up('lg')]: {
    display: show ? 'visible' : 'none',
    position: 'absolute',
    right: 0,
    top: '2%',
    animation:
            show
            && `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
}));
export const ProductAddToCart = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'show',
})(({
  show,
  theme,
}) => ({
  width: '120px',
  fontSize: '12px',

  [theme.breakpoints.up('md')]: {

    width: '160px',

  },
  [theme.breakpoints.up('lg')]: {
    width: '100px',

  },
  background: Colors.secondary,
  opacity: 0.9,
}));