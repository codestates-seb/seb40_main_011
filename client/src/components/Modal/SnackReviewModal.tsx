// Snack Review List fetching & boxing comp
import { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import TextareaAutosize from 'react-textarea-autosize';
import { BsXLg } from 'react-icons/bs';
import { SnackReviewScore, SnackReviewCards } from '../../types/mainPageTypes';
import { deleteSnack } from '../../util/apiCollection';
import { useIsLogin } from '../../store/login';
import { editSnack } from '../../util/apiCollection';
import { text } from 'stream/consumers';

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
}

const SnackReviewModal = ({ selectedReview, openModalHandler }: any) => {
  const { loginId } = useIsLogin();

  const [editStus, setEditStus] = useState(false);
  const handelEditStus = () => {
    setEditStus(!editStus);
  };

  const [content, setContent] = useState(selectedReview?.content);

  const [score, setScore] = useState<SnackReviewScore>({
    costEfficiency: 1,
    quality: 1,
    satisfaction: 1,
    performance: 1,
    design: 1,
  });

  const ratingArr = [
    { name: '가성비', en: 'costEfficiency' },
    { name: '품질', en: 'quality' },
    { name: '만족감', en: 'satisfaction' },
    { name: '성능', en: 'performance' },
    { name: '디자인', en: 'design' },
  ];

  const onEditClick = (e: any) => {
    editSnack(e.currentTarget.id, { score, content });
    // console.log({ score, content });
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
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    if (content.length > 100) {
      window.alert('최대 글자수에 맞춰주세요');
      setContent(content.slice(0, 100));
    }
  };
  const onSubmitClick = async () => {
    const arr = Object.keys(score).map((el) => (score[el] === 0 ? 0 : 1));
    const ratingValidation = arr.reduce(
      (acc: number, cur: number) => acc * cur,
      1
    );
    if (ratingValidation === 1) {
      await editSnack(selectedReview.id, { score, content });
      window.location.reload();
    } else {
      window.alert('별점을 매겨주세요!');
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
        <div className="flex flex-col px-8 py-4 font-medium text-gray-600 bg-slate-100 border-slate-200">
          <button className="ml-auto " onClick={openModalHandler}>
            <BsXLg className="ml-auto" />
          </button>
          <div className="flex items-center justify-between">
            <img
              src={`https://codetech.nworld.dev${el?.image}`}
              alt=""
              className="w-16 w-full h-16 rounded-full bg-slate-200"
            />
            <div className="flex flex-col items-start justify-start w-full ml-8">
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
                {ratingArr.map((ele, idx) => {
                  return (
                    <div
                      className="flex items-center justify-center "
                      key={idx}
                    >
                      <p className="pr-0.5">{ele.name}</p>
                      <Rating
                        allowFraction
                        initialValue={el.score[ele.en]}
                        size={20}
                        onClick={(value, index, event) =>
                          handleRating(value, index, event)
                        }
                      />
                    </div>
                  );
                })}
              </div>
              <TextareaAutosize
                className={`w-full bg-transparent outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
                  content.length !== 0 && `text-gray-700`
                }`}
                value={content}
                onChange={handleTextarea}
              />
              <span className="flex pt-3 text-sm text-gray-400">
                현재 글자수 {content.length} / 최대 글자수 100자
              </span>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 my-1.5">
                {ratingArr.map((ele, idx) => {
                  return (
                    <div
                      className="flex items-center justify-center "
                      key={idx}
                    >
                      <p className="pr-0.5 ">{ele.name}</p>
                      <Rating
                        allowFraction
                        readonly
                        initialValue={el.score[ele.en]}
                        size={20}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="text-justify h-[110px] pt-2  overflow-hidden whitespace-normal text-ellipsis line-clamp-4">
                {el.content}
              </div>
            </>
          )}
          <div className="flex items-end justify-end text-sm">
            {Number(loginId) === el.writerId ? (
              editStus ? (
                <>
                  <>
                    <button
                      onClick={handelEditStus}
                      id={el.id.toString()}
                      className="border m-0.5 p-0.5 rounded-lg"
                    >
                      취소
                    </button>
                    <button
                      onClick={onSubmitClick}
                      id={el.id.toString()}
                      className="border m-0.5 p-0.5 rounded-lg"
                    >
                      수정
                    </button>
                  </>
                </>
              ) : (
                <>
                  <button
                    onClick={handelEditStus}
                    id={el.id.toString()}
                    className="border m-0.5 p-0.5 rounded-lg"
                  >
                    수정
                  </button>
                  <button
                    onClick={onDeleteClick}
                    id={el.id.toString()}
                    className="border m-0.5 p-0.5 rounded-lg"
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
