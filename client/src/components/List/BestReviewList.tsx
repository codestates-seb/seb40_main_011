import { BestReview } from '../../types/mainPageTypes';
import React, { useEffect, useState } from 'react';
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
      const { data } = await getBestReview(3);
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
      return;
    } else {
      setSelectedIdx(selectedIdx - 1);
    }
  };

  const onClickNext = () => {
    if (selectedIdx === 2) {
      return;
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
    if (selectedIdx === 2) {
      setSelectedIdx(0);
    } else {
      setSelectedIdx(selectedIdx + 1);
    }
  }, 5000);

  return (
    <div className="pt-8 bg-zinc-100">
      <div className="w-full lg:w-[64rem] mx-auto">
        {sortedReviews[selectedIdx] === undefined ? (
          <div className="mx-auto">API 필요 </div>
        ) : (
          <div
            role="button"
            onClick={onContentClick}
            id={sortedReviews[selectedIdx]?.id.toString()}
            className="mx-4 group px-6 md:px-8 lg:px-12 pt-6 md:pt-8 pb-4 md:pb-6 bg-white rounded-3xl"
          >
            <span className="left-40 rounded-full pt-0.5 pb-1 font-medium tracking-tight text-slate-500 mr-2">
              {sortedReviews[selectedIdx]?.type.toLocaleLowerCase()}
            </span>
            <div className="line-clamp-1 font-medium my-4 text-3xl tracking-tight">
              {sortedReviews[selectedIdx]?.title}
            </div>
            <div className="line-clamp-2 text-gray-500 font-medium mb-8 h-12">
              {onlyText(sortedReviews[selectedIdx]?.content)}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="rounded-2xl w-12 h-12 mr-3"
                  src={`https://codetech.nworld.dev${sortedReviews[selectedIdx]?.image}`}
                />
                <div>
                  <span className="pt-0.5 font-medium text-gray-600">
                    {sortedReviews[selectedIdx]?.writer}
                  </span>
                  <div>
                    <span className="text-gray-500/60 before:text-gray-300 text-sm font-medium tracking-tight">
                      {sortedReviews[selectedIdx]?.createdAt &&
                        getParsedDate(sortedReviews[selectedIdx]?.createdAt)}
                    </span>
                    <span className="before:content-['•'] before:mr-1.5 before:ml-1.5 text-gray-500/60 before:text-gray-300 tracking-tight text-sm font-medium">
                      {sortedReviews[selectedIdx]?.createdAt &&
                        format(sortedReviews[selectedIdx]?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="hidden md:inline-flex flex items-center text-gray-300 group-hover:text-gray-600 font-medium group-hover:bg-slate-100 pl-5 pr-4 py-3 rounded-full">
                <span className="mr-2">자세히 보기</span>
                <BsArrowRight className="text-2xl" />
              </div>
            </div>
            <div className="flex justify-between items-center py-2"></div>
          </div>
        )}
      </div>
      <div className="w-full lg:w-[64rem] mx-auto py-6 px-2 flex justify-between items-center font-medium">
        <div className="flex items-center">
          <button
            className={`${
              selectedIdx === 0
                ? `text-zinc-400 cursor-default`
                : `bg-white hover:bg-slate-300 hover:text-slate-700`
            } mx-2 flex items-center h-12 rounded-full ease-in-out duration-150 pl-4 pr-5`}
            onClick={onClickPrev}
          >
            <FaChevronRight className="text-xl mr-2 rotate-180" />
            <span className="mb-0.5">이전</span>
          </button>
          <div className="text-xl text-gray-600 mx-6 hidden md:inline-block">
            <span>{selectedIdx + 1}</span>
            <span className="text-gray-400 before:content-['/'] before:text-gray-300 before:mr-3 before:ml-3 ">
              {bestReviewCount}
            </span>
          </div>
          <button
            className={`
            ${
              selectedIdx === 2
                ? `text-zinc-400 cursor-default`
                : `bg-white hover:bg-slate-300 hover:text-slate-700`
            }
            mx-2 flex items-center h-12 rounded-full ease-in-out duration-150 pl-5 pr-4`}
            onClick={onClickNext}
          >
            <span className="mb-0.5">다음</span>
            <FaChevronRight className="text-xl ml-2" />
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

export default BestReviewList;
