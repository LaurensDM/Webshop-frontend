import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/package`;

const usePackage = () => {
  const getById = useCallback(async (id) => {
    const body = await axios.get(
      `${baseUrl}/${id}`,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );
    return body.data;
  }, []);

  const getAll = useCallback(async () => {
    const body = await axios.get(
      baseUrl,
      {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      },
    );
    return body.data.items;
  }, []);

  const packageApi = useMemo(() => ({
    getAll,
    getById,
  }), [getAll, getById]);

  return packageApi;
};

export default usePackage;