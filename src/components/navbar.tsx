import ThemeSwitcher from "@/components/theme-switch"
import SearchBar from './search-bar';
import LoggedInIcon from './logged-in-icon';
import Logo from "./logo";

const Navbar = () =>{

  return (
    <div className="fixed border border-muted border-3 top-0 w-full z-10 flex items-center justify-between px-4 py-4 sm:px-6 sm:py-6 bg-background bg-opacity-0">
      {/* <a href="/" id="logo" className="text-lg no-underline dark:hover:text-foreground">
        Nomad Networks
      </a> */}

      <Logo id="logo"/>

      <SearchBar idToHide="logo" />
      <div className='flex flex-row'>
      
      <LoggedInIcon /> 

      <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Navbar;