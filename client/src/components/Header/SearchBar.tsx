import { useState, KeyboardEvent } from 'react';
import { BiSearch } from 'react-icons/bi';

export default function SearchBar() {
  //   const navigate = useNavigate();
  const [keywords, setKeywords] = useState('');
  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key == 'Enter') {
      e.preventDefault();
      console.log(`검색어: ${keywords}`);
      // navigate(`/search?search=${keywords}`);
    }
  };
  return (
    <form className="bg-slate-100 flex items-center px-3 py-1 rounded-full w-[24rem]">
      <BiSearch className="text-3xl mr-2" />
      <input
        type="text"
        className="w-full h-10 border-gray-300 bg-transparent ring-none outline-none"
        value={keywords}
        placeholder="Search.."
        onChange={(e) => {
          console.log(e.target.value);
          setKeywords(e.target.value);
        }}
        onKeyPress={onKeyPress}
      />
    </form>
  );
}
