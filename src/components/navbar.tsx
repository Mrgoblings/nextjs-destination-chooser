"use client";

import { useState } from 'react';

import ThemeSwitcher from "@/components/theme-switch"
import SearchBar from './search-bar';
import LoggedInIcon from './logged-in-icon';

const Navbar = () =>{
  const [isSearchBarActive, setSearchBarActive] = useState(false);

  const handleSearchBarFocus = () => {
    setSearchBarActive(true);
  };

  const handleSearchBarBlur = () => {
    setSearchBarActive(false);
  };

  return (
    <div className="fixed top-0 w-full z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 bg-background bg-opacity-0 dark:bg-background">
      <a href="/" className={`text-lg no-underline dark:hover:text-foreground ${isSearchBarActive ? 'hide-on-small' : ''}`}>
        Nomad Networks
      </a>
   
      <SearchBar onFocus={handleSearchBarFocus} onBlur={handleSearchBarBlur} />
      <div className='flex flex-row'>

        <LoggedInIcon />

        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;