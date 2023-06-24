import * as React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/system';
import { CssBaseline } from '@mui/material';

import { useEffect } from 'react';
import Navbar from './components/navbar';

// Contexts
import ContextWrapper from './context/ContextWrapper';

import Home from './components/home/Home';
import NotFound from './components/home/NotFound';
import Wishlist from './components/wishlist/Wishlist';
import Cart from './components/cart/Cart';
import Account from './components/account/Account';
import Login from './components/account/Login';
import Register from './components/account/Register';
import RequireAuth from './components/authentication/RequireAuth';
import AuthLanding from './components/authentication/AuthLanding';
import MobileDrawer from './components/drawer/Drawer';
import theme from './styles/theme';
import ProductPage from './components/product/ProductPage';
import IndividualProduct from './components/product/IndividualProduct';
import Checkout from './components/order/Checkout';

import NotificationPage from './components/notifications/NotificationPage';

import Orders from './components/orders/Orders';
import IndividualOrder from './components/orders/IndividualOrder';

import CategoryPage from './components/category/CategoryPage';

import ContactPage from './components/contact/Contact';
import StickyFooter from './components/footer/Footer';
import ContactForm from './components/contact/ContactForm';

import TrackPage from './components/track/TrackPage';
import Track from './components/track/Track';
import { PageContainer } from './styles/appbar';
import ScrollToTop from './context/ui/ScrollToTop';

import useProduct from './api/product';
import i18n from './i18n';
import OrderUpdate from './components/orders/OrderUpdate';

function App() {
  const productApi = useProduct();

  useEffect(() => {
    async function fetchProducts() {
      if (!sessionStorage.getItem('products')) {
        const products = await productApi.getAll(i18n.language);
        sessionStorage.setItem('products', JSON.stringify(products.products));
      }
    }
    fetchProducts();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ContextWrapper>
        <Container maxWidth="l" sx={{ backgroundColor: '#EC4842' }}>
          <CssBaseline />
          <Navbar />
        </Container>
        <ScrollToTop />
        <PageContainer sx={{ minWidth: '100%' }}>
          <Routes>
            <Route
              path="/"
              element={<Navigate replace to="/home" />}
            />
            <Route path="/home" element={<Home />} />
            <Route
              path="*"
              element={<Navigate to="/not-found" />}
            />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/products" element={<ProductPage />} />
            <Route exact path="/products/:name/:id" element={<IndividualProduct />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/order"
              element={<Navigate replace to="/cart/order" />}
            />
            <Route path="/cart/order" element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path="/assistance" element={<ContactPage />} />
            <Route path="/assistance/formCustomer" element={<RequireAuth><ContactForm /></RequireAuth>} />
            <Route
              path="/formCustomer"
              element={<Navigate replace to="/assistance/formCustomer" />}
            />
            <Route path="/assistance/formNotCustomer" element={<ContactForm />} />
            <Route
              path="/formNotCustomer"
              element={<Navigate replace to="/assistance/formNotCustomer" />}
            />
            <Route
              path="/account"
              element={(
                <RequireAuth>
                  <Account />
                </RequireAuth>
              )}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/authentication" element={<AuthLanding />} />
            <Route path="/notifications" element={<RequireAuth><NotificationPage /></RequireAuth>} />
            <Route path="/orders" element={<RequireAuth><Orders /></RequireAuth>} />
            <Route exact path="/orders/:id" element={<IndividualOrder />} />
            <Route exact path="/orders/:id/update" element={<OrderUpdate />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/track/:trackCode/:verificationCode" element={<Track />} />
          </Routes>
        </PageContainer>
        <StickyFooter />
        <MobileDrawer />
      </ContextWrapper>
    </ThemeProvider>
  );
}

export default App;