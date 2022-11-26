//소분류 셀렉터
//리뷰 작성 페이지에서 사용
//안지은 작성
import '../common.css';
import React, { useEffect, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import axios from 'axios';
import useCategorie from '../../store/categorie';

const ProductSelector = () => {
  const [spread, setSpread] = useState(false);
  const { clickName, setClickName } = useCategorie();
  //get으로 받아온 데이터 저장
  const [categorie, setCategorie] = useState<string[] | null>(null);
  //소분류 셀렉터에서 클릭한 버튼의 이름을 저장
  const [selectName, setSelectName] = useState('제품 선택');

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(!spread);
    // console.log(clickName);
  };

  //url 디코딩
  const encoded = encodeURI(clickName);
  //대문자로 변환
  const upperText = encoded.toUpperCase();

  // //소분류 셀렉터 클릭시 대분류에서 선택한 text 값과 일치하는 type의 data list 를 가져옴
  // const handleSelectClick = async (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   setSpread(!spread);
  //   await axios
  //     .get(`/api/products/review-search`, {
  //       params: { type: upperText },
  //     })
  //     .then((res) => {
  //       console.log(`res.data`, res.data);
  //       setCategorie(res.data);
  //       console.log(`categorie`, categorie);
  //     })
  //     .catch(function (error) {
  //       if (error.response) {
  //         // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
  //         console.log(`error.response.data`, error.response.data);
  //         console.log(`error.response.status`, error.response.status);
  //         console.log(`error.response.headers`, error.response.headers);
  //       } else if (error.request) {
  //         // 요청이 이루어 졌으나 응답을 받지 못했습니다.
  //         // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
  //         // Node.js의 http.ClientRequest 인스턴스입니다.
  //         console.log(`error.request`, error.request);
  //       } else {
  //         // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
  //         console.log('Error', error.message);
  //       }
  //       console.log(`error.config`, error.config);
  //     });
  // };

  //소분류 셀렉터 클릭시 대분류에서 선택한 text 값과 일치하는 type의 data list 를 가져옴
  const handleSelectClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(!spread);
    await axios
      .get(`/api/products/review-search`, {
        params: { type: upperText },
      })
      .then((res) => {
        console.log(`res.data`, res.data);
        setCategorie(res.data);
        console.log(`categorie`, categorie);
      })
      .catch(function (error) {
        if (error.response) {
          // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
          console.log(`error.response.data`, error.response.data);
          console.log(`error.response.status`, error.response.status);
          console.log(`error.response.headers`, error.response.headers);
        } else if (error.request) {
          // 요청이 이루어 졌으나 응답을 받지 못했습니다.
          // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
          // Node.js의 http.ClientRequest 인스턴스입니다.
          console.log(`error.request`, error.request);
        } else {
          // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
          console.log('Error', error.message);
        }
        console.log(`error.config`, error.config);
      });
  };

  //소분류 셀렉터에서 카테고리 클릭시 그 버튼의 id를 저장
  const handleButClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.currentTarget.textContent) {
      setSelectName(e.currentTarget.textContent); //클릭한 버튼의 id값이 들어옴
      setSpread(!spread);
    }
    console.log(`e.currentTarget.textContent=>>`, e.currentTarget.textContent);
  };

  console.log(categorie);

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
                  // id={product.name}
                  onClick={handleButClick}
                  className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                >
                  {product}
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
