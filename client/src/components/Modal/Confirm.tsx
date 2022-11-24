export default function Confirm() {
  return (
    <div className="fixed inset-0 h-screen w-full z-30 bg-black/10 backdrop-blur-xl flex justify-content justify-center items-center">
      <div className="bg-white z-40 w-40 h-40">
        <span>메시지</span>
        <button>확인</button>
      </div>
    </div>
  );
}
