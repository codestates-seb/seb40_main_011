import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';

const SnackReview = () => {
  return (
    <div className="border w-[300px] h-[300px] p-4 rounded-3xl shadow-md">
      <div className="flex items-center justify-between">
        <img src="" alt="" className="w-16 h-16 rounded-full bg-slate-200" />
        <div className="">
          <div>username</div>
          <div className="ml-auto">date</div>
        </div>
      </div>
      <div className="grid grid-cols-2 my-1.5">
        <div className="flex">
          <div>디자인</div>
          <div></div>
        </div>
        <div className="flex">
          <div>품질</div>
          <div></div>
        </div>
        <div className="flex">
          <div>성능</div>
          <div></div>
        </div>
        <div className="flex">
          <div>가격</div>
          <div></div>
        </div>
      </div>
      <div className="text-justify h-[125px]">content</div>
      <div className="flex items-end justify-end text-sm">
        <button className="border m-0.5 p-0.5 rounded-lg">수정</button>
        <button className="border m-0.5 p-0.5 rounded-lg">삭제</button>
      </div>
    </div>
  );
};

export default SnackReview;
