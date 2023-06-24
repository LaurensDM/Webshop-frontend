import React, {
  createContext, useContext, useState, useMemo,
} from 'react';
import { LinearProgress, Box, Fade } from '@mui/material';

export const NavbarLoaderContext = createContext();
export const useNavbarLoaderContext = () => useContext(NavbarLoaderContext);

export function NavbarLoaderProvider({ children }) {
  const [loading, setLoading] = useState(false);

  const startNavbarLoader = () => {
    setLoading(true);
  };

  const stopNavbarLoader = () => {
    setLoading(false);
  };

  const value = useMemo(() => ({
    startNavbarLoader,
    stopNavbarLoader,
  }), [startNavbarLoader, stopNavbarLoader]);

  return (
    <NavbarLoaderContext.Provider value={value}>
      {children}
      {loading
        ? (
          <Box sx={{ width: '100%', top: '60px', position: 'fixed' }}>
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? '600ms' : '0ms',
              }}
              unmountOnExit
            >
              <LinearProgress />
              {/* <LinearProgress variant="determinate" value={progress} /> */}
            </Fade>
          </Box>
        ) : null}
    </NavbarLoaderContext.Provider>
  );
}