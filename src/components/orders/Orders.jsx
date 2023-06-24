import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material';

import OrdersTable from './OrdersTable';
import JPaper from '../../styles/jPaper';
import LPaper from '../../styles/lPaper';
import useOrders from '../../api/order';

export default function Orders() {
  const { t } = useTranslation();
  const [ordersState, setOrdersState] = useState([]);
  const orderApi = useOrders();

  const getAllOrders = useCallback(async () => {
    const data = await orderApi.getAll();
    setOrdersState(data);
  }, []);

  useEffect(() => {
    getAllOrders();
  }, [getAllOrders]);

  return (
    <>
      <LPaper>
        <Typography variant="h4">{t('Orders')}</Typography>
      </LPaper>
      {/* <JPaper> */}
      <OrdersTable ordersState={ordersState} />
      {/* </JPaper> */}
    </>
  );
}