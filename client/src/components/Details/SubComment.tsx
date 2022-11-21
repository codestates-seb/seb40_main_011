import { SubCommentProps } from '../../types/mainPageTypes';
import { SubComments } from '../../types/mainPageTypes';
import EditComment from './EditComment';
import { useState } from 'react';

const SubComment = ({
  subComments,
  setMoreComment,
  moreComment,
  isEditSub,
  setIsEditSub,
}: SubCommentProps) => {
  const [editedComment, setEditedComment] = useState('');
  const onEnterPress = () => {
    setIsEditSub(!isEditSub);
    if (isEditSub === true && editedComment !== undefined) {
      console.log(editedComment);
      //여기에 댓글 api POST 메서드 관련 함수
    }
  };

  const onSubCommentHide = () => {
    setMoreComment(!moreComment);
    console.log(moreComment);
  };

  const onCommentEdit = (e: { target: HTMLInputElement }) => {
    setEditedComment(e.target.value);
  };

  return (
    <>
      {subComments?.map((el: SubComments, idx: number) => (
        <div className="w-full flex my-6 mr-16" key={idx}>
          <img
            src={el.profileImg}
            alt=""
            className="w-12 h-12 rounded-full mx-2 ring ring-slate-200"
          />
          <div className="w-2/3">
            <div className="flex justify-between mb-1.5 items-center">
              <span>
                <span className="font-semibold">{el.nickname}</span>
                <span className="text-sm font-medium before:content-['•'] before:mr-1.5 before:ml-1.5 before:text-gray-400 font-medium text-gray-400">
                  {el.createdAt}
                </span>
              </span>
              <div>
                <EditComment
                  isEditMode={isEditSub}
                  setIsEditMode={setIsEditSub}
                  editedComment={editedComment}
                />
              </div>
            </div>
            {isEditSub ? (
              <input
                autoFocus
                defaultValue={el.subComment}
                className="w-full px-6 pt-3 pb-4 rounded-xl border-b border-gray-200"
                onChange={onCommentEdit}
                onKeyUp={(comment) =>
                  comment.key === 'Enter' ? onEnterPress() : null
                }
              ></input>
            ) : (
              <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="px-6 pt-3 pb-4 border-b border-gray-200">
                  {el.subComment}
                </div>
              </div>
            )}

            <button
              onClick={onSubCommentHide}
              className="mt-1.5 text-gray-400 font-medium text-sm px-2 pb-0.5 rounded hover:bg-slate-200 hover:text-gray-500 group"
            >
              <div className="pr-0.5 text-base group-hover:text-gray-800">
                접기
              </div>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SubComment;
