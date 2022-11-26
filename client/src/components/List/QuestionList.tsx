// [GET]
// 질문 목록, 따로 Detail 없음
import { FaChevronRight } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { fetchQuestionData } from '../../util/apiCollection';
import { QuestionListType } from '../../types/mainPageTypes';
import { AiOutlineCheck } from 'react-icons/ai';

const QuestionList = () => {
  const [questions, setQuestions] = useState<QuestionListType[]>([]);
  const [answerNeed, setAnswerNeed] = useState<QuestionListType[]>([]);

  useEffect(() => {
    const getQuestionData = async () => {
      const { data } = await fetchQuestionData(5, true, false);
      setQuestions(data.cards);
      const secondData = await fetchQuestionData(5, false, false);
      setAnswerNeed(secondData.data.cards);
    };
    getQuestionData();
  }, []);

  return (
    <div className="flex w-full justify-evenly mb-16">
      <div className="flex flex-col p-4 w-1/3">
        <div className="flex justify-between w-full">
          <div className="font-bold text-xl flex text-green-600">
            <AiOutlineCheck className="text-3xl mb-0.5 mr-2" />
            채택이 완료된 질문
          </div>
          <button>
            <FaChevronRight size="30" />
          </button>
        </div>
        <div className="mt-8">
          {questions.map((el, idx) => (
            <div key={idx} className="flex justify-between p-2 ">
              <div className="line-clamp-1 w-3/4">{el.content}</div>
              <div className="w-1/4 flex justify-end">{el.nickname}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col p-4 w-1/3">
        <div className="flex justify-between w-full">
          <div className="font-bold text-xl text-yellow-600">
            🥺&nbsp;&nbsp;&nbsp;답변이 필요한 질문
          </div>
          <button>
            <FaChevronRight size="30" />
          </button>
        </div>
        <div className="mt-8">
          {answerNeed.map((el, idx) => (
            <div key={idx} className="flex justify-between p-2 ">
              <div className="line-clamp-1 w-3/4">{el.content}</div>
              <div className="w-1/4 flex justify-end">{el.nickname}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
