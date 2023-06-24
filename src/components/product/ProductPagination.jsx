import { Pagination } from '@mui/material';
import { Box } from '@mui/system';
import { React } from 'react';

export default function ProductPagination({ count, handlePageChange }) {
  const pageSize = 12;
  return (
    <Box
      justifyContent="center"
      alignItems="center"
      display="flex"
      sx={{
        margin: '20px 0px',
      }}
    >
      <Pagination
        count={Math.ceil(count / pageSize)}
        onChange={(e, value) => {
          handlePageChange(value);
        }}
      />
    </Box>
  );
}