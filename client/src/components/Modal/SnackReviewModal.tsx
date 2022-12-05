// Snack Review List fetching & boxing comp
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { BsXLg } from 'react-icons/bs';
import { deleteSnack } from '../../util/apiCollection';
import { useIsLogin } from '../../store/login';
import { editSnack } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
import Avatar from '../Avatar/Avatar';

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

  const ratingArr = [
    { name: '가성비', en: 'costEfficiency', fnc: handleRatingC },
    { name: '품질', en: 'quality', fnc: handleRatingQ },
    { name: '만족감', en: 'satisfaction', fnc: handleRatingS },
    { name: '성능', en: 'performance', fnc: handleRatingP },
    { name: '디자인', en: 'design', fnc: handleRatingD },
  ];
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
        location.reload();
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
        <div className="flex flex-col p-3 font-medium text-gray-600 bg-zinc-100 border-slate-200">
          <div className="flex justify-start items-top">
            <div className="pt-3 pl-2">
              <Avatar image={el.image} />
              {/* <img
              src={`https://codetech.nworld.dev${el?.image}`}
              alt=""
              className="w-16 h-16 rounded-full bg-slate-200"
            /> */}
            </div>
            <div className="flex flex-col items-center justify-start pt-1.5 ml-3">
              <div className="pt-1.5 mr-auto">{el.nickname}</div>
              <div className="pt-1 mr-auto text-xs text-gray-400 ">
                {' '}
                {new Date(el.createdAt).toLocaleDateString('kr-KO', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </div>
            </div>

            {!editStus ? (
              <>
                <div className="flex flex-row items-center justify-between px-3 py-1 mt-2 ml-auto bg-white border border-zinc-200 text-black/50 rounded-xl">
                  {ratingArr.map((ele, idx) => {
                    return (
                      <div
                        className="flex flex-row items-center justify-between px-1 "
                        key={idx}
                      >
                        <p className="pr-0.5 text-sm">{ele.name}</p>
                        <span className="text-sm font-medium md:ml-1 text-black/60">
                          {el.score[ele.en]}
                        </span>
                        {/* <Rating
                        allowFraction
                        readonly
                        initialValue={el.score[ele.en]}
                        size={25}
                      /> */}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <></>
            )}

            <button className="h-full ml-auto" onClick={openModalHandler}>
              <BsXLg className="flex flex-col justify-start" />
            </button>
          </div>
          {/* 수정상태 */}
          {editStus ? (
            <>
              <div className="flex">
                <div className="px-2 mt-4 ">
                  {ratingArr.map((ele, idx: number) => {
                    return (
                      <div
                        className="flex flex-col items-center px-1"
                        key={idx}
                      >
                        <div className="pr-0.5 flex justify-between items-center w-10/12">
                          {ele.name}
                          <p className="px-2 bg-zinc-200 rounded ml-3  text-sm text-black/70 font-medium w-[35px] text-center">
                            {score[ele.en]}
                          </p>
                        </div>
                        <Rating
                          allowFraction
                          initialValue={el.score[ele.en]}
                          size={25}
                          onClick={ele.fnc}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="w-full mt-2 ml-1 border-l">
                  <TextareaAutosize
                    className={`p-3 w-full bg-transparent outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
                      content.length !== 0 && `text-gray-700`
                    }`}
                    minRows={7}
                    value={content}
                    onChange={handleTextarea}
                  />

                  <div className="flex items-center justify-between w-full ">
                    <span className="flex pl-3 text-sm text-gray-400">
                      현재 글자수 {content.length} / 최대 글자수 500자
                    </span>
                    <div className="ml-auto">
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
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="pt-3 px-4 text-lg text-justify min-h-[150px]">
                {el.content}
              </div>
            </>
          )}
          <div className="flex items-end justify-end text-sm">
            {Number(loginId) === el.writerId ? (
              editStus ? (
                <></>
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
