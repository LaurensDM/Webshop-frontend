import React, {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { socket } from '../socket';
import useNotifications from '../api/notifications';
import { useSnackbarContext } from './ui/SnackbarProvider';
import { useAuthContext } from './AuthProvider';

export const NotificationContext = createContext();
export const useNotificationContext = () => useContext(NotificationContext);

export function NotificationProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState({ items: [], count: 0 });
  const { isAuth, currentUser } = useAuthContext();

  const [generalNotifications, setGeneralNotifications] = useState([]);
  const [archivedNotifications, setArchivedNotifications] = useState([]);
  const [orderNotifications, setOrderNotifications] = useState([]);
  const [unreadNotificationsCount, setUnreadNotificationsCountAfterZeroCheck] = useState(0);

  let notificationNoState = { items: [], count: 0 };
  const notificationApi = useNotifications();
  const { handleSnackbar } = useSnackbarContext();

  // unread notifications will never be less than 0, that would be awkward!
  const setUnreadNotificationsCount = (count) => {
    if (count <= 0) {
      setUnreadNotificationsCountAfterZeroCheck(0);
    } else {
      setUnreadNotificationsCountAfterZeroCheck(count);
    }
  };

  const sortNotifications = (allNotifications) => {
    const userLang = navigator.language || navigator.userLanguage;
    allNotifications.forEach((item) => {
      item.date = new Date(item.date).toLocaleDateString(userLang, { hour: '2-digit', minute: '2-digit' });
    });

    setNotifications({ items: allNotifications, count: allNotifications.length });
    setGeneralNotifications(allNotifications.filter((item) => item.orderId === null));
    setOrderNotifications(allNotifications.filter((item) => item.orderId !== null && item.archived !== 1));
    setUnreadNotificationsCount(allNotifications.filter((item) => item.status === 0).length);
  };

  async function fetchNotifications() {
    try {
      const notificationList = await notificationApi.getAll();
      notificationNoState = notificationList;
      setNotifications(notificationList);
      sortNotifications(notificationList.items);
    } catch (error) {

    }
    if (!isAuth) {
      setNotifications({ items: [], count: 0 });
      setUnreadNotificationsCount(0);
    }
  }

  async function forceUpdateNotifications() {
    setNotifications({ items: [], count: 0 });
    setGeneralNotifications([]);
    setOrderNotifications([]);
    setArchivedNotifications([]);
    setUnreadNotificationsCount(0);
    await fetchNotifications();
  }

  const handleSocket = useCallback(() => {
    // setLoading(true);
    socket.on('connect', () => {
      console.log('Connected to socket');
    });
    setInterval(() => {
      socket.emit('ping notification', localStorage.getItem('token'));
    }, 30000);

    socket.on('pong notification', (data) => {
      // console.log('Received notification', data);
      if (data.count > notificationNoState.count) {
        // console.log(data.count, notificationNoState.count);
        handleSnackbar({
          content: `You have ${data.count - notificationNoState.count} new notifications`,
          severity: 'info',
        });
      }
      notificationNoState = data;
      setNotifications(data);
      const allNotifications = data.items;
      sortNotifications(allNotifications);
    });
    // setLoading(false);
  }, []);

  useEffect(() => {
    handleSocket();
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [isAuth, currentUser]);

  const value = useMemo(() => ({
    loading,
    forceUpdateNotifications,
    notifications,
    generalNotifications,
    setGeneralNotifications,
    orderNotifications,
    setOrderNotifications,
    archivedNotifications,
    setArchivedNotifications,
    unreadNotificationsCount,
    setUnreadNotificationsCount,
  }), [loading, forceUpdateNotifications, notifications, generalNotifications, setGeneralNotifications, orderNotifications, setOrderNotifications, archivedNotifications, setArchivedNotifications]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}