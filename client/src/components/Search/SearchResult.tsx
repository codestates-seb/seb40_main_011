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
    <div className="bg-zinc-100 dark:bg-DMMainColor dark:text-white">
      <SearchReview keyword={keyword} />
      <SearchProduct keyword={keyword} />
    </div>
  );
};

export default SearchResult;
