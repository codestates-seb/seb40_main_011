// Review List fetching & boxing comp
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { SnackReviewAvg } from '../../types/mainPageTypes';
import { getSnackStats } from '../../util/apiCollection';

const AvgRating = ({ productId }: any) => {
  const [snackReviewStats, setSnackReviewStats] = useState<any>();

  useEffect(() => {
    const getSnackData = async () => {
      const stats = await getSnackStats(productId);
      setSnackReviewStats(stats.data);
    };
    getSnackData();
  }, []);

  const reviewList = [
    { name: '가성비', avg: 'avgCe' },
    { name: '품질', avg: 'avgQlt' },
    { name: '만족감', avg: 'avgStf' },
    { name: '성능', avg: 'avgStf' },
    { name: '디자인', avg: 'avgPerf' },
  ];
  return (
    <>
      <div className="my-3 text-3xl">평균 별점</div>
      <div className="flex flex-col mb-5">
        {reviewList.map((el, idx) => {
          return (
            <>
              <div
                className="grid grid-cols-6  flex items-center justify-center my-0.5"
                key={idx}
              >
                <div className="col-span-2"></div>
                <p className="pr-1.5 text-xl font-medium">{el.name}</p>
                {snackReviewStats !== undefined ? (
                  <Rating
                    allowFraction
                    readonly
                    initialValue={snackReviewStats[el.avg]}
                    size={30}
                  />
                ) : (
                  <></>
                )}
              </div>
            </>
          );
        })}
        {/* 
        <div className="grid grid-cols-6  flex items-center justify-center my-0.5">
          <div className="col-span-2"></div>
          <p className="pr-1.5 text-lg ">가성비</p>
          <Rating
            allowFraction
            readonly
            initialValue={snackReviewStats?.avgCe}
            size={30}
          />
        </div>

        <div className="grid grid-cols-6  flex items-center justify-center my-0.5">
          <div className="col-span-2"></div>
          <p className="pr-1.5 text-lg">품질</p>
          <Rating
            allowFraction
            readonly
            initialValue={snackReviewStats?.avgQlt}
            size={30}
          />
        </div>

        <div className="grid grid-cols-6  flex items-center justify-center my-0.5">
          <div className="col-span-2"></div>
          <p className="pr-1.5 text-lg">만족감</p>
          <Rating
            allowFraction
            readonly
            initialValue={snackReviewStats?.avgStf}
            size={30}
          />
        </div>

        <div className="grid grid-cols-6  flex items-center justify-center my-0.5">
          <div className="col-span-2"></div>
          <p className="pr-1.5 text-lg">성능</p>
          <Rating
            allowFraction
            readonly
            initialValue={snackReviewStats?.avgPerf}
            size={30}
          />
        </div>

        <div className="grid grid-cols-6  flex items-center justify-center my-0.5">
          <div className="col-span-2"></div>
          <p className="pr-1.5 text-lg">디자인</p>
          <Rating
            allowFraction
            readonly
            initialValue={snackReviewStats?.avgDsn}
            size={30}
          />
        </div> */}
      </div>
    </>
  );
};
export default AvgRating;
