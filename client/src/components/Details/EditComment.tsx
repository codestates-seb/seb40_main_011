import { EditModeProps } from '../../types/mainPageTypes';
import { deleteComment, editComment } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
import { useIsLogin } from '../../store/login';
import { useNavigate } from 'react-router-dom';
const EditComment = ({
  isEditMode,
  setIsEditMode,
  editedComment,
  id,
  userId,
  setComment,
}: EditModeProps) => {
  const { loginId } = useIsLogin();
  const navigate = useNavigate();

  const onEditClick = async (e: any) => {
    if (e.target.innerText === '수정 취소' || e.target.innerText === '수정') {
      setIsEditMode(!isEditMode);
    } else {
      const response = await editComment({ id, content: editedComment });
      switch (response.status) {
        default:
          setIsEditMode(false);
          setComment(editedComment);
          // location.reload();
          break;
        case 401:
          alert('에러');
          break;
        case 412:
          loginRefresh();
          onEditClick(e);
      }
    }
  };

  const onDeleteClick = async () => {
    if (id) {
      const response = await deleteComment(id);
      switch (response.status) {
        default:
          navigate(-1);
          break;
        case 401:
          alert('에러');
          console.error(response.status + ' Error');
          break;
        case 412: {
          loginRefresh();
          onDeleteClick();
        }
      }
    }
  };

  return (
    <>
      {userId === Number(loginId) ? (
        <>
          {isEditMode ? (
            <>
              <button
                onClick={onEditClick}
                className="dark:bg-DMSubColor max-md:p-1 max-md:w-[3rem] max-sm:p-1 max-sm:w-[3rem] text-xs border border-gray-200 dark:border-white/40 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 dark:text-white/80 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
              >
                수정 완료
              </button>
              <button
                onClick={onEditClick}
                className="dark:bg-DMSubColor max-md:p-1 max-md:w-[3rem] max-sm:p-1 max-sm:w-[3rem] text-xs border border-gray-200 dark:border-white/40 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 dark:text-white/80 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
              >
                수정 취소
              </button>
            </>
          ) : (
            <div className="flex">
              <button
                onClick={onEditClick}
                className="dark:bg-DMSubColor max-md:p-1 max-md:w-[3rem] max-sm:p-1 max-sm:w-[3rem] text-xs border border-gray-200 dark:border-white/40 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 dark:text-white/80 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
              >
                수정
              </button>
              <button
                onClick={onDeleteClick}
                className="dark:bg-DMSubColor max-md:p-1 max-md:w-[3rem] max-sm:p-1 max-sm:w-[3rem] text-xs border border-gray-200 dark:border-white/40 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 dark:text-white/80 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
              >
                삭제
              </button>
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default EditComment;
