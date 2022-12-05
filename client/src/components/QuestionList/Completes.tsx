import { useEffect, useState } from 'react';
import SelectBox from '../SelectBox/SelectBox';
import { fetchQuestionData } from '../../util/apiCollection';
import { QuestionMapProps } from '../../types/mainPageTypes';
import Question from './Question';

export default function Completes() {
  const [questions, setQuestions] = useState([]);

  // 더보기
  const [adoptMore, setAdoptMore] = useState(3);
  const [adoptMoreStatus, setAdoptMoreStatus] = useState(false);

  const handleQuestionMore = () => {
    setAdoptMore(adoptMore + 3);
  };

  // select box
  const [selected, setSelected] = useState('최신 순');
  const [spread, setSpread] = useState(false);

  // 정렬
  const [adoptSort, setAdoptSort] = useState(false);

  useEffect(() => {
    const getQuestion = async () => {
      const data = await fetchQuestionData(adoptMore, adoptSort, true);
      //   console.log(data);
      switch (data.status) {
        case 200: {
          const { cards, hasNext } = data.data;
          setQuestions(cards);
          setAdoptMoreStatus(hasNext);
          // console.log(cards);
        }
      }
    };
    getQuestion();
  }, [adoptMore, adoptSort]);

  return (
    <div className="bg-slate-200 flex justify-center py-16 border-t border-slate-300">
      <div className="w-[48rem] flex flex-col items-center">
        <div className="w-full flex justify-between pb-4 px-2">
          <div className="flex items-center text-3xl text-slate-600">
            <span className="mr-2 font-bold tracking-tight">
              채택이 완료된 질문
            </span>
          </div>
          <SelectBox
            spread={spread}
            setSpread={setSpread}
            selected={selected}
            setSelected={setSelected}
            setAdoptSort={setAdoptSort}
          />
        </div>
        {questions.map((el: QuestionMapProps) => {
          const {
            id,
            createdAt,
            nickname,
            content,
            answerCards,
            adoptedId,
            writerId,
            image,
          } = el;
          return (
            <Question
              key={id}
              createdAt={createdAt}
              nickname={nickname}
              content={content}
              answerCards={answerCards}
              adoptedId={adoptedId}
              writerId={writerId}
              image={image}
            />
          );
        })}
        {adoptMoreStatus && (
          <div className="mt-12 mb-4 px-2 w-full">
            <button
              className="group w-full bg-slate-500 hover:bg-slate-400 rounded h-12 text-white pb-0.5 font-medium"
              onClick={handleQuestionMore}
            >
              더 불러와 볼까?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
