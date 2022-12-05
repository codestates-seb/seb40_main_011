import { CommentProps, ReviewComments } from '../../types/mainPageTypes';
import { FiSend } from 'react-icons/fi';
import TextareaAutosize from 'react-textarea-autosize';
import React, { useState } from 'react';
import SubComment from './SubComment';
import EditComment from './EditComment';
import { useIsLogin } from '../../store/login';
import { loginRefresh } from '../../util/loginRefresh';
import { useParams, useNavigate } from 'react-router-dom';
import { postComment, editComment } from '../../util/apiCollection';

export interface count {
  count: number;
}

export default function Comment({ reviewComments }: CommentProps) {
  const navigate = useNavigate();
  const params = useParams();
  const [comment, setComment] = useState(reviewComments?.content);
  const { isLogin } = useIsLogin();
  const [moreComment, setMoreComment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedComment, setEditedComment] = useState('');
  const [subComment, setSubComment] = useState('');

  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

  const onEnterPress = async () => {
    setComment(editedComment);
    setIsEditMode(!isEditMode);
    if (isEditMode === true && editedComment !== undefined) {
      if (comment !== '') {
        const response = await editComment({
          id: reviewComments?.id,
          content: editedComment,
        });
        switch (response.status) {
          default:
            // location.reload();
            setIsEditMode(false);
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

  const onMoreCommentClicked = () => {
    setMoreComment(!moreComment);
  };

  const onCommentEdit = (e: { target: HTMLInputElement }) => {
    setEditedComment(e.target.value);
  };

  const handleSubComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSubComment(e.target.value);
  };

  const onSubCommentClick = async (e: React.MouseEvent, id: string) => {
    e.preventDefault();

    if (!isLogin) {
      navigate('/login');
    }
    if (subComment !== '') {
      const response = await postComment({
        reviewId: params.id,
        parentId: id,
        content: subComment,
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
          onSubCommentClick(e, id);
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

  const SubCommentHide = () => {
    if (!moreComment) {
      return null;
    } else {
      return (
        <button
          onClick={() => setMoreComment(!moreComment)}
          className="w-full text-gray-400 font-medium text-sm px-2 pb-0.5 rounded bg-zinc-50 hover:bg-zinc-200 hover:text-gray-500 group mb-4"
        >
          <div className="pr-0.5 py-3 text-base rounded-2xl group-hover:text-zinc-800">
            접기
          </div>
        </button>
      );
    }
  };

  const HandleSubComment: any = () => {
    if (reviewComments !== undefined) {
      if (
        moreComment &&
        reviewComments.child.filter(
          (el: ReviewComments) => el.content !== '작성자가 삭제한 댓글입니다.'
        ).length > 0
      ) {
        return reviewComments?.child.map((el: ReviewComments, idx) => (
          <div key={idx}>
            <SubComment
              moreComment={moreComment}
              child={el}
              setMoreComment={setMoreComment}
            />
          </div>
        ));
      } else return <PendingMoreButton />;
    }
  };

  return (
    <>
      {reviewComments &&
      reviewComments.content !== '작성자가 삭제한 댓글입니다.' ? (
        <div className="w-full flex my-2">
          <img
            src={`https://codetech.nworld.dev${reviewComments?.userImage}`}
            alt=""
            className="flex-none w-12 h-12 rounded-2xl mx-2 ring ring-zinc-100"
          />
          <div className="grow">
            <div className="flex justify-between mb-1.5 items-center">
              <span className="max-sm:flex flex-col items-start">
                <span className="ml-1 font-semibold">
                  {reviewComments.writer}
                </span>
                <span className="text-sm font-medium before:content-['•'] before:mr-1.5 before:ml-1.5 before:text-gray-400 text-gray-400">
                  {getParsedDate(reviewComments.createdAt)}
                </span>
              </span>
              <div className="flex items-center">
                <EditComment
                  isEditMode={isEditMode}
                  setIsEditMode={setIsEditMode}
                  editedComment={editedComment}
                  id={reviewComments.id}
                  userId={reviewComments.userId}
                  setComment={setComment}
                />
              </div>
            </div>
            <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
              {isEditMode ? (
                <>
                  <input
                    autoFocus
                    defaultValue={comment}
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
                      onClick={(e) =>
                        onSubCommentClick(e, reviewComments.id.toString())
                      }
                      className="w-12 flex-none flex justify-center items-center"
                    >
                      <FiSend className="text-3xl text-gray-400 hover:text-blue-500 mr-2 hover:bg-blue-100 p-1 rounded-lg w-10 h-8 pr-1.5" />
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <div className="px-6 pt-3 pb-4 border-b border-gray-200 bg-white text-gray-600 font-medium">
                    {comment}
                  </div>
                  <form
                    action=""
                    className="w-full flex flex-row items-center hover:bg-slate-50 peer-invalid:bg-slate-50 "
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
                      onClick={(e) =>
                        onSubCommentClick(e, reviewComments.id.toString())
                      }
                      className="w-12 flex-none flex justify-center items-center"
                    >
                      <FiSend className="text-3xl text-gray-400 mr-2 hover:text-blue-500  hover:bg-blue-100 p-1 rounded-lg w-10 h-8 pr-1.5" />
                    </button>
                  </form>
                </>
              )}
            </div>
            <HandleSubComment />
            <SubCommentHide />
          </div>
        </div>
      ) : null}
    </>
  );
}
