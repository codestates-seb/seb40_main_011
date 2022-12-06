import { useState } from 'react';
import {
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
      name: '상세 리뷰',
      content: 'reviews',
      page: <ReviewsTab />,
    },
    {
      icon: <BsChatSquareText />,
      name: '한줄 리뷰',
      content: 'snack-reviews',
      page: <SnackReviewTab />,
    },
    {
      icon: <BsHeart />,
      name: '좋아요',
      content: 'recommends',
      page: <LikeReviewTab />,
    },
    {
      icon: <BsPatchQuestion />,
      name: '내 질문',
      content: 'questions',
      page: <QuestionsTab />,
    },
    {
      icon: <BsLightbulb />,
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
      <div className="flex justify-center dark:border-DMThrColor">
        <ul className="flex flex-row justify-between w-full max-w-screen-lg px-10 mx-auto lg:px-24">
          {menuArr.map((ele, index) => {
            return (
              <button
                key={index}
                className={
                  currentTab === index
                    ? 'font-medium border-b-2 border-black flex justify-evenly items-center w-1/4 py-3 px-4 lg:px-8 dark:border-white'
                    : 'border-b-2 hover:bg-slate-200 flex justify-evenly items-center w-1/4 py-3 px-4 lg:px-8 dark:border-DMSubColor'
                }
                onClick={() => selectMenuHandler(index)}
              >
                <p className="block"> {ele.icon}</p>
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
