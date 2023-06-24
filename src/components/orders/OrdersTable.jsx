import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// imports mui tabel
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Container,
} from '@mui/material';

// custom import
import { Colors } from '../../styles/theme';
import OrderDetails from './OrderDetails';
import JPaper from '../../styles/jPaper';

import { useFilterContext } from '../../context/FilterProvider';

export default function OrdersTable({
  ordersState,
}) {
  const { t } = useTranslation();
  const [filteredOrders, setFilteredOrders] = useState(ordersState);
  const { search } = useFilterContext();

  useEffect(() => {
    const orders = ordersState.filter((order) => order.user.includes(search.toLowerCase()));
    setFilteredOrders(orders);
  }, [search, ordersState]);

  if (filteredOrders.length === 0) {
    return (
      <JPaper>
        <p data-cy="noOrders">{t('NoOrders')}</p>
      </JPaper>
    );
  }

  return (
    <Container maxWidth="70%">
      <TableContainer component={Paper}>
        <Table data-cy="ordersTable" sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: Colors.secondary,
              }}
            >
              <TableCell Style="color: white"><b>{t('OrderId')}</b></TableCell>
              <TableCell align="left" Style="color: white"><b>{t('ClientName')}</b></TableCell>
              <TableCell align="left" Style="color: white"><b>{t('Status')}</b></TableCell>
              <TableCell align="left" Style="color: white">
                <b>
                  #
                  {t('Products')}
                </b>
              </TableCell>
              <TableCell align="left" Style="color: white"><b>{t('Total')}</b></TableCell>
              <TableCell align="left" Style="color: white" />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <OrderDetails key={order.orderId} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}