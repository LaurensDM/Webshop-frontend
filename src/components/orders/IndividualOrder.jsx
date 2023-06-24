import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Table, Typography } from '@mui/material';

import useOrders from '../../api/order';
import JPaper from '../../styles/jPaper';

import { useLoaderContext } from '../../context/ui/LoaderProvider';
import LPaper from '../../styles/lPaper';

export default function IndividualOrder() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [order, setOrder] = useState({
    orderId: 'order.id',
    date: 'order.orderDateTime',
    street: 'delivery.street',
    streetNumber: 'delivery.number',
    zipCode: 'delivery.zipCode',
    city: 'delivery.city',
    country: 'delivery.country',
    user: {
      name: 'user.name',
      email: 'user.email',
    },
    company: {
      name: 'No company',
    },
    orderItems: [{
      name: '',
      quantity: '',
      unitPrice: '',
      totalPrice: '',
    }],
    totalPrice: 'order.totalPrice',
    status: 'order.orderStatus',
    packaging: {
      name: 'packaging.name',
      type: 'packaging.type',
      width: 'packaging.width',
      height: 'packaging.height',
      length: 'packaging.length',
    },
    transportService: 'Kaboutertjes',
    trackAndtrace: 'delivery.trackAndtrace',
  });
  const orderApi = useOrders();
  const navigate = useNavigate();
  const { handleLoader, handleClose } = useLoaderContext();

  const handleNavigate = () => {
    navigate(`/orders/${order.orderId}/update`, {
      state: { order },
    });
  };

  useEffect(() => {
    const fetchOrder = async () => {
      handleLoader();
      const data = await orderApi.getById(id);
      setOrder(data);
      handleClose();
    };
    fetchOrder();
  }, [id]);

  return (
    <>
      <LPaper>
        <Typography variant="h4">{t('OrderDetails')}</Typography>
      </LPaper>
      <JPaper>
        <h3>
          <b>
            {t('OrderId')}
            :
            {order.orderId}
          </b>
        </h3>
        <p>
          {t('OrderDate')}
          :
          {new Date(order.date).toUTCString()}
        </p>
        <p>
          status:
          {Number(order.status) === 0 ? 'geplaatst' : 'in verwerking' }
        </p>
        <hr />
        <Table>
          <tr>
            <td>{t('Name')}</td>
            <td>{t('Quantity')}</td>
            <td>{t('Price')}</td>
          </tr>
          {order.orderItems.map((p) => (
            <tr>
              <td>{p.name}</td>
              <td>{p.quantity}</td>
              <td>{p.netPrice}</td>
            </tr>
          ))}
          <tr>
            <td />
            <td />
            <td />
            <td>
              <b>
                {t('Total')}
                :
                {order.totalPrice}
              </b>
            </td>
          </tr>
        </Table>
        <hr />
        <h4><b>{t('Client')}</b></h4>
        <p>
          {t('company')}
          :
          {order.company.name}
        </p>
        <p>
          {t('name')}
          :
          {' '}
          {order.user.name}
        </p>
        <p>
          {t('email')}
          :
          {' '}
          {order.user.email}
        </p>
        <p>
          {t('DeliveryAddress')}
          :
          {' '}
          {`${order.street} ${order.streetNumber}, ${order.zipCode} ${order.city}, ${order.country}`}
        </p>
        <hr />
        <h4><b>{t('Transportation')}</b></h4>
        <p>
          {t('packaging')}
          :
          {' '}
          {order.packaging.name}
        </p>
        <p>
          {t('PackagingType')}
          :
          {' '}
          {order.packaging.type}
        </p>
        <p>
          {t('TransportService')}
          :
          {' '}
          {order.transportService}
        </p>
        <p>
          track & trace code:
          {' '}
          {order.trackAndtrace}
        </p>
        <p>
          {t('VerificationCode')}
          :
          {' '}
          {order.orderReference}
        </p>
        <Link to={`/track/${order.trackAndtrace}/${order.orderReference}`}>{t('TrackYourPackage')}</Link>

        {Number(order.status) === 0 ? (
          <Button onClick={handleNavigate}>
            Change order
          </Button>
        ) : null}

      </JPaper>
    </>
  );
}