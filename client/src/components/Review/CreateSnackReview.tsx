import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { RatingCategory } from '../../types/mainPageTypes';
import { postSnack } from '../../util/apiCollection';
import { useParams } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
import { SnackReviewScore } from '../../types/mainPageTypes';
const CreateSnackReview = ({ ratingCategory }: RatingCategory) => {
  const { isLogin } = useIsLogin();
  const params = useParams();
  const [content, setContent] = useState('');
  const [score, setScore] = useState<SnackReviewScore>({
    costEfficiency: 0,
    quality: 0,
    satisfaction: 0,
    performance: 0,
    design: 0,
  });

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (content.length > 100) {
      window.alert('최대 글자수에 맞춰주세요');
      setContent(content.slice(0, 100));
    }
  };

  const onInputFocus = () => {
    if (!isLogin) {
      window.alert('로그인을 해주세요');
      (document.activeElement as HTMLElement).blur();
    }
  };

  const handleRating = (
    value: number,
    index: number,
    event: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined
  ) => {
    const key = event?.currentTarget.className.split(' ')[1];
    setScore((current) => {
      const newScore = { ...current };
      key === '가성비' ? (newScore.costEfficiency = value) : null;
      key === '품질' ? (newScore.quality = value) : null;
      key === '만족감' ? (newScore.satisfaction = value) : null;
      key === '성능' ? (newScore.performance = value) : null;
      key === '디자인' ? (newScore.design = value) : null;

      return newScore;
    });
  };

  const onCreateClick = async () => {
    const arr = Object.keys(score).map((el) => (score[el] === 0 ? 0 : 1));
    const ratingValidation = arr.reduce(
      (acc: number, cur: number) => acc * cur,
      1
    );
    if (ratingValidation === 1) {
      await postSnack({ score, content, productId: params.id });
      // window.location.reload();
    } else {
      window.alert('별점을 매겨주세요!');
    }
  };
  return (
    <>
      <div className="flex items-center justify-between">
        {ratingCategory.map((el: string, index: number) => {
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
              onFocus={onInputFocus}
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
