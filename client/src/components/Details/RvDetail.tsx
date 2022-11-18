// Review List fetching & boxing comp
import { getReviewDetailTest } from '../../util/testApiCollection';
import { useEffect, useState } from 'react';
import { Review } from '../../types/mainPageTypes';
import { useNavigate, useParams } from 'react-router-dom';
import { AiOutlineLike } from 'react-icons/ai';
import Question from '../QuestionList/Question';
import CommentInput from './CommentInput';

const RvDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [review, setReview] = useState<Review>();

  useEffect(() => {
    const getReviewData = async () => {
      const { data } = await getReviewDetailTest(params.id);
      setReview(data);
    };
    getReviewData();
  }, []);

  const onTypeClick = () => {
    navigate(`/categories/review/${params.id}`);
  };
  console.log(review);
  return (
    <div className="flex justify-center">
      <div className="w-3/5 flex flex-col items-center">
        <div className="w-full ">
          <div className="flex p-4 m-4 justify-start text-sm">
            <div
              className="bg-slate-100 rounded-full p-1 px-2 text-slate-600"
              role="button"
              onClick={onTypeClick}
            >
              {review?.type.toLocaleLowerCase()}
            </div>
          </div>
          <div className="flex p-4 m-4 font-bold text-2xl justify-center">
            {review?.title}
          </div>
        </div>
        <div className="w-full flex justify-end items-end p-4 border-b border-gray-200">
          <img
            className="rounded-full w-12 h-12 m-2"
            src={review?.profileImg}
          />
          <div className="flex flex-col items-end p-2">
            <div>{review?.nickname}</div>
            <div>{review?.createdAt}</div>
          </div>
        </div>
        <section className="flex flex-col items-center border-b border-gray-200">
          <div className="flex justify-center">
            <img className="w-1/2 my-16" src={review?.thumbnail} />
          </div>
          <div className="whitespace-pre-wrap p-4 my-16">{review?.content}</div>
          <div className="flex items-center justify-center my-8 ">
            <div>{review?.likes}</div>
            <button>
              <AiOutlineLike size="60" />
            </button>
          </div>
        </section>
        <div className="w-full flex flex-col items-center my-8">
          <div className="flex w-full p-4 mb-4 justify-start font-bold text-2xl ">
            Comment
          </div>
          <Question />
          <CommentInput />
        </div>
      </div>
    </div>
  );
};
export default RvDetail;
