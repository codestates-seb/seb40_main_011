// Snack Review List fetching & boxing comp
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const ReviewTabPagenation = ({ currentPage, totalPages, onClickPage }: any) => {
  return (
    <ul className="flex flex-row items-center justify-center w-full px-4 mt-3 space-x-1 mb-7">
      <li
        className={`
              ${1 === currentPage && 'invisible'}`}
      >
        <button
          onClick={() => onClickPage('Prev')}
          className="flex items-center justify-center"
        >
          {' '}
          <GoChevronLeft className="w-5 h-5" /> 이전
        </button>
      </li>
      {Array.from({ length: +totalPages }).map((el, i) => {
        return (
          <li
            key={i}
            className={` px-2 py-1 rounded-lg flex justify-center items-center ${
              +currentPage === i + 1
                ? 'bg-slate-400 text-white hover:bg-slate-500'
                : ''
            }`}
          >
            <button onClick={() => onClickPage(i + 1)}>{i + 1}</button>
          </li>
        );
      })}
      <li
        className={`
              ${totalPages === currentPage && 'invisible'}`}
      >
        <button
          onClick={() => onClickPage('Next')}
          className="flex items-center justify-center"
        >
          {' '}
          다음 <GoChevronRight className="w-5 h-5" />
        </button>
      </li>
    </ul>
  );
};

export default ReviewTabPagenation;
