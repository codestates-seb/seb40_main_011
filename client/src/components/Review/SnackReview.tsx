import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { SnackReviewProps, SnackReviewCards } from '../../types/mainPageTypes';

const SnackReview = ({ snackReviewData, ratingCategory }: SnackReviewProps) => {
  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };
  console.log(snackReviewData);

  return (
    <>
      {snackReviewData?.cards.map((el: SnackReviewCards, idx: number) => {
        return (
          <div
            key={idx}
            className="border w-[300px] h-[300px] p-4 rounded-3xl shadow-md"
          >
            <div className="flex items-center justify-between">
              <img
                src={el?.image}
                alt=""
                className="w-16 h-16 rounded-full bg-slate-200"
              />
              <div className="flex w-full">
                <div>{el.id}</div>
                <div className="ml-auto">{getParsedDate(el.createdAt)}</div>
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
            <div className="text-justify h-[95px]">{el.content}</div>
            <div className="flex items-end justify-end text-sm">
              <button className="border m-0.5 p-0.5 rounded-lg">수정</button>
              <button className="border m-0.5 p-0.5 rounded-lg">삭제</button>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SnackReview;
