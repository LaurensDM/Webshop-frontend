import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/system';
import { Grid, Typography } from '@mui/material';
import Banner from '../banner/Banner';
import Promotions from '../promotions/Promotions';
import useCategory from '../../api/category';
import { useNavbarLoaderContext } from '../../context/ui/NavbarLoaderProvider';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';
import CategoryCard from '../category/CategoryCard';
import JPaper from '../../styles/jPaper';
import MainFeaturedPost from './AboutUs';
import AboutUs from './AboutUs';

export default function Home() {
  const { t } = useTranslation();
  const { getAllCategories } = useCategory();
  const [categories, setCategories] = useState([]);
  const { startNavbarLoader, stopNavbarLoader } = useNavbarLoaderContext();
  const { handleSnackbar } = useSnackbarContext();
  useEffect(() => {
    async function fetchCategories() {
      try {
        startNavbarLoader();
        // await new Promise((resolve) => setTimeout(resolve, 5000)); // SIMULATE NETWORK LATANCY
        const data = await getAllCategories();

        setCategories(data.categories);
      } catch (error) {
        handleSnackbar({
          content: t('FailedLoadCategories'),
          severity: 'error',
        });
      } finally {
        stopNavbarLoader();
      }
    }
    fetchCategories();
  }, []);

  return (
    <Container sx={{ minWidth: '100%' }}>
      <Banner />
      <Promotions />
      {/* uncomment when testing, data-cy does not seem to work on Banner */}
      {/* <div data-cy="homeBanner">oi</div> */}
      <Grid
        container
        justifyContent="center"
      >

        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}

      </Grid>
      <JPaper id="AboutUsPaper" elevation={12} sx={{ my: '50px' }}><Typography variant="h2">{t('AboutUs')}</Typography></JPaper>
      <Grid
        container
        justifyContent="center"
        sx={{ my: '50px' }}
      >

        <AboutUs />

      </Grid>

    </Container>
  );
}