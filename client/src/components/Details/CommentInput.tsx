import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export default function CommentInput() {
  const [question, setQuestion] = useState('');
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };
  console.log(question);
  return (
    <>
      <div className="w-full bg-white flex justify-center border-t border-gray-200 m-4">
        <div className="py-10 w-full">
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            className={`focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:border focus:rounded-md w-full outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
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
              댓글달기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
