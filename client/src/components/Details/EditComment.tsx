import { EditModeProps } from '../../types/mainPageTypes';
import { deleteComment } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
const EditComment = ({
  isEditMode,
  setIsEditMode,
  editedComment,
  id,
}: EditModeProps) => {
  const onEditClick = () => {
    setIsEditMode(!isEditMode);
    console.log(isEditMode);
    if (isEditMode === true) {
      console.log(editedComment);
      console.log(id);
      //여기에 댓글 api POST 메서드 관련 함수
    }
  };

  const onDeleteClick = async () => {
    if (id) {
      const response = await deleteComment(id);
      console.log(response);
      switch (response.status) {
        case 204:
          location.reload();
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
    } else {
      window.alert('별점을 매겨주세요!');
    }
  };

  return (
    <>
      {isEditMode ? (
        <button
          onClick={onEditClick}
          className="text-xs border border-gray-200 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
        >
          수정 완료
        </button>
      ) : (
        <button
          onClick={onEditClick}
          className="text-xs border border-gray-200 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
        >
          수정
        </button>
      )}
      <button
        onClick={onDeleteClick}
        className="text-xs border border-gray-200 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
      >
        삭제
      </button>
    </>
  );
};

export default EditComment;
