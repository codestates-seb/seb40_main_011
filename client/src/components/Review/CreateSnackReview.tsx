import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { RatingCategory } from '../../types/mainPageTypes';
import { postSnack } from '../../util/apiCollection';
import { useParams } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
import { SnackReviewScore } from '../../types/mainPageTypes';
import { loginRefresh } from '../../util/loginRefresh';
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
    if (content.length > 500) {
      window.alert('최대 글자수에 맞춰주세요');
      setContent(content.slice(0, 500));
    }
  };

  const onInputFocus = () => {
    if (!isLogin) {
      window.alert('로그인을 해주세요');
      (document.activeElement as HTMLElement).blur();
    }
  };

  const handleRatingC = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.costEfficiency = el;
      return newScore;
    });
    console.log(score);
  };
  const handleRatingQ = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.quality = el;
      return newScore;
    });
    console.log(score);
  };
  const handleRatingS = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.satisfaction = el;
      return newScore;
    });
    console.log(score);
  };
  const handleRatingP = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.performance = el;
      return newScore;
    });
    console.log(score);
  };
  const handleRatingD = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.design = el;
      return newScore;
    });
    console.log(score);
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
      const response = await postSnack({
        score,
        content,
        productId: params.id,
      });
      console.log(response);
      switch (response.status) {
        default:
          location.reload();
          break;
        case 401:
          alert('에러');
          console.error(response.status + ' Error');
          break;
        case 412: {
          loginRefresh();
          onCreateClick();
        }
      }
    } else {
      window.alert('별점을 매겨주세요!');
    }
  };
  return (
    <>
      <div className="flex w-full items-center flex-col md:flex-row mt-10 md:mt-0">
        <div className="flex flex-col justify-center items-between w-[16rem] mr-3">
          {ratingCategory.map((el: string, index: number) => {
            return (
              <div
                className="flex items-center justify-between px-1"
                key={index}
              >
                <span className={`${el} mr-2 text-black/60 w-12`}>{el}</span>
                <Rating
                  className={el}
                  onClick={(value, index, event) =>
                    handleRating(value, index, event)
                  }
                  allowFraction
                  size={25}
                />
                <span className="px-2 bg-zinc-100 rounded ml-3 pb-0.5 mt-1 text-sm text-black/70 font-medium">
                  0
                </span>
              </div>
            );
          })}
        </div>
        <span className="h-32 border-l border-zinc-200 ml-4 mr-10 hidden md:flex" />
        <div className="w-full bg-slate-200">
          <div className="flex justify-center bg-white border-b border-gray-200">
            <div className="w-full py-10">
              <TextareaAutosize
                onFocus={onInputFocus}
                minRows={3}
                maxRows={4}
                className={`w-full outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
                  content.length !== 0 && `text-gray-700`
                }`}
                placeholder="Enter your question..."
                onChange={handleTextarea}
                value={content}
              />
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex flex-col md:flex-row">
                  <span className="">현재 글자수 {content.length}</span>
                  <span className="mx-1 hidden md:flex">/</span>
                  <span className="">최대 글자수 500자</span>
                </div>
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
      </div>
    </>
  );
};

export default CreateSnackReview;
