import { useEffect, useState, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { getUserReview } from '../../util/apiCollection';
import ReviewTabPagenation from './ReviewTabPagenation';
import { loginRefresh } from '../../util/loginRefresh';

interface ReviewType {
  id: number;
  score: ScoreType;
  content: string;
  type: string;
  createdAt: string;
  modifiedAt: string;
  productId: number;
  productName: string;
}

interface ScoreType {
  costEfficiency: number;
  quality: number;
  satisfaction: number;
  design: number;
  performance: number;
  grade: number;
}

const SnackReviewTab = () => {
  const [reviewData, setReviewData] = useState<any[]>();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(true);

  const params = `?page=${currentPage}&size=5&sort=createdAt`;
  const snackReviewData = async () => {
    const data: any = await getUserReview('snack-reviews', params);
    switch (data.status) {
      case 200:
        setReviewData(data?.data.snackReviews.content);
        setTotalPages(data?.data.snackReviews.totalPages);
        break;
      case 412:
        loginRefresh();
        snackReviewData();
        break;
      default:
    }
  };

  useEffect(() => {
    snackReviewData();
    setIsUpdate(false);
  }, [isUpdate]);

  const onClickPage = (
    target: SetStateAction<string> | SetStateAction<number>
  ) => {
    if (target === 'Prev') {
      setCurrentPage(currentPage - 1);
    } else if (target === 'Next') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(+target);
    }
    setIsUpdate(true);
  };

  return (
    <>
      {!reviewData || reviewData?.length === 0 ? (
        <div className="flex flex-col justify-center w-full max-w-screen-lg p-5 px-5 mt-20">
          <div className="mb-2 text-xl text-center">
            작성한 한줄 리뷰가 없습니다
          </div>
        </div>
      ) : (
        <div className="mx-auto w-full lg:w-[64rem] py-4">
          {reviewData?.map((el: ReviewType, index: number) => {
            return (
              <>
                <Link
                  to={`../categories/review/${el.productId}`}
                  key={index}
                  className="flex flex-col justify-center w-full max-w-screen-lg py-4 px-5"
                >
                  <div className="mb-2 text-xl font-medium dark:text-white text-black overflow-hidden line-clamp-1">
                    {el.content}
                  </div>
                  <div className="mb-2 text-sm overflow-hidden text-ellipsis dark:text-white/70 text-black/60 line-clamp-2">
                    {el.productName}
                  </div>
                  <div className="flex text-sm">
                    <div className="px-2 pb-1 pt-0.5 bg-slate-300 rounded dark:bg-DMSubColor font-medium dark:text-white/90 text-black/60">
                      {el.type}
                    </div>
                    <div className="ml-auto text-slate-600 dark:text-white/40 text-black/40">
                      {new Date(el.createdAt).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </div>
                  </div>
                </Link>
              </>
            );
          })}
          {totalPages > 1 ? (
            <ReviewTabPagenation
              currentPage={currentPage}
              totalPages={totalPages}
              onClickPage={onClickPage}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default SnackReviewTab;
