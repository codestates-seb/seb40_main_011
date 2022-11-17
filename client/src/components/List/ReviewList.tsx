// Review List fetching & boxing comp
import { getReview } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Review } from '../../types/mainPageTypes';

const ReviewList = () => {
  const [reviews, setReviews] = useState<Review[]>();

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getReview();
      setReviews(data);
    };
    getReviewData();
  }, []);

  return <div>hi</div>;
};
export default ReviewList;
