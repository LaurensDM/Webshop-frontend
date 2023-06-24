import axios from 'axios';
import {
  useCallback,
  useMemo,
} from 'react';

const baseUrl = `${process.env.REACT_APP_API_URL}/user`;

const useUser = () => {
  const register = useCallback(async (user) => {
    const body = await axios.post(`${baseUrl}/register`, user);
    return body.data;
  }, []);

  const login = useCallback(async (user) => {
    const body = await axios.post(`${baseUrl}/login`, user);
    if (body.data.validated) {
      return body.data.token;
    }
    throw Error('Login failed');
  }, []);

  const verify = useCallback(async (token) => {
    const body = await axios.post(`${baseUrl}/verify`, {
      token,
    });
    return body.data;
  }, []);

  const getFormattedUserWithToken = useCallback(async () => {
    const body = await axios.get(baseUrl, {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  }, []);

  const update = useCallback(async (newUser) => {
    const body = await axios({
      method: 'POST',
      url: `${baseUrl}/update`,
      data: {
        // || '' required for backend validationscheme
        name: newUser.name || null,
        email: newUser.email || null,
        firstName: newUser.firstName || null,
        lastName: newUser.lastName || null,
        street: newUser.street || null,
        streetNumber: newUser.streetNumber || null,
        zipCode: newUser.zipCode || null,
        city: newUser.city || null,
        country: newUser.country || null,
      },
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.data;
  }, []);

  const promote = useCallback(async ({ email, role }) => {
    const body = await axios({
      method: 'PUT',
      url: `${baseUrl}/promote`,
      data: {
        email,
        role,
      },
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    return body.status;
  });

  const deleteUser = useCallback(async () => {
    await axios({
      method: 'DELETE',
      url: baseUrl,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  });

  const leaveCompany = useCallback(async () => {
    await axios({
      method: 'PUT',
      url: `${baseUrl}/leave`,
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
  });

  const userApi = useMemo(() => ({
    register,
    login,
    verify,
    getFormattedUserWithToken,
    update,
    promote,
    deleteUser,
    leaveCompany,
  }), [register, login, verify, getFormattedUserWithToken, promote, deleteUser, leaveCompany]);

  return userApi;
};

export default useUser;