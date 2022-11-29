import XsRoundedButton from '../Buttons/XsRoundedButton';
import { BodyTopProps } from '../../types/mainPageTypes';
import { useIsLogin } from '../../store/login';
import { deleteQuestion, deleteAnswer } from '../../util/apiCollection';
import { useState } from 'react';
import EditQuestion from '../Modal/EditQuestion';
import WriteAnswer from '../Modal/WriteAnswer';
import moment from 'moment';
import { format } from 'timeago.js';
import Confirm from '../Modal/Confirm';

export default function BodyTop({
  nickname,
  createdAt,
  writerId,
  questionId,
  answerId,
  content,
  questionContent,
  adoptedId,
  editable,
}: BodyTopProps) {
  const { loginId } = useIsLogin();

  // 질문수정 모달
  const [showModal, setShowModal] = useState(false);

  // 알림 모달
  const [showAlert, setShowAlert] = useState(false);
  const [modalMsg, setModalMsg] = useState(
    '답변달린 질문은 수정할 수 없습니다.'
  );

  // // 질문,답변 삭제하기
  const handleDelete = async () => {
    if (questionId !== undefined) {
      const Result = await deleteQuestion(questionId);
      switch (Result.status) {
        case 204:
          location.reload();
          break;
        case 401:
          alert('에러');
          console.error(Result.status + ' Error');
          break;
        default:
      }
    }
    if (answerId !== undefined) {
      const Result = await deleteAnswer(answerId);
      switch (Result.status) {
        case 204:
          location.reload();
          break;
        case 401:
          alert('에러');
          console.error(Result.status + ' Error');
          break;
        default:
      }
    }
  };

  return (
    <div className="flex text-sm justify-between mb-2 items-center pr-2">
      {showModal && !questionContent && content && (
        <EditQuestion
          setShowModal={setShowModal}
          questionId={questionId}
          content={content}
        />
      )}
      {showModal && questionContent && content && (
        <WriteAnswer
          setShowModal={setShowModal}
          content={content}
          answerId={answerId}
          questionContent={questionContent}
        />
      )}
      {showAlert && <Confirm setShowModal={setShowAlert} msg={modalMsg} />}
      <span>
        <span className="font-bold text-gray-600">{nickname}</span>
        <span className="before:content-['•'] before:mr-1.5 before:ml-1.5 text-gray-500/60 before:text-gray-300 font-medium tracking-tight">
          {moment(createdAt).format('MM월 DD일')}
        </span>
        <span className="before:content-['•'] before:mr-1.5 before:ml-1.5 text-gray-500/60 before:text-gray-300 font-medium tracking-tight">
          {format(createdAt)}
        </span>
      </span>
      {loginId == writerId && adoptedId === undefined && (
        <div className="flex items-center">
          <button
            onClick={() => {
              // if (editable || editable !== undefined) {
              if (!editable && questionId !== undefined) {
                setModalMsg('답변달린 질문은 수정할 수 없습니다.');
                return setShowAlert(true);
              }
              return setShowModal(true);
            }}
          >
            <XsRoundedButton name={'수정'} />
          </button>
          <div className="h-3 border-l border border-gray-200 inline-block mx-1.5" />
          <button
            onClick={() => {
              if (!editable && questionId !== undefined) {
                setModalMsg('답변달린 질문은 삭제할 수 없습니다.');
                return setShowAlert(true);
              }
              return handleDelete();
            }}
          >
            <XsRoundedButton name={'삭제'} />
          </button>
        </div>
      )}
    </div>
  );
}
