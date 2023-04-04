//새로 작성한 대분류 셀렉터
//리뷰 작성 페이지에서 사용

import '../common.css';
import React from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import useCategories from '../../store/categories';

interface categoryType {
  id: string;
  title: string;
}

const categoryArr = [
  {
    id: 'DESKTOP',
    title: 'Desktop',
  },
  {
    id: 'LAPTOP',
    title: 'Laptop',
  },
  {
    id: 'MONITOR',
    title: 'Monitor',
  },
  {
    id: 'KEYBOARD',
    title: 'Keyboard',
  },
  {
    id: 'MOUSE',
    title: 'Mouse',
  },
  {
    id: 'ETC',
    title: 'Etc',
  },
];

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
        className={`justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 dark:bg-transparent dark:border-DMSubTextColor dark:text-white ${
          mainCategorySpread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0 dark:bg-DMThrColor'
        }`}
      >
        {clickName}
        {mainCategorySpread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {mainCategorySpread && (
        <div
          onClick={handleSelectClick}
          className="absolute z-30 w-full overflow-hidden bg-white border top-10 rounded-bl-xl rounded-br-xl drop-shadow-md dark:bg-DMMainTextColor dark:border-DMSubTextColor dark:text-DMThrTextColor"
        >
          {categoryArr.map((item: categoryType) => (
            <button
              id={item.id}
              key={item.id}
              onClick={handleButClick}
              className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-DMThrColor dark:text-white"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategorySelectors;
