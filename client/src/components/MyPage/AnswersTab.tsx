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

export const AnswersTab = () => {
  const [reviewData, setReviewData] = useState<any[]>();

  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isUpdate, setIsUpdate] = useState(true);

  const [more, setMore] = useState(false);

  const params = `?page=${currentPage}&size=5&sort=createdAt`;
  const DetailReviewData = async () => {
    const data: any = await getUserReview('answers', params);
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

  const handleMore = (e: any) => {
    setMore(!more);
  };
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
          {reviewData?.map((el: any, index: number) => {
            return (
              <>
                <div
                  className="flex flex-col justify-center w-[850px] p-5"
                  key={index}
                >
                  <div className="flex text-sm">
                    <div className=" text-slate-500">
                      {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    {el.adoptedId ? (
                      <>
                        <BsCheckCircleFill className=" w-[20px] h-[20px] mb-1 ml-1.5 text-emerald-500" />
                        <p className="ml-1 text-slate-500">채택됨</p>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div className="mb-0.5 overflow-hidden text-sm text-ellipsis line-clamp-2  text-slate-700">
                    {el.content}
                  </div>

                  {el.answers.content.map((ele: any, idx: number) => {
                    return (
                      <>
                        <div className="mb-1 overflow-hidden text-lg text-ellipsis line-clamp-2">
                          {ele.content}
                        </div>
                      </>
                    );
                  })}
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
