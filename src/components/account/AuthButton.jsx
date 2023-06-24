import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Tooltip, ListItemIcon, ListItemButton, Divider,
} from '@mui/material';
import { Person as PersonIcon, Login as LoginIcon, Logout as LogoutIcon } from '@mui/icons-material';

import { Colors } from '../../styles/theme';

import { useAuthContext } from '../../context/AuthProvider';

export default function AuthButton({ matches }) {
  const { t } = useTranslation();
  const { isAuth, logout } = useAuthContext();
  if (isAuth) {
    return (
      <>
        <Tooltip title={t('Account')}>
          <ListItemButton
            sx={{
              justifyContent: 'center',
            }}
            value="/account"
            component={RouterLink}
            to="/account"
            data-cy="testAuthButton"
            // onClick={isAuth ? handleLogout : handleLogin}
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: matches && Colors.secondary,
              }}
            >
              <PersonIcon />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip title={t('Logout')}>
          <ListItemButton
            sx={{
              justifyContent: 'center',
            }}
            value="/account"
            onClick={logout}
            data-cy="testLogout"
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: matches && Colors.secondary,
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
      </>
    );
  }
  return (
    <Tooltip title={t('Login')}>
      <ListItemButton
        sx={{
          justifyContent: 'center',
        }}
        value="/login"
        component={RouterLink}
        to="/login"
        data-cy="testAuthButton"
        // onClick={isAuth ? handleLogout : handleLogin}
      >
        <ListItemIcon
          sx={{
            display: 'flex',
            justifyContent: 'center',
            color: matches && Colors.secondary,
          }}
        >
          <LoginIcon />
        </ListItemIcon>
      </ListItemButton>
    </Tooltip>
  );
}