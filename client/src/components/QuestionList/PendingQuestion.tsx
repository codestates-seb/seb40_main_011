import BodyTop from './BodyTop';
import AnswerMore from './AnswerMore';
// import BodyForm from './BodyForm';
import PendingAnswer from './PendingAnswer';
import {
  PendingQuestionProps,
  AnswerCardsProps,
} from '../../types/mainPageTypes';
import { useState } from 'react';

export default function PendingQuestion({
  createdAt,
  nickname,
  content,
  answerCards,
}: PendingQuestionProps): JSX.Element {
  const [showAnswer, setShowAnswer] = useState(false);
  const handleShowAnswer = () => {
    setShowAnswer(true);
    console.log(showAnswer);
  };
  console.log(showAnswer);
  return (
    <div className="w-full">
      <div className="w-full flex my-2">
        <img
          src="https://xsgames.co/randomusers/avatar.php?g=female"
          alt=""
          className="w-12 h-12 rounded-full mx-2 mt-4 ring ring-slate-200"
        />
        <div className="w-full">
          <BodyTop createdAt={createdAt} nickname={nickname} />
          <div className="px-6 pt-2 pb-3 rounded bg-white">{content}</div>
          {/* <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
            <BodyForm />
          </div> */}
          {answerCards !== null && !showAnswer && (
            <button onClick={handleShowAnswer}>
              <AnswerMore count={answerCards.length} />
            </button>
          )}
        </div>
      </div>
      {answerCards !== null &&
        showAnswer &&
        answerCards.map((el: AnswerCardsProps) => {
          const { id, createdAt, nickname, content } = el;
          return (
            <PendingAnswer
              key={id}
              createdAt={createdAt}
              nickname={nickname}
              content={content}
            />
          );
        })}
    </div>
  );
}
