//리뷰 작성 페이지
//안지은 작성

import React, { ChangeEvent, useCallback, useState } from 'react';
import '../components/common.css';
import CategorieSelector from '../components/Selectors/CategorieSelector';
import ProductSelector from '../components/Selectors/ProductSelector';
import TextEditor from '../components/ToastUI/TextEditor';
import useReview from '../store/review';
import AddProduct from '../components/Modal/AddProduct';

const WriteReview = () => {
  const { title, setTitle } = useReview();
  const [isModal, setIsModal] = useState(false);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const titleUpdate = e.target.value;
    setTitle(titleUpdate);
  }, []);

  const onClickModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-slate-300 max-md:pt-0">
      <div className="bg-white w-[1280px] pb-14 px-10">
        {isModal == false ? null : (
          <AddProduct isModal={isModal} setIsModal={setIsModal} />
        )}
        <div className="m-auto mt-8">
          <div className="flex justify-between mb-3">
            <div className="flex w-2/3 ">
              <div className="inline-flex w-1/3 ">
                <CategorieSelector />
              </div>
              <div className="inline-flex w-1/3 ml-5 ">
                <ProductSelector />
              </div>
            </div>
            <button
              className="w-1/6 ml-20 so-button-nomal"
              onClick={onClickModal}
            >
              제품 추가하기
            </button>
          </div>
          <input
            type="text"
            id="title"
            value={title}
            onChange={onChangeTitle}
            placeholder="제목을 입력하세요"
            className="mb-5 border signup-input border-slate-300"
          />
          <div>
            <TextEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
