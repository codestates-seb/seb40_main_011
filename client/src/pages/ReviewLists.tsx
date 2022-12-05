// 리뷰 디테일 fetching & boxing component
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import DetailReview from '../components/Review/DetailReview';
import SnackReview from '../components/Review/SnackReview';
import CreateSnackReview from '../components/Review/CreateSnackReview';
import {
  getSnack,
  getGoodSnack,
  getSnackStats,
  getProductDetail,
  getBadSnack,
} from '../util/apiCollection';
import {
  SnackReviews,
  SnackReviewAvg,
  ProductDetail,
} from '../types/mainPageTypes';
import RvSelectBox from '../components/Review/RvSelectBox';
import AvgRating from '../components/Review/AvgRating';

const ReviewLists = () => {
  const [snackReviewData, setSnackReviewData] = useState<SnackReviews>();
  const [limit, setLimit] = useState(6);

  const [spread, setSpread] = useState(false);

  const [detailReviewspread, setdetailReviewSpread] = useState<any>(false);

  const [selected, setSelected] = useState('최신 순');
  const [productData, setProductData] = useState<ProductDetail>();

  const ratingCategory = ['가성비', '품질', '만족감', '성능', '디자인'];
  const menu = ['최신 순', '별점 순', '낮은 별점 순'];

  const productId = Number(useParams().id);

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await getProductDetail(productId);
      setProductData(data);
    };
    getProductData();
  }, []);

  useEffect(() => {
    const getSnackData = async () => {
      if (selected === '최신 순') {
        const { data } = await getSnack(productId, limit);
        setSnackReviewData(data);
      }
      if (selected === '별점 순') {
        const { data } = await getGoodSnack(productId, limit);
        setSnackReviewData(data);
      }
      if (selected === '낮은 별점 순') {
        const { data } = await getBadSnack(productId, limit);
        // const stats = await getSnackStats(productId);
        setSnackReviewData(data);
        // setSnackReviewStats(stats.data);
      }
    };
    getSnackData();
  }, [limit, selected]);

  const onMoreClick = (e: React.MouseEvent<HTMLElement>) => {
    setLimit(limit + 6);
  };

  const handleBoxClose = () => {
    if (!spread) return null;
    setSpread(!spread);
  };
  const handleDetailBoxClose = () => {
    if (!detailReviewspread) return null;
    setdetailReviewSpread(!detailReviewspread);
  };

  const [isModal, setIsModal] = useState(false);
  const openModalHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setIsModal(!isModal);
  };

  return (
    <div className="pb-16 bg-zinc-100">
      <div
        className="mx-auto w-full lg:w-[64rem] flex flex-col items-center px-4"
        onClick={() => {
          handleBoxClose();
          handleDetailBoxClose();
        }}
      >
        <div className="py-16 text-center">
          <div className="mb-3 text-xl font-medium text-black/60">
            {productData?.type}
          </div>
          <div className="text-4xl font-bold tracking-tight">
            {productData?.name}
          </div>
          <div className="flex justify-center">
            <AvgRating productId={productId} />
          </div>
        </div>
        {productData?.reviews !== null && (
          <DetailReview
            productId={productId}
            detailReviewspread={detailReviewspread}
            setdetailReviewSpread={setdetailReviewSpread}
          />
        )}
        <div className="w-full px-8 pt-6 bg-white rounded-3xl md:px-10 lg:px-12 md:pt-8 lg:pt-10">
          <div className="flex items-center justify-between mb-4 text-xl font-medium">
            <div className="pb-1 mr-3 text-2xl font-medium">한줄 리뷰</div>
            <RvSelectBox
              spread={spread}
              setSpread={setSpread}
              selected={selected}
              setSelected={setSelected}
              menu={menu}
            />
          </div>
          <div className="flex justify-end mb-3"></div>
          <SnackReview snackReviewData={snackReviewData} />
          {/* <div className="flex flex-col md:flex-row "></div> */}
          {/* <div className="w-full md:1/2 lg:w-2/3"></div> */}
          {snackReviewData?.hasNext && (
            <div className="mx-auto w-full lg:w-[64rem] pb-12">
              <span
                role="button"
                onClick={onMoreClick}
                className="flex items-center justify-center mx-4 text-lg font-medium tracking-tight rounded-xl h-14 bg-zinc-200/60 hover:bg-zinc-300/50 text-zinc-400 hover:text-zinc-500"
              >
                더 보기
              </span>
            </div>
          )}
          {/* 한줄 리뷰 직성 */}
        </div>
        <div className="px-12 py-6 my-8 bg-white rounded-3xl">
          <CreateSnackReview ratingCategory={ratingCategory} />
        </div>
      </div>
    </div>
  );
};

export default ReviewLists;
