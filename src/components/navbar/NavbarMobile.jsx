import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// material import
import { IconButton, useMediaQuery } from '@mui/material';
import { Search as SearchIcon, Menu as MenuIcon } from '@mui/icons-material';
import { ClickAwayListener } from '@mui/base';
import { useTheme } from '@mui/material/styles';

// context
import { useFilterContext } from '../../context/FilterProvider';
import { useUIContext } from '../../context/ui/UIContext';

// custom imports
import {
  AppbarContainer, AppbarHeader, ListItemNavbar,
  Search, SearchIconWrapper, StyledInputBase,
} from '../../styles/appbar';
import Actions from './Actions';
import { Colors } from '../../styles/theme';

function SearchButton({ searchBarOpened, setSearchBarOpened }) {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const { setSearch } = useFilterContext();
  // const { pathname } = useLocation();

  const handleChange = (e) => {
    if (e.keyCode === 13) {
      setSearch(e.target.value);
    }
  };
  if (searchBarOpened) {
    return (
      <>
        <ClickAwayListener onClickAway={() => setSearchBarOpened(false)}>
          <Search sx={{ margin: { sm: '0 auto', xs: '0 auto' }, minWidth: { xs: '100%', sm: '50%' } }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': t('search') }}
              onKeyDown={handleChange}
            />
          </Search>
        </ClickAwayListener>
      </>
    );
  }
  return (
    <IconButton
      onClick={() => setSearchBarOpened(true)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        color: Colors.primary,
      }}
    >
      <SearchIcon />
    </IconButton>
  );
}

export default function NavbarMobile({ matches }) {
  const { setDrawerOpen } = useUIContext();
  const [searchBarOpened, setSearchBarOpened] = useState(false);

  const theme = useTheme();
  const removeOtherIcons = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppbarContainer>
      {
        searchBarOpened && removeOtherIcons
          ? <></>
          : (
            <>
              <IconButton data-cy="drawerOpenButton" onClick={() => setDrawerOpen(true)}>
                <MenuIcon />
              </IconButton>
              <ListItemNavbar button component={Link} to="/home">
                <AppbarHeader textAlign="center" variant="h3">
                  delaware
                </AppbarHeader>
              </ListItemNavbar>
            </>
          )
      }
      <SearchButton searchBarOpened={searchBarOpened} setSearchBarOpened={setSearchBarOpened} />
      <Actions matches={matches} />
    </AppbarContainer>
  );
}