// Snack Review List fetching & boxing comp
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { BsXLg } from 'react-icons/bs';
import { deleteSnack } from '../../util/apiCollection';
import { useIsLogin } from '../../store/login';
import { editSnack } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';

export interface EditSncakReview {
  score: ScoreType;
  content: string;
}

interface ScoreType {
  costEfficiency: number;
  quality: number;
  satisfaction: number;
  design: number;
  performance: number;
  grade: number;
}

const SnackReviewModal = ({ selectedReview, openModalHandler }: any) => {
  const { loginId } = useIsLogin();

  const [editStus, setEditStus] = useState(false);
  const handelEditStus = () => {
    setEditStus(!editStus);
  };

  const [content, setContent] = useState(selectedReview?.content);
  const [score, setScore] = useState<any>(selectedReview?.score);

  //   {
  //   costEfficiency: 0,
  //   quality: 0,
  //   satisfaction: 0,
  //   performance: 0,
  //   design: 0,
  // });

  const ratingArr = [
    { name: '가성비', en: 'costEfficiency' },
    { name: '품질', en: 'quality' },
    { name: '만족감', en: 'satisfaction' },
    { name: '성능', en: 'performance' },
    { name: '디자인', en: 'design' },
  ];

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

  // const handleRating = (
  //   value: number,
  //   index: number,
  //   event: React.MouseEvent<HTMLSpanElement, MouseEvent> | undefined
  // ) => {

  //   const key = event?.currentTarget.className.split(' ')[1];
  //   // console.log(key);
  //   setScore((current) => {
  //     const newScore = { ...current };
  //     key === '가성비' ? (newScore.costEfficiency = value) : null;
  //     key === '품질' ? (newScore.quality = value) : null;
  //     key === '만족감' ? (newScore.satisfaction = value) : null;
  //     key === '성능' ? (newScore.performance = value) : null;
  //     key === '디자인' ? (newScore.design = value) : null;

  //     // console.log(newScore);

  //     return newScore;
  //   });
  // };

  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (content.length > 1500) {
      window.alert('최대 글자수에 맞춰주세요');
      setContent(content.slice(0, 500));
    }
  };

  const onSubmitClick = async () => {
    delete score.grade;
    console.log({ score, content });
    const editReview = await editSnack(selectedReview.id, { score, content });
    switch (editReview.status) {
      case 200:
        // location.reload();
        break;
      case 412: {
        loginRefresh();
        onSubmitClick();
        break;
      }
      default:
    }
  };

  const onDeleteClick = (e: any) => {
    deleteSnack(e.currentTarget.id);
    window.location.reload();
  };

  const el = selectedReview;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center w-full h-screen overflow-hidden bg-black/30 backdrop-blur-sm justify-content">
      <div className="w-[40rem] z-40 rounded-xl overflow-hidden">
        <div className="flex flex-col px-6 py-4 font-medium text-gray-600 bg-slate-100 border-slate-200">
          <button className="ml-auto " onClick={openModalHandler}>
            <BsXLg className="" />
          </button>
          <div className="flex items-center justify-start">
            <img
              src={`https://codetech.nworld.dev${el?.image}`}
              alt=""
              className="w-16 h-16 rounded-full bg-slate-200"
            />
            <div className="flex flex-col items-start justify-start ml-8">
              <div>{el.nickname}</div>
              <div className="ml-auto text-xs text-gray-400">
                {' '}
                {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>
          </div>

          {editStus ? (
            <>
              <div className="grid grid-cols-3 my-1.5">
                <div className="flex items-center justify-between px-1">
                  <p className="pr-0.5 text-xl">가성비</p>
                  <Rating
                    allowFraction
                    initialValue={el.score.costEfficiency}
                    size={25}
                    onClick={handleRatingC}
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <p className="pr-0.5 text-xl">품질</p>
                  <Rating
                    allowFraction
                    initialValue={el.score.quality}
                    size={25}
                    onClick={handleRatingQ}
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <p className="pr-0.5 text-xl">만족감</p>
                  <Rating
                    allowFraction
                    initialValue={el.score.satisfaction}
                    size={25}
                    onClick={handleRatingS}
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <p className="pr-0.5 text-xl">성능</p>
                  <Rating
                    allowFraction
                    initialValue={el.score.performance}
                    size={25}
                    onClick={handleRatingP}
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <p className="pr-0.5 text-xl">디자인</p>
                  <Rating
                    allowFraction
                    initialValue={el.score.design}
                    size={25}
                    onClick={handleRatingD}
                  />
                </div>
              </div>
              <TextareaAutosize
                className={`w-full mt-1.5 bg-transparent outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
                  content.length !== 0 && `text-gray-700`
                }`}
                minRows={7}
                value={content}
                onChange={handleTextarea}
              />
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 my-1.5">
                {ratingArr.map((ele, idx) => {
                  return (
                    <div
                      className="flex items-center justify-between px-1"
                      key={idx}
                    >
                      <p className="pr-0.5 text-xl">{ele.name}</p>
                      <Rating
                        allowFraction
                        readonly
                        initialValue={el.score[ele.en]}
                        size={25}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="pt-2 pb-2 text-lg text-justify">{el.content}</div>
            </>
          )}
          <div className="flex items-end justify-end text-sm">
            {Number(loginId) === el.writerId ? (
              editStus ? (
                <>
                  <div className="flex items-center justify-between w-full">
                    <span className="flex text-sm text-gray-400">
                      현재 글자수 {content.length} / 최대 글자수 500자
                    </span>
                    <div>
                      {' '}
                      <button
                        onClick={handelEditStus}
                        id={el.id.toString()}
                        className="px-3 py-2 m-1 border rounded-lg"
                      >
                        취소
                      </button>
                      <button
                        onClick={onSubmitClick}
                        id={el.id.toString()}
                        className="px-3 py-2 m-1 border rounded-lg"
                      >
                        수정
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handelEditStus}
                    id={el.id.toString()}
                    className="px-3 py-2 m-1 border rounded-lg"
                  >
                    수정
                  </button>
                  <button
                    onClick={onDeleteClick}
                    id={el.id.toString()}
                    className="px-3 py-2 m-1 border rounded-lg"
                  >
                    삭제
                  </button>
                </>
              )
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnackReviewModal;
