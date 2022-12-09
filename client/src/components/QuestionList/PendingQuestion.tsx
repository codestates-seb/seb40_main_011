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
import FirstAnswer from './FirstAnswer';

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

  const firstComment = answerCards?.slice(0, 1)[0];

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
    <div className="w-full px-4">
      {showModal && (
        <WriteAnswer
          setShowModal={setShowModal}
          content={content}
          questionId={questionId}
        />
      )}
      <div className="w-full flex flex-col mt-5">
        <div className="w-full flex mb-3 items-center">
          <Avatar image={image} />
          <BodyTop
            createdAt={createdAt}
            nickname={nickname}
            writerId={writerId}
            questionId={questionId}
            content={content}
            editable={editable}
          />
        </div>
        <div className="flex">
          <div className="grow">
            <div className="px-6 pt-3 pb-4 rounded bg-white dark:bg-DMSubColor text-gray-600 dark:text-white font-medium">
              {content}
            </div>
          </div>
          <div className="flex-none w-16 ml-2 flex justify-center items-start">
            <button
              onClick={handleShowModalAnswer}
              className="group w-full h-full text-2xl bg-blue-100 rounded duration-300 hover:ring hover:ring-blue-300 "
            >
              <BsFillChatTextFill className="text-blue-500 mx-auto" />
            </button>
          </div>
        </div>
      </div>
      {firstComment && (
        <FirstAnswer
          key={firstComment.id}
          createdAt={firstComment.createdAt}
          nickname={firstComment.nickname}
          content={firstComment.content}
          writerId={writerId}
          id={firstComment.id}
          questionId={firstComment?.questionId}
          questionWriterId={firstComment?.writerId}
          questionContent={firstComment.questionContent}
          image={firstComment.image}
        />
      )}
      {answerCards !== null && !showAnswer && answerCards.length !== 1 && (
        <button
          onClick={handleShowAnswer}
          className="w-full mt-2 rounded overflow-hidden pl-12"
        >
          <AnswerMore count={answerCards.length - 1} />
        </button>
      )}
      {answerCards !== null &&
        showAnswer &&
        answerCards
          .slice()
          .filter((el: PendingQuestionProps) => el.id !== firstComment.id)
          .map((el: AnswerCardsProps) => {
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
