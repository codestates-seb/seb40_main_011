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
import ReviewTabPagenation from './ReviewTabPagenation';

// interface ReviewData {
//   content:
// totalPages: number;
// }

const MypageTab = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentReview, setCurrentReview] = useState('reviews');
  const [reviewListData, setReviewListData] = useState();
  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

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
    const params = `?page=${currentPage}&size=5&sort=createdAt`;
    switch (currentReview) {
      case 'reviews':
        {
          const reviewData = await getUserReview(currentReview, params);
          setReviewListData(reviewData?.data.reviews);
        }
        break;
      case 'snack-reviews':
        {
          const snackReviewData = await getUserReview(currentReview, params);
          setReviewListData(snackReviewData.data.snackReviews.content);
          setTotalPages(snackReviewData.data.snackReviews.totalPages);
          console.log(reviewListData);
          console.log(totalPages);
        }
        break;
      case 'recommends': {
        const recommendData = await getUserReview(currentReview, params);
        setReviewListData(recommendData?.data.reviews);
        break;
      }
      case 'questions':
        {
          const questinData = await getUserReview(currentReview, params);
          setReviewListData(questinData?.data.questions);
        }
        break;
      case 'answers':
        {
          const answerData = await getUserReview(currentReview, params);
          setReviewListData(answerData?.data.questions);
        }
        break;
      default:
    }
  };

  const onClickPage = (target: any) => {
    if (target === 'Prev') {
      setCurrentPage(currentPage - 1);
    } else if (target === 'Next') {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(+target);
    }
    selectMenuHandler(currentTab);
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
      {totalPages ? (
        <div className="flex flex-col items-center justify-center ">
          <ReviewTabPagenation
            currentPage={currentPage}
            totalPages={totalPages}
            onClickPage={onClickPage}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MypageTab;
