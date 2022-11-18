import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';

const SnackReview = () => {
  return (
    <div className="border w-[300px] h-[300px] p-4 rounded-3xl ">
      <div className="flex">
        <img src="" alt="" className="w-16 h-16 rounded-full bg-slate-200" />
        <div>username</div>
        <div>date</div>
      </div>
      <div className="grid grid-cols-2 my-1.5">
        <div className="flex">
          <div>디자인</div>
          <div>
            <BsStar />
          </div>
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
      <div className="text-justify">content</div>
    </div>
  );
};

export default SnackReview;
