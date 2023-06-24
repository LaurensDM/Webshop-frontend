import React from 'react';
import { Navigate } from 'react-router';
import { useAuthContext } from '../../context/AuthProvider';

export default function RequireAuth({ children }) {
  const { isAuth } = useAuthContext();
  if (isAuth) {
    return children;
  }

  return <Navigate to="/authentication" />;
}