import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  Box, TextField, Button, Typography, Grid, Link, Avatar, Paper,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import isEmail from './isEmail';
import { useAuthContext } from '../../context/AuthProvider';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';
import { Colors } from '../../styles/theme';

function backToLogin(userExists) {
  const { t } = useTranslation();
  return userExists ? (
    <Button component={RouterLink} to="/login" variant="contained" value="/login">{t('goToLogin')}</Button>
  ) : (
    null
  );
}

export default function Register() {
  const { t } = useTranslation();
  // state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // for form control
  const [required, setRequired] = useState(false);
  const [badEmail, setBadEmail] = useState(false);
  const [userExists, setUserExists] = useState(false);

  // context
  const { registerUser } = useAuthContext();
  const { handleSnackbar } = useSnackbarContext();

  // navigation
  const navigate = useNavigate();

  async function handleRegisterUser(user) {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 500)); // SIMULATE NETWORK LATANCY
      await registerUser(user);
      navigate('/');
      handleSnackbar({
        content: `Welcome ${user.email}`,
      });
    } catch (err) {
      if (err.response.status === 409) {
        setUserExists(true);
        throw new Error(t('FailedToRegister2'));
      } else {
        throw new Error(t('FailedToRegister3'));
      }
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    const user = {
      name,
      email,
      password,
    };
    if (!isEmail(user.email)) {
      handleSnackbar({
        content: t('FailedToRegister'),
        severity: 'error',
      });
      setBadEmail(true);
    } else if (user.email && user.password && user.name) {
      try {
        await handleRegisterUser(user);
      } catch (e) {
        handleSnackbar({
          content: e.message,
          severity: 'error',
        });
      }
    } else {
      setRequired(true);
      handleSnackbar({
        content: t('FailedToRegister4'),
        severity: 'error',
      });
    }
    setLoading(false);
  };

  const handleChangeName = (event) => {
    if (required) { setRequired(false); } // Don't know if this is efficient
    setName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    if (required || badEmail) { setRequired(false); setBadEmail(false); } // Don't know if this is efficient
    setEmail(event.target.value);
  };
  const handleChangePassword = (event) => {
    if (required) { setRequired(false); } // Don't know if this is efficient
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

      <Grid item xs={12} sm={8} md={5} sx={{ borderRadius: '25px 0 0 25px ' }} component={Paper} elevation={6} square>
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
            <PersonAddIcon sx={{ mx: 'auto', color: Colors.secondary }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              error={required}
              id="standard-basic"
              label="Username"
              required
              type="username"
              data-cy="testUsernameRegister"

              autoComplete="current-username"
              onChange={handleChangeName}
              fullWidth
            />
            <TextField
              margin="normal"
              required
              error={required || badEmail}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              data-cy="testEmailRegister"
              onChange={handleChangeEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={t('Password')}
              error={required}
              data-cy="testPasswordRegister"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangePassword}
            />

            <LoadingButton variant="contained" sx={{ mt: 3, mb: 2 }} fullWidth data-cy="submit_register" onClick={() => handleSubmit()} loading={loading}>
              Sign up
            </LoadingButton>
            <Grid container>
              <Grid item sx={{ ml: 'auto' }}>
                <Link component={RouterLink} to="/login" variant="body2">
                  Already have an account? Log in
                </Link>

              </Grid>

            </Grid>
            {backToLogin(userExists)}
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
          borderRadius: ' 0 25px 25px 0 ',
          boxShadow: '10',
        }}
      />
    </Grid>
  );
}