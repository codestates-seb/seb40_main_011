import { setShowModalProps } from '../../types/mainPageTypes';

export default function Confirm({ setShowModal, msg }: setShowModalProps) {
  // 확인 클릭 모달 닫히기
  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-30 flex items-center justify-center w-full h-screen bg-black/30 backdrop-blur-sm justify-content"
    >
      <div className="w-[28rem] z-40 rounded-xl overflow-hidden">
        <div className="px-4 py-12 text-lg font-medium text-center text-gray-600 bg-white dark:bg-DMMainColor dark:text-white">
          <span>{msg}</span>
        </div>
        <button
          onClick={handleClick}
          className="w-full px-4 py-3 font-medium text-white bg-blue-500 hover:bg-blue-400"
        >
          확인
        </button>
      </div>
    </div>
  );
}
