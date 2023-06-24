import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { lighten } from 'polished';
import { Link } from 'react-router-dom';
import { useUIContext } from '../../context/ui/UIContext';
import { DrawerCloseButton } from '../../styles/appbar';
import { Colors } from '../../styles/theme';

export default function MobileDrawer() {
  const { drawerOpen, setDrawerOpen } = useUIContext();
  const { t } = useTranslation();

  return (
    <>

      {drawerOpen && (
        <DrawerCloseButton data-cy="drawerCloseButton" onClick={() => setDrawerOpen(false)}>
          <CloseIcon
            sx={{
              fontSize: '2em',
              color: lighten(0.09, Colors.secondary),
            }}
          />
        </DrawerCloseButton>
      )}
      <Drawer
        data-cy="mobileDrawer"
        open={drawerOpen}
        sx={{ backdropFilter: 'blur(3px)' }}
        onKeyDown={() => { setDrawerOpen(false); }}
        onBackdropClick={() => { setDrawerOpen(false); }}
      >
        <List>
          <ListItemButton component={Link} to="/category">
            <ListItemText>{t('Categories')}</ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/products">
            <ListItemText>{t('Products')}</ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/track">
            <ListItemText>{t('Track')}</ListItemText>
          </ListItemButton>
          <Divider />
          <ListItemButton component={Link} to="/assistance">
            <ListItemText>{t('NeedAssistance')}</ListItemText>
          </ListItemButton>
          <Divider />
        </List>
      </Drawer>

    </>
  );
}