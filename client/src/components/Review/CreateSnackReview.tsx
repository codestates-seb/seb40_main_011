import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { RatingCategory } from '../../types/mainPageTypes';
import { postSnack } from '../../util/apiCollection';
import { useParams } from 'react-router-dom';

const CreateSnackReview = ({ ratingCategory }: RatingCategory) => {
  const params = useParams();
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const score = {
    costEfficiency: 0,
    quality: 0,
    satisfaction: 0,
    performance: 0,
    design: 0,
  };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleRating = (value: any, index: any, event: any) => {
    const key = event.currentTarget.className.split(' ')[1];
    key === '가성비' ? (score.costEfficiency = value) : null;
    key === '품질' ? (score.quality = value) : null;
    key === '만족감' ? (score.satisfaction = value) : null;
    key === '성능' ? (score.performance = value) : null;
    key === '디자인' ? (score.design = value) : null;
  };

  const onCreateClick = async () => {
    await postSnack({ score, content, productId: params.id });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {ratingCategory.map((el: any, index: any) => {
          return (
            <div className="flex items-center" key={index}>
              <p className={`${el} pr-1.5 text-lg`}>{el}</p>
              <Rating
                className={el}
                onClick={(value, index, event) =>
                  handleRating(value, index, event)
                }
                allowFraction
                size={25}
              />
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
                content.length !== 0 && `text-gray-700`
              }`}
              placeholder="Enter your question..."
              onChange={handleTextarea}
              value={content}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">
                현재 글자수 {content.length} / 최대 글자수 100자
              </span>
              <button
                onClick={onCreateClick}
                className="font-medium text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400"
              >
                리뷰쓰기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateSnackReview;
