import { CommentProps, ReviewComments } from '../../types/mainPageTypes';
import { FiSend } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import SubComment from './SubComment';
import EditComment from './EditComment';

export interface count {
  count: number;
}

export default function Comment({ comments }: CommentProps) {
  const [moreComment, setMoreComment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [isEditSub, setIsEditSub] = useState(false);

  const onEnterPress = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode === true && editedComment !== undefined) {
      console.log(editedComment);
      //여기에 댓글 api POST 메서드 관련 함수
    }
  };

  const onMoreCommentClicked = () => {
    setMoreComment(!moreComment);
    console.log(moreComment);
  };

  const onCommentEdit = (e: { target: HTMLInputElement }) => {
    setEditedComment(e.target.value);
  };

  return (
    <>
      {comments?.map((el: ReviewComments, idx: number) => (
        <div className="w-full flex my-6 " key={idx}>
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
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                  editedComment={editedComment}
                />
              </div>
            </div>
            {isEditMode ? (
              <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
                <input
                  autoFocus
                  defaultValue={el.comment}
                  className="w-full px-6 pt-3 pb-4 rounded-t-xl border-b border-gray-200"
                  onChange={onCommentEdit}
                  onKeyUp={(comment) =>
                    comment.key === 'Enter' ? onEnterPress() : null
                  }
                ></input>
                <form
                  action=""
                  className="flex flex-row items-center hover:bg-slate-50 peer-invalid:bg-slate-50 "
                >
                  <TextareaAutosize
                    placeholder="댓글 달기..."
                    className="peer w-full resize-none pl-6 mt-2 mb-3 outline-none font-medium bg-transparent"
                  />
                  <button className="w-12 flex-none flex justify-center items-center">
                    <FiSend className="text-3xl text-gray-400 hover:text-blue-500 mr-2 hover:text-blue-500  hover:bg-blue-100 p-1 rounded-lg w-10 h-8 pr-1.5" />
                  </button>
                </form>
              </div>
            ) : (
              <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="px-6 pt-3 pb-4 border-b border-gray-200">
                  {el.comment}
                </div>
                <form
                  action=""
                  className="flex flex-row items-center hover:bg-slate-50 peer-invalid:bg-slate-50 "
                >
                  <TextareaAutosize
                    placeholder="댓글 달기..."
                    className="peer w-full resize-none pl-6 mt-2 mb-3 outline-none font-medium bg-transparent"
                  />
                  <button className="w-12 flex-none flex justify-center items-center">
                    <FiSend className="text-3xl text-gray-400 hover:text-blue-500 mr-2 hover:text-blue-500  hover:bg-blue-100 p-1 rounded-lg w-10 h-8 pr-1.5" />
                  </button>
                </form>
              </div>
            )}
            {moreComment && el.comment.length > 0 ? (
              <SubComment
                isEditSub={isEditSub}
                setIsEditSub={setIsEditSub}
                moreComment={moreComment}
                subComments={el.subComments}
                setMoreComment={setMoreComment}
              />
            ) : (
              <button
                onClick={onMoreCommentClicked}
                className="mt-1.5 text-gray-400 font-medium text-sm px-2 pb-0.5 rounded hover:bg-slate-200 hover:text-gray-500 group"
              >
                <span className="font-bold text-gray-500 pr-0.5 text-base group-hover:text-gray-800">
                  {el.subComments.length}
                </span>
                개의 댓글 더보기
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
