import { useState, useEffect } from 'react';
import {
  BsFileRichtext,
  BsChatSquareText,
  BsHeart,
  BsPatchQuestion,
  BsLightbulb,
  BsChevronDoubleLeft,
} from 'react-icons/bs';
import { domainToASCII } from 'url';
import { getUserReview } from '../../util/apiCollection';

const MypageTab = (): JSX.Element => {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentReview, setCurrentReview] = useState('reviews');
  const [detailReviewList, setDetailReviewList] = useState();

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

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
    setCurrentReview(menuArr[index].content);
    const params = {
      page: 1,
      size: 5,
      sort: 'creaedAt',
    };
    const getDetailReviewList = async () => {
      const { data } = await getUserReview(menuArr[index].content, params);
      setDetailReviewList(data);
      // console.log(detailReviewList);
    };
    getDetailReviewList();
    console.log(detailReviewList);
    console.log(currentReview);
    // console.log(menuArr[currentTab].content);
    // if (detailReviewList) {
    //   console.log(detailReviewList[menuArr[currentTab].content]);
    // }
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
        <div className="flex flex-col justify-center w-[850px] p-5">
          {detailReviewList
            ? detailReviewList[menuArr[currentTab].content]
            : ''}
          <div className="mb-2 text-lg">tilte</div>
          <div className="flex text-sm">
            <div className="px-3 py-0.5 bg-slate-300 rounded-lg">Category</div>
            <div className="px-3 py-0.5">Brand</div>
            <div className="px-3 py-0.5">Product</div>
            <div className="ml-auto text-slate-600">date</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageTab;
