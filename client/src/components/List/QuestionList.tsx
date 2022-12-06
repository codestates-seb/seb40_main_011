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
    <div className="bg-white dark:bg-DMSubColor dark:text-gray-300 transition-all">
      <div className="mx-auto w-full lg:w-[64rem] py-8 flex md:flex-row flex-col">
        <div className="flex flex-col m-4 md:w-1/2">
          <div
            role="button"
            onClick={handleOnClick}
            className="flex items-center justify-between w-full px-6 py-5 bg-zinc-100 rounded-2xl md:px-8 group hover:bg-yellow-500 dark:bg-DMMainColor dark:hover:bg-yellow-500"
          >
            <div className="text-xl font-bold text-orange-700 group-hover:text-gray-800 dark:group-hover:text-gray-700">
              답변이 필요한 질문
            </div>
            <div className="flex items-center font-medium text-gray-400 group-hover:text-yellow-900 dark:group-hover:text-yellow-800">
              <span className="hidden mr-2 md:inline-block">자세히 보기</span>
              <BsArrowRight className="text-2xl" />
            </div>
          </div>
          <div className="my-4">
            {answerNeed.map((el, idx) => (
              <div key={idx} className="flex justify-between p-2 ">
                <span className="break-all line-clamp-1 grow">
                  {el.content}
                </span>
                <span className="flex-none hidden w-20 tracking-tight text-right md:line-clamp-1 text-gray-500/70">
                  {el.nickname}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col m-4 md:w-1/2">
          <div
            role="button"
            onClick={handleOnClick}
            className="flex items-center justify-between px-6 py-5 bg-zinc-100 rounded-2xl md:px-8 group hover:bg-green-500 dark:bg-DMMainColor dark:hover:bg-green-500"
          >
            <div className="text-xl font-bold text-green-600 group-hover:text-gray-800 dark:group-hover:text-gray-700">
              채택이 완료된 질문
            </div>
            <div className="flex items-center font-medium text-gray-400 group-hover:text-green-900 dark:group-hover:text-green-700">
              <span className="hidden mr-2 md:inline-block">자세히 보기</span>
              <BsArrowRight className="text-2xl" />
            </div>
          </div>
          <div className="my-4">
            {questions.map((el, idx) => (
              <div key={idx} className="flex p-2 md:justify-between ">
                <span className="break-all line-clamp-1 grow">
                  {el.content}
                </span>
                <span className="flex-none hidden w-20 tracking-tight text-right md:line-clamp-1 text-gray-500/70">
                  {el.nickname}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
