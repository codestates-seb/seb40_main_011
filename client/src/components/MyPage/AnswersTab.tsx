import { useEffect, useState, SetStateAction } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { getUserReview } from '../../util/apiCollection';
import ReviewTabPagenation from './ReviewTabPagenation';

interface ReviewType {
  adoptedId: null | number;
  id: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

export const AnswersTab = () => {
  const [reviewData, setReviewData] = useState<any[]>();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(true);

  useEffect(() => {
    const params = `?page=${currentPage}&size=5&sort=createdAt`;
    const DetailReviewData = async () => {
      const { data }: any = await getUserReview('answers', params);
      console.log(data);
      setReviewData(data?.questions.content);
      setTotalPages(data?.questions.totalPages);
    };
    DetailReviewData();
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
          <div className="mb-2 text-xl text-center">작성한 답변이 없습니다</div>
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
                  {el.adoptedId ? (
                    <BsCheckCircleFill className=" w-[20px] h-[20px] ml-auto mb-1" />
                  ) : (
                    <></>
                  )}

                  <div className="flex text-sm">
                    <div className="px-3 py-0.5"> </div>
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

export default AnswersTab;
