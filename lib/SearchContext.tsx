'use client';

import { createContext, useContext, useState } from 'react';

type Ctx = { term: string; setTerm: (v: string) => void };
const SearchContext = createContext<Ctx | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [term, setTerm] = useState('');
  return (
    <SearchContext.Provider value={{ term, setTerm }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be inside <SearchProvider>');
  return ctx;
}
