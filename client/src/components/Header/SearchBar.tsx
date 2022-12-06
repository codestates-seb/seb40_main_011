import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { searchBarProps } from '../../types/mainPageTypes';
export default function SearchBar({ searchBar, setSearchBar }: searchBarProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [keywords, setKeywords] = useState('');
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      navigate({
        pathname: `/search`,
        search: `?search=${keywords.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, ' ')}`,
      });
      setKeywords('');
      setSearchBar(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [searchBar]);

  return (
    <>
      <form
        className={` ${
          searchBar ? null : 'max-sm:hidden'
        } transition-all hover:bg-slate-100 flex items-center px-3 py-1 rounded-full w-[36rem] ring ring-inset ring-gray-100 hover:ring-0 md:mx-8 dark:hover:bg-DMThrColor dark:ring-white/20 `}
      >
        <BiSearch className="text-3xl mr-2" />
        <input
          ref={inputRef}
          type="text"
          className="w-full h-10 border-gray-300 bg-transparent ring-none outline-none font-medium"
          value={keywords}
          placeholder="리뷰...리뷰를 남기자!"
          onChange={(e) => {
            setKeywords(e.target.value);
          }}
          onBlur={() => setSearchBar(false)}
          onKeyPress={onKeyPress}
        />
      </form>
    </>
  );
}
