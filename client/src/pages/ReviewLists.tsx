// 리뷰 디테일 fetching & boxing component
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import DetailReview from '../components/Review/DetailReview';
import SnackReview from '../components/Review/SnackReview';
import CreateSnackReview from '../components/Review/CreateSnackReview';
import {
  getSnack,
  getGoodSnack,
  getSnackStats,
  getOldSnack,
} from '../util/apiCollection';
import { SnackReviews, SnackReviewAvg } from '../types/mainPageTypes';
import { useIsLogin } from '../store/login';
import RvSelectBox from '../components/Review/RvSelectBox';

const ReviewLists = () => {
  const navigate = useNavigate();
  const { isLogin } = useIsLogin();
  const sortReviews = ['등록순', '추천순', '댓글순'];
  const ratingCategory = ['가성비', '품질', '만족감', '성능', '디자인'];
  const [snackReviewStats, setSnackReviewStats] = useState<SnackReviewAvg>();
  const [snackReviewData, setSnackReviewData] = useState<SnackReviews>();
  const [limit, setLimit] = useState(6);
  const [spread, setSpread] = useState(false);
  const [selected, setSelected] = useState('최신 순');

  const productId = Number(useParams().id);

  useEffect(() => {
    const getSnackData = async () => {
      if (selected === '최신 순') {
        const { data } = await getSnack(productId, limit);
        const stats = await getSnackStats(productId);
        setSnackReviewData(data);
        setSnackReviewStats(stats.data);
      }
      if (selected === '별점 순') {
        const { data } = await getGoodSnack(productId, limit);
        const stats = await getSnackStats(productId);
        setSnackReviewData(data);
        setSnackReviewStats(stats.data);
      }
    };
    getSnackData();
  }, [limit, selected]);

  const onMoreClick = (e: React.MouseEvent<HTMLElement>) => {
    setLimit(limit + 6);
  };

  const onReviewWrite = () => {
    if (!isLogin) {
      window.alert('로그인을 해주세요');
    } else {
      navigate('/review/write');
    }
  };

  const handleBoxClose = () => {
    if (!spread) return null;
    setSpread(!spread);
  };

  return (
    <div
      className="flex flex-col items-center justify-center"
      onClick={handleBoxClose}
    >
      <div className="mt-10 w-[1060px] text-center">
        <div className="mb-3 text-2xl font-bold">category</div>
        <div className="text-5xl font-bold">product</div>
        <div className="flex items-center justify-end">
          <button
            onClick={onReviewWrite}
            className="px-8 py-3 my-2 rounded-2xl bg-slate-200"
          >
            리뷰쓰기
          </button>
        </div>

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
            <div className="flex mb-2 text-xl font-medium justify-between">
              <div>한줄 리뷰</div>
              <RvSelectBox
                spread={spread}
                setSpread={setSpread}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            <div className="grid justify-center grid-cols-3 gap-x-20 gap-y-16">
              <SnackReview snackReviewData={snackReviewData} />
            </div>
          </div>
          {snackReviewData?.hasNext ? (
            <button
              onClick={onMoreClick}
              className="px-10 py-2 my-10 rounded-xl bg-slate-200"
            >
              더보기
            </button>
          ) : null}
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
