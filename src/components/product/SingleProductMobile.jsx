import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Skeleton, Stack, Tooltip } from '@mui/material';

import FitScreenIcon from '@mui/icons-material/FitScreen';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import NoImageYet from '../../images/NoImageYet.jpg';
import ProductInfo from './ProductInfo';
import {
  ProductActionButton,
  ProductActionsWrapper,
  ProductContainer,

  ProductImage,
} from '../../styles/product';
import ProductDetail from './ProductDetail';
import useDialogModal from '../hooks/useDialogModal';
import baseUrl from '../../api/image';

export default function SingleProductMobile({ product, matches }) {
  const { t } = useTranslation();
  const [ProductDetailDialog, showProductDetailDialog] = useDialogModal(ProductDetail);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
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

  const handleNavigate = () => {
    navigate(`/products/${product.name}/${product.id}`);
  };
  return (

    <ProductContainer
      elevation={4}
      key={product.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Button component={Link} to={`/products/${product.name}/${product.id}`}>

        <ProductImage
          src={`${baseUrl}/${product.image}` ? `${baseUrl}/${product.image}` : NoImageYet}
        />

      </Button>
      <ProductInfo product={product} matches={matches} handleNavigate={handleNavigate} />
      <ProductActionsWrapper>
        <Stack direction={matches ? 'row' : 'column'}>

          <ProductActionButton onClick={handleClickOpen}>
            <Tooltip
              placement="bottom"
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

      <ProductDetailDialog product={product} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t('ShareWithOthers')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('CopyThisLinkPasteShare')}
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
      <ProductDetailDialog product={product} />

    </ProductContainer>

  );
}