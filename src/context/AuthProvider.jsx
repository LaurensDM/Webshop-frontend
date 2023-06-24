import React, {
  useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import jwt_decode from 'jwt-decode';
import useUser from '../api/user';
import { useSnackbarContext } from './ui/SnackbarProvider';
import { useNotificationContext } from './NotificationProvider';

export const AuthContext = React.createContext(false);
export const useAuthContext = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const { handleSnackbar } = useSnackbarContext();
  const userApi = useUser();

  const getCurrentUserWithToken = useCallback(() => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    const user = {
      name: decoded.name,
      email: decoded.email,
      permission: decoded.permission,
    };
    return user;
  });

  const login = async (user) => {
    const token = await userApi.login(user);
    localStorage.setItem('token', token);
    setAuth(true);
    const validatedUser = getCurrentUserWithToken();
    setCurrentUser(validatedUser);
  };

  const update = async (newUser) => {
    const data = await userApi.update(newUser);
    if (data.token) {
      localStorage.setItem('token', data.token);
      setAuth(true);
      setCurrentUser(data.updatedUser);
    }
  };

  const registerUser = async (user) => {
    const token = await userApi.register(user);
    localStorage.setItem('token', token);
    setAuth(true);
    const validatedUser = getCurrentUserWithToken();
    setCurrentUser(validatedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    handleSnackbar({
      content: `See you later ${currentUser.name || currentUser.email}`,
      severity: 'success',
    });
    setCurrentUser({});
  };

  const verify = async () => {
    let bool = false;
    const token = localStorage.getItem('token');
    if (token) {
      bool = await userApi.verify(token);
    } else {
      return false;
    }
    if (bool.validated === false) {
      logout();
      return false;
    }
    if (bool.token) {
      localStorage.setItem('token', bool.token);
      const user = getCurrentUserWithToken();
      setCurrentUser(user);
      setAuth(true);
    }
    if (Object.keys(currentUser).length === 0) {
      setAuth(true);
      const user = getCurrentUserWithToken();
      setCurrentUser(user);
    } else {
      setAuth(true);
    }
    return bool.validated;
  };

  useEffect(() => {
    async function handleVerify() {
      try {
        await verify();
      } catch (err) {
        // console.log(err);
      }
    }
    handleVerify();
  }, [currentUser]);

  const value = useMemo(() => ({
    isAuth,
    login,
    registerUser,
    logout,
    verify,
    getCurrentUserWithToken,
    currentUser,
    update,
  }), [isAuth, login, registerUser, logout, verify, getCurrentUserWithToken, update, currentUser]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}