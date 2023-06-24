import React, { useEffect, useState, useTransition } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useLocation } from 'react-router';
import useCategory from '../../api/category';
import CategoryCard from './CategoryCard';
import { useNavbarLoaderContext } from '../../context/ui/NavbarLoaderProvider';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';
import { useFilterContext } from '../../context/FilterProvider';

import LPaper from '../../styles/lPaper';

export default function CategoryPage() {
  const { t } = useTranslation();
  const { getAllCategories } = useCategory();
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const { search, setSearch } = useFilterContext();
  const { pathname } = useLocation();

  const { startNavbarLoader, stopNavbarLoader } = useNavbarLoaderContext();
  const { handleSnackbar } = useSnackbarContext();
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    setSearch('');
  }, [pathname]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        startNavbarLoader();
        // await new Promise((resolve) => setTimeout(resolve, 5000)); // SIMULATE NETWORK LATANCY
        let data = { categories, count: categories.length };
        if (categories.length === 0) {
          data = await getAllCategories();
          setCategories(data.categories);
        }
        setFilteredCategories(data.categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase())));
      } catch (error) {
        handleSnackbar({
          content: t('FailedToLoadCategories'),
          severity: 'error',
        });
      } finally {
        stopNavbarLoader();
      }
    }
    fetchCategories();
  }, [search]);

  return (
    <>
      <LPaper>
        <Typography variant="h4">{t('Categories')}</Typography>
      </LPaper>
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          justifyContent="center"
          sx={{ margin: '20px 4px 10px 4px' }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {filteredCategories.length === 0 ? (
            <LPaper>
              <Typography variant="h6">{t('NoCategoriesFound')}</Typography>
            </LPaper>
          )
            : (
              filteredCategories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))
            ) }
        </Grid>
      </Container>
    </>
  );
}