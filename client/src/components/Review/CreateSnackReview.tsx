import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { postSnack } from '../../util/apiCollection';
import { useParams } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
import { SnackReviewScore } from '../../types/mainPageTypes';
import { loginRefresh } from '../../util/loginRefresh';
import Confirm from '../Modal/Confirm';

const CreateSnackReview = () => {
  const { isLogin } = useIsLogin();
  const params = useParams();
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState<SnackReviewScore>({
    costEfficiency: 0,
    quality: 0,
    satisfaction: 0,
    performance: 0,
    design: 0,
  });

  const modalMsg: string[] = [
    `별점을 매겨주세요!`,
    `리뷰는 10글자 이상 남겨주세요.`,
    '최대 글자수에 맞춰주세요',
  ];

  const [reviewMsg, setReviewMsg] = useState(modalMsg[0]);

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);

    if (content.length > 500) {
      setReviewMsg(modalMsg[2]);
      setShowModal(true);
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
  };
  const handleRatingQ = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.quality = el;
      return newScore;
    });
  };
  const handleRatingS = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.satisfaction = el;
      return newScore;
    });
  };
  const handleRatingP = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.performance = el;
      return newScore;
    });
  };
  const handleRatingD = (el: any) => {
    setScore((current: any) => {
      const newScore = { ...current };
      newScore.design = el;
      return newScore;
    });
  };

  const ratingCategory = [
    { name: '가성비', fnc: handleRatingC, en: 'costEfficiency' },
    { name: '품질', fnc: handleRatingQ, en: 'quality' },
    { name: '만족감', fnc: handleRatingS, en: 'satisfaction' },
    { name: '성능', fnc: handleRatingP, en: 'performance' },
    { name: '디자인', fnc: handleRatingD, en: 'design' },
  ];

  // const handleRating = (
  //   value: number,
  //   index: number,
  //   event: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined
  // ) => {
  //   const key = event?.currentTarget.className.split(' ')[1];
  //   setScore((current) => {
  //     const newScore = { ...current };
  //     key === '가성비' ? (newScore.costEfficiency = value) : null;
  //     key === '품질' ? (newScore.quality = value) : null;
  //     key === '만족감' ? (newScore.satisfaction = value) : null;
  //     key === '성능' ? (newScore.performance = value) : null;
  //     key === '디자인' ? (newScore.design = value) : null;

  //     return newScore;
  //   });
  // };

  const onCreateClick = async () => {
    const arr = Object.keys(score).map((el) => (score[el] === 0 ? 0 : 1));
    const ratingValidation = arr.reduce(
      (acc: number, cur: number) => acc * cur,
      1
    );
    if (content.length <= 10) {
      setReviewMsg(modalMsg[1]);
      setShowModal(true);
    } else if (ratingValidation === 1) {
      const response = await postSnack({
        score,
        content,
        productId: params.id,
      });

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
      setReviewMsg(modalMsg[0]);
      setShowModal(true);
    }
  };
  return (
    <>
      {showModal && <Confirm msg={reviewMsg} setShowModal={setShowModal} />}
      <div className="flex flex-col items-center w-full mt-6 md:flex-row md:mt-0 ">
        <div className="w-[20rem] flex flex-col justify-center items-between md:w-[20rem] md:mr-3">
          {ratingCategory.map((el: any, index: number) => {
            return (
              <div
                className="flex items-center justify-between px-1 mb-1 md:mb-0"
                key={index}
              >
                <span className="w-20 mr-2 text-lg md:w-12 text-black/60 md:text-base dark:text-gray-300">
                  {el.name}
                </span>
                <Rating onClick={el.fnc} allowFraction size={28} />
                <span className="bg-zinc-100 rounded ml-6 md:ml-3 pb-0.5 mt-1 text-black/70 font-medium text-center text-lg md:text-sm w-[3rem] dark:bg-DMMainColor dark:text-gray-300">
                  {score[el.en]}
                </span>
              </div>
            );
          })}
        </div>
        <span className="hidden h-32 ml-2 mr-10 border-l border-zinc-200 md:flex dark:border-DMThrColor" />
        <span className="w-full my-6 border-b md:hidden border-zinc-200" />
        <div className="w-full bg-slate-200">
          <div className="flex justify-center bg-white border-gray-200 dark:bg-DMSubColor ">
            <div className="w-full pb-6 md:py-10 dark:bg-DMSubColor ">
              <TextareaAutosize
                onFocus={onInputFocus}
                minRows={3}
                maxRows={4}
                className={` dark:bg-DMSubColor w-full outline-none dark:text-gray-300 font-medium resize-none  text-gray-700 text-lg ${
                  content.length !== 0 && `text-gray-700`
                }`}
                placeholder="Enter your Review..."
                onChange={handleTextarea}
                value={content}
              />
              <div className="flex items-center justify-between text-sm text-gray-400">
                <div className="flex flex-col md:flex-row">
                  <span className="">현재 글자수 {content.length}</span>
                  <span className="hidden mx-1 md:flex">/</span>
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
