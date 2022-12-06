import { setShowModalProps } from '../../types/mainPageTypes';
import { useParams, useNavigate } from 'react-router-dom';
import { loginRefresh } from '../../util/loginRefresh';
const UndoAdopt = ({ setShowModal, msg }: setShowModalProps) => {
  const params = useParams();
  const navigate = useNavigate();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleClick = async (e: React.MouseEvent) => {
    console.log('hi');
  };

  return (
    <div
      onClick={handleCancel}
      className="fixed inset-0 h-screen w-full z-30 bg-black/30 backdrop-blur-sm flex justify-content justify-center items-center"
    >
      <div className="w-[28rem] z-40 rounded-xl overflow-hidden ">
        <div className="flex flex-col h-[14rem] justify-between p-10 bg-white font-medium text-center text-lg text-gray-600">
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

export default UndoAdopt;
