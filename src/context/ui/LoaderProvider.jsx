import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export const LoaderContext = createContext();
export const useLoaderContext = () => useContext(LoaderContext);

export function LoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const handleLoader = () => {
    setLoading(true);
  };

  const handleClose = () => {
    setLoading(false);
  };

  const value = useMemo(() => ({
    handleLoader,
    handleClose,
  }), [handleLoader, handleClose]);

  return (
    <LoaderContext.Provider value={value}>
      {children}
      <Backdrop
        sx={{ backdropFilter: 'blur(3px)', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoaderContext.Provider>
  );
}