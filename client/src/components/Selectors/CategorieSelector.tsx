//새로 작성한 대분류 셀렉터
//리뷰 작성 페이지에서 사용
//안지은 작성

import '../common.css';
import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import useCategorie from '../../store/categorie';

const CategoriSelectors = () => {
  //대분류 셀렉터 클릭 유뮤 저장, 상태에 따라 드롭다운
  const [spread, setSpread] = useState(false);
  //셀렉터에서 클릭한 것 이름 저장
  const { clickName, setClickName } = useCategorie();
  //   const [clickName, setClickName] = useState('대분류 선택');

  //대분류 셀렉터 클릭 이벤트 함수
  const handleSelectClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(!spread);
  };

  //셀렉터에서 카테고리 클릭시 그 버튼의 id를 저장
  const handleButClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent) {
      setClickName(e.currentTarget.textContent); //클릭한 버튼의 id값이 들어옴
      setSpread(!spread);
    }
    console.log(`e.currentTarget.textContent=>>`, e.currentTarget.textContent);
  };

  return (
    <div className="relative flex flex-col w-full">
      <button
        id="selectname"
        onClick={handleSelectClick}
        className={`justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 ${
          spread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0'
        }`}
      >
        {clickName} {spread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {spread && (
        <div
          onClick={handleSelectClick}
          className="absolute z-10 w-full overflow-hidden bg-white border top-10 rounded-bl-xl rounded-br-xl drop-shadow-md"
        >
          <button
            onClick={handleButClick}
            id="MONITOR"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Monitor
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
            id="KEYBOARD"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Keyboard
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
            id="TABLET"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            Tablet
          </button>
          <button
            onClick={handleButClick}
            id="ETC"
            className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
          >
            etc
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoriSelectors;

{
  /* <div className="absolute z-10 w-full overflow-hidden bg-white border top-10 rounded-bl-xl rounded-br-xl drop-shadow-md">
{productsData.map((name, idx) => {
  return (
    <button
      key={idx}
      onClick={(idx) => handleButClick(idx)}
      className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
    >
      {name.name}
    </button>
  );
})}
</div> */
}

//대분류 데이터
//   const productsData = [
//     // { name: '대분류 선택', type: 'default' },
//     { name: 'Monitor', type: 'MONITOR' },
//     { name: 'Mouse', type: 'MOUSE' },
//     { name: 'Keyboard', type: 'KEYBOARD' },
//     { name: 'Laptop', type: 'LAPTOP' },
//     { name: 'Tablet', type: 'TABLET' },
//     { name: 'ETC', type: 'ETC' },
//   ];

//clickName의 id값이 null이 아니라면 selectName id의 text를 id의 텍스트로 바꾼다
//   useEffect(() => {
//     if (clickName !== '' && clickText !== null) {
//       const name = document.getElementById(clickName);
//       const text = clickText; //클릭한 버튼의 text 값
//       console.log(`innerText =>`, name);

//       const selectName = document.getElementById('selectname');
//       if (name !== null && selectName !== null) {
//         selectName.innerHTML = `${text}`;
//         console.log(`selectName =>`, clickName);
//       }
//     }
//   }, [clickText]);
