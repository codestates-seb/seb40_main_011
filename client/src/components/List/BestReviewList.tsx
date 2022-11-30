import { BestReview } from '../../types/mainPageTypes';
import React, { useEffect, useState } from 'react';
import { getBestReview } from '../../util/apiCollection';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const BestReviewList = () => {
  const navigate = useNavigate();
  const [sortedReviews, setSortedReviews] = useState<BestReview[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);

  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getBestReview(3);
      setSortedReviews(data);
    };
    getReviewData();
  }, []);

  const onlyText = (data: string) => {
    return data.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, ' ');
  };

  const onClick = () => {
    let nextIdx = selectedIdx;
    setSelectedIdx(nextIdx + 1);
    if (nextIdx === 2) {
      nextIdx = 0;
      setSelectedIdx(nextIdx);
    }
  };

  const onContentClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/review/${e.currentTarget.id}`);
  };

  return (
    <div className="flex justify-center my-16">
      {sortedReviews[selectedIdx] === undefined ? (
        <div>API 필요 </div>
      ) : (
        <div className="items-center w-3/5 h-48 flex p-4 justify-evenly rounded-lg bg-white drop-shadow-bestReviews">
          <div className="flex flex-col w-4/5">
            <div className="font-bold mb-2">
              {sortedReviews[selectedIdx]?.title}
            </div>
            <div
              className=" ease-in-out duration-150 line-clamp-2 hover:bg-slate-300 hover:rounded-md p-1 text-slate-600 hover:text-cyan-900"
              role="button"
              onClick={onContentClick}
              id={sortedReviews[selectedIdx]?.id.toString()}
            >
              {onlyText(sortedReviews[selectedIdx]?.content)}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm">{sortedReviews[selectedIdx]?.type}</div>
              <div className=" flex flex-row items-center justify-around">
                <div>
                  {sortedReviews[selectedIdx]?.createdAt &&
                    getParsedDate(sortedReviews[selectedIdx]?.createdAt)}
                </div>
                <div className="font-bold ml-4 ">
                  {sortedReviews[selectedIdx]?.writer}
                </div>
                <img
                  className="rounded-full w-10 h-10 m-2"
                  src={`https://codetech.nworld.dev${sortedReviews[selectedIdx]?.image}`}
                ></img>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button
              className=" flex items-center justify-center h-12 w-12 rounded-full hover:bg-slate-300 ease-in-out duration-150"
              onClick={onClick}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestReviewList;
