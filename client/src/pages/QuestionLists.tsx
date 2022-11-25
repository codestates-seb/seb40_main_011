import QuestionInput from '../components/QuestionList/QuestionInput';
import Question from '../components/QuestionList/Question';
import Answer from '../components/QuestionList/Answer';
import PendingAnswer from '../components/QuestionList/PendingAnswer';
import PendingQuestion from '../components/QuestionList/PendingQuestion';
import SelectBox from '../components/SelectBox/SelectBox';
// import Confirm from '../components/Modal/Confirm';

export default function QuestionLists() {
  return (
    <>
      <QuestionInput />
      <div className="bg-slate-100 flex justify-center pb-20">
        <div className="w-[48rem] flex flex-col items-center">
          <div className="w-full flex justify-between pt-10 pb-4">
            <div className="flex items-center text-2xl text-slate-600">
              <span className="mr-2 font-bold">Somebody help me!</span>
              <div className="w-8 h-8 flex justify-center items-center pb-1 pr-0.5 rounded-full bg-gray-600 font-medium mt-1 text-white">
                4
              </div>
            </div>
            <SelectBox />
          </div>
          <PendingQuestion />
          <PendingAnswer />
          <Question />
          <button className="w-4/5 hover:bg-slate-200 rounded h-10 text-gray-400 hover:text-gray-600 pb-0.5 font-medium">
            더보기
          </button>
          <div className="w-full flex justify-between pt-10 pb-4">
            <div className="flex items-center text-2xl text-slate-600">
              <span className="mr-2 font-bold">Mission complete!</span>
              <div className="w-8 h-8 flex justify-center items-center pb-1 pr-0.5 rounded-full bg-gray-600 font-medium mt-1 text-white">
                4
              </div>
            </div>
            <SelectBox />
          </div>
          <Question />
          <Answer />
          <Answer />
          <Answer />
          <button className="w-4/5 hover:bg-slate-200 rounded h-10 text-gray-400 hover:text-gray-600 pb-0.5 font-medium">
            더 보기
          </button>
        </div>
      </div>
    </>
  );
}
