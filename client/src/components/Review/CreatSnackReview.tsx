import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { RatingCategory } from '../../pages/ReviewLists';

const CreatSnackReview = ({ ratingCategory }: RatingCategory) => {
  const [question, setQuestion] = useState('');
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {ratingCategory.map((el, index) => {
          return (
            <div className="flex items-center" key={index}>
              <p className="pr-1.5 text-lg">{el}</p>
              <Rating allowFraction size={25} />
            </div>
          );
        })}
      </div>
      <div className="bg-slate-200">
        <div className="flex justify-center bg-white border-b border-gray-200">
          <div className="w-full py-10">
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              className={`w-full outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
                question.length !== 0 && `text-gray-700`
              }`}
              placeholder="Enter your question..."
              onChange={handleTextarea}
              value={question}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                현재 글자수 {question.length} / 최대 글자수 100자
              </span>
              <button className="font-medium text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400">
                리뷰쓰기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatSnackReview;
