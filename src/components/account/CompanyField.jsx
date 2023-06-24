import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';

// materialUI
import {
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Grid, Button,
} from '@mui/material';

import { LoadingButton } from '@mui/lab';

// custom
import JPaper from '../../styles/jPaper';
import JoinCompany from './JoinCompany';
import CreateCompany from './CreateCompany';
import AdminPanel from './AdminPanel';

// api
import useCompany from '../../api/company';

// context
import { useAuthContext } from '../../context/AuthProvider';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

function CompanyRadio({ companyRadio, handleChangeCompanyRadio }) {
  const { t } = useTranslation();
  return (
    <FormControl>
      <FormLabel id="companyRadio">{t('CompanyOptions')}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="companyRadio"
        name="row-radio-buttons-group"
        value={companyRadio}
        onChange={handleChangeCompanyRadio}
      >
        <FormControlLabel data-cy="testJoinCompanyRadio" value="join" control={<Radio />} label={t('Join')} />
        <FormControlLabel data-cy="testCreateCompanyRadio" value="create" control={<Radio />} label={t('Create')} />
      </RadioGroup>
    </FormControl>
  );
}

function Registration() {
  const [company, setCompany] = useState({
    validated: false,
    countryCode: '',
    vatNumber: '',
    name: '',
    address: {
      street: '',
      number: '',
      zip_code: '',
      city: '',
      country: '',
    },
    strAddress: '',
  });
  const [companyRadio, setCompanyRadio] = useState('join');

  const handleChangeCompanyRadio = (event) => {
    setCompanyRadio(event.target.value);
  };

  return (
    <>
      <CompanyRadio companyRadio={companyRadio} handleChangeCompanyRadio={handleChangeCompanyRadio} />
      <CompanyForm companyRadio={companyRadio} company={company} setCompany={setCompany} />
    </>
  );
}

function CompanyForm({
  companyRadio, company, setCompany,
}) {
  const { t } = useTranslation();
  // context
  const { handleSnackbar } = useSnackbarContext();
  const { verify } = useAuthContext();
  // const [user, setUser] = useState({});

  // For company registration / joining
  const companyApi = useCompany();
  const [loadingButton, setLoadingButton] = useState(false);
  const [joinCompanyId, setJoinCompanyId] = useState(undefined);
  async function handleRegisterCompany() {
    try {
      await companyApi.registerCompany(company);
    } catch (e) {
      setLoadingButton(false);
      throw new Error(t('FailedCreateComp'));
    }
  }

  async function handleJoinCompany() {
    setLoadingButton(true);
    try {
      await companyApi.join(joinCompanyId);
      verify();
      handleSnackbar({
        content: t('SuccesfullyRequested'),
      });
    } catch (e) {
      throw new Error(t('FailedJoinComp'));
    }
    setLoadingButton(false);
  }
  const handleCompanySubmit = async () => {
    try {
      if (companyRadio === 'create') {
        await handleRegisterCompany();
      } else if (companyRadio === 'join') {
        await handleJoinCompany();
      }
    } catch (e) {
      setLoadingButton(false);
      handleSnackbar({
        content: e.message,
        severity: 'error',
      });
    }
  };
  if (companyRadio === 'create') {
    return (
      <CreateCompany company={company} setCompany={setCompany} />
    );
  }
  return (
    <>
      <JoinCompany setJoinCompanyId={setJoinCompanyId} />
      <LoadingButton
        disabled={joinCompanyId === undefined && company.vatNumber === ''}
        variant="contained"
        data-cy="submit_register"
        color="success"
        onClick={() => handleCompanySubmit()}
        loading={loadingButton}
      >
        {t('JOINCOMPANY')}
      </LoadingButton>
    </>
  );
}

export default function CompanyField() {
  const { t } = useTranslation();
  const { currentUser, getCurrentUserWithToken } = useAuthContext();
  const [permission, setPermission] = useState(getCurrentUserWithToken().permission);
  const [joinOtherCompany, setJoinOtherCompany] = useState(false);

  useEffect(() => {
    setPermission(getCurrentUserWithToken().permission);
  }, [currentUser, permission]);

  if (permission === 'employee') {
    return (
      <Grid item xs={12}>
        <JPaper>
          <h2>{t('EmployeePanel')}</h2>
          <Button component={RouterLink} to="/orders" variant="contained">{t('Orders')}</Button>
        </JPaper>
      </Grid>
    );
  } if (permission === 'admin') {
    return (
      <>
        <JPaper>
          <AdminPanel />
        </JPaper>
        <JPaper>
          <h2>Check company orders</h2>
          <p>
            As administrator it is still possible to check the orders of your company.
          </p>
          <Button component={RouterLink} to="/orders" variant="contained">{t('Orders')}</Button>
        </JPaper>
      </>
    );
  } if (permission === 'pending') {
    return (
      <JPaper>
        <h2>{t('Pending')}</h2>
        <p>
          {t('PutOnWaitingList')}
        </p>
        {
          joinOtherCompany
            ? <Registration />
            : <Button onClick={() => setJoinOtherCompany(true)}>{t('CHANGEREQUEST')}</Button>
        }
      </JPaper>
    );
  }
  return (
    <JPaper>
      <Registration />
    </JPaper>
  );
}