import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import { useLocation } from 'react-router';

export const FilterContext = createContext();
export const useFilterContext = () => useContext(FilterContext);

export function FilterProvider({ children }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState([]);
  const { pathname } = useLocation();

  useEffect(() => {
    setSearch('');
    if (pathname !== '/products') {
      setCategory([]);
    }
  }, [pathname]);

  const value = useMemo(() => ({
    search,
    category,
    setSearch,
    setCategory,
  }), [search, category]);

  // const value = {
  //   search,
  //   category,
  //   setSearch,
  //   setCategory,
  // };

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}