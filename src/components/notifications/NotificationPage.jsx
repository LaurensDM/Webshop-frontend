import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// imports mui
import {
  Typography, Accordion, AccordionSummary, AccordionDetails,
} from '@mui/material';

// api
import useNotifications from '../../api/notifications';

// custom components
import LPaper from '../../styles/lPaper';
import JPaper from '../../styles/jPaper';
import CustomDataGrid from './DataGridNotification';

// context
import { useNotificationContext } from '../../context/NotificationProvider';

function NotificationGrid() {
  const [loadingArchived, setLoadingArchived] = useState(false);
  const notificationApi = useNotifications();
  const { t } = useTranslation();

  // Notification context
  const {
    loading, generalNotifications, orderNotifications,
    archivedNotifications, setArchivedNotifications,
  } = useNotificationContext();

  const handleArchivedNotificationData = async () => {
    const { items } = await notificationApi.getAllArchived();
    const userLang = navigator.language || navigator.userLanguage;
    items.forEach((n) => {
      n.date = new Date(n.date).toLocaleDateString(userLang, { hour: '2-digit', minute: '2-digit' });
    });
    if (archivedNotifications.length !== items.length) {
      setLoadingArchived(true);
      setArchivedNotifications(items);
      setLoadingArchived(false);
    }
  };

  return (
    <>
      <JPaper>
        <h2>{t('General')}</h2>
        <p>
          {t('FindAllNotificationsHere')}
        </p>
        <CustomDataGrid data={generalNotifications} loading={loading} />
        <h2>{t('Orders')}</h2>
        <p>
          {t('AllInfoAboutOrders')}
        </p>
        <CustomDataGrid data={orderNotifications} loading={loading} notificationType="order" />
      </JPaper>
      <JPaper>
        <Accordion
          sx={{
            width: '100%',
            textAlign: 'centered',
          }}
          onClick={handleArchivedNotificationData}
        >
          <AccordionSummary
            sx={{
              width: '100%',
              textAlign: 'centered',
            }}
          >
            <h2>{t('Archived')}</h2>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              width: '100%',
              textAlign: 'centered',
            }}
          >
            <CustomDataGrid data={archivedNotifications} loading={loadingArchived} />
          </AccordionDetails>
        </Accordion>
      </JPaper>
    </>
  );
}

export default function NotificationPage() {
  const { t } = useTranslation();

  return (
    <>
      <LPaper>
        <Typography variant="h4" data-cy="page-title">{t('Notifications')}</Typography>
      </LPaper>
      <NotificationGrid />
    </>
  );
}