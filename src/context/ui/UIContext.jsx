import React, {
  createContext, useContext, useState,
} from 'react';

export const UIContext = createContext();
export const useUIContext = () => useContext(UIContext);

export function UIProvider({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const value = {
    drawerOpen,
    setDrawerOpen,
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
}