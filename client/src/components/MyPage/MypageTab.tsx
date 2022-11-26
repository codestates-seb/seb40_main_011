import { useState, useEffect, SetStateAction } from 'react';
import {
  BsFileRichtext,
  BsChatSquareText,
  BsHeart,
  BsPatchQuestion,
  BsLightbulb,
  BsChevronDoubleLeft,
} from 'react-icons/bs';
import { getUserReview } from '../../util/apiCollection';
import LikeReviewTab from './LikeReviewTab';
import ReviewsTab from './ReviewsTab';
import SnackReviewTab from './SnackReviewTab';
import QuestionsTab from './QuestionsTab';
import AnswersTab from './AnswersTab';

const MypageTab = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentReview, setCurrentReview] = useState('reviews');
  const [reviewListData, setReviewListData] = useState();

  const menuArr = [
    {
      icon: <BsFileRichtext />,
      name: '상세 리뷰',
      content: 'reviews',
    },
    {
      icon: <BsChatSquareText />,
      name: '한줄 리뷰',
      content: 'snack-reviews',
    },
    { icon: <BsHeart />, name: '좋아요', content: 'recommends' },
    { icon: <BsPatchQuestion />, name: '내 질문', content: 'questions' },
    { icon: <BsLightbulb />, name: '내 답글', content: 'answers' },
  ];

  const selectMenuHandler = async (index: number) => {
    setCurrentTab(index);
    setCurrentReview(menuArr[index].content);
    const params = {
      page: 1,
      size: 5,
      sort: 'creaedAt',
    };
    switch (currentReview) {
      case 'reviews':
        {
          const reviewData = await getUserReview(currentReview, params);
          setReviewListData(reviewData?.data.reviews);
          console.log(reviewListData);
        }
        break;
      case 'snakc-reviews':
        {
          const snackReviewData = await getUserReview(currentReview, params);
          setReviewListData(snackReviewData?.data.SnackReview);
          console.log(reviewListData);
        }
        break;
      case 'recommends': {
        const recommendData = await getUserReview(currentReview, params);
        setReviewListData(recommendData?.data.reviews);
        console.log(reviewListData);
        break;
      }
      case 'questions':
        {
          const questinData = await getUserReview(currentReview, params);
          setReviewListData(questinData?.data.questions);
          console.log(reviewListData);
        }
        break;
      case 'answers':
        {
          const answerData = await getUserReview(currentReview, params);
          setReviewListData(answerData?.data.answers);
          console.log(reviewListData);
        }
        break;
      default: {
        const defaultData = await getUserReview(currentReview, params);
        setReviewListData(defaultData?.data.reviews);
      }
    }
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
      <div className="flex justify-center">
        {currentReview === 'reviews' ? (
          <ReviewsTab reviewListData={reviewListData} />
        ) : (
          <></>
        )}
        {currentReview === 'snack-reviews' ? (
          <SnackReviewTab reviewListData={reviewListData} />
        ) : (
          <></>
        )}
        {currentReview === 'recommends' ? (
          <LikeReviewTab reviewListData={reviewListData} />
        ) : (
          <></>
        )}
        {currentReview === 'questions' ? (
          <QuestionsTab reviewListData={reviewListData} />
        ) : (
          <></>
        )}
        {currentReview === 'answers' ? (
          <AnswersTab reviewListData={reviewListData} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MypageTab;
