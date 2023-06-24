import {
  Button, Card, CardContent, Container, Grid, TextField, Typography,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
  const { t } = useTranslation();
  return (
    <Container sx={{ my: '80px', height: '100%' }}>
      <Grid>
        <Card sx={{ maxWidth: '450px', padding: '20px 5px', margin: '0 auto' }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              {t('ContactUs')}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
              {t('FillUpTheForm')}
            </Typography>
            <form>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                  <TextField data-cy="firstName" placeholder="Enter first name" label={t('FirstName')} variant="outlined" fullWidth required />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <TextField data-cy="lastName" placeholder="Enter last name" label={t('LastName')} variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField data-cy="email" type="email" placeholder="Enter email" label={t('Email')} variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField data-cy="number" type="number" placeholder="Enter phone number" label={t('Phone')} variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <TextField data-cy="message" label="Message" multiline rows={4} placeholder={t('TypeUrMessageHere')} variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12}>
                  <Button data-cy="submitFormButton" type="submit" variant="contained" color="primary" fullWidth>{t('Submit')}</Button>
                </Grid>

              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Container>
  );
}