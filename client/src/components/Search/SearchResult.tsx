import { useLocation } from 'react-router-dom';
import SearchProduct from './SearchProduct';
import SearchReview from './SearchReview';

const SearchResult = () => {
  const location = useLocation();
  const idx = location.search.indexOf('=');
  const keyword = decodeURI(location.search).slice(idx + 1);

  return (
    <>
      <SearchReview />
      <SearchProduct />
    </>
  );
};

export default SearchResult;
