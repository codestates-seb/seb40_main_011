//새로 작성한 대분류 셀렉터
//리뷰 작성 페이지에서 사용
//안지은 작성

import '../common.css';
import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import useCategories from '../../store/categories';

const CategorySelectors = () => {
  //대분류 셀렉터 클릭 유뮤 저장, 상태에 따라 드롭다운
  //셀렉터에서 클릭한 것 이름 저장
  const {
    clickName,
    beforeClickname,
    setClickName,
    setSelectName,
    mainCategorySpread,
    setMainCategorySpread,
    setProductCategorySpread,
    setCategoriesData,
  } = useCategories();

  //대분류 셀렉터 클릭 이벤트 함수
  const handleSelectClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMainCategorySpread(!mainCategorySpread);

    //대분류 셀렉터와 소분류 셀렉터 동시에 열려 있는 거 안 되게하는 함수
    if (mainCategorySpread === true) {
      setProductCategorySpread(false);
    }
  };

  //대분류 셀렉터에서 카테고리 클릭시 그 버튼의 id를 저장
  const handleButClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent) {
      setClickName(e.currentTarget.textContent); //클릭한 버튼의 id값이 들어옴
      setMainCategorySpread(false);
    }
    //소분류에서 제품을 선택한 후 대분류 선택을 바꾸는 경우,
    //그전에 선택했던 대분류 타입과, 소분류 제품의 이름을 초기화
    if (clickName !== beforeClickname) {
      setCategoriesData([]);
      setSelectName('소분류 선택');
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <button
        id="selectname"
        onClick={handleSelectClick}
        className={`justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 ${
          mainCategorySpread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0'
        }`}
      >
        {clickName}
        {mainCategorySpread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {mainCategorySpread && (
        <div
          onClick={handleSelectClick}
          className="absolute z-30 w-full overflow-hidden bg-white border top-10 rounded-bl-xl rounded-br-xl drop-shadow-md"
        >
          <button
            onClick={handleButClick}
            id="DESKTOP"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Desktop
          </button>
          <button
            onClick={handleButClick}
            id="LAPTOP"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Laptop
          </button>
          <button
            onClick={handleButClick}
            id="MONITOR"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Monitor
          </button>
          <button
            onClick={handleButClick}
            id="KEYBOARD"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Keyboard
          </button>
          <button
            onClick={handleButClick}
            id="MOUSE"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Mouse
          </button>
          <button
            onClick={handleButClick}
            id="ETC"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Etc
          </button>
        </div>
      )}
    </div>
  );
};

export default CategorySelectors;
