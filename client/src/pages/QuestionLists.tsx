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
      // console.log(data);
      switch (data.status) {
        case 200: {
          const { cards, hasNext } = data.data;
          setQuestions(cards);
          setPendingMoreStatus(hasNext);
          // console.log(data.data);
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
      <div className="bg-slate-100 flex justify-center pb-20">
        <div className="w-[48rem] flex flex-col items-center">
          <div className="w-full flex justify-between pt-10 pb-4 px-2">
            <div className="flex items-center text-3xl text-slate-600">
              <span className="mr-2 font-bold tracking-tight">
                Somebody help me!
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
            const { id, createdAt, nickname, content, answerCards, writerId } =
              el;
            return (
              <PendingQuestion
                key={id}
                createdAt={createdAt}
                nickname={nickname}
                content={content}
                answerCards={answerCards}
                writerId={writerId}
                id={id}
              />
            );
          })}
          {pendingMoreStatus && (
            <div className="mt-12 mb-4 px-2 w-full">
              <button
                className="group w-full bg-slate-200/70 hover:bg-slate-500 rounded h-12 text-gray-400 hover:text-white pb-0.5 font-medium"
                onClick={handleQuestionMore}
              >
                <span className="group-hover:font-bold group-hover:underline">
                  미채택
                </span>
                된 질문, 더 불러와 볼까?
              </button>
            </div>
          )}
          <Completes />
        </div>
      </div>
    </>
  );
}
