import React from 'react';

import { Button } from "@/components/ui/button"
import ThemeSwitcher from "@/components/theme-switch"
import SearchBar from './search-bar';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 bg-background bg-opacity-0 dark:bg-background">
      <a href="/" className="text-lg no-underline dark:hover:text-foregfround">
        Nomad Networks
      </a>

      <SearchBar />
      <ThemeSwitcher />
    </nav>
  );
};

export default Navbar;