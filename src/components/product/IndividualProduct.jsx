import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Slide, Box, DialogContent, Typography, Button, useMediaQuery, TextField,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import styled from '@emotion/styled';

import { useTheme } from '@mui/material/styles';
import { Colors } from '../../styles/theme';
import NoImageYet from '../../images/NoImageYet.jpg';
import { ProductContainer, ProductImage } from '../../styles/product';
import { useCartContext } from '../../context/CartProvider';
import useProduct from '../../api/product';
import { useDialogContext } from '../../context/ui/DialogProvider';
import baseUrl from '../../api/image';
import { useLanguageContext } from '../../context/LanguageProvider';
import LPaper from '../../styles/lPaper';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

export default function IndividualProduct({ open }) {
  const { t } = useTranslation();
  const { addToCart } = useCartContext();
  const { handleSnackbar } = useSnackbarContext();
  const { language } = useLanguageContext();
  const theme = useTheme();
  const { id } = useParams();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [product, setProduct] = useState({});
  const productApi = useProduct();
  const inputValue = useRef();

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

  function handleCart(amount) {
    const numberAmount = Number(amount);
    if (numberAmount && numberAmount > 0) {
      addToCart(product, numberAmount);
      handleSnackbar({ content: t('AddedToCart') });
    } else {
      handleSnackbar({ content: 'operation failed', severity: 'error' });
    }
  }
  useEffect(() => {
    const fetchOrder = async () => {
      const data = await productApi.getById(id, language);
      setProduct(data);
    };
    fetchOrder();
  }, [id, language]);
  const handleCartDialog = () => {
    handleCart(inputValue.current.children[0].children[0].value);
  };
  return (
    <Box
      variant="permanant"
      open={open}
    >
      <LPaper>
        <Box
          display="flex"
          alignItems="center"
          data-cy="productTitle"
          justifyContent="space-between"
        >
          {product.name}
        </Box>
      </LPaper>
      <DialogContent>
        <ProductDetailWrapper
          display="flex"
          flexDirection={matches ? 'column' : 'row'}
        >
          <ProductContainer sx={{ mr: 4 }}>
            <ProductImage
              src={product.image ? `${baseUrl}/${product.image}` : NoImageYet}
            />
          </ProductContainer>
          <ProductDetailInfoWrapper>

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
            <TextField
              ref={inputValue}
              type="number"
              data-cy="amountInput"
              defaultValue={0}
            />
            <Box
              sx={{ mt: 4 }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button variant="contained" onClick={handleCartDialog} data-cy="addToCartButton">{t('AddToCart')}</Button>
            </Box>
          </ProductDetailInfoWrapper>
        </ProductDetailWrapper>
      </DialogContent>
    </Box>
  );
}