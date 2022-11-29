import { useEffect, useState, SetStateAction } from 'react';
import { getUserReview } from '../../util/apiCollection';
import ReviewTabPagenation from './ReviewTabPagenation';

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

  useEffect(() => {
    const params = `?page=${currentPage}&size=5&sort=createdAt`;
    const snackReviewData = async () => {
      const { data } = await getUserReview('snack-reviews', params);
      setReviewData(data?.snackReviews.content);
      setTotalPages(data?.snackReviews.totalPages);
    };
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
        <div className="flex flex-col justify-center w-[850px] p-5 mt-20">
          <div className="mb-2 text-xl text-center">
            작성한 한줄 리뷰가 없습니다
          </div>
        </div>
      ) : (
        <>
          {reviewData?.map((el: ReviewType, index: number) => {
            return (
              <>
                <div
                  className="flex flex-col justify-center w-[850px] p-5"
                  key={index}
                >
                  <div className="mb-2 overflow-hidden text-ellipsis line-clamp-2">
                    {el.content}
                  </div>
                  <div className="flex text-sm">
                    <div className="px-3 py-0.5 bg-slate-300 rounded-lg">
                      {el.type}
                    </div>
                    <div className="px-3 py-0.5">{el.productName}</div>
                    <div className="ml-auto text-slate-600">
                      {new Date(el.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
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
        </>
      )}
    </>
  );
};

export default SnackReviewTab;
