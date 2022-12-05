import { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useIsLogin } from '../../store/login';
import { loginRefresh } from '../../util/loginRefresh';
import { useNavigate, useParams } from 'react-router-dom';
import { postComment } from '../../util/apiCollection';

export const CommentInput = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { isLogin } = useIsLogin();
  const [comment, setComment] = useState('');
  const handleTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onCommentClick = async () => {
    if (!isLogin) {
      navigate('/login');
    }
    if (comment !== undefined && comment !== '' && comment.length <= 100) {
      const response = await postComment({
        reviewId: params.id,
        parentId: 0,
        content: comment,
      });

      switch (response.status) {
        default:
          location.reload();
          break;
        case 401:
          alert('에러');
          console.error(response.status + ' Error');
          break;
        case 412: {
          loginRefresh();
          onCommentClick();
        }
      }
    }
  };

  const HandleValidation = () => {
    if (comment.length > 100) {
      return (
        <div className="text-red-500 font-medium text-sm mx-4 bg-red-100 rounded px-2 pt-2 pb-2 mb-3">
          최대 글자수를 초과했습니다.
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <div className="w-full flex justify-center m-4">
        <div className="mb-4 w-full">
          <HandleValidation />
          <TextareaAutosize
            minRows={3}
            maxRows={6}
            className={`p-4 focus:ring-sky-500 ring-1 ring-gray-200 rounded-xl w-full outline-none text-gray-300 font-medium resize-none focus:text-gray-700 text-lg ${
              comment.length !== 0 && `text-gray-700`
            }`}
            placeholder={
              isLogin ? '댓글 달기...' : '댓글을 달기위해 로그인하세요...'
            }
            onChange={handleTextarea}
            value={comment}
          />
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-400 text-sm">
              현재 글자수 {comment.length} / 최대 글자수 100자
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

export default CommentInput;
