import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// imports mui tabel
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import accounting from 'accounting-js';

export default function OrderDetails({ order }) {
  const { t } = useTranslation();
  return (
    <TableRow
      // key={order.orderId}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {order.orderId}
      </TableCell>
      <TableCell align="left">{order.user}</TableCell>
      <TableCell align="left">{order.status === 0 ? t('geplaatst') : t('inVerwerking')}</TableCell>
      <TableCell align="left">
        { order.productCount }
      </TableCell>
      <TableCell align="left">{accounting.formatMoney(order.totalPrice, { symbol: '€', format: '%s%v' })}</TableCell>
      <TableCell align="left">
        <Button variant="contained" component={Link} to={`/orders/${order.orderId}`}>{t('Details')}</Button>
      </TableCell>
    </TableRow>
  );
}