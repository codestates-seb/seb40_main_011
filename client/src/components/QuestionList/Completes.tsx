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
    <div className="w-full">
      <div className="w-full flex justify-between pt-10 pb-4 px-2">
        <div className="flex items-center text-3xl text-slate-600">
          <span className="mr-2 font-bold tracking-tight">
            Mission complete!
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
          />
        );
      })}
      {adoptMoreStatus && (
        <div className="mt-12 mb-4 px-2 w-full">
          <button
            className="group w-full bg-slate-200/70 hover:bg-slate-500 rounded h-12 text-gray-400 hover:text-white pb-0.5 font-medium"
            onClick={handleQuestionMore}
          >
            <span className="group-hover:font-bold group-hover:underline">
              채택완료
            </span>
            된 질문, 더 불러와 볼까?
          </button>
        </div>
      )}
    </div>
  );
}
