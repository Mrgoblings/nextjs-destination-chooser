import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="relative z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 bg-background dark:bg-background">
      <a href="/" className="text-lg no-underline hover:underline dark:hover:text-white">
        Company Name
      </a>
      <input type="search" placeholder="Search..." className="px-3 py-2 border rounded-md dark:bg-gray-800 dark:text-white" />
      <button className="text-lg no-underline hover:underline dark:hover:text-white">
        Theme Switcher
      </button>
    </nav>
  );
};

export default Navbar;