import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { SnackReviewProps, SnackReviewCards } from '../../types/mainPageTypes';
import Avatar from '../Avatar/Avatar';
import SnackReviewModal from '../Modal/SnackReviewModal';

const SnackReview = ({ snackReviewData }: any) => {
  const [selectedReview, setSelectedReview] = useState<any>();
  const [isModal, setIsModal] = useState(false);

  const openModalHandler = () => {
    setIsModal(!isModal);
  };

  const reviewList = [
    { name: '가성비', avg: 'costEfficiency' },
    { name: '품질', avg: 'quality' },
    { name: '만족감', avg: 'satisfaction' },
    { name: '성능', avg: 'performance' },
    { name: '디자인', avg: 'design' },
  ];

  const getDecial = (num: number | undefined) => {
    if (num !== undefined) {
      const result = Math.round((num + Number.EPSILON) * 10) / 10;
      return result;
    }
  };

  const getNatural = (num: number | undefined) => {
    if (num !== undefined) {
      const result = Math.round(num + Number.EPSILON);
      return result;
    }
  };

  return (
    <div className="w-full">
      {isModal && (
        <SnackReviewModal
          selectedReview={selectedReview}
          openModalHandler={openModalHandler}
        />
      )}
      {snackReviewData?.cards.map((el: SnackReviewCards, idx: number) => {
        return (
          <div
            className="w-full"
            role="button"
            key={idx}
            onClick={() => {
              setIsModal(!isModal);
              setSelectedReview(el);
            }}
          >
            <div className="w-full">
              <div className="flex items-center justify-between">
                <div className="flex">
                  <Avatar image={el.image} />
                  <div className="flex flex-col w-ful ml-3 font-medium tracking-tight mt-0.5">
                    <div className="text-black/70">{el.nickname}</div>
                    <div className="pt-0.5 text-sm text-black/40">
                      {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold pb-1 
                ${
                  el.score.grade >= 0 &&
                  el.score.grade <= 1 &&
                  `bg-red-400 text-red-900`
                }
                ${
                  el.score.grade > 1 &&
                  el.score.grade <= 2 &&
                  `bg-orange-400 text-orange-900`
                }
                ${
                  el.score.grade > 2 &&
                  el.score.grade <= 3 &&
                  `bg-yellow-400 text-yellow-900`
                }
                ${
                  el.score.grade > 3 &&
                  el.score.grade <= 4 &&
                  `bg-lime-400 text-lime-900`
                }
                ${
                  el.score.grade > 4 &&
                  el.score.grade <= 5 &&
                  `bg-emerald-400 text-emerald-900`
                }
                `}
                  >
                    {el.score.grade}
                  </div>
                  <div className="hidden md:flex">
                    {reviewList.map((ele, idx) => {
                      return (
                        <div
                          className="flex flex-col items-center ml-2 w-12 h-12 rounded-2xl bg-zinc-100 justify-center font-medium"
                          key={idx}
                        >
                          <div className="text-black/60">
                            {el.score[ele.avg]}
                          </div>
                          <div className="text-black/40 text-xs mb-1">
                            {ele.name}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="w-full px-5 pt-2 pb-3 mt-3 mb-8">
                {el.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SnackReview;
