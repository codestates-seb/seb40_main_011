import QuestionInput from '../components/QuestionList/QuestionInput';
import Question from '../components/QuestionList/Question';
import Answer from '../components/QuestionList/Answer';
import PendingQuestion from '../components/QuestionList/PendingQuestion';
import SelectBox from '../components/SelectBox/SelectBox';
import { useEffect, useState } from 'react';
import { fetchQuestionData } from '../util/apiCollection';
import { QuestionListsProps } from '../types/mainPageTypes';
// import Confirm from '../components/Modal/Confirm';

export default function QuestionLists() {
  const [questions, setQuestions] = useState([]);
  // 더보기
  const [pendingMore, setPendingMore] = useState(3);
  const [pendingMoreStatus, setPendingMoreStatus] = useState(false);

  // 정렬
  const [pendingSort, setPendingSort] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      const data = await fetchQuestionData(pendingMore, pendingSort);
      // console.log(data);
      switch (data.status) {
        case 200: {
          const { cards, hasNext } = data.data;
          setQuestions(cards);
          setPendingMoreStatus(hasNext);
          console.log(data.data);
        }
      }
    };
    getQuestion();
  }, [pendingMore]);

  const handleQuestionMore = () => {
    setPendingMore(pendingMore + 3);
  };
  return (
    <>
      <QuestionInput />
      <div className="bg-slate-100 flex justify-center pb-20">
        <div className="w-[48rem] flex flex-col items-center">
          <div className="w-full flex justify-between pt-10 pb-4">
            <div className="flex items-center text-2xl text-slate-600">
              <span className="mr-2 font-bold">Somebody help me!</span>
              <div className="w-8 h-8 flex justify-center items-center pb-1 pr-0.5 rounded-full bg-gray-600 font-medium mt-1 text-white">
                4
              </div>
            </div>
            <SelectBox />
          </div>
          {questions.map((el: QuestionListsProps) => {
            const { id, createdAt, nickname, content, answerCards } = el;
            return (
              <PendingQuestion
                key={id}
                createdAt={createdAt}
                nickname={nickname}
                content={content}
                answerCards={answerCards}
              />
            );
          })}
          {pendingMoreStatus && (
            <button
              className="mt-2 w-80 hover:bg-slate-200 rounded-full h-12 text-gray-400 hover:text-gray-600 pb-0.5 font-medium"
              onClick={handleQuestionMore}
            >
              더보기
            </button>
          )}
          <div className="w-full flex justify-between pt-10 pb-4">
            <div className="flex items-center text-2xl text-slate-600">
              <span className="mr-2 font-bold">Mission complete!</span>
              <div className="w-8 h-8 flex justify-center items-center pb-1 pr-0.5 rounded-full bg-gray-600 font-medium mt-1 text-white">
                4
              </div>
            </div>
            <SelectBox />
          </div>
          <Question />
          <Answer />
          <button className="w-4/5 hover:bg-slate-200 rounded h-10 text-gray-400 hover:text-gray-600 pb-0.5 font-medium">
            더 보기
          </button>
        </div>
      </div>
    </>
  );
}
