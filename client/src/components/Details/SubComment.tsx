import { SubCommentProps } from '../../types/mainPageTypes';
import { ReviewComments } from '../../types/mainPageTypes';
import EditComment from './EditComment';
import { useState } from 'react';

const SubComment = ({
  child,
  setMoreComment,
  moreComment,
  isEditSub,
  setIsEditSub,
}: SubCommentProps) => {
  const [editedComment, setEditedComment] = useState<string | undefined>();
  const [comment, setComment] = useState('');
  const onEnterPress = () => {
    setIsEditSub(!isEditSub);
    if (isEditSub === true && editedComment !== undefined) {
      console.log(editedComment);
      //여기에 댓글 api POST 메서드 관련 함수
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
              defaultValue={child.content}
              className="w-full px-6 pt-3 pb-4 rounded-xl border-b border-gray-200"
              onChange={onCommentEdit}
              onKeyUp={(comment) =>
                comment.key === 'Enter' ? onEnterPress() : null
              }
            ></input>
          ) : (
            <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="px-6 pt-3 pb-4 border-b border-gray-200">
                {child.content}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubComment;
