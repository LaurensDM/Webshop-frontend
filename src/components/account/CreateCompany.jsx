import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TextField, Switch } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/system';

import JPaper from '../../styles/jPaper';

import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

import useCompany from '../../api/company';
import { useAuthContext } from '../../context/AuthProvider';

export default function CreateCompany() {
  const { t } = useTranslation();
  const companyApi = useCompany();
  const { handleSnackbar } = useSnackbarContext();
  const { currentUser, verify } = useAuthContext();

  const [loadingButton, setLoadingButton] = useState(false);

  const [companyVAT, setCompanyVAT] = useState('');
  const [company, setCompany] = useState({});
  const [customFormEnabled, setCustomFormEnabled] = useState(true);

  const [valid, setValid] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [readableAddress, setReadableAddress] = useState('');

  const setAll = (companyInformation) => {
    setValid(companyInformation.valid);
    setCountryCode(companyInformation.countryCode);
    setVatNumber(companyInformation.vatNumber);
    setName(companyInformation.name);
    setReadableAddress(companyInformation.strAddress);
    setStreet(companyInformation.address.street);
    setNumber(companyInformation.address.number);
    setZipCode(companyInformation.address.zip_code);
    setCity(companyInformation.address.city);
    setCountry(companyInformation.address.country);
  };

  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const formatCompany = (companyInformation) => ({
    name: companyInformation.name,
    countryCode: companyInformation.countryCode,
    vatNumber: companyInformation.vatNumber,
    street: companyInformation.address.street,
    streetNumber: companyInformation.address.number,
    zipCode: companyInformation.address.zip_code,
    city: companyInformation.address.city,
    country: companyInformation.address.country,
  });

  const handleSetCompany = async () => {
    setLoadingButton(true);
    const companyInformation = await companyApi.checkVat(companyVAT);
    if (companyInformation.valid) {
      const formattedCompany = formatCompany(companyInformation);
      setCompany(formattedCompany);
      setAll(companyInformation);
      handleSnackbar({
        content: `Successfully added company information for ${companyInformation.name}`,
      });
    } else {
      handleSnackbar({
        content: t('Company does not exist; make sure to format it like BE0123456789'),
        severity: 'error',
        duration: 5000,
      });
    }
    setLoadingButton(false);
  };

  const handleSwitch = (event) => {
    setCustomFormEnabled(event.target.checked);
  };

  async function handleRegisterCompany() {
    try {
      await companyApi.registerCompany(company);
      await verify();
    } catch (e) {
      setLoadingButton(false);
      handleSnackbar({
        content: e.message,
        severity: 'error',
      });
    }
  }

  return (
    <>
      <JPaper>
        {t('UseVATNumberToGetCompanyInformation')}
        <Switch
          data-cy="testCreateCompanyRadio"
          checked={customFormEnabled}
          onChange={handleSwitch}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </JPaper>

      <TextField
        label={t('VATNumber')}
        data-cy="testCompanyVATRegister"
        type="name"
        variant="standard"
        onChange={handleChange(setCompanyVAT)}
      />

      <LoadingButton disabled={!customFormEnabled} variant="contained" data-cy="testValidateCompany" color="success" onClick={() => handleSetCompany()} loading={loadingButton}>
        {t('ValidateVAT')}
      </LoadingButton>

      {customFormEnabled ? ' Check all information to make sure it is correct.' : ''}
      <JPaper>
        <Box>
          <TextField disabled={customFormEnabled} id="standard-basic" label="Name" variant="standard" value={name} onChange={handleChange(setName)} />
          <TextField disabled={customFormEnabled} id="standard-basic" label="Country Code" variant="standard" value={countryCode} onChange={handleChange(setCountryCode)} />
          <TextField disabled={customFormEnabled} id="standard-basic" label="Vat Number" variant="standard" value={vatNumber} onChange={handleChange(setVatNumber)} />
        </Box>
        <JPaper>
          <TextField disabled={customFormEnabled} id="standard-basic" label="Street" variant="standard" value={street} onChange={handleChange(setStreet)} />
          <TextField disabled={customFormEnabled} id="standard-basic" label="Street Number" variant="standard" value={number} onChange={handleChange(setNumber)} />
          <TextField disabled={customFormEnabled} id="standard-basic" label="Zip Code" variant="standard" value={zipCode} onChange={handleChange(setZipCode)} />
          <TextField disabled={customFormEnabled} id="standard-basic" label="City" variant="standard" value={city} onChange={handleChange(setCity)} />
          <TextField disabled={customFormEnabled} id="standard-basic" label="Country" variant="standard" value={country} onChange={handleChange(setCountry)} />
        </JPaper>
      </JPaper>
      <LoadingButton
        disabled={companyVAT === ''}
        variant="contained"
        data-cy="submit_register"
        color="success"
        onClick={() => handleRegisterCompany()}
        loading={loadingButton}
      >
        {t('CreateCompany')}
      </LoadingButton>
      {/* <TextField disabled={customFormEnabled} id="standard-basic" label="strAddress" variant="standard" value={readableAddress} onChange={handleChange(setReadableAddress)} /> */}
    </>
  );
}