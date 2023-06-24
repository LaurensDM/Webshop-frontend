import HomeIcon from '@mui/icons-material/Home';

import React from 'react';
import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { BreadcrumbsDWS } from '../../styles/appbar';

export default function Breadcrumbs() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  function handleClick(name) {
    navigate(`/${name}`);
  }

  const { pathname } = useLocation();
  const pathnames = pathname.split('/').filter((x) => x);
  return (

    <div role="presentation">
      <BreadcrumbsDWS aria-label="breadcrumb">

        <Button variant="text" underline="hover" onClick={() => handleClick('home')}>
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {t('Home')}
        </Button>

        {pathnames.map((name, index) => {
          if (name !== 'home') {
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <Typography key={name}>{name}</Typography>
            ) : (
              <Button key={name} underline="hover" onClick={() => handleClick(name)}>
                {name}
              </Button>
            );
          }
          return null;
        })}
        {/* <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/material-ui/getting-started/installation/"
        >
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Core
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Breadcrumb
        </Typography> */}
      </BreadcrumbsDWS>
    </div>
  );
}