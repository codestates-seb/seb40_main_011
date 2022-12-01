import { useLocation } from 'react-router-dom';
import SearchProduct from './SearchProduct';
import SearchReview from './SearchReview';

const SearchResult = () => {
  const location = useLocation();
  const idx = location.search.indexOf('=');
  const keyword = decodeURI(location.search)
    .slice(idx + 1)
    .toLocaleLowerCase();

  return (
    <div className="flex flex-col justify-center items-center bg-zinc-100">
      <SearchReview keyword={keyword} />
      <SearchProduct keyword={keyword} />
    </div>
  );
};

export default SearchResult;
