import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/order`;

const useOrders = () => {
  const getAll = useCallback(async () => {
    const body = await axios.get(baseUrl, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  }, []);

  const getById = useCallback(async (id) => {
    const body = await axios.get(`${baseUrl}/${id}`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  }, []);

  const create = useCallback(async (order) => {
    const body = await axios({
      url: baseUrl,
      method: 'POST',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      data: order,
    });
    return body.data;
  }, []);

  const update = useCallback(async (order) => {
    const { id, ...values } = order;
    const body = await axios({
      url: `${baseUrl}/${id}`,
      method: 'PUT',
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      data: values,
    });
    return body.data;
  }, []);

  const orderApi = useMemo(() => ({
    getAll,
    getById,
    create,
    update,
  }), [getAll, getById, create, update]);

  return orderApi;
};

export default useOrders;