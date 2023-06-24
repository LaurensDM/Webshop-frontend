import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/notifications`;

const useNotifications = () => {
  const getAll = useCallback(async () => {
    const body = await axios.get(baseUrl, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  }, []);

  const getAllArchived = useCallback(async () => {
    const body = await axios.get(`${baseUrl}/archived/`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  });

  const getById = useCallback(async (id) => {
    const body = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  }, []);

  const switchArchiveStatus = useCallback(async (id) => {
    await axios.put(`${baseUrl}/${id}/archive`, {}, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  }, []);

  const switchReadStatus = useCallback(async (id) => {
    await axios.put(`${baseUrl}/${id}/read`, {}, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  }, []);

  const notificationApi = useMemo(() => ({
    getAll,
    getAllArchived,
    getById,
    switchArchiveStatus,
    switchReadStatus,
  }), [getAll, getAllArchived, getById, switchArchiveStatus, switchReadStatus]);

  return notificationApi;
};

export default useNotifications;