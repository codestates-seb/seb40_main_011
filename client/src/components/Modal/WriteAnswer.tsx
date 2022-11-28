import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { WriteAnswerProps } from '../../types/mainPageTypes';
import { postAnswer, patchAnswer } from '../../util/apiCollection';

export default function WriteAnswer({
  setShowModal,
  content,
  questionId,
  answerId,
  questionContent,
}: WriteAnswerProps) {
  // 모달 닫히기 state
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState(content);

  // 취소 클릭 모달 닫히기
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (answerId !== undefined) {
      setQuestion(e.target.value);
    } else {
      setAnswer(e.target.value);
    }
  };

  // esc 모달 닫히기
  const handleEsc = (e: React.KeyboardEvent) => {
    if (e.code === 'Escape') {
      setShowModal(false);
    }
  };

  // // 답변하기
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (questionId !== undefined) {
      const content = answer.trim();
      const Result = await postAnswer({ questionId, content });
      switch (Result.status) {
        case 201:
          setShowModal(false);
          setAnswer('');
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
    }
    if (answerId !== undefined) {
      const content = question.trim();
      const Result = await patchAnswer(answerId, content);
      switch (Result.status) {
        case 200:
          setShowModal(false);
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
    }
  };

  return (
    <div className="fixed inset-0 h-screen w-full z-30 bg-black/30 backdrop-blur-sm flex justify-content justify-center items-center">
      <div className="w-[40rem] z-40 rounded-xl overflow-hidden">
        <div className="px-8 py-4 bg-slate-100 border-b border-slate-200 text-gray-600 font-medium">
          {questionContent ? questionContent : content}
        </div>
        <div className="bg-white pt-4 pb-6 px-4">
          <form className="w-full" onSubmit={handleSubmit}>
            <TextareaAutosize
              minRows={3}
              maxRows={6}
              className={`w-full px-4 outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg `}
              placeholder="내용을 입력해주세요"
              autoFocus
              value={answerId !== undefined ? question : answer}
              onChange={handleTextarea}
              onKeyDown={handleEsc}
            />
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400 pl-4">
                현재 글자수 {answer.length} / 최대 글자수 100자
              </span>
              <div>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="font-medium mx-1 text-gray-400 hover:text-gray-500 pb-0.5 px-5 h-10 rounded-full hover:bg-gray-200"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="font-medium mx-1 text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400"
                >
                  완료
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
