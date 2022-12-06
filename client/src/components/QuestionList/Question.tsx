import BodyTop from './BodyTop';
import AnswerMore from './AnswerMore';
import Answer from './Answer';
import { QuestionProps, AnswerCardsProps } from '../../types/mainPageTypes';
import { useState } from 'react';
import Avatar from '../Avatar/Avatar';
import { BsFillChatTextFill } from 'react-icons/bs';

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

  const Adopted = () => {
    if (answerCards?.length > 0) {
      const adoptedAnswer = answerCards.filter(
        (el: any) => el.id === adoptedId
      )[0];
      return (
        <>
          {answerCards !== null && (
            <Answer
              key={adoptedAnswer.id}
              createdAt={adoptedAnswer.createdAt}
              nickname={adoptedAnswer.nickname}
              content={adoptedAnswer.content}
              writerId={writerId}
              id={Number(adoptedAnswer.id)}
              adoptedId={adoptedId}
              image={adoptedAnswer.image}
              questionId={adoptedAnswer.questionId}
            />
          )}
        </>
      );
    }
    return null;
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
            </div>
          </div>
        </div>
      </div>
      <Adopted />
      {answerCards !== null && !showAnswer && (
        <button
          onClick={handleShowAnswer}
          className="w-full mt-1 rounded overflow-hidden"
        >
          <AnswerMore count={answerCards.length - 1} />
        </button>
      )}
      {answerCards !== null &&
        showAnswer &&
        answerCards
          .filter((el: any) => el.id !== adoptedId)
          .map((el: AnswerCardsProps) => {
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
