import { useEffect, useState } from 'react';
import { getSearchResult } from '../../util/apiCollection';

const SearchReview = () => {
  const [review, setReview] = useState();

  useEffect(() => {
    const getReviewData = async () => {
      const { data }: any = await getSearchResult();
      setReview(data);
    };
    getReviewData();
  }, []);

  console.log(review);
  return <div>search review</div>;
};

export default SearchReview;
