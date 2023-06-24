import {
  Button,
  Container, Grid, Menu, MenuItem, TextField, Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import usePackage from '../../api/packaging';

export default function PackagingMethod({ setDisabled, handlePackaging }) {
  const [option, setOption] = useState('Choose your packaging method');
  const [anchorEl, setAnchorEl] = useState(null);
  const [packaging, setPackaging] = useState([{ id: '', name: '', price: '' }]);
  const { t } = useTranslation();
  const open = Boolean(anchorEl);
  const packageApi = usePackage();

  useEffect(() => {
    async function fetchPackaging() {
      const allPackaging = await packageApi.getAll();
      setPackaging(allPackaging.filter((packageOption) => packageOption.active == true));
    }
    if (packaging[0].name === '') {
      fetchPackaging();
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (packageOption) => {
    if (packageOption.name) {
      setOption(packageOption.name);
    }
    handlePackaging(packageOption);
    setDisabled(false);
    setAnchorEl(null);
  };
  return (
    <Container>
      <Typography variant="h6">
        {t('PackagingMethod')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} sx={{}}>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {option}
          </Button>
          <Menu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {packaging.map((packageOption) => (
              <MenuItem key={packageOption.id} onClick={() => handleClose(packageOption)} disableRipple>
                {`${packageOption.name} €${packageOption.price}`}
              </MenuItem>
            ))}
          </Menu>

        </Grid>

      </Grid>
    </Container>
  );
}