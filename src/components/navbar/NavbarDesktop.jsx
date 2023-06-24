import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import SearchIcon from '@mui/icons-material/Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ListItemText,
} from '@mui/material';

import {
  AppbarContainer,
  AppbarHeader,
  ListItemNavbar,
  MyList,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../../styles/appbar';
import Actions from './Actions';
import { useFilterContext } from '../../context/FilterProvider';
import Breadcrumbs from './BreadCrumbs';

export default function NavbarDesktop({ matches }) {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { setSearch } = useFilterContext();
  // const { pathname } = useLocation();

  const handleChange = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
    /* if (pathname !== '/products') {
      navigate('/products');
    } */
  };
  // const handleNoFocus = () => {
  //   setAnchorEl(null);
  // };

  return (
    <AppbarContainer>
      <ListItemNavbar
        button
        component={Link}
        to="/home"

      >
        <AppbarHeader>
          delaware
        </AppbarHeader>
      </ListItemNavbar>

      <MyList type="row">
        <ListItemNavbar button component={Link} to="/category">
          <ListItemText primary={t('Categories')} />
        </ListItemNavbar>
        <ListItemNavbar button component={Link} to="/products">
          <ListItemText primary={t('Products')} />
        </ListItemNavbar>
        <ListItemNavbar button component={Link} to="/track">
          <ListItemText primary={t('Track')} />
        </ListItemNavbar>
        <ListItemNavbar button component={Link} to="/assistance">
          <ListItemText primary={t('NeedAssistance')} />
        </ListItemNavbar>

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': t('search') }}
            // onChange={handleChange}
            onKeyDown={handleChange}
            // onBlur={handleNoFocus}
          />
        </Search>
      </MyList>
      <Actions matches={matches} />
      <Breadcrumbs />
    </AppbarContainer>
  );
}