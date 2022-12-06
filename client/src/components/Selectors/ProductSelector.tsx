//소분류 셀렉터
//리뷰 작성 페이지에서 사용
import '../common.css';
import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import axios, { AxiosError } from 'axios';
import useCategories from '../../store/categories';
import useReview from '../../store/review';
import '../common.css';
import Confirm from '../Modal/Confirm';

interface SpreadProps {
  productCategorySpread: boolean;
  setProductCategorySpread(state: boolean): void;
}

const ProductSelector = ({
  productCategorySpread,
  setProductCategorySpread,
}: SpreadProps) => {
  //대분류 셀렉터에서 클릭한 값이 저장된
  const {
    clickName,
    selectName,
    setSelectName,
    beforeClickname,
    setBeforeClickname,
    categoriesData,
    setCategoriesData,
  } = useCategories();

  //소분류에서 선택한 제품의 productId를 저장
  const { setProductId } = useReview();

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setProductCategorySpread(!productCategorySpread);
  };

  //url 디코딩
  const encoded = encodeURI(clickName);
  //대문자로 변환
  const upperText = encoded.toUpperCase();

  //메세지 모달창
  const [showModal, setShowModal] = useState(false);
  const modalMsg: string[] = ['대분류를 선택해주세요 ㅜㅜ'];
  //모달 메세지 저장
  const [selectorMsg, setSelectorMsg] = useState(modalMsg[0]);
  //전의 타입을 저장

  //소분류 셀렉터 클릭시 대분류에서 선택한 text 값과 일치하는 type의 data list 를 가져옴
  const handleSelectClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (clickName === '대분류 선택') {
      setSelectorMsg(modalMsg[0]);
      return setShowModal(true);
    }

    try {
      const res = await axios.get(`/api/products/review-search`, {
        params: { type: upperText },
      });
      setCategoriesData(res.data);
      setBeforeClickname(upperText);
    } catch (error: unknown) {
      handleError(error);
    }
    setProductCategorySpread(!productCategorySpread);
    setBeforeClickname(upperText);
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
      setProductCategorySpread(!productCategorySpread);
    }
    if (e.currentTarget.value) {
      setProductId(e.currentTarget.value); //클릭한 버튼의 제품id값이 들어옴
    }
  };

  return (
    <div className="relative flex flex-col w-full">
      {showModal && <Confirm msg={selectorMsg} setShowModal={setShowModal} />}
      <button
        onClick={handleSelectClick}
        className={`justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 dark:bg-transparent dark:border-DMSubTextColor dark:text-white ${
          productCategorySpread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0 dark:bg-DMThrColor'
        }`}
      >
        <p className={selectName.length > 10 ? `truncate` : undefined}>
          {selectName}
        </p>
        {productCategorySpread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {productCategorySpread && (
        <div
          onClick={handleSelect}
          className={
            categoriesData.length < 6
              ? `selector-div-style dark:bg-DMMainTextColor dark:border-DMSubTextColor dark:text-DMThrTextColor`
              : `selector-div-style h-60 dark:bg-DMMainTextColor dark:border-DMSubTextColor dark:text-DMThrTextColor`
          }
        >
          {categoriesData.length === 0 ? (
            <button className="selector-but-dropdown-style dark:hover:bg-DMThrColor dark:text-white">
              제품이 없습니다
            </button>
          ) : (
            categoriesData.map((product, idx) => {
              return (
                <button
                  key={idx}
                  onClick={handleButClick}
                  value={product.id}
                  className="truncate selector-but-dropdown-style dark:hover:bg-DMThrColor dark:text-white"
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
