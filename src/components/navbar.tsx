import ThemeSwitcher from "@/components/theme-switch"
import SearchBar from './search-bar';
import LoggedInIcon from './logged-in-icon';
import Link from "next/link";

const Navbar = () =>{
  return (
    <div className="fixed top-0 w-full z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 bg-background bg-opacity-0">
      {/* <Link id="logo" href="/" className="text-lg no-underline dark:hover:text-foreground">
        Nomad Networks
      </Link> */}
      <a href="/" id="logo" className="text-lg no-underline dark:hover:text-foreground">
        Nomad Networks
      </a>
   
      <SearchBar idToHide="logo" />
      <div className='flex flex-row'>
      
      {/* TODO: uncomment and fix */}
      {/* <LoggedInIcon />  */}

      <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;