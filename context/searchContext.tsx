"use client";

import React, { createContext, useContext, useState } from "react";

interface SearchQueryProps {
  // set params types for the context
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  showTopContent: boolean;
  setShowTopContent: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchContext = createContext<SearchQueryProps>({
  // define the context state
  searchQuery: "",
  setSearchQuery: () => {},
  showTopContent: true,
  setShowTopContent: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showTopContent, setShowTopContent] = useState<boolean>(true);

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, showTopContent, setShowTopContent }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchQuery = (): SearchQueryProps => useContext(SearchContext); // export useSearchQuery as hook to render the state
