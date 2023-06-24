import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogTitle,
  Slide,
  Box,
  IconButton,
  DialogContent,
  Typography,
  Button,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@emotion/styled';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';
import { Colors } from '../../styles/theme';
import NoImageYet from '../../images/NoImageYet.jpg';
import { ProductContainer, ProductDetailImage } from '../../styles/product';
import { useCartContext } from '../../context/CartProvider';
import baseUrl from '../../api/image';

function SlideTransition(props) {
  return <Slide direction="down" {...props} />;
}

const ProductDetailWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(4),
}));

const ProductDetailInfoWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 500,
  lineHeight: 1.5,
}));

export default function ProductDetail({
  open, onClose, product, handleCartDialog,
}) {
  const { t } = useTranslation();
  const { addToCart } = useCartContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      TransitionComponent={SlideTransition}
      variant="permanant"
      open={open}
      fullScreen
    >
      <DialogTitle
        sx={{
          background: Colors.secondary,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {product.name}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ margin: '0 auto' }}>
        <ProductDetailWrapper
          display="flex"
          flexDirection={matches ? 'column' : 'row'}
        >
          <ProductContainer sx={{ mr: 4 }}>
            <ProductDetailImage
              src={product.image ? `${baseUrl}/${product.image}` : NoImageYet}
            />
          </ProductContainer>
          <ProductDetailInfoWrapper sx={{ p: '40px' }}>

            <Typography variant="subtitle">
              {t('Currently')}
              {' '}
              {product.stock}
              {' '}
              {t('InStock')}
            </Typography>
            <Typography sx={{ lineHeight: 2 }} variant="h4">
              {product.name}
            </Typography>
            <Typography variant="body">
              {product.longDescription}
            </Typography>
            <Typography variant="h5">
              €
              {product.price}
            </Typography>
            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button variant="contained" onClick={handleCartDialog}>{t('AddToCart')}</Button>
            </Box>

            <Box
              sx={{
                mt: 4,
                color: Colors.dove_gray,
              }}
            />
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Dialog>
  );
}