import React, {
  createContext, useContext, useState, useMemo,
} from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
  Tooltip,
  Dialog, DialogTitle, DialogContent,
  DialogActions, IconButton, Typography,
  useMediaQuery,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon, Archive as ArchiveIcon,
  Check as CheckIcon, Unarchive as UnarchiveIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/system';

// api
import useNotifications from '../../api/notifications';

// context
import { useNotificationContext } from '../NotificationProvider';
import { useAuthContext } from '../AuthProvider';
import JPaper from '../../styles/jPaper';

export const NotificationDialogContext = createContext();
export const useNotificationDialogContext = () => useContext(NotificationDialogContext);

function CustomDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

function Audience({ audience }) {
  if (audience === 'company') {
    return (
      'This is a company wide notification.'
    );
  } if (audience === 'admin') {
    return (
      'This notification is for admins only.'
    );
  } if (audience === 'private') {
    return (
      'This is a private notification.'
    );
  }
}

export default function NotificationDialogProvider({ children }) {
  const theme = useTheme();
  const { currentUser } = useAuthContext();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // Notification context
  const {
    unreadNotificationsCount, setUnreadNotificationsCount, archivedNotifications, setArchivedNotifications,
    generalNotifications, setGeneralNotifications, orderNotifications, setOrderNotifications,
  } = useNotificationContext();

  const [open, setOpen] = useState(false);

  const [notification, setNotification] = useState({});

  const notificationApi = useNotifications();

  const handleNotificationDialog = async (params) => {
    setNotification(params.notification || {});
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // setNotification({});
  };

  const handleSwitchArchiveStatus = () => {
    let updatedNotification = {};
    // notification is archived and must be returned to general notifications || order notifications
    if (notification.archived) {
      updatedNotification = {
        ...notification,
        archived: 0,
        archivedBy: '',
      };
      setArchivedNotifications(archivedNotifications.filter((n) => n.id !== notification.id));
      if (notification.orderId) {
        setOrderNotifications([...orderNotifications, updatedNotification]);
      } else {
        setGeneralNotifications([...generalNotifications, updatedNotification]);
      }
      // notification must be moved to archived notifications
    } else {
      if (!notification.status) {
        notificationApi.switchReadStatus(notification.id);
        setUnreadNotificationsCount(unreadNotificationsCount - 1);
      }
      updatedNotification = {
        ...notification,
        archived: 1,
        status: 1,
        archivedBy: currentUser.email,
        readBy: notification.readBy || currentUser.email,
      };
      setArchivedNotifications([...archivedNotifications, updatedNotification]);
      if (notification.orderId) {
        setOrderNotifications(orderNotifications.filter((n) => n.id !== notification.id));
      } else {
        setGeneralNotifications(generalNotifications.filter((n) => n.id !== notification.id));
      }
    }

    notificationApi.switchArchiveStatus(notification.id);
    setOpen(false);
  };

  const handleSwitchReadStatus = () => {
    let localUpdatedNotifications = [];
    let updatedNotification = {};
    if (notification.status) {
      setUnreadNotificationsCount(unreadNotificationsCount + 1);
      updatedNotification = {
        ...notification,
        status: 0,
        readBy: '',
      };
    } else {
      setUnreadNotificationsCount(unreadNotificationsCount - 1);
      updatedNotification = {
        ...notification,
        status: 1,
        readBy: currentUser.email,
      };
    }
    if (notification.orderId) {
      localUpdatedNotifications = orderNotifications.filter((n) => n.id !== notification.id);
      setOrderNotifications([...localUpdatedNotifications, updatedNotification]);
    } else {
      localUpdatedNotifications = generalNotifications.filter((n) => n.id !== notification.id);
      setGeneralNotifications([...localUpdatedNotifications, updatedNotification]);
    }

    notificationApi.switchReadStatus(notification.id);
    setOpen(false);
  };

  const value = useMemo(() => ({
    handleNotificationDialog,
  }), [handleNotificationDialog]);

  return (
    <NotificationDialogContext.Provider value={value}>
      {children}
      <Dialog
        fullScreen={fullScreen}
        onClose={handleClose}
        open={open}
      >
        <CustomDialogTitle onClose={handleClose}>
          {notification.subject}
        </CustomDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {`Date: ${notification.date}`}
            <br />
            {`${notification.status ? `Read by ${notification.readBy}` : 'This notification is unread'}`}
            <br />
            {`${notification.archived ? `Archived by ${notification.archivedBy}` : ''}`}
          </Typography>

          <Typography gutterBottom>
            <Audience audience={notification.audience} />
          </Typography>
        </DialogContent>
        <DialogContent>
          <Typography gutterBottom>
            {notification.text}
          </Typography>
          {
            notification.orderId
              ? (
                <JPaper>
                  <h3>View order details</h3>
                  <Typography gutterBottom>
                    It is possible to view this order in more detail in the Orders section.
                  </Typography>
                  <Button
                    onClick={handleClose}
                    component={RouterLink}
                    variant="contained"
                    to={`/orders/${notification.orderId}`}
                  >
                    View Order
                  </Button>
                </JPaper>
              ) : null
          }
        </DialogContent>
        <DialogActions>
          {
            notification.archived === 0
              ? (
                <Tooltip title="Archive">
                  <IconButton
                    onClick={handleSwitchArchiveStatus}
                  >
                    <ArchiveIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Unarchive">
                  <IconButton
                    onClick={handleSwitchArchiveStatus}
                  >
                    <UnarchiveIcon />
                  </IconButton>
                </Tooltip>
              )
          }
          {
            notification.archived === 1 ? null : (
              <Tooltip title={notification.readBy ? 'Mark as unread' : 'Mark as read'}>
                <IconButton
                  onClick={handleSwitchReadStatus}
                >
                  {notification.readBy ? <CloseIcon /> : <CheckIcon />}
                </IconButton>
              </Tooltip>
            )
          }
        </DialogActions>
      </Dialog>
    </NotificationDialogContext.Provider>
  );
}