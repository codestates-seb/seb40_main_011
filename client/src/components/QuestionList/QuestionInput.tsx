import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import { postQuestion } from '../../util/apiCollection';
import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
import Confirm from '../Modal/Confirm';

export interface QuestionInputProps {
  placeholder: string;
  button: string;
}

QuestionInput.defaultProps = {
  placeholder: 'Enter your question...',
  button: '질문하기',
};

export default function QuestionInput({
  placeholder,
  button,
}: QuestionInputProps) {
  const [question, setQuestion] = useState('');
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  // 로그인 상태여부 체크
  const { isLogin } = useIsLogin();
  const navigate = useNavigate();

  // 질문하기
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.length === 0) {
      setShowModal(true);
      return;
    }
    if (!isLogin) {
      navigate('/login');
    }
    const content = question.trim();
    const Result = await postQuestion({ content });
    switch (Result.status) {
      case 201:
        setQuestion('');
        console.log('Success');
        location.reload();
        break;
      case 401:
        alert('에러');
        console.log('...');
        console.error(Result.status + ' Error');
        break;
      default:
    }
  };

  // input 빈내용 모달
  const [showModal, setShowModal] = useState(false);
  const msg = '이런? 내용이 없네요 :(';

  return (
    <>
      {showModal && <Confirm setShowModal={setShowModal} msg={msg} />}
      <div className="flex justify-center bg-white border-b border-gray-200">
        <form className="py-10 w-[48rem] px-4">
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            className={`w-full outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
              question.length !== 0 && `text-gray-700`
            }`}
            placeholder={placeholder}
            onChange={handleTextarea}
            value={question}
            autoFocus
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">
              현재 글자수 {question.length} / 최대 글자수 100자
            </span>
            <button
              type="submit"
              className="font-medium text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400"
              onClick={handleSubmit}
            >
              {button}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
