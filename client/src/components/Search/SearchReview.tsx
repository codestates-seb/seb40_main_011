import { useEffect, useState } from 'react';
import { getReviewTest } from '../../util/testApiCollection';

const SearchReview = () => {
  const [review, setReview] = useState();

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getReviewTest();
      setReview(data);
    };
    getReviewData();
  }, []);

  console.log(review);
  return <div>search review</div>;
};

export default SearchReview;
