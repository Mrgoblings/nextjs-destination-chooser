"use client";

import React from 'react';

import ThemeSwitcher from "@/components/theme-switch"
import SearchBar from './search-bar';

const Navbar: React.FC = () => {
  const [isSearchBarActive, setSearchBarActive] = React.useState(false);

  const handleSearchBarFocus = () => {
    setSearchBarActive(true);
  };

  const handleSearchBarBlur = () => {
    setSearchBarActive(false);
  };

  return (
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 bg-background bg-opacity-0 dark:bg-background">
      <a href="/" className={`text-lg no-underline dark:hover:text-foreground ${isSearchBarActive ? 'hide-on-small' : ''}`}>
        Nomad Networks
      </a>

      <SearchBar onFocus={handleSearchBarFocus} onBlur={handleSearchBarBlur} />
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;