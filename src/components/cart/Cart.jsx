import React, { useEffect, useState } from 'react';
import {
  Button, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { round } from 'lodash';
import { Link, useNavigate } from 'react-router-dom';
import { Box, width } from '@mui/system';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import accounting from 'accounting-js';
import JPaper from '../../styles/jPaper';
import { useCartContext } from '../../context/CartProvider';
import NoImageYet from '../../images/NoImageYet.jpg';
import { ProductCartContainer, ProductCartImage } from '../../styles/cart';
import LPaper from '../../styles/lPaper';
import baseUrl from '../../api/image';
import { Colors } from '../../styles/theme';

export default function Cart() {
  const {
    getCart, deleteFromCart, addToCart, resetCart, changeQuantity,
  } = useCartContext();
  const { t } = useTranslation();

  const [dummyState, setDummyState] = useState(0);
  const [cart, setCart] = useState(getCart());
  const [netto, setNetto] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  function calculatePrice() {
    let price = 0;
    cart.forEach((entry) => {
      price += entry[0].price * entry[1];
    });
    setNetto(round(price, 2));
    const taxes = round(price * 0.21, 2);
    setTax(round(taxes, 2));
    const totalPrice = round(price + taxes, 2);
    setTotal(totalPrice);
  }

  useEffect(() => {
    if (cart.length >= 1) {
      calculatePrice();
    } else {
      setNetto(0);
      setTax(0);
      setTotal(0);
    }
  }, [cart]);

  function handleNavigate() {
    navigate('/cart/order', {
      state: { netto },
    });
  }

  const handleChange = (e, product) => {
    if (e.keyCode === 13) {
      changeQuantity(product, Number(e.target.value));
      const newCart = [...getCart()];
      setCart(newCart);
      e.target.focus = false;
    } else {
      setDummyState(e.target.value);
    }
  };

  const handleReset = () => {
    resetCart();
    setCart(new Array());
  };

  const handleDeleteProduct = (product, amount) => {
    deleteFromCart(product, amount);
    const newCart = [...getCart()];
    setCart(newCart);
  };

  function handleDelete(product) {
    deleteFromCart(product, 1);
    const newCart = [...getCart()];
    setCart(newCart);
  }
  function handleAdd(product) {
    addToCart(product, 1);
    const newCart = [...getCart()];
    setCart(newCart);
  }

  return (
    <Container sx={{ marginBottom: '80px' }}>

      <LPaper>
        <Typography variant="h4">{t('MyShoppingCart')}</Typography>
      </LPaper>
      <Grid container>

        { cart.length === 0 ? (
          <Grid item xs={12}>
            <JPaper>
              <Typography data-cy="noItemsInCart">
                You have not added any items to your cart.
              </Typography>
              <Button component={Link} variant="contained" to="/products">Continue shopping</Button>

            </JPaper>
          </Grid>
        )
          : (
            <>
              <Grid item md={6} xs={12}>
                {cart.map((entry) => (
                  <ProductCartContainer key={entry[0].id}>
                    <Box display="flex" sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                      <Typography variant="h5" data-cy="chosenProductName">
                        {entry[0].name}
                      </Typography>
                      <IconButton
                        aria-label="close"
                        onClick={() => handleDeleteProduct(entry[0], entry[1])}
                        sx={{
                          alignSelf: 'flex-end',
                          justifySelf: 'flex-end',
                          width: '40px',
                          color: Colors.secondary,
                        }}
                      >
                        <ClearIcon />
                      </IconButton>
                    </Box>

                    <ProductCartImage
                      src={entry[0].image ? `${baseUrl}/${entry[0].image}` : NoImageYet}
                    />
                    <Typography>
                      {accounting.formatMoney(round(entry[0].price * entry[1], 2), { symbol: '€', format: '%s%v' })}
                    </Typography>
                    <Typography variant="h5">
                      <Button data-cy="minAmount" variant="contained" sx={{ height: '55px', mr: '5px' }} onClick={() => handleDelete(entry[0])}><RemoveIcon /></Button>

                      <TextField
                        label={`${entry[1]} x ${entry[0].price}`}
                        disabled
                        sx={{ height: '100%', width: '31%' }}
                      />

                      <Button variant="contained" sx={{ height: '55px', ml: '5px' }} onClick={() => handleAdd(entry[0])}><AddIcon /></Button>
                    </Typography>

                  </ProductCartContainer>
                ))}

                <Button onClick={handleReset}>{t('ClearCart')}</Button>

              </Grid>

              <Grid item md={6} xs={12}>
                <Container sx={{
                  top: '50px', position: 'sticky', marginLeft: 'auto', marginRight: '10%',
                }}
                >
                  <TableContainer
                    sx={{ backgroundColor: Colors.light_gray, color: 'black' }}
                    component={LPaper}
                  >

                    <Table size="small">

                      <TableBody>
                        <TableRow>
                          <TableCell align="left">
                            <Typography variant="body1">
                              {t('NetPrice')}

                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body1" data-cy="netPrice">
                              {accounting.formatMoney(netto, { symbol: '€', format: '%s%v' })}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left">
                            <Typography variant="body1">
                              *
                              {t('TAX')}
                              {' '}

                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body1">
                              {accounting.formatMoney(tax, { symbol: '€', format: '%s%v' })}
                            </Typography>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left"><Typography variant="body2">{t('Subtotal')}</Typography></TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" data-cy="totalPrice">
                              {accounting.formatMoney(total, { symbol: '€', format: '%s%v' })}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>

                    </Table>

                  </TableContainer>
                  <Button variant="contained" fullWidth onClick={() => handleNavigate()}>
                    {t('OrderNow')}
                    {' '}

                  </Button>

                </Container>
              </Grid>
            </>
          )}

        <Grid item md={6}>

          {/* <LPaper style={{ marginLeft: 'auto', marginRight: '10%' }}>
      <Typography>
        {t('ThisIsSomeRandomInfo')}
      </Typography>
      <Typography />
    </LPaper> */}

          {/* Begin table */}

        </Grid>
      </Grid>

    </Container>
  );
}