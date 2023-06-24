import React, { useState, useEffect } from 'react';

// language
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';

import {
  Button, Grid, Typography,
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from '@mui/material';

import { Box } from '@mui/system';
import JPaper from '../../styles/jPaper';
import LPaper from '../../styles/lPaper';
import CompanyField from './CompanyField';
import AddressSettings from './AddressSettings';
import AccountSettings from './AccountSettings';

import { useAuthContext } from '../../context/AuthProvider';
import { useDialogContext } from '../../context/ui/DialogProvider';
import { useNotificationContext } from '../../context/NotificationProvider';
import useUser from '../../api/user';

function OptionButtons({ permission }) {
  const { forceUpdateNotifications } = useNotificationContext();
  const { verify, logout } = useAuthContext();
  const { deleteUser, leaveCompany } = useUser();
  const { handleDialog } = useDialogContext();
  const { t } = useTranslation();

  const handleDelete = async () => {
    await deleteUser();
    await logout();
    // forceUpdateNotifications();
  };

  const handleLeave = async () => {
    await leaveCompany();
    await verify();
    // forceUpdateNotifications();
  };

  const handleDeleteCompany = async () => {
    await deleteCompany();
    await verify();
    // forceUpdateNotifications();
  };

  const deleteUserDialog = () => {
    handleDialog({
      title: t('DeleteAccount'),
      content: t('AccountConfirmation'),
      moreInfo: `${permission === 'admin' ? t('AdminDelete') : ''}`,
      confirmText: 'DELETE ACCOUNT',
      ifErrorText: `${permission === 'admin' ? t('FailedDelete') : t('FailedDelete2')}`,
      ifSuccessText: t('DeleteSuccess'),
      onConfirm: handleDelete,
    });
  };

  const leaveCompanyDialog = () => {
    handleDialog({
      title: t('LeaveCompany'),
      content: `Are you sure you want to leave your company? ${permission === 'admin' ? 'For an administrator to leave a company, there must at least be one other administrator!' : ''}`,
      confirmText: t('LEAVECOMPANY'),
      ifErrorText: `${permission === 'admin' ? t('FailedLeave') : t('FailedLeave2')}`,
      ifSuccessText: t('SuccessLeave'),
      onConfirm: handleLeave,
    });
  };

  const deleteCompanyDialog = () => {
    handleDialog({
      title: t('DeleteCompany'),
      content: t('DeleteCompConfirmation'),
      confirmText: t('DELETECOMPANY'),
      ifErrorText: t('FailedDeleteComp'),
      ifSuccessText: t('SuccessDeleteComp'),
      onConfirm: handleDeleteCompany,
    });
  };

  if (permission === 'admin') {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <JPaper sx={{ margin: { md: '20px 0 20px auto', sm: '20px auto' } }}>
            <p>{t('CanDelete')}</p>
            <Button onClick={deleteUserDialog} variant="contained">{t('DeleteAccount')}</Button>
          </JPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <JPaper sx={{ margin: { md: '20px auto 20px 0', sm: '20px auto' } }}>
            <p>{t('CanLeave')}</p>
            <Button onClick={leaveCompanyDialog} variant="contained">{t('LeaveCompany')}</Button>
          </JPaper>
        </Grid>
        <Grid item xs={12} md={12}>
          <JPaper>
            <p>{t('CanDeleteComp')}</p>
            <Button onClick={deleteCompanyDialog} variant="contained">{t('DeleteCompany')}</Button>
          </JPaper>
        </Grid>
      </Grid>
    );
  } if (permission === 'unemployed' || permission === 'pending') {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <JPaper>
            <p>{t('CanDelete')}</p>
            <Button onClick={deleteUserDialog} variant="contained">{t('DeleteAccount')}</Button>
          </JPaper>
        </Grid>
      </Grid>
    );
  } if (permission === 'employee' || permission === 'warehouseman') {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <JPaper sx={{ margin: { md: '20px 0 20px auto', sm: '20px auto' } }}>
            <p>{t('CanDelete')}</p>
            <Button onClick={deleteUserDialog} variant="contained">{t('DeleteAccount')}</Button>
          </JPaper>
        </Grid>
        <Grid item xs={12} md={6}>
          <JPaper sx={{ margin: { md: '20px auto 20px 0', sm: '20px auto' } }}>
            <p>{t('CanLeave')}</p>
            <Button onClick={leaveCompanyDialog} variant="contained">{t('LeaveCompany')}</Button>
          </JPaper>
        </Grid>
      </Grid>
    );
  }
}

export default function Account() {
  const [value, setValue] = useState(i18n.resolvedLanguage);

  const setLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    setLanguage(event.target.value);
  };

  const languages = {
    en: { nativeName: 'English' },
    fr: { nativeName: 'Français' },
    ned: { nativeName: 'Nederlands' },
  };

  const { t } = useTranslation();
  const { logout, currentUser, getCurrentUserWithToken } = useAuthContext();
  const [permission, setPermission] = useState(getCurrentUserWithToken().permission);

  useEffect(() => {
    setPermission(getCurrentUserWithToken().permission);
  }, [currentUser, permission]);

  return (
    <>
      <LPaper>
        <Typography variant="h4">Account</Typography>
      </LPaper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CompanyField />
        </Grid>
        <Grid item xs={12} md={6}>
          <JPaper sx={{ margin: { md: '20px 0 20px auto', sm: '20px auto' } }}>
            <h2>{t('UserInformation')}</h2>
            <AccountSettings />
          </JPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <JPaper sx={{ margin: { md: '20px auto 20px 0', sm: '20px auto' } }}>
            <h2>{t('AddressInformation')}</h2>
            <AddressSettings />
          </JPaper>
        </Grid>
      </Grid>
      <JPaper>
        <h2>{t('Options')}</h2>
        <Button onClick={logout} variant="contained">{t('Logout')}</Button>
        {/* <JPaper>
          <h3>Language settings</h3>
          <JPaper>

            <RadioGroup
              row
              defaultValue={() => i18n.resolvedLanguage}
              onChange={handleChange}
              value={value}
            >
              {Object.keys(languages).map((language) => (
                <FormControlLabel
                  key={language}
                  value={languages[language].nativeName}
                  control={<Radio />}
                  label={languages[language].nativeName}
                />
              ))}
            </RadioGroup>
          </JPaper>
        </JPaper> */}
        <OptionButtons permission={permission} />
      </JPaper>
    </>
  );
}