import React, {
  useCallback, useEffect, useState, useRef,
} from 'react';

// mui
import {
  Divider, ListItemButton, ListItemIcon, Tooltip,
  Grow, Paper, Popper, MenuItem, MenuList, Badge,
  useMediaQuery,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  NotificationsActive as NotificationsActiveIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// language
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import { Link } from 'react-router-dom';
import AuthButton from '../account/AuthButton';
import useNotifications from '../../api/notifications';
import { useAuthContext } from '../../context/AuthProvider';
import { useCartContext } from '../../context/CartProvider';
import { useNotificationContext } from '../../context/NotificationProvider';

import {
  MyList,
  ActionIconsContainerDesktop,
  ActionIconsContainerMobile,
} from '../../styles/appbar';
import { Colors } from '../../styles/theme';
import { useLanguageContext } from '../../context/LanguageProvider';

const languages = {
  en: { nativeName: 'English' },
  fr: { nativeName: 'Français' },
  nl: { nativeName: 'Nederlands' },
};

function LanguageSelection({ matches }) {
  // language
  const [open, setOpen] = useState(false);
  const { handleLanguageChange } = useLanguageContext();
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function handleLanguage(language) {
    i18n.changeLanguage(language);
    handleLanguageChange(language);
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <ListItemButton
      data-cy="languageButton"
      sx={{
        justifyContent: 'center',
      }}
      ref={anchorRef}
      id="composition-button"
      aria-controls={open ? 'composition-menu' : undefined}
      aria-expanded={open ? 'true' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      <ListItemIcon
        sx={{
          display: 'flex',
          justifyContent: 'center',
          color: matches && Colors.secondary,
        }}
      >
        <LanguageIcon />
      </ListItemIcon>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  data-cy="languageDropdown"
                >
                  {Object.keys(languages).map((language) => (
                    <MenuItem
                      id="taalKnop"
                      key={language}
                      onClick={() => handleLanguage(language)}
                      disabled={i18n.resolvedLanguage === language}
                    >
                      {languages[language].nativeName}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </ListItemButton>
  );
}

export default function Actions({ matches }) {
  const { t } = useTranslation();
  const Component = matches
    ? ActionIconsContainerMobile
    : ActionIconsContainerDesktop;
  const { isAuth, currentUser } = useAuthContext();
  // const [unreadNotificationCount, setunreadNotificationCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const { getCart, dummyState } = useCartContext();
  const { unreadNotificationsCount } = useNotificationContext();

  const theme = useTheme();
  const removeLanguageSelection = useMediaQuery(theme.breakpoints.up('sm'));

  // const countNotifications = useCallback((notificationsWORK) => {
  //   const notRead = notificationsWORK.filter((notification) => !notification.status);
  //   if (notRead.length > 0) {
  //     setunreadNotificationCount(notRead.length);
  //   } else {
  //     setunreadNotificationCount(0);
  //   }
  // }, []);

  useEffect(() => {
    // if (unreadNotificationsCount > 0) {
    //   // const notificationsWORK = notifications.items;
    //   countNotifications(notificationsWORK);
    // } else {
    //   setunreadNotificationCount(0);
    // }
    setCartCount(getCart().length);
  }, [isAuth, currentUser, dummyState]);

  return (
    <Component>
      <MyList type="row">
        {removeLanguageSelection || !isAuth
          ? (
            <>
              <LanguageSelection matches={matches} />
              <Divider orientation="vertical" flexItem />
            </>
          ) : <></>}

        <Tooltip title={t('Cart')}>
          <ListItemButton
            sx={{
              justifyContent: 'center',
            }}
            data-cy="notificationsButton"
            component={Link}
            to="/cart"
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: matches && Colors.secondary,
              }}
            >
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCartIcon />
              </Badge>
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <Tooltip title={t('Notifications')}>
          <ListItemButton
            sx={{
              justifyContent: 'center',
            }}
            component={Link}
            to="/notifications"
          >
            <ListItemIcon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                color: matches && Colors.secondary,
              }}
            >
              {' '}
              <Badge badgeContent={unreadNotificationsCount} color="primary">
                <NotificationsActiveIcon />
              </Badge>
            </ListItemIcon>
          </ListItemButton>
        </Tooltip>
        <Divider orientation="vertical" flexItem />
        <AuthButton matches={matches} />
      </MyList>
    </Component>
  );
}