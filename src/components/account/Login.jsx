import * as React from 'react';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  TextField, Button, Typography, Link, Grid, Avatar, Paper,
} from '@mui/material';

import { Box } from '@mui/system';
import { Copyright, Lock } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import isEmail from './isEmail';
import { useAuthContext } from '../../context/AuthProvider';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';
import { Colors } from '../../styles/theme';

export default function Login() {
  const { t } = useTranslation();
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // context
  const { login } = useAuthContext();
  const { handleSnackbar } = useSnackbarContext();

  // for form control
  const [required, setRequired] = useState(false);
  const [badEmail, setBadEmail] = useState(false);

  // navigation
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    const user = {
      email,
      password,
    };
    if (!isEmail(user.email)) {
      handleSnackbar({
        content: t('FailedToRegister'),
        severity: 'error',
        duration: 3000,
      });
    } else if (user.email && user.password) {
      // await new Promise((resolve) => setTimeout(resolve, 500)); // SIMULATE NETWORK LATANCY
      try {
        await login(user);
        navigate('/');
        handleSnackbar({
          content: `Welcome back ${user.name || user.email}`,
        });
      } catch (err) {
        handleSnackbar({
          content: t('FailedToLogin'),
          severity: 'error',
          duration: 3000,
        });
      }
    } else {
      setRequired(true);
      handleSnackbar({
        content: t('FailedToLogin2'),
        severity: 'error',
        duration: 3000,
      });
    }
    setLoading(false);
  };

  const handleChangeEmail = (event) => {
    if (required || badEmail) {
      setRequired(false);
      setBadEmail(false);
    } // Don't know if this is efficient
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    if (required) { setRequired(false); }
    setPassword(event.target.value);
  };

  return (

    <Grid
      container
      component="main"
      sx={{
        height: '80vh', width: '100%', mt: '70px', mb: '50px',
      }}
    >
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://picsum.photos/700)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '25px 0 0 25px',
          boxShadow: '10',
        }}
      />
      <Grid item xs={12} sm={8} md={5} sx={{ borderRadius: { sm: '0 25px 25px 0', xs: '25px' } }} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <Lock sx={{ mx: 'auto', color: Colors.secondary }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            {t('SignIn')}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              error={required || badEmail}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              data-cy="testEmailLogIn"
              autoFocus
              onChange={handleChangeEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('Password')}
              error={required}
              data-cy="testPasswordLogIn"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
            />

            <LoadingButton variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth data-cy="submit_login" onClick={() => handleLogin()} loading={loading}>
              {t('SignIn')}
            </LoadingButton>
            <Grid container>
              {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
              <Grid item sx={{ ml: 'auto' }}>
                <Link component={RouterLink} to="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Typography sx={{ mt: 5 }} variant="body2" color="text.secondary" align="center">
              {'Copyright © '}
              <Link color="inherit" href="https://www.delaware.pro/en-be">
                delaware Consulting CV
              </Link>
              {' '}
              {new Date().getFullYear()}
              .
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>

  );
}