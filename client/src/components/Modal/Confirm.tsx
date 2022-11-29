import { setShowModalProps } from '../../types/mainPageTypes';

export default function Confirm({ setShowModal, msg }: setShowModalProps) {
  // 확인 클릭 모달 닫히기
  const handleClick = () => {
    setShowModal(false);
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 h-screen w-full z-30 bg-black/30 backdrop-blur-sm flex justify-content justify-center items-center"
    >
      <div className="w-[28rem] z-40 rounded-xl overflow-hidden">
        <div className="bg-white px-4 py-12 font-medium text-center text-lg text-gray-600">
          <span>{msg}</span>
        </div>
        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-400 px-4 py-3 w-full text-white font-medium"
        >
          확인
        </button>
      </div>
    </div>
  );
}
