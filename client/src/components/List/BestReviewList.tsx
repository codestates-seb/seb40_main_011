import { BestReview } from '../../types/mainPageTypes';
import React, { useEffect, useState, memo } from 'react';
import { getBestReview } from '../../util/apiCollection';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import { format } from 'timeago.js';
import { BsArrowRight } from 'react-icons/bs';
import { useIsLogin } from '../../store/login';

const BestReviewList = () => {
  const { isLogin } = useIsLogin();
  const navigate = useNavigate();
  const [sortedReviews, setSortedReviews] = useState<BestReview[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [bestReviewCount, setbestReviewCount] = useState(0);

  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getBestReview(7);
      setSortedReviews(data);
      setbestReviewCount(data.length);
    };
    getReviewData();
  }, []);

  const onlyText = (data: string) => {
    return data
      .replace(/(\[.*\])(\((http)(?:s)?(:\/\/).*\))/g, ' ')
      .replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, ' ');
  };

  const onClickPrev = () => {
    if (selectedIdx === 0) {
      setSelectedIdx(6);
    } else {
      setSelectedIdx(selectedIdx - 1);
    }
  };

  const onClickNext = () => {
    if (selectedIdx === 6) {
      setSelectedIdx(0);
    } else {
      setSelectedIdx(selectedIdx + 1);
    }
  };

  const onContentClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/review/${e.currentTarget.id}`);
  };

  //리뷰 쓰기로 가짐
  const onReviewClick = () => {
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate('/review/write');
    }
  };

  setTimeout(() => {
    if (selectedIdx === 6) {
      setSelectedIdx(0);
    } else {
      setSelectedIdx(selectedIdx + 1);
    }
  }, 5000);

  return (
    <div className="pt-8 bg-zinc-100 dark:bg-DMMainColor dark:text-gray-300 transition-all">
      <div className="w-full lg:w-[64rem] mx-auto">
        {sortedReviews[selectedIdx] === undefined ? null : (
          <div
            role="button"
            onClick={onContentClick}
            id={sortedReviews[selectedIdx]?.id.toString()}
            className=" dark:bg-DMSubColor mx-4 group px-6 md:px-8 lg:px-12 pt-6 md:pt-8 pb-4 md:pb-6 bg-white rounded-3xl h-[18.5rem]"
          >
            <span className="left-40 rounded-full pt-0.5 pb-1 font-medium tracking-tight text-slate-500 mr-2 dark:text-gray-400">
              {sortedReviews[selectedIdx]?.type.toLocaleLowerCase()}
            </span>
            <div className="dark:text-white my-4 text-3xl font-medium tracking-tight line-clamp-1">
              {sortedReviews[selectedIdx]?.title}
            </div>
            <div className="h-12 mb-8 font-medium text-gray-500 line-clamp-2 dark:text-gray-400">
              {onlyText(sortedReviews[selectedIdx]?.content)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="w-12 h-12 mr-3 rounded-2xl"
                  src={`https://codetech.nworld.dev${sortedReviews[selectedIdx]?.image}`}
                />
                <div>
                  <span className="pt-0.5 font-medium text-gray-600 dark:text-white/90">
                    {sortedReviews[selectedIdx]?.writer}
                  </span>
                  <div>
                    <span className="text-sm font-medium tracking-tight text-gray-500/60 before:text-gray-300 dark:text-gray-400">
                      {sortedReviews[selectedIdx]?.createdAt &&
                        getParsedDate(sortedReviews[selectedIdx]?.createdAt)}
                    </span>
                    <span className="before:content-['•'] before:mr-1.5 before:ml-1.5 text-gray-500/60 before:text-gray-300 tracking-tight text-sm font-medium dark:text-gray-400">
                      {sortedReviews[selectedIdx]?.createdAt &&
                        format(sortedReviews[selectedIdx]?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="items-center hidden py-3 pl-5 pr-4 font-medium text-gray-300 rounded-full md:flex group-hover:text-gray-600 group-hover:bg-gray-100 dark:group-hover:bg-DMThrColor dark:group-hover:text-white">
                <span className="mr-2">자세히 보기</span>
                <BsArrowRight className="text-2xl" />
              </div>
            </div>
            <div className="flex items-center justify-between py-2"></div>
          </div>
        )}
      </div>
      <div className="w-full lg:w-[64rem] mx-auto py-6 px-2 flex justify-between items-center font-medium">
        <div className="flex items-center">
          <button
            className={`bg-white hover:bg-slate-300 hover:text-slate-700 mx-2 flex items-center h-12 rounded-full ease-in-out duration-150 pl-4 pr-5 dark:bg-DMSubColor dark:hover:bg-DMThrColor dark:hover:text-slate-400`}
            onClick={onClickPrev}
          >
            <FaChevronRight className="mr-2 text-xl rotate-180" />
            <span className="mb-0.5">이전</span>
          </button>
          <div className="hidden mx-6 text-xl text-gray-600 md:inline-block dark:text-white">
            <span>{selectedIdx + 1}</span>
            <span className="text-gray-400 before:content-['/'] before:text-gray-300 before:mr-3 before:ml-3 dark:text-white/40">
              {bestReviewCount}
            </span>
          </div>
          <button
            className={`bg-white hover:bg-slate-300 hover:text-slate-700 mx-2 flex items-center h-12 rounded-full ease-in-out duration-150 pl-5 pr-4 dark:bg-DMSubColor dark:hover:bg-DMThrColor dark:hover:text-slate-400`}
            onClick={onClickNext}
          >
            <span className="mb-0.5">다음</span>
            <FaChevronRight className="ml-2 text-xl" />
          </button>
        </div>
        <button
          onClick={onReviewClick}
          className="text-white pb-0.5 px-5 h-12 rounded-full bg-blue-500 hover:bg-blue-400 mx-2"
        >
          리뷰쓰기
        </button>
      </div>
    </div>
  );
};

export default memo(BestReviewList);
