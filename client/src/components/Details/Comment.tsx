import { CommentProps, ReviewComments } from '../../types/mainPageTypes';
import { FiSend } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import { useState } from 'react';
import SubComment from './SubComment';

export interface count {
  count: number;
}

export default function Comment({ comments }: CommentProps) {
  const [moreComment, setMoreComment] = useState(false);
  const onEditClick = (e: any) => {
    console.log(e.currentTarget);
  };

  const onMoreCommentClicked = () => {
    setMoreComment(!moreComment);
    console.log(moreComment);
  };

  return (
    <>
      {comments?.map((el: ReviewComments, idx: number) => (
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
                <button
                  onClick={onEditClick}
                  className="text-xs border border-gray-200 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
                >
                  수정
                </button>
                <button className="text-xs border border-gray-200 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200">
                  삭제
                </button>
              </div>
            </div>
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
            {moreComment && el.comment.length > 0 ? (
              <SubComment
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
