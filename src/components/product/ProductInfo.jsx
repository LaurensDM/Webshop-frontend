import React from 'react';

import { Typography } from '@mui/material';
import accounting from 'accounting-js';
import { ProductInfoWrapper } from '../../styles/product';

export default function ProductInfo({ handleNavigate, product, matches }) {
  return (
    <>
      <ProductInfoWrapper onClick={() => handleNavigate()}>
        <Typography variant={matches ? 'h7' : 'h6'} lineHeight={2}>
          {product.name}
        </Typography>
        {matches ? null : (
          <Typography variant="body">
            {product.shortDescription}
          </Typography>
        )}

        <Typography variant={matches ? 'h6' : 'h5'}>
          {accounting.formatMoney(product.price, { symbol: '€', format: '%s%v' })}
        </Typography>
      </ProductInfoWrapper>
    </>
  );
}