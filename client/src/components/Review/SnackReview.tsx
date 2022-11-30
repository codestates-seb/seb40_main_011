import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { SnackReviewProps, SnackReviewCards } from '../../types/mainPageTypes';
import SnackReviewModal from '../Modal/SnackReviewModal';

const SnackReview = ({ snackReviewData }: SnackReviewProps) => {
  const [selectedReview, setSelectedReview] = useState<any>();
  const [isModal, setIsModal] = useState(false);

  const openModalHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setIsModal(!isModal);
  };

  return (
    <>
      {isModal ? (
        <SnackReviewModal
          selectedReview={selectedReview}
          openModalHandler={openModalHandler}
        />
      ) : (
        <></>
      )}

      {snackReviewData?.cards.map((el: SnackReviewCards, idx: number) => {
        return (
          <button
            key={idx}
            // onClick={openModalHandler}
            onClick={() => {
              setIsModal(!isModal);
              setSelectedReview(el);
            }}
          >
            <div className="border w-[300px] h-[330px] p-4 bg-white rounded-3xl shadow-md hover:-translate-y-1 transition ease-in-out hover:scale-110">
              <div className="flex items-center justify-between">
                <img
                  src={`https://codetech.nworld.dev${el?.image}`}
                  alt=""
                  className="w-16 w-full h-16 rounded-full bg-slate-200"
                />
                <div className="flex flex-col items-start justify-start w-[190px]">
                  <div>{el.nickname}</div>
                  <div className="ml-auto text-xs text-gray-400">
                    {' '}
                    {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 my-1.5">
                <div className="flex items-center justify-center ">
                  <p className="pr-0.5 text-sm">가성비</p>
                  <Rating
                    allowFraction
                    readonly
                    initialValue={el.score.costEfficiency}
                    size={17}
                  />
                </div>
                <div className="flex items-center justify-center ">
                  <p className="pr-0.5 text-sm">품질</p>
                  <Rating
                    allowFraction
                    readonly
                    initialValue={el.score.quality}
                    size={17}
                  />
                </div>
                <div className="flex items-center justify-center ">
                  <p className="pr-0.5 text-sm">만족감</p>
                  <Rating
                    allowFraction
                    readonly
                    initialValue={el.score.satisfaction}
                    size={17}
                  />
                </div>
                <div className="flex items-center justify-center ">
                  <p className="pr-0.5 text-sm">성능</p>
                  <Rating
                    allowFraction
                    readonly
                    initialValue={el.score.performance}
                    size={17}
                  />
                </div>
                <div className="flex items-center justify-center ">
                  <p className="pr-0.5 text-sm">디자인</p>
                  <Rating
                    allowFraction
                    readonly
                    initialValue={el.score.design}
                    size={17}
                  />
                </div>
              </div>
              <div className="pt-1.5 overflow-hidden text-justify whitespace-normal text-ellipsis line-clamp-6">
                {el.content}
              </div>

              {/* <div className="flex items-end justify-end text-sm">
              {Number(loginId) === el.writerId ? (
                <>
                  <button
                    onClick={onEditClick}
                    id={el.id.toString()}
                    className="border m-0.5 p-0.5 rounded-lg"
                  >
                    수정
                  </button>
                  <button
                    onClick={onDeleteClick}
                    id={el.id.toString()}
                    className="border m-0.5 p-0.5 rounded-lg"
                  >
                    삭제
                  </button>
                </>
              ) : null}
            </div> */}
            </div>
          </button>
        );
      })}
    </>
  );
};

export default SnackReview;
