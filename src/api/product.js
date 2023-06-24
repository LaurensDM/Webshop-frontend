import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/product`;

const useProduct = () => {
  const getAll = useCallback(async (language) => {
    const body = await axios.get(`${baseUrl}/${language}`);
    return body.data;
  }, []);

  const getById = useCallback(async (id, language) => {
    const body = await axios.get(`${baseUrl}/${id}/${language}`);
    return body.data;
  }, []);

  const productApi = useMemo(() => ({
    getAll,
    getById,
  }), [getAll, getById]);

  return productApi;
};

export default useProduct;