import React, { Fragment, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

import useCompany from '../../api/company';
import JPaper from '../../styles/jPaper';

export default function JoinCompany({ setJoinCompanyId }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const loading = open && options.length === 0;
  const companyApi = useCompany();

  const handleChange = (newValue) => {
    setJoinCompanyId(newValue.companyId);
  };

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      let formattedCompanies = JSON.parse(sessionStorage.getItem('formattedCompanies') || '[]');
      if (formattedCompanies.length === 0) {
        const companies = await companyApi.getAll();
        formattedCompanies = companies.data.map((company) => {
          const formattedCompany = {
            name: `${company.name} - ${company.city} (${company.country})`,
            companyId: company.id,
          };
          return formattedCompany;
        });
        sessionStorage.setItem('formattedCompanies', JSON.stringify(formattedCompanies));
      }
      if (active) {
        setOptions([...formattedCompanies]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <JPaper>
      <Autocomplete
        id="asynchronous-demo"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={(event, newValue) => {
          handleChange(newValue === null ? '' : newValue);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('CompanyName')}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </JPaper>
  );
}