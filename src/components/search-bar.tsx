"use client";

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { CSSTransition } from 'react-transition-group';
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  onFocus?: () => void;
  onBlur?: () => void;
  idToHide?: string;
}


const SearchBar: React.FC<SearchBarProps> = ({ onFocus, onBlur, idToHide }) => {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    if (isClicked) {
      router.push(`#${idToHide}`);
    } else {
      router.push('#');
    }
  }, [isClicked]);

    const handleClick = () => {
        if (!isClicked) {
            onFocus && onFocus();
        } else {
            onBlur && onBlur();
        }

        setIsClicked(!isClicked);
    };
  
    const handleBlur = () => {
        setIsClicked(false);
        onBlur && onBlur();
    };
  
    const defaultStyle: React.CSSProperties = {
        transition: `opacity 700ms`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    };
  
    const transitionStyles: { [id: string]: React.CSSProperties } = {
        entering: { opacity: 1 },
        entered:  { opacity: 1 },
        exiting:  { opacity: 0 },
        exited:  { opacity: 0 },
        unmounted: { opacity: 0 },

    };


    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const elements = event.currentTarget.elements as HTMLFormControlsCollection;
        const searchInput = elements.namedItem('search-bar') as HTMLInputElement;
        const searchQuery = searchInput.value;

        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      };

  return (
    <form onSubmit={handleSubmit} className="flex ml-30 items-center justify-center">
      <input 
        id="search-btn" 
        type="checkbox" 
        className="absolute left-full"
        hidden={true}
        checked={isClicked}
        onChange={handleClick}
      />
      <input 
        id="search-bar" 
        type="text" 
        placeholder="Search..." 
        className={`mr-[-1.25em] border-none h-14 rounded-full transform transition-all duration-700 ease-out ${isClicked ? 'px-4 w-80 translate-x-0 bg-primary-foreground text-base opacity-100 pr-14' : 'px-0 w-0 translate-x-0 bg-background text-background opacity-0'}`}
        disabled={!isClicked}
        onBlur={handleBlur}
      />
      <label 
        htmlFor="search-btn" 
        className={`absolute z-10 w-12 h-12 rounded-full transition-all duration-700 ease-out cursor-pointer flex items-center justify-center text-accent-foreground ${isClicked ? 'translate-x-[9em] bg-primary text-accent-foreground' : 'translate-x-0 bg-primary text-primary-foreground'}`}
      >
          <div style={{ position: 'relative', height: '100%', width: '100%' }}>
          <CSSTransition
            in={!isClicked}
            timeout={700}
            unmountOnExit
          >
            {state => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <FaSearch />
              </div>
            )}
          </CSSTransition>
          <CSSTransition
            in={isClicked}
            timeout={700}
            unmountOnExit
          >
            {state => (
              <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }}>
                <strong>X</strong>
              </div>
            )}
          </CSSTransition>
        </div>
      </label>
    </form>
  );
};


export default SearchBar;