// 리뷰 디테일 fetching & boxing component
import { BsStar, BsStarHalf, BsStarFill } from 'react-icons/bs';
import DetailReview from '../components/Review/DetailReview';
import SnackReview from '../components/Review/SnackReview';

const ReviewLists = () => {
  const sortReviews = ['등록순', '추천순', '댓글순'];
  const snackReview = ['1', '2', '3', '4', '5', '6'];

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="mt-10 w-[1060px] text-center">
        <div className="mb-3 text-2xl font-bold">category</div>
        <div className="text-5xl font-bold">product</div>
        {/* detail review */}
        <div className="mt-6">
          <div className="text-right">
            {sortReviews.map((el, index) => {
              return (
                <button key={index} className="p-2">
                  {el}
                </button>
              );
            })}
          </div>
          <div>
            <div className="mb-2 text-xl font-medium text-left">상세 리뷰</div>
            <DetailReview />

            <button className="px-10 py-2 rounded-xl bg-slate-200">
              더보기
            </button>
          </div>
        </div>
        {/* snack review */}
        <div className="mt-10">
          <div>
            <div className="my-3 text-3xl">Total Reviews</div>
            <div>별점 부분</div>
          </div>
          <div>
            <div className="mb-2 text-xl font-medium text-left">한줄 리뷰</div>
            <div className="grid justify-center grid-cols-3 gap-x-20 gap-y-10">
              {snackReview.map((el, index) => {
                return (
                  <div key={index}>
                    <SnackReview />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="px-10 py-2 my-10 rounded-xl bg-slate-200">
            더보기
          </button>
        </div>
        {/* 한줄 리뷰 직성 */}
        <div className="my-16">
          <div>별점 주기 기능</div>
          <div className="bg-slate-200">
            <input
              type="text"
              className="text-left bg-transparent"
              placeholder="리뷰를 입력하세요."
            />
            <div className="flex">
              <div>글자수 0/100자</div>
              <button className="ml-auto">리뷰 쓰기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewLists;
