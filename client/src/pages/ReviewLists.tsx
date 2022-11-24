// 리뷰 디테일 fetching & boxing component
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import DetailReview from '../components/Review/DetailReview';
import SnackReview from '../components/Review/SnackReview';
import CreateSnackReview from '../components/Review/CreateSnackReview';
import { getSnack, getSnackStats } from '../util/apiCollection';
import { SnackReviews, SnackReviewAvg } from '../types/mainPageTypes';

const ReviewLists = () => {
  const sortReviews = ['등록순', '추천순', '댓글순'];
  const ratingCategory = ['가성비', '품질', '만족감', '성능', '디자인'];

  const [snackReviewStats, setSnackReviewStats] = useState<SnackReviewAvg>();
  const [snackReviewData, setSnackReviewData] = useState<
    SnackReviews | undefined
  >();

  const productId = useParams().id;

  useEffect(() => {
    const getSnackData = async () => {
      const { data } = await getSnack(productId);
      const stats = await getSnackStats(productId);
      setSnackReviewData(data);
      setSnackReviewStats(stats.data);
    };
    getSnackData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mt-10 w-[1060px] text-center">
        <div className="mb-3 text-2xl font-bold">category</div>
        <div className="text-5xl font-bold">product</div>

        <Link
          to="/categories/review/write"
          className="flex items-center justify-end"
        >
          <button className="px-8 py-3 my-2 rounded-2xl bg-slate-200">
            리뷰쓰기
          </button>
        </Link>
        {/* detail review */}
        <div className="mt-6">
          <div className="text-right">
            {sortReviews.map((el, index) => {
              return (
                <button key={index} className="p-2">
                  {el}
                </button>
              );
            })}
          </div>
          <div>
            <div className="mb-2 text-xl font-medium text-left">상세 리뷰</div>
            <DetailReview />
            <DetailReview />
            <DetailReview />
            <button className="px-10 py-2 my-5 rounded-xl bg-slate-200">
              더보기
            </button>
          </div>
        </div>
        {/* snack review */}
        <div className="mt-10">
          <div>
            <div className="my-3 text-3xl">Total Reviews</div>
            <div className="flex flex-col mb-5">
              <div className="flex items-center justify-center my-0.5">
                <p className="pr-1.5 text-lg">가성비</p>
                <Rating
                  allowFraction
                  readonly
                  initialValue={snackReviewStats?.avgCe}
                  size={30}
                />
              </div>
              <div className="flex items-center justify-center my-0.5">
                <p className="pr-1.5 text-lg">품질</p>
                <Rating
                  allowFraction
                  readonly
                  initialValue={snackReviewStats?.avgQlt}
                  size={30}
                />
              </div>
              <div className="flex items-center justify-center my-0.5">
                <p className="pr-1.5 text-lg">만족감</p>
                <Rating
                  allowFraction
                  readonly
                  initialValue={snackReviewStats?.avgStf}
                  size={30}
                />
              </div>
              <div className="flex items-center justify-center my-0.5">
                <p className="pr-1.5 text-lg">성능</p>
                <Rating
                  allowFraction
                  readonly
                  initialValue={snackReviewStats?.avgPerf}
                  size={30}
                />
              </div>
              <div className="flex items-center justify-center my-0.5">
                <p className="pr-1.5 text-lg">디자인</p>
                <Rating
                  allowFraction
                  readonly
                  initialValue={snackReviewStats?.avgDsn}
                  size={30}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-2 text-xl font-medium text-left">한줄 리뷰</div>
            <div className="grid justify-center grid-cols-3 gap-x-20 gap-y-16">
              <SnackReview
                snackReviewData={snackReviewData}
                ratingCategory={ratingCategory}
              />
            </div>
          </div>

          {/* {snackReviewData.hasNext ? (
            <button className="px-10 py-2 my-10 rounded-xl bg-slate-200">
              더보기
            </button>
          ) : (
            ''
          )} */}
        </div>
        {/* 한줄 리뷰 직성 */}
        <div className="my-16">
          <CreateSnackReview ratingCategory={ratingCategory} />
        </div>
      </div>
    </div>
  );
};

export default ReviewLists;
