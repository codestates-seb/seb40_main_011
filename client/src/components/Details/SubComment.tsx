import { SubCommentProps } from '../../types/mainPageTypes';
import { ReviewComments } from '../../types/mainPageTypes';
import EditComment from './EditComment';
import { useState } from 'react';
import { loginRefresh } from '../../util/loginRefresh';
import { editComment } from '../../util/apiCollection';

const SubComment = ({ child }: SubCommentProps) => {
  const [editedComment, setEditedComment] = useState('');
  const [comment, setComment] = useState(child.content);
  const [isEditSub, setIsEditSub] = useState(false);

  const onEnterPress = async () => {
    setComment(editedComment);
    setIsEditSub(!isEditSub);
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
        <div className="w-full flex my-6 mr-16">
          <img
            src={`https://codetech.nworld.dev${child?.userImage}`}
            alt=""
            className="w-12 h-12 rounded-full mx-2 ring ring-slate-200"
          />
          <div className="w-2/3">
            <div className="flex justify-between mb-1.5 items-center">
              <span>
                <span className="font-semibold">{child.writer}</span>
                <span className="text-sm font-medium before:content-['•'] before:mr-1.5 before:ml-1.5 before:text-gray-400 font-medium text-gray-400">
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
                className="w-full px-6 pt-3 pb-4 rounded-xl border-b border-gray-200"
                onChange={onCommentEdit}
                onKeyUp={(comment) =>
                  comment.key === 'Enter' ? onEnterPress() : null
                }
              ></input>
            ) : (
              <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="px-6 pt-3 pb-4 border-b border-gray-200">
                  {comment}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SubComment;
