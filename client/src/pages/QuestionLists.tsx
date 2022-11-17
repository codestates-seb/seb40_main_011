import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Question from '../components/QuestionList/Question';
import Answer from '../components/QuestionList/Answer';
import PendingAnswer from '../components/QuestionList/PendingAnswer';
import PendingQuestion from '../components/QuestionList/PendingQuestion';
import SelectBox from '../components/SelectBox/SelectBox';

export default function QuestionLists() {
  const [question, setQuestion] = useState('');
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };
  return (
    <>
      <div className="bg-white flex justify-center border-b border-gray-200">
        <div className="py-10 w-[48rem]">
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            className={`w-full outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
              question.length !== 0 && `text-gray-700`
            }`}
            placeholder="Enter your question..."
            onChange={handleTextarea}
            value={question}
          />
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm">
              현재 글자수 {question.length} / 최대 글자수 100자
            </span>
            <button className="font-medium text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400">
              질문하기
            </button>
          </div>
        </div>
      </div>
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
          <PendingQuestion />
          <PendingAnswer />
          <Question />
          <button className="w-4/5 hover:bg-slate-200 rounded h-10 text-gray-400 hover:text-gray-600 pb-0.5 font-medium">
            더보기
          </button>
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
          <Answer />
          <Answer />
          <button className="w-4/5 hover:bg-slate-200 rounded h-10 text-gray-400 hover:text-gray-600 pb-0.5 font-medium">
            더 보기
          </button>
        </div>
      </div>
    </>
  );
}
