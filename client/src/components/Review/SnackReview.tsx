import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { SnackReviewProps, SnackReviewCards } from '../../types/mainPageTypes';
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
                <div
                  className={`w-14 h-12 rounded-2xl flex items-center justify-center text-xl font-bold pb-1 mr-2 
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
                ></div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-row justify-between">
                    <div>{el.nickname}</div>
                    <div className="pt-1 text-sm text-gray-400">
                      {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 lg:w-1/3">
                    <div className="hidden md:inline-block flex flex-wrap flex-[1_1_40%] md:flex-col justify-center md:px-8 pt-3 pb-12 md:pb-3">
                      {reviewList.map((ele, idx) => {
                        return (
                          <div className="flex items-center mr-2" key={idx}>
                            <div className="mr-1.5 text-black/70 w-12">
                              {ele.name}
                            </div>
                            {snackReviewData !== undefined && (
                              <Rating
                                allowFraction
                                readonly
                                initialValue={el.score[ele.avg]}
                                // {getNatural(
                                //   snackReviewData[el.avg]
                                // )}
                                size={24}
                              />
                            )}
                            <div className="ml-1.5 text-black/70">
                              {getDecial(snackReviewData[ele.avg])}
                            </div>
                          </div>
                        );
                      })}
                      <div className="flex items-center justify-between invisible mx-8 md:hidden">
                        <div className="mr-1.5 text-black/70 w-12">
                          {reviewList[0].name}
                        </div>
                        <Rating
                          allowFraction
                          readonly
                          initialValue={1.5}
                          size={24}
                        />
                        <div className="ml-1.5 text-black/70">{1.5}</div>
                      </div>
                    </div>
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
