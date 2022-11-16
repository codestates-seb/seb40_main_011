import { useState } from 'react';

const MypageTab = (): JSX.Element => {
  const [data, setData] = useState();
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '상세 리뷰', content: 'detail review' },
    { name: '한줄 리뷰', content: 'snack review' },
    { name: '좋아요', content: 'likes' },
    // { name: '내 질문', content: 'questions' },
    // { name: '내 답글', content: 'answers' },
  ];

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <div className="">
      <div className="flex justify-center p-2 border-b">
        <ul className="flex flex-row justify-between w-[850px]">
          {menuArr.map((ele, index) => {
            return (
              <button
                key={index}
                className={
                  currentTab === index
                    ? 'px-5 bordet-b'
                    : 'px-5 bordet-b hover:bg-soGray-light '
                }
                onClick={() => selectMenuHandler(index)}
              >
                {ele.name}
              </button>
            );
          })}
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center border w-[850px] p-5">
          {menuArr[currentTab].content}
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
