import { useState, KeyboardEvent } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      navigate({
        pathname: `/search`,
        search: `?search=${keywords.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, ' ')}`,
      });
      setKeywords('');
    }
  };
  return (
    <form className="hover:bg-slate-100 flex items-center px-3 py-1 rounded-full w-[24rem] ring ring-inset ring-gray-100 hover:ring-0">
      <BiSearch className="text-3xl mr-2" />
      <input
        type="text"
        className="w-full h-10 border-gray-300 bg-transparent ring-none outline-none font-medium"
        value={keywords}
        placeholder="리뷰...리뷰를 남기자!"
        onChange={(e) => {
          setKeywords(e.target.value);
        }}
        onKeyPress={onKeyPress}
      />
    </form>
  );
}
