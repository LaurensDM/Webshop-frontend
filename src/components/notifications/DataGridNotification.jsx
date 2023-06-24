import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// mui
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useTheme } from '@mui/system';
import { useMediaQuery, Button, LinearProgress } from '@mui/material';

// context
import { useNotificationDialogContext } from '../../context/ui/NotificationDialogProvider';

export default function CustomDataGrid({ data, loading }) {
  const { handleNotificationDialog } = useNotificationDialogContext();
  const apiRef = useGridApiRef();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const tablet = useMediaQuery(theme.breakpoints.down('md'));
  const desktop = useMediaQuery(theme.breakpoints.up('lg'));
  const { t } = useTranslation();

  const handleRowClick = (param) => {
    handleNotificationDialog({
      notification: param.row,
    });
  };

  const columnsLarge = [
    {
      field: 'audience',
      headerName: t('Audience'),
      width: 100,
    }, {
      field: 'subject',
      headerName: t('Subject'),
      width: 200,
    }, {
      field: 'date',
      headerName: t('Date'),
      width: 200,
    },
    {
      field: 'action',
      headerName: t('Action'),
      headerAlign: 'right',
      align: 'right',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const { api } = params;
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c);
          handleRowClick(params);
        };
        return <Button onClick={onClick}>{t('Details')}</Button>;
      },
    },
  ];

  const columnsExtraLarge = [
    {
      field: 'audience',
      headerName: t('Audience'),
      width: 100,
    }, {
      field: 'subject',
      headerName: t('Subject'),
      width: 280,
    }, {
      field: 'date',
      headerName: t('Date'),
      width: 200,
    },
    {
      field: 'readBy',
      headerName: t('ReadBy'),
      width: 180,
    },
    {
      field: 'action',
      headerName: t('Action'),
      headerAlign: 'right',
      align: 'right',
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          e.stopPropagation(); // don't select this row after clicking
          const { api } = params;
          api
            .getAllColumns()
            .filter((c) => c.field !== '__check__' && !!c);
          handleRowClick(params);
        };
        return <Button onClick={onClick}>{t('Details')}</Button>;
      },
    },
  ];

  const columnsSmall = [
    {
      field: 'subject',
      headerName: t('Subject'),
      width: 200,
    }, {
      field: 'date',
      headerName: t('Date'),
      width: 160,
    },
  ];

  const columnsMedium = [
    {
      field: 'audience',
      headerName: t('Audience'),
      width: 100,
    },
    {
      field: 'subject',
      headerName: t('Subject'),
      width: 200,
    }, {
      field: 'date',
      headerName: t('Date'),
      width: 180,
    },
  ];

  return (
    <DataGrid
      disableRowSelectionOnClick
      onRowClick={tablet ? handleRowClick : null}
      apiRef={apiRef}
      rows={data}
      columns={mobile ? columnsSmall : tablet ? columnsMedium : desktop ? columnsExtraLarge : columnsLarge}
      slots={{
        loadingOverlay: LinearProgress,
      }}
      loading={loading}
      pageSize={5}
      rowsPerPageOptions={[1]}
      autoHeight
      // checkboxSelection
      getRowId={(row) => row.id}
      // for pagination
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      pageSizeOptions={[5, 10, 25, 100]}
    // selectionModel={selectionModel}
    // onSelectionModelChange={setSelection}
    />
  );
}