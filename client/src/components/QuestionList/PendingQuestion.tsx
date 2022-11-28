import BodyTop from './BodyTop';
import AnswerMore from './AnswerMore';
import PendingAnswer from './PendingAnswer';
import {
  PendingQuestionProps,
  AnswerCardsProps,
} from '../../types/mainPageTypes';
import { useState } from 'react';
import { BsFillChatTextFill } from 'react-icons/bs';
import WriteAnswer from '../Modal/WriteAnswer';
import { useIsLogin } from '../../store/login';
import { useNavigate } from 'react-router-dom';

export default function PendingQuestion({
  createdAt,
  nickname,
  content,
  answerCards,
  writerId,
  id,
}: PendingQuestionProps): JSX.Element {
  const questionId = id;
  const questionWriterId = writerId;
  const questionContent = content;

  // 답변 불러오기
  const [showAnswer, setShowAnswer] = useState(false);
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  // 답변 모달
  const [showModal, setShowModal] = useState(false);
  const { isLogin } = useIsLogin();
  const navigate = useNavigate();
  const handleShowModalAnswer = () => {
    if (!isLogin) {
      navigate('/login');
    }
    setShowModal(true);
  };

  return (
    <div className="w-full">
      {showModal && (
        <WriteAnswer
          setShowModal={setShowModal}
          content={content}
          questionId={questionId}
        />
      )}
      <div className="w-full flex mt-5">
        <img
          src="https://xsgames.co/randomusers/avatar.php?g=female"
          alt=""
          className="w-12 h-12 rounded-2xl mx-3 mt-3 ring ring-slate-200"
        />
        <div className="w-full">
          <BodyTop
            createdAt={createdAt}
            nickname={nickname}
            writerId={writerId}
            questionId={questionId}
            content={content}
          />
          <div className="flex">
            <div className="grow">
              <div className="px-4 pt-2 pb-3 rounded bg-white text-gray-600 font-medium">
                {content}
              </div>
              {answerCards !== null && !showAnswer && (
                <button
                  onClick={handleShowAnswer}
                  className="w-full mt-1 rounded overflow-hidden"
                >
                  <AnswerMore count={answerCards.length} />
                </button>
              )}
            </div>
            <div className="flex-none w-16 mx-2 flex justify-center items-start">
              <button
                onClick={handleShowModalAnswer}
                className="group w-full h-11 bg-slate-200 hover:bg-blue-100 rounded"
              >
                <BsFillChatTextFill className=" text-2xl text-slate-400 group-hover:text-blue-500 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {answerCards !== null &&
        showAnswer &&
        answerCards.map((el: AnswerCardsProps) => {
          const { id, createdAt, nickname, content, writerId } = el;
          return (
            <PendingAnswer
              key={id}
              createdAt={createdAt}
              nickname={nickname}
              content={content}
              writerId={writerId}
              id={id}
              questionId={questionId}
              questionWriterId={questionWriterId}
              questionContent={questionContent}
            />
          );
        })}
    </div>
  );
}
