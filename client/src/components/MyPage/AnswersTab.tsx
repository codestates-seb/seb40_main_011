import { useEffect, useState, SetStateAction } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { getUserReview } from '../../util/apiCollection';
import ReviewTabPagenation from './ReviewTabPagenation';
import { loginRefresh } from '../../util/loginRefresh';
import { AnswersMore } from './AnswersMore';

interface ReviewType {
  adoptedId: null | number;
  id: number;
  content: string;
  createdAt: string;
  modifiedAt: string;
}

const AnswersTab = () => {
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(true);

  const fetchData = async () => {
    const params = `?page=${currentPage}&size=5&sort=createdAt`;
    const data = await getUserReview('answers', params);

    switch (data.status) {
      case 200:
        setReviewData(data.data.questions.content);
        setTotalPages(data.data.questions.totalPages);
        break;
      case 412:
        loginRefresh();
        fetchData();
        break;
      default:
        // handle other error cases
        break;
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const onClickPage = (target: number | 'Prev' | 'Next') => {
    if (target === 'Prev') {
      setCurrentPage(currentPage - 1);
    } else if (target === 'Next') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(target);
    }
  };

  return (
    <>
      {!reviewData || reviewData?.length === 0 ? (
        <div className="flex flex-col justify-center w-full max-w-screen-lg p-5 px-5 mt-20">
          <div className="mb-2 text-xl text-center">작성한 답변이 없습니다</div>
        </div>
      ) : (
        <div className="mx-auto w-full lg:w-[64rem] py-4">
          {reviewData?.map((el: any, index: number) => {
            return (
              <>
                <div
                  className="flex flex-col justify-center w-full max-w-screen-lg py-4 px-5"
                  key={index}
                >
                  <AnswersMore el={el} />
                  <div className="mb-2 text-sm overflow-hidden text-ellipsis dark:text-white/70 text-black/60 line-clamp-2">
                    {el.content}
                  </div>
                  <div className="flex text-sm">
                    <div className="text-black/40 dark:text-white/40">
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
                        <p className="ml-1 text-slate-500 dark:text-gray-400">
                          채택됨
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

export default AnswersTab;
