import { useEffect, useState, SetStateAction } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';

import { getUserReview } from '../../util/apiCollection';
import ReviewTabPagenation from './ReviewTabPagenation';
import { loginRefresh } from '../../util/loginRefresh';

interface ReviewType {
  adoptedId: null | number;
  id: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const QuestionsTab = () => {
  const [reviewData, setReviewData] = useState<any[]>();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(true);

  const params = `?page=${currentPage}&size=5&sort=createdAt`;
  const DetailReviewData = async () => {
    const data: any = await getUserReview('questions', params);
    switch (data.status) {
      case 200:
        setReviewData(data?.data.questions.content);
        setTotalPages(data?.data.questions.totalPages);
        break;
      case 412:
        loginRefresh();
        DetailReviewData();
        break;
      default:
    }
  };

  useEffect(() => {
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
        <div className="flex flex-col justify-center w-full max-w-screen-lg p-5 px-24 mt-20">
          <div className="mb-2 text-xl text-center">작성한 질문이 없습니다</div>
        </div>
      ) : (
        <div className="mx-auto w-full lg:w-[64rem] py-4">
          {reviewData?.map((el: ReviewType, index: number) => {
            return (
              <>
                <div
                  className="flex flex-col justify-center w-full max-w-screen-lg py-4 px-5"
                  key={index}
                >
                  <div className="mb-2 text-lg overflow-hidden text-ellipsis dark:text-white text-black line-clamp-2">
                    {el.content}
                  </div>
                  <div className="flex text-sm">
                    <div className="text-slate-600 dark:text-white/40 text-black/40">
                      {new Date(el.createdAt).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </div>
                    {el.adoptedId ? (
                      <>
                        <BsCheckCircleFill className=" w-[20px] h-[20px] mb-1 ml-1.5 text-emerald-500" />
                        <p className="ml-1 text-slate-600 dark:text-gray-400">
                          채택완료
                        </p>
                      </>
                    ) : (
                      <></>
                    )}
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
        </div>
      )}
    </>
  );
};

export default QuestionsTab;
