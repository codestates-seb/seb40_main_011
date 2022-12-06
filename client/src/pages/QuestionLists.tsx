import QuestionInput from '../components/QuestionList/QuestionInput';
import PendingQuestion from '../components/QuestionList/PendingQuestion';
import SelectBox from '../components/SelectBox/SelectBox';
import { useEffect, useState } from 'react';
import { fetchQuestionData } from '../util/apiCollection';
import { QuestionListsProps } from '../types/mainPageTypes';
// import Confirm from '../components/Modal/Confirm';
import Completes from '../components/QuestionList/Completes';

export default function QuestionLists() {
  const [questions, setQuestions] = useState([]);
  // 더보기
  const [pendingMore, setPendingMore] = useState(3);
  const [pendingMoreStatus, setPendingMoreStatus] = useState(false);

  // 정렬
  const [pendingSort, setPendingSort] = useState(false);

  // select box
  const [selected, setSelected] = useState('최신 순');
  const [spread, setSpread] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      const data = await fetchQuestionData(pendingMore, pendingSort, false);
      switch (data.status) {
        case 200: {
          const { cards, hasNext } = data.data;
          setQuestions(cards);
          setPendingMoreStatus(hasNext);
        }
      }
    };
    getQuestion();
  }, [pendingMore, selected]);

  const handleQuestionMore = () => {
    setPendingMore(pendingMore + 3);
  };

  return (
    <>
      <QuestionInput />
      <div className="bg-slate-100 dark:bg-DMMainColor flex justify-center py-8 md:py-16">
        <div className="w-[48rem] flex flex-col items-center">
          <div className="w-full flex flex-col md:flex-row justify-between pb-4 px-4">
            <div className="flex items-center text-3xl text-slate-600 dark:text-white mb-4">
              <span className="mr-2 font-bold tracking-tight">
                답변이 필요한 질문
              </span>
            </div>
            <SelectBox
              spread={spread}
              setSpread={setSpread}
              selected={selected}
              setSelected={setSelected}
              setPendingSort={setPendingSort}
            />
          </div>
          {questions.map((el: QuestionListsProps) => {
            const {
              id,
              createdAt,
              nickname,
              content,
              answerCards,
              writerId,
              image,
            } = el;
            return (
              <PendingQuestion
                key={id}
                createdAt={createdAt}
                nickname={nickname}
                content={content}
                answerCards={answerCards}
                writerId={writerId}
                id={id}
                image={image}
              />
            );
          })}
          {pendingMoreStatus && (
            <div className="mt-12 mb-4 px-4 w-full">
              <button
                className="w-full bg-slate-500 hover:bg-slate-400 rounded h-12 text-white pb-0.5 font-medium"
                onClick={handleQuestionMore}
              >
                더 불러와 볼까?
              </button>
            </div>
          )}
        </div>
      </div>
      <Completes />
    </>
  );
}
