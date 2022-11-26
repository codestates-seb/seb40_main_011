// [GET]
// 질문 목록, 따로 Detail 없음
import { FaChevronRight } from 'react-icons/fa';

const QuestionList = () => {
  return (
    <div className="flex w-full justify-evenly">
      <div className="flex flex-col items-center border-2 w-1/4">
        <div className="flex justify-between w-full">
          <div className="font-bold text-xl">채택이 완료된 질문</div>
          <button>
            <FaChevronRight size="30" />
          </button>
        </div>
        <div>fetch.map</div>
      </div>
      <div className="flex flex-col items-center border-2 w-1/4">
        <div className="flex justify-between w-full">
          <div className="font-bold text-xl">답변이 필요한 질문</div>
          <button>
            <FaChevronRight size="30" />
          </button>
        </div>
        <div>fetch.map</div>
      </div>
    </div>
  );
};

export default QuestionList;
