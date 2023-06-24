import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { LinearProgress, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// api
import useCompany from '../../api/company';
import ChangeRolDropdown from './ChangeRolDropdown';

export default function AdminPanel() {
  const { t } = useTranslation();
  const apiRef = useGridApiRef();
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeEmails, setEmployeeEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const companyApi = useCompany();

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 0,
  });

  const columnsLarge = [
    {
      field: 'name',
      headerName: t('Alias'),
      width: 100,
    },
    {
      field: 'firstName',
      headerName: t('FirstName'),
      width: 100,
    },
    {
      field: 'lastName',
      headerName: t('LastName'),
      width: 150,
    },
    {
      field: 'email',
      headerName: t('Email'),
      width: 250,
    },
    {
      field: 'role',
      headerName: t('Role'),
      description: t('RoleOrStatus'),
      width: 124,
    },
  ];

  const columnsSmall = [
    // { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'email',
      headerName: t('Email'),
      width: 175,
    },
    {
      field: 'role',
      headerName: t('Role'),
      description: t('RoleOrStatus'),
      width: 124,
    },
  ];

  const handleEmployeeData = async () => {
    setLoading(true);
    const companyEmployeeData = await companyApi.getEmployeeData();
    setEmployeeData(companyEmployeeData);
    const emails = companyEmployeeData.map((employee) => employee.email);
    setEmployeeEmails(emails);
    setLoading(false);
  };

  useEffect(() => {
    handleEmployeeData();
  }, []);

  return (
    <>
      <h2>{t('AdminPanel')}</h2>
      <DataGrid
        apiRef={apiRef}
        rows={employeeData}
        columns={matches ? columnsSmall : columnsLarge}
        slots={{
          loadingOverlay: LinearProgress,
        }}
        loading={loading}
        pageSize={5}
        rowsPerPageOptions={[1]}
        autoHeight
        // checkboxSelection
        getRowId={(row) => row.email}
        // for pagination
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25, 100]}
      // selectionModel={selectionModel}
      // onSelectionModelChange={setSelection}
      />
      <ChangeRolDropdown handleEmployeeData={handleEmployeeData} employeeData={employeeData} />
    </>
  );
}