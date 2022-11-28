import { useEffect, useState } from 'react';

//advanced
export default function ScrollTop() {
  const [showButton, setShowButton] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
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
        <button
          className="group/button hover:bg-emerald-500 fixed bottom-6 right-8 w-16 h-16 bg-gray-100 flex flex-row justify-center items-center rounded-full shadow-2xl ring ring-inset ring-slate-200 hover:ring-0"
          onClick={scrollToTop}
        >
          <span className="material-icons text-3xl text-slate-400 group-hover/button:text-white">
            arrow_upward
          </span>
        </button>
      )}
    </>
  );
}
