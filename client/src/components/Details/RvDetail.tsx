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
      <div className="flex flex-col items-center w-3/5">
        <div className="w-full ">
          <div className="flex justify-start p-4 m-4 text-sm">
            <div
              className="p-1 px-2 rounded-full bg-slate-100 text-slate-600"
              role="button"
              onClick={onTypeClick}
            >
              {review?.type.toLocaleLowerCase()}
            </div>
          </div>
          <div className="flex justify-center p-4 m-4 text-2xl font-bold">
            {review?.title}
          </div>
        </div>
        <div className="flex items-end justify-end w-full p-4 border-b border-gray-200">
          <img
            className="w-12 h-12 m-2 rounded-full"
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
          <div className="p-4 my-16 whitespace-pre-wrap">{review?.content}</div>
          <div className="flex items-center justify-center my-8 ">
            <div>{review?.likes}</div>
            <button>
              <AiOutlineLike size="60" />
            </button>
          </div>
        </section>
        <div className="flex flex-col items-center w-full my-8">
          <div className="flex justify-start w-full p-4 mb-4 text-2xl font-bold ">
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
