import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useIsLogin } from '../../store/login';

export const CommentInput = () => {
  const { isLogin } = useIsLogin();
  const [question, setQuestion] = useState('');
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };
  const onCommentClick = () => {
    //api 문서 준비되면 여기에 POST 요청
    console.log(question);
  };

  return (
    <>
      <div className="w-full bg-white flex justify-center  m-4">
        <div className="py-10 w-full">
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            className={`p-4 focus:ring-sky-500 ring-1 ring-gray-200 rounded-xl w-full outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
              question.length !== 0 && `text-gray-700`
            }`}
            placeholder={
              isLogin ? '댓글 달기...' : '댓글을 달기위해 로그인하세요...'
            }
            onChange={handleTextarea}
            value={question}
          />
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-400 text-sm">
              현재 글자수 {question.length} / 최대 글자수 100자
            </span>
            <button
              onClick={onCommentClick}
              className="font-medium text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400"
            >
              댓글달기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const SubCommentInput = () => {
  return;
};
