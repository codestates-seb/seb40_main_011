//소분류 셀렉터
//리뷰 작성 페이지에서 사용
//안지은 작성
import '../common.css';
// import React, { useEffect, useRef, useState } from 'react';
import React, { useEffect, useState } from 'react';
// import Option from './Option';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import axios from 'axios';
import useCategorie from '../../store/categorie';

const ProductSelector = () => {
  const [spread, setSpread] = useState(false);
  const { clickName, setClickName } = useCategorie();
  //get으로 받아온 데이터 저장
  const [categorie, setCategorie] = useState([]);

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(!spread);
    console.log(clickName);
  };

  //url 디코딩
  const encoded = encodeURI(clickName);
  //대문자로 변환
  const UpperText = encoded.toUpperCase();

  //카테고리 셀렉터의 clickname 값을 받아와서 그 값을 api 요청할 때 url 로 넣어서 보내기
  useEffect(() => {
    axios
      .get(`http://codetech.nworld.dev/api/products/review-search`, {
        params: { type: UpperText },
      })
      .then((res) => res.data())
      .then((categorie) => {
        setCategorie(categorie.name);
      })
      .catch((err) => console.log(`clickName err =>`, err));
  }, [spread]);

  return (
    <div className="relative flex flex-col w-full">
      <button
        onClick={handleSelect}
        className={`justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 ${
          spread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0'
        }`}
      >
        제품 선택 {spread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {spread && (
        <ul
          // ref={options}
          onClick={handleSelect}
          className="absolute z-10 w-full overflow-hidden bg-white border top-10 rounded-bl-xl rounded-br-xl drop-shadow-md"
        >
          {}
        </ul>
      )}
    </div>
  );
};

export default ProductSelector;

{
  /* <li className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
모니터
</li>
<li className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
키보드
</li>
<li className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
마우스
</li>
<li className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
헤드셋
</li>
<li className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
노트북
</li>
<li className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
기타
</li> */
}

// const ProductSelector = () => {
//   return (
//     <div className="select">
//       <span className="relative z-10 block p-3 border rounded-md bg-slate-400">
//         소분류 선택
//       </span>
//       <ul>
//         <li>더미</li>
//         <li>더미</li>
//         <li>더미</li>
//         <li>더미</li>
//       </ul>
//     </div>
//   );
// };

// export default ProductSelector;
