import { React } from 'react';
import AuthProvider from './AuthProvider';
import CartProvider from './CartProvider';
import { FilterProvider } from './FilterProvider';
import { UIProvider } from './ui/UIContext';
import { SnackbarProvider } from './ui/SnackbarProvider';
import { NavbarLoaderProvider } from './ui/NavbarLoaderProvider';
import { LoaderProvider } from './ui/LoaderProvider';
import { NotificationProvider } from './NotificationProvider';
import NotificationDialogProvider from './ui/NotificationDialogProvider';
import DialogProvider from './ui/DialogProvider';
import LanguageProvider from './LanguageProvider';

export default function ContextWrapper({ children }) {
  return (
    <UIProvider>
      <LanguageProvider>
        <SnackbarProvider>
          <AuthProvider>
            <NavbarLoaderProvider>
              <LoaderProvider>
                <NotificationProvider>
                  <NotificationDialogProvider>
                    <FilterProvider>
                      <DialogProvider>
                        <CartProvider>
                          {children}
                        </CartProvider>
                      </DialogProvider>
                    </FilterProvider>
                  </NotificationDialogProvider>
                </NotificationProvider>
              </LoaderProvider>
            </NavbarLoaderProvider>
          </AuthProvider>
        </SnackbarProvider>
      </LanguageProvider>
    </UIProvider>
  );
}