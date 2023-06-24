import React from 'react';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/system';
import NavbarDesktop from './NavbarDesktop';
import NavbarMobile from './NavbarMobile';
import { NavbarLoaderProvider } from '../../context/ui/NavbarLoaderProvider';

export default function Navbar() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <>
      {matches ? (
        <NavbarMobile matches={matches} />
      ) : (
        <NavbarDesktop matches={matches} />
      )}
      <NavbarLoaderProvider />
    </>
  );
}