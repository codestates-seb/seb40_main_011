import { useState, useEffect, SetStateAction } from 'react';
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
    <div className="">
      <div className="flex justify-center border-b">
        <ul className="flex flex-row justify-between w-[850px] mt-3">
          {menuArr.map((ele, index) => {
            return (
              <button
                key={index}
                className={
                  currentTab === index
                    ? ' border-b border-black flex justify-evenly items-center w-1/4 pb-3 px-8'
                    : 'bordet-b hover:bg-slate-100 flex justify-evenly items-center w-1/4 pb-3 px-8'
                }
                onClick={() => selectMenuHandler(index)}
              >
                {ele.icon}
                {ele.name}
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
