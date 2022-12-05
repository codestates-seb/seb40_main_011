import BodyTop from './BodyTop';
import AnswerMore from './AnswerMore';
import Answer from './Answer';
import { QuestionProps, AnswerCardsProps } from '../../types/mainPageTypes';
import { useState } from 'react';
import Avatar from '../Avatar/Avatar';

export default function Question({
  createdAt,
  nickname,
  content,
  answerCards,
  adoptedId,
  writerId,
  image,
}: QuestionProps): JSX.Element {
  // 답변 불러오기
  const [showAnswer, setShowAnswer] = useState(false);
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };

  return (
    <div className="w-full">
      <div className="w-full flex mt-5">
        <div className="mt-3">
          <Avatar image={image} />
        </div>
        <div className="w-full pl-2">
          <BodyTop
            createdAt={createdAt}
            nickname={nickname}
            adoptedId={adoptedId}
          />
          <div className="flex">
            <div className="grow mr-2">
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
          </div>
        </div>
      </div>
      {answerCards !== null &&
        showAnswer &&
        answerCards.map((el: AnswerCardsProps) => {
          const { id, createdAt, nickname, content, writerId, image } = el;
          return (
            <Answer
              key={id}
              createdAt={createdAt}
              nickname={nickname}
              content={content}
              writerId={writerId}
              id={Number(id)}
              adoptedId={adoptedId}
              image={image}
            />
          );
        })}
    </div>
  );
}
