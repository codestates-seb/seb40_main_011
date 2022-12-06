import { setShowModalProps } from '../../types/mainPageTypes';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteReview } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
const CheckModal = ({ setShowModal, msg, productId }: setShowModalProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClick = async (e: React.MouseEvent) => {
    const response = await deleteReview(Number(params.id));
    switch (response.status) {
      default:
        navigate(`/categories/review/${productId}`);
        setShowModal(false);
        break;
      case 500:
      case 401:
        alert('에러');
        console.log(response);
        break;
      case 412:
        loginRefresh();
        handleClick(e);
    }
    setShowModal(false);
  };

  return (
    <div
      onClick={handleCancel}
      className="fixed inset-0 h-screen w-full z-30 bg-black/30 backdrop-blur-sm flex justify-content justify-center items-center"
    >
      <div className="w-[28rem] z-40 rounded-xl overflow-hidden ">
        <div className="dark:bg-DMSubColor dark:text-white flex flex-col h-[14rem] justify-between p-10 bg-white font-medium text-center text-lg text-gray-600">
          <div className="mt-12">
            <span>{msg}</span>
          </div>
          <div className="flex justify-end w-full mt-14 ml-4">
            <button
              onClick={handleCancel}
              className="rounded bg-zinc-500 hover:bg-zinc-600 w-1/4 text-white font-medium"
            >
              취소
            </button>
            <button
              onClick={handleClick}
              className="ml-4 rounded bg-red-500 hover:bg-red-600 w-1/4 text-white font-medium"
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckModal;
