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
    <div className="w-full flex-col px-4">
      <div className="w-full flex flex-col mt-5">
        <div className="w-full flex mb-3 items-center">
          <Avatar image={image} />
          <BodyTop
            createdAt={createdAt}
            nickname={nickname}
            adoptedId={adoptedId}
          />
        </div>
        <div className="flex">
          <div className="grow mr-2">
            <div className="px-6 pt-3 pb-4 rounded bg-white dark:bg-DMMainColor text-gray-600 dark:text-white font-medium">
              {content}
            </div>
          </div>
        </div>
      </div>
      <Adopted />
      {answerCards !== null && !showAnswer && (
        <button
          onClick={handleShowAnswer}
          className="w-full mt-4 rounded overflow-hidden pl-5 md:pl-12"
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
