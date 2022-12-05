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
import Avatar from '../Avatar/Avatar';

export default function PendingQuestion({
  createdAt,
  nickname,
  content,
  answerCards,
  writerId,
  id,
  image,
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

  // 질문수정 state
  const getEdit = () => {
    if (answerCards === null) {
      return true;
    }
    return false;
  };
  const editable = getEdit();

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
        <div className="mt-3">
          <Avatar image={image} />
        </div>
        <div className="w-full pl-2">
          <BodyTop
            createdAt={createdAt}
            nickname={nickname}
            writerId={writerId}
            questionId={questionId}
            content={content}
            editable={editable}
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
                className="group w-full h-11 text-2xl bg-blue-100 rounded duration-300 hover:ring hover:ring-blue-300 "
              >
                <BsFillChatTextFill className="text-blue-500 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {answerCards !== null &&
        showAnswer &&
        answerCards.map((el: AnswerCardsProps) => {
          const { id, createdAt, nickname, content, writerId, image } = el;
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
              image={image}
            />
          );
        })}
    </div>
  );
}
