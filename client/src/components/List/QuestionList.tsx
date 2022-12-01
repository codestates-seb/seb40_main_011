import { BsArrowRight } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { fetchQuestionData } from '../../util/apiCollection';
import { QuestionListType } from '../../types/mainPageTypes';
import { useNavigate } from 'react-router-dom';

const QuestionList = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionListType[]>([]);
  const [answerNeed, setAnswerNeed] = useState<QuestionListType[]>([]);

  useEffect(() => {
    const getQuestionData = async () => {
      const { data } = await fetchQuestionData(5, false, true);
      setQuestions(data.cards);
    };
    getQuestionData();
  }, []);

  useEffect(() => {
    const getQuestionData = async () => {
      const { data } = await fetchQuestionData(5, false, false);
      setAnswerNeed(data.cards);
    };
    getQuestionData();
  }, []);

  const handleOnClick = () => {
    navigate('/question-lists');
  };

  return (
    <div className="mx-auto w-full lg:w-[64rem] py-8 flex md:flex-row flex-col">
      <div className="md:w-1/2 flex flex-col m-4">
        <div
          role="button"
          onClick={handleOnClick}
          className="bg-zinc-100 rounded-2xl py-5 px-6 md:px-8 flex items-center justify-between w-full group hover:bg-yellow-500"
        >
          <div className="font-bold text-xl text-orange-700 group-hover:text-gray-800">
            답변이 필요한 질문
          </div>
          <div className="flex items-center text-gray-400 font-medium group-hover:text-yellow-900">
            <span className="mr-2 hidden md:inline-block">자세히 보기</span>
            <BsArrowRight className="text-2xl" />
          </div>
        </div>
        <div className="my-4">
          {answerNeed.map((el, idx) => (
            <div key={idx} className="flex justify-between p-2 ">
              <span className="line-clamp-1 grow break-all">{el.content}</span>
              <span className="hidden md:line-clamp-1 text-right text-gray-500/70 tracking-tight flex-none w-20">
                {el.nickname}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/2 flex flex-col m-4">
        <div
          role="button"
          onClick={handleOnClick}
          className="bg-zinc-100 rounded-2xl py-5 px-6 md:px-8 flex items-center justify-between group hover:bg-green-500"
        >
          <div className="font-bold text-xl text-green-600 group-hover:text-gray-800">
            채택이 완료된 질문
          </div>
          <div className="flex items-center text-gray-400 font-medium group-hover:text-green-900">
            <span className="mr-2 hidden md:inline-block">자세히 보기</span>
            <BsArrowRight className="text-2xl" />
          </div>
        </div>
        <div className="my-4">
          {questions.map((el, idx) => (
            <div key={idx} className="flex justify-between p-2 ">
              <span className="line-clamp-1 grow break-all">{el.content}</span>
              <span className="hidden md:line-clamp-1 text-right text-gray-500/70 tracking-tight flex-none w-20">
                {el.nickname}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
