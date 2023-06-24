import {
  useState, React, useMemo, useContext, createContext, useEffect,
} from 'react';
import i18n from '../i18n';
import useProduct from '../api/product';

export const LanguageContext = createContext();
export const useLanguageContext = () => useContext(LanguageContext);

export default function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(i18n.language);
  const productApi = useProduct();

  useEffect(() => {
    async function fetchProducts() {
      const products = await productApi.getAll(language);
      sessionStorage.setItem('products', JSON.stringify(products));
    }
    fetchProducts();
  }, []);

  const handleLanguageChange = async (lng) => {
    const products = await productApi.getAll(lng);
    sessionStorage.setItem('products', JSON.stringify(products));
    setLanguage(lng);
  };

  const value = useMemo(() => ({
    language,
    handleLanguageChange,
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}