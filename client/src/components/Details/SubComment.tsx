import { SubCommentProps } from '../../types/mainPageTypes';
import EditComment from './EditComment';
import { useState } from 'react';
import { loginRefresh } from '../../util/loginRefresh';
import { editComment } from '../../util/apiCollection';
import { useIsLogin } from '../../store/login';
import { useNavigate } from 'react-router-dom';

const SubComment = ({ child }: SubCommentProps) => {
  const navigate = useNavigate();
  const [editedComment, setEditedComment] = useState('');
  const [comment, setComment] = useState(child.content);
  const [isEditSub, setIsEditSub] = useState(false);
  const { isLogin } = useIsLogin();
  const onEnterPress = async () => {
    setComment(editedComment);
    setIsEditSub(!isEditSub);
    if (!isLogin) {
      navigate('/login');
    }
    if (isEditSub === true && editedComment !== undefined) {
      if (comment !== '') {
        const response = await editComment({
          id: child?.id,
          content: editedComment,
        });
        switch (response.status) {
          default:
            // location.reload();
            setIsEditSub(false);
            break;
          case 401:
            alert('에러');
            break;
          case 412:
            loginRefresh();
            onEnterPress();
        }
      }
    }
  };

  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

  const onCommentEdit = (e: { target: HTMLInputElement }) => {
    setEditedComment(e.target.value);
  };

  return (
    <>
      {comment !== '작성자가 삭제한 댓글입니다.' ? (
        <div className="w-full flex my-4 mr-16">
          <img
            src={`https://codetech.nworld.dev${child?.userImage}`}
            alt=""
            className="flex-none w-12 h-12 rounded-2xl mr-2 ring ring-zinc-100 dark:ring-slate-600"
          />
          <div className="grow">
            <div className="flex justify-between mb-1.5 items-center">
              <span>
                <span className="font-semibold">{child.writer}</span>
                <span className="text-sm font-medium before:content-['•'] before:mr-1.5 before:ml-1.5 before:text-gray-400 text-gray-400">
                  {getParsedDate(child.createdAt)}
                </span>
              </span>
              <div>
                <EditComment
                  isEditMode={isEditSub}
                  setIsEditMode={setIsEditSub}
                  editedComment={editedComment}
                  id={child.id}
                  setComment={setComment}
                  userId={child.userId}
                />
              </div>
            </div>
            {isEditSub ? (
              <input
                autoFocus
                defaultValue={comment}
                className="dark:bg-DMSubColor w-full px-6 pt-3 pb-4 rounded-xl border-b border-gray-200"
                onChange={onCommentEdit}
                onKeyUp={(comment) =>
                  comment.key === 'Enter' ? onEnterPress() : null
                }
              ></input>
            ) : (
              <div className="ring-1 ring-gray-200 dark:ring-white/30 rounded-xl overflow-hidden dark:bg-DMSubColor dark:text-white px-6 pt-3 pb-4 border-b border-gray-200 dark:border-white/30 bg-white text-gray-600 font-medium">
                {comment}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SubComment;
