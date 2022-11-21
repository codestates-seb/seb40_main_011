import { EditModeProps } from '../../types/mainPageTypes';

const EditComment = ({
  isEditMode,
  setIsEditMode,
  editedComment,
}: EditModeProps) => {
  const onEditClick = () => {
    setIsEditMode(!isEditMode);
    if (isEditMode === true) {
      console.log(editedComment);
      //여기에 댓글 api POST 메서드 관련 함수
    }
  };

  const onDeleteClick = () => {
    console.log('구현중~');
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
