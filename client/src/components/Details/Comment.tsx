import {
  CommentProps,
  Review,
  ReviewComments,
} from '../../types/mainPageTypes';
import { FiSend } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useState } from 'react';
import SubComment from './SubComment';
import EditComment from './EditComment';
import { useIsLogin } from '../../store/login';
import { loginRefresh } from '../../util/loginRefresh';
import { useParams } from 'react-router-dom';
import { postComment } from '../../util/apiCollection';

export interface count {
  count: number;
}

export default function Comment({ reviewComments }: CommentProps) {
  const params = useParams();
  const { isLogin } = useIsLogin();
  const [moreComment, setMoreComment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [isEditSub, setIsEditSub] = useState(false);
  const [subComment, setSubComment] = useState('');

  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

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

  const handleSubComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubComment(e.target.value);
  };

  const onSubCommentClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    const parentId = e.currentTarget.id;
    if (subComment !== 'undefined') {
      const response = await postComment({
        reviewId: params.id,
        parentId,
        content: subComment,
      });
      switch (response.status) {
        case 201:
          location.reload();
          break;
        case 401:
          alert('에러');
          console.error(response.status + ' Error');
          break;
        case 412: {
          loginRefresh();
          onSubCommentClick(e);
          break;
        }
      }
    }
  };

  const PendingMoreButton = () => {
    if (
      reviewComments?.child.filter(
        (el: ReviewComments) => el.content !== '작성자가 삭제한 댓글입니다.'
      ).length === 0
    ) {
      return null;
    }
    return (
      <button
        onClick={onMoreCommentClicked}
        className="mt-1.5 text-gray-400 font-medium text-sm px-2 pb-0.5 rounded hover:bg-slate-200 hover:text-gray-500 group"
      >
        <span className="font-bold text-gray-500 pr-0.5 text-base group-hover:text-gray-800">
          {
            reviewComments?.child.filter(
              (el: ReviewComments) =>
                el.content !== '작성자가 삭제한 댓글입니다.'
            ).length
          }
        </span>
        개의 댓글 더보기
      </button>
    );
  };

  return (
    <>
      {reviewComments &&
      reviewComments.content !== '작성자가 삭제한 댓글입니다.' ? (
        <div className="w-full flex my-6 ">
          <img
            src={`https://codetech.nworld.dev${reviewComments?.userImage}`}
            alt=""
            className="w-12 h-12 rounded-full mx-2 ring ring-slate-200"
          />
          <div className="w-2/3">
            <div className="flex justify-between mb-1.5 items-center">
              <span>
                <span className="font-semibold">{reviewComments.writer}</span>
                <span className="text-sm font-medium before:content-['•'] before:mr-1.5 before:ml-1.5 before:text-gray-400 font-medium text-gray-400">
                  {getParsedDate(reviewComments.createdAt)}
                </span>
              </span>
              <div>
                <EditComment
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                  editedComment={editedComment}
                  id={reviewComments.id}
                />
              </div>
            </div>
            <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
              {isEditMode ? (
                <>
                  <input
                    autoFocus
                    defaultValue={reviewComments.content}
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
                      onChange={handleSubComment}
                      placeholder={
                        isLogin
                          ? '댓글 달기... '
                          : '댓글을 달기위해 로그인 하세요'
                      }
                      className="peer w-full resize-none pl-6 mt-2 mb-3 outline-none font-medium bg-transparent"
                    />
                    <button
                      id={reviewComments.id.toString()}
                      onClick={onSubCommentClick}
                      className="w-12 flex-none flex justify-center items-center"
                    >
                      <FiSend className="text-3xl text-gray-400 hover:text-blue-500 mr-2 hover:text-blue-500  hover:bg-blue-100 p-1 rounded-lg w-10 h-8 pr-1.5" />
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="px-6 pt-3 pb-4 border-b border-gray-200">
                    {reviewComments.content}
                  </div>
                  <form
                    action=""
                    className="flex flex-row items-center hover:bg-slate-50 peer-invalid:bg-slate-50 "
                  >
                    <TextareaAutosize
                      onChange={handleSubComment}
                      placeholder={
                        isLogin
                          ? '댓글 달기...'
                          : '댓글을 달기위해 로그인하세요...'
                      }
                      className="peer w-full resize-none pl-6 mt-2 mb-3 outline-none font-medium bg-transparent"
                    />
                    <button
                      id={reviewComments.id.toString()}
                      onClick={onSubCommentClick}
                      className="w-12 flex-none flex justify-center items-center"
                    >
                      <FiSend className="text-3xl text-gray-400 hover:text-blue-500 mr-2 hover:text-blue-500  hover:bg-blue-100 p-1 rounded-lg w-10 h-8 pr-1.5" />
                    </button>
                  </form>
                </>
              )}
            </div>
            {moreComment &&
            reviewComments.child.filter(
              (el: ReviewComments) =>
                el.content !== '작성자가 삭제한 댓글입니다.'
            ).length > 0 ? (
              <SubComment
                isEditSub={isEditSub}
                setIsEditSub={setIsEditSub}
                moreComment={moreComment}
                child={reviewComments.child}
                setMoreComment={setMoreComment}
              />
            ) : (
              <PendingMoreButton />
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
