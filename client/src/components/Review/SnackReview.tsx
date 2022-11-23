import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';
import { RatingCategory } from '../../pages/ReviewLists';

const SnackReview = ({ ratingCategory }: RatingCategory) => {
  const [snackReviewData, setSnackReviewData] = useState(null);

  return (
    <div className="border w-[300px] h-[300px] p-4 rounded-3xl shadow-md">
      <div className="flex items-center justify-between">
        <img src="" alt="" className="w-16 h-16 rounded-full bg-slate-200" />
        <div className="flex w-full">
          <div>username</div>
          <div className="ml-auto">date</div>
        </div>
      </div>
      <div className="grid grid-cols-2 my-1.5">
        {ratingCategory.map((el, index) => {
          return (
            <div className="flex items-center justify-center " key={index}>
              <p className="pr-0.5 text-sm">{el}</p>
              <Rating allowFraction readonly initialValue={2.5} size={17} />
            </div>
          );
        })}
      </div>
      <div className="text-justify h-[95px]">
        At vero eos et accusamus et iusto odio dign is simos ducimus qui blandi
        tiis praesentium voluptatum qwsd
      </div>
      <div className="flex items-end justify-end text-sm">
        <button className="border m-0.5 p-0.5 rounded-lg">수정</button>
        <button className="border m-0.5 p-0.5 rounded-lg">삭제</button>
      </div>
    </div>
  );
};

export default SnackReview;
