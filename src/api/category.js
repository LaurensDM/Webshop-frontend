import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/category`;

const useCategory = () => {
  const getAllCategories = useCallback(async () => {
    const body = await axios.get(baseUrl);
    return body.data;
  }, []);

  const categoryApi = useMemo(() => ({
    getAllCategories,
  }), [getAllCategories]);

  return categoryApi;
};

export default useCategory;