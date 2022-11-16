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

  return (
    <>
      {reviews === undefined ? (
        <div>loading</div>
      ) : (
        <>
          <div className="flex border-2">
            {reviews.map((el, idx) => {
              return (
                <div className="flex p-4" key={idx}>
                  <div className="w-1/4">
                    <img
                      className="w-full h-full bg-cover"
                      src={el.thumbnail}
                    />
                  </div>
                  <div className="ml-4">
                    <div>{el.title}</div>
                    <div>{el.nickname}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};
export default ReviewList;
