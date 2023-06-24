import React, { useCallback, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import {
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  FitScreen as FitScreenIcon,
  ShoppingCart,
} from '@mui/icons-material';
import {
  Dialog, DialogActions, DialogContent, Stack, Tooltip,
  DialogContentText, DialogTitle, TextField, Button, IconButton, Skeleton,
} from '@mui/material';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import {
  ProductActionButton,
  ProductActionsWrapper,
  ProductAddToCart,
  ProductContainer,
  ProductImage,
} from '../../styles/product';
import ProductDetail from './ProductDetail';
import useDialogModal from '../hooks/useDialogModal';
import ProductInfo from './ProductInfo';
import NoImageYet from '../../images/NoImageYet.jpg';
import { useCartContext } from '../../context/CartProvider';
import { useDialogContext } from '../../context/ui/DialogProvider';
import { Colors } from '../../styles/theme';
import baseUrl from '../../api/image';

// import { Colors } from '../../styles/theme';

export default function SingleProductDesktop({ product, matches }) {
  const { addToCart } = useCartContext();
  const { handleDialog } = useDialogContext();
  const { t } = useTranslation();
  const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);

  const [showOptions, setShowOptions] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMouseEnter = () => {
    setShowOptions(true);
  };
  const handleMouseLeave = () => {
    setShowOptions(false);
  };

  function handleCart(amount) {
    const numberAmount = Number(amount);
    addToCart(product, numberAmount);
  }
  const navigate = useNavigate();
  const handleCartDialog = () => {
    handleDialog({
      isCart: true,
      onConfirm: handleCart,
      title: t('AddToCart'),
      content: t('HowManyAddToCart'),
      ifSuccessText: t('AddedToCart'),
      ifErrorText: t('NotEnoughStock'),

    });
  };
  const handleNavigate = () => {
    navigate(`/products/${product.name}/${product.id}`);
  };
  return (
    <>
      <ProductContainer
        elevation={4}
        key={product.id}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >

        {product ? (
          <ProductImage
            onClick={handleNavigate}
            src={`${baseUrl}/${product.image}` ? `${baseUrl}/${product.image}` : NoImageYet}
          />
        ) : (
          <Skeleton variant="rectangular" height="100px" width="100px" />
        )}

        <ProductActionsWrapper show={showOptions}>
          <Stack>
            <ProductActionButton onClick={handleClickOpen}>
              <Tooltip
                placement="right"
                title={t('ShareThisProduct')}
              >
                <ShareIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
            <ProductActionButton
              onClick={() => showProductDetailDialog()}
            >
              <Tooltip placement="right" title="Full view">
                <FitScreenIcon color="primary" />
              </Tooltip>
            </ProductActionButton>
          </Stack>
        </ProductActionsWrapper>
        <ProductInfo handleNavigate={handleNavigate} product={product} />
        <ProductAddToCart sx={{ margin: '10px' }} onClick={handleCartDialog} variant="contained">
          <ShoppingCart />
        </ProductAddToCart>
      </ProductContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('ShareWithOthers')}</DialogTitle>
        <DialogContent>
          <DialogContentText data-cy="productTitle">
            {t('CopyThisLinkThenYouCanPasteAndShareIt')}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="link"
            label="Link"
            type="link"
            fullWidth
            variant="standard"
            value={`${window.location.href}/${product.id}`}
          />
        </DialogContent>
        <DialogActions>
          <CopyToClipboard
            text={`${window.location.href}/${product.id}`}
          >
            <Button>{t('Copy')}</Button>
          </CopyToClipboard>
        </DialogActions>
      </Dialog>
      <ProductDetailDialog product={product} handleCartDialog={handleCartDialog} />
    </>
  );
}