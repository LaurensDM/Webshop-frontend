import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/company`;

const useCompany = () => {
  const registerCompany = useCallback(async (company) => {
    const body = await axios({
      method: 'POST',
      url: baseUrl,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
      data: company,
    });
    return body.data;
  }, []);

  const verifyCompany = useCallback(async (companyVAT) => {
    const body = await axios.post(`${baseUrl}/verify`, {
      companyVAT,
    });
    return body.data;
  }, []);

  const getAll = useCallback(async () => {
    const body = await axios.get(`${baseUrl}/`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  }, []);

  const join = useCallback(async (companyId) => {
    const body = await axios({
      method: 'PUT',
      url: `${baseUrl}/join`,
      data: {
        companyId,
      },
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.status;
  });

  const getEmployeeData = useCallback(async () => {
    const body = await axios.get(`${baseUrl}/employee/`, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  });

  const checkVat = useCallback(async (companyVAT) => {
    const body = await axios({
      method: 'GET',
      url: `${baseUrl}/vat/${companyVAT}`,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  });

  const companyApi = useMemo(() => ({
    registerCompany,
    verifyCompany,
    getAll,
    join,
    getEmployeeData,
    checkVat,
  }), [registerCompany, getAll, verifyCompany, join, getEmployeeData]);

  return companyApi;
};

export default useCompany;