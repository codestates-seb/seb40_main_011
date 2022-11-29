//소분류 셀렉터
//리뷰 작성 페이지에서 사용
//안지은 작성
import '../common.css';
import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import axios, { AxiosError } from 'axios';
import useCategorie from '../../store/categorie';
import useReview from '../../store/review';

interface ICategorieData {
  id: number;
  name: string;
}

const ProductSelector = () => {
  const [spread, setSpread] = useState(false);
  const { clickName } = useCategorie();
  //get으로 받아온 데이터 저장
  const [categorie, setCategorie] = useState<ICategorieData[] | null>([]);
  //소분류 셀렉터에서 클릭한 버튼의 이름을 저장
  const [selectName, setSelectName] = useState('제품 선택');
  //소분류에서 선택한 제품의 productId를 저장
  const { setProductId } = useReview();

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(!spread);
  };

  //url 디코딩
  const encoded = encodeURI(clickName);
  //대문자로 변환
  const upperText = encoded.toUpperCase();

  //소분류 셀렉터 클릭시 대분류에서 선택한 text 값과 일치하는 type의 data list 를 가져옴
  const handleSelectClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(!spread);
    try {
      const res = await axios.get(`/api/products/review-search`, {
        params: { type: upperText },
      });
      setCategorie(res.data);
    } catch (error: unknown) {
      handleError(error);
    }
  };

  //에러 핸들러
  const handleError = (Error: any | AxiosError): string => {
    const status = Error.status as string;
    let message: string;
    switch (status) {
      case '404':
        message = '존재하지 않는 페이지입니다';
        break;
      default:
        message = '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요';
        break;
    }
    return message;
  };

  //소분류 셀렉터에서 카테고리 클릭시 그 버튼의 id를 저장
  const handleButClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent) {
      setSelectName(e.currentTarget.textContent); //클릭한 버튼의 name값이 들어옴
      setSpread(!spread);
    }
    if (e.currentTarget.value) {
      setProductId(e.currentTarget.value); //클릭한 버튼의 제품id값이 들어옴
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      <button
        onClick={handleSelectClick}
        className={`justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 ${
          spread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0'
        }`}
      >
        {selectName} {spread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {spread && (
        <div
          onClick={handleSelect}
          className="absolute z-10 w-full overflow-hidden bg-white border top-10 rounded-bl-xl rounded-br-xl drop-shadow-md"
        >
          {categorie === null ? (
            <button className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900">
              제품이 없습니다
            </button>
          ) : (
            categorie.map((product, idx) => {
              return (
                <button
                  key={idx}
                  onClick={handleButClick}
                  value={product.id}
                  className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  {product.name}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSelector;
