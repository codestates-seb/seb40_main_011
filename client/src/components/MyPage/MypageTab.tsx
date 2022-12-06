import { useState } from 'react';
import {
  BsHeartFill,
  BsFillPatchQuestionFill,
  BsFillLightbulbFill,
  BsChatSquareTextFill,
  BsFileRichtextFill,
  BsFileRichtext,
  BsChatSquareText,
  BsHeart,
  BsPatchQuestion,
  BsLightbulb,
} from 'react-icons/bs';
import LikeReviewTab from './LikeReviewTab';
import ReviewsTab from './ReviewsTab';
import SnackReviewTab from './SnackReviewTab';
import QuestionsTab from './QuestionsTab';
import AnswersTab from './AnswersTab';

// interface ReviewData {
//   content:
// totalPages: number;
// }

const MypageTab = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);
  const [reviewPage, setReviewPage] = useState(<ReviewsTab />);

  const menuArr = [
    {
      icon: <BsFileRichtext />,
      iconSelect: <BsFileRichtextFill />,
      name: '상세 리뷰',
      content: 'reviews',
      page: <ReviewsTab />,
    },
    {
      icon: <BsChatSquareText />,
      iconSelect: <BsChatSquareTextFill />,
      name: '한줄 리뷰',
      content: 'snack-reviews',
      page: <SnackReviewTab />,
    },
    {
      icon: <BsHeart />,
      iconSelect: <BsHeartFill />,
      name: '좋아요',
      content: 'recommends',
      page: <LikeReviewTab />,
    },
    {
      icon: <BsPatchQuestion />,
      iconSelect: <BsFillPatchQuestionFill />,
      name: '내 질문',
      content: 'questions',
      page: <QuestionsTab />,
    },
    {
      icon: <BsLightbulb />,
      iconSelect: <BsFillLightbulbFill />,
      name: '내 답글',
      content: 'answers',
      page: <AnswersTab />,
    },
  ];

  const selectMenuHandler = async (index: number) => {
    setCurrentTab(index);
    setReviewPage(menuArr[index].page);
  };

  return (
    <div className="bg-white dark:bg-DMThrColor dark:text-white">
      <div className="lg:w-[64rem] mx-auto flex justify-center">
        <ul className="w-full flex md:px-5">
          {menuArr.map((ele, index) => {
            return (
              <button
                key={index}
                className={`h-16 flex justify-evenly items-center w-1/4  px-4 lg:px-8 text-lg font-medium
                  ${
                    currentTab === index
                      ? 'font-medium border-b-2 border-slate-400 dark:border-white hover:dark:bg-DMSubColor/50 bg-slate-200 dark:bg-DMSubColor/50 dark:text-white text-slate-700'
                      : 'border-b-2 hover:bg-slate-300  dark:border-DMSubColor/40 hover:dark:bg-DMSubColor/80 dark:text-white/70 dark:hover:text-white text-slate-500 hover:text-slate-700'
                  }
                `}
                onClick={() => selectMenuHandler(index)}
              >
                <p className="block text-slate-600 dark:text-white text-2xl md:text-xl pt-0.5">
                  {currentTab === index ? ele.iconSelect : ele.icon}
                </p>
                <p className="hidden md:block"> {ele.name}</p>
              </button>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-col items-center justify-center">
        {reviewPage}
      </div>
    </div>
  );
};

export default MypageTab;
