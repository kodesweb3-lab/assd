import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SearchContextType {
  showSearch: boolean;
  toggleSearch: () => void;
  setShowSearch: (show: boolean) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(prev => !prev);
  };

  return (
    <SearchContext.Provider value={{ showSearch, toggleSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
