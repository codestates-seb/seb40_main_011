import { useEffect, useState } from 'react';

//advanced
export default function QAScrollTop() {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const scrollToQ = () => {
    window.scrollTo({
      top: 220,
      behavior: 'smooth',
    });
  };
  const scrollToA = () => {
    window.scrollTo({
      top: 790,
      behavior: 'smooth',
    });
  };
  useEffect(() => {
    const ShowButtonClick = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', ShowButtonClick);
    return () => {
      window.removeEventListener('scroll', ShowButtonClick);
    };
  }, []);

  return (
    <>
      {showButton && (
        <>
          <button
            className="group/button hover:bg-emerald-500 bg-emerald-300 fixed bottom-12 right-8 p-4 flex flex-row justify-center items-center rounded-lg shadow-2xl ring ring-inset ring-slate-200 hover:ring-0"
            onClick={scrollToA}
          >
            <span className="material-icons text-[1rem] text-emerald-700 font-bold group-hover/button:text-white">
              답변보기
            </span>
          </button>
          <button
            className="group/button hover:bg-blue-700 bg-blue-200 fixed bottom-12 right-32 p-4 flex flex-row justify-center items-center rounded-lg shadow-2xl ring ring-inset ring-slate-200 hover:ring-0"
            onClick={scrollToQ}
          >
            <span className="material-icons text-[1rem] text-blue-700 font-bold group-hover/button:text-white">
              질문보기
            </span>
          </button>
        </>
      )}
    </>
  );
}
