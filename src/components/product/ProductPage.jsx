import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// mui imports
import {
  Accordion, AccordionDetails, AccordionSummary,
  Container, FormControl, FormControlLabel,
  FormLabel, Grid, Radio,
  RadioGroup, Typography, useMediaQuery, Checkbox,
} from '@mui/material';
import { useTheme } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// context
import { useFilterContext } from '../../context/FilterProvider';
import useCategory from '../../api/category';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';

// api
import useProduct from '../../api/product';

// custom components
import SingleProductCard from './SingleProductMobile';
import SingleProductDesktop from './SingleProductDesktop';
import LPaper from '../../styles/lPaper';
import { useNavbarLoaderContext } from '../../context/ui/NavbarLoaderProvider';
import { useLoaderContext } from '../../context/ui/LoaderProvider';
import ProductPagination from './ProductPagination';
import JPaper from '../../styles/jPaper';
import { useLanguageContext } from '../../context/LanguageProvider';

export default function ProductPage() {
  const [products, setProducts] = useState({ count: 0, products: [] });
  const [categories, setCategories] = useState([]);
  const [filterTags, setFilterTags] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { language } = useLanguageContext();
  // const [radioChecked, setRadioChecked] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(products.count);
  const pageSize = 12;
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // contexts
  const { handleSnackbar } = useSnackbarContext();
  const { t } = useTranslation();
  const { search, category, setCategory } = useFilterContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('lg'));
  const { getAllCategories } = useCategory();
  const { startNavbarLoader, stopNavbarLoader } = useNavbarLoaderContext();

  useEffect(() => {
    setPage(0);
  }, [search]);

  useEffect(() => {
    async function fetchProducts() {
      let productList = products.products;
      // if (products.count === 0) {
      // try {
      startNavbarLoader();
      // handleLoader();
      // SIMULATE NETWORK LATANCY
      // await new Promise((resolve) => setTimeout(resolve, 5000));
      setProducts(sessionStorage.getItem('products') ? JSON.parse(sessionStorage.getItem('products')) : []);
      productList = sessionStorage.getItem('products') ? JSON.parse(sessionStorage.getItem('products')).products : [];
      // } catch (error) {
      //   handleSnackbar({
      //     content: 'Failed to load products',
      //     severity: 'error',
      //   });
      // } finally {
      stopNavbarLoader();
      // handleClose();
      // }
      // }
      let filterProducts = [];
      if (category.length > 0) {
        filterProducts = productList.filter((product) => (product.name.toLowerCase()
          .includes(search.toLowerCase()) && category.every((el) => product.categoryId.includes(el))));
      } else {
        filterProducts = productList.filter((product, index) => (productList.findIndex((item) => item.id === product.id) === index
          && product.name.toLowerCase().includes(search.toLowerCase())));
      }
      setCount(filterProducts.length);
      setFilteredProducts(filterProducts);
    }
    async function fetchCategories() {
      const categoriesList = await getAllCategories();

      setCategories(categoriesList.categories);
    }

    // reset category
    fetchCategories();
    fetchProducts();
  }, [search, category, language]);

  const handlePageChange = (value) => {
    setPage(value - 1);
  };

  // const filterProd = filteredProducts.filter((product) => (filterTags.length > 0
  //   ? filterTags.every((filterTag) => product.categoryId == filterTag) // wanneer er meerdere categorieen bij een products horen gebruik maken van map & include
  //   : filteredProducts));

  const AllProducts = filteredProducts.slice(page * pageSize, (page * pageSize) + pageSize).map((product) => (
    <Grid
      item
      key={product.id}
      xs={3}
      sm={4}
      md={3}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {matches ? (
        <SingleProductCard product={product} key={product.id} matches={matches} />
      ) : (
        <SingleProductDesktop product={product} key={product.id} matches={matches} />
      )}
    </Grid>
  ));

  const filterHandler = (event) => {
    if (event.target.checked) {
      setCategory([...category, Number(event.target.value)]);
      // setFilterTags([...filterTags, event.target.value]);
    } else {
      setCategory(
        category.filter((filterTag) => filterTag !== Number(event.target.value)),
      );
      // setFilterTags(
      //   filterTags.filter((filterTag) => filterTag !== event.target.value),
      // );
    }
  };

  return (
    <Container sx={{ minWidth: '100%' }}>

      <LPaper>
        <Typography variant="h4" data-cy="individualProduct">{t('Products')}</Typography>
      </LPaper>

      <Grid
        container
        justifyContent="center"
      >
        <Grid
          item
          xs={6}
          sm={7}
          md={3}
          lg={2}
          justifyContent="center"
          sx={{ margin: '20px 4px 10px 4px' }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >

          <Accordion sx={{ p: '10px', minWidth: '50px' }}>
            <AccordionSummary
              sx={{ p: '10px', minWidth: '50px' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h6">{t('Category')}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">{t('AvailableCategories')}</FormLabel>
                {categories.map((cat) => (
                  <FormControlLabel
                    value={cat.name}
                    key={cat.id}
                    control={(
                      <Checkbox
                        key={cat.id}
                        onChange={filterHandler}
                        {...label}
                        value={cat.id}
                      />
                    )}
                    label={cat.name}
                  />
                ))}
                {/* <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="allCategories"
                  name="radio-buttons-group"
                >
                  <FormControlLabel value="allCategories" control={<Radio onClick={() => handleRadioClick(null, null)} />} label="All Categories" />
                  {categories.map((cat) => <FormControlLabel value={cat.name} key={cat.id} control={<Radio key={cat.id} onClick={() => handleRadioClick(cat.id, cat.name)} />} label={cat.name} />)}

                </RadioGroup>
                */}
                {/* <Button variant="contained" onClick={() => handleClearFilter()}>Clear filter</Button> */}
              </FormControl>

            </AccordionDetails>
          </Accordion>

        </Grid>
        <Grid
          item
          sm={8}
          xs={12}
          lg={9}
          justifyContent="center"
          sx={{ margin: '20px 4px 10px 4px' }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 2, lg: 4 }}
            justifyContent="center"
            sx={{ margin: '20px 4px 10px 4px' }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {AllProducts.length >= 1 ? AllProducts : (<LPaper><Typography variant="h5">{t('NoItemsFound')}</Typography></LPaper>)}
          </Grid>
        </Grid>
      </Grid>
      {count > 0
        ? <ProductPagination count={count} handlePageChange={handlePageChange} />
        : null}
    </Container>
  );
}