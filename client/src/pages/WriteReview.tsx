//리뷰 작성 페이지

import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import '../components/common.css';
import CategorySelector from '../components/Selectors/CategorySelector';
import ProductSelector from '../components/Selectors/ProductSelector';
import TextEditor from '../components/ToastUI/TextEditor';
import useReview from '../store/review';
import AddProduct from '../components/Modal/AddProduct';
import ThumbnailModal from '../components/Modal/ThumbnailModal';
import useCategories from '../store/categories';
import { editReviewProps } from '../types/mainPageTypes';
import useDarkMode from '../store/darkMode';
import Darkmode from '../components/Header/DarkMode';

const WriteReview = ({ isEditMode }: editReviewProps) => {
  const { title, setTitle, thumbnailImg } = useReview();
  const {
    mainCategorySpread,
    setMainCategorySpread,
    productCategorySpread,
    setProductCategorySpread,
  } = useCategories();

  //제품 추가 모달 열고 닫기 이벤트
  const [isModal, setIsModal] = useState(false);
  //썸네일 추가 모달 열고 닫기 이벤트
  const [openThum, setOpenThum] = useState(false);

  //타이틀
  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const titleUpdate = e.target.value;
    setTitle(titleUpdate);
  }, []);

  //제품추가 모달 이벤트 함수
  const onClickModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  //썸네일 모달 이벤트 함수
  const onClickThumModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setOpenThum(!openThum);
  };

  const { darkMode, setDarkMode } = useDarkMode();
  useEffect(() => {
    if (!darkMode) {
      Darkmode();
      setDarkMode(!darkMode);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full bg-zinc-100 max-md:pt-0 dark:bg-DMMainColor">
      <div className="bg-white lg:w-[64rem] mx-auto w-full pb-14 px-10 max-sm:px-5 dark:bg-DMSubColor">
        {isModal === false ? null : (
          <AddProduct isModal={isModal} setIsModal={setIsModal} />
        )}
        {openThum === false ? null : (
          <ThumbnailModal openThum={openThum} setOpenThum={setOpenThum} />
        )}
        <div className="m-auto mt-8">
          {isEditMode ? null : (
            <div className="flex justify-between h-12 mb-3 max-sm:block max-sm:mb-[6rem] max-sm:w-full">
              <div className="flex w-4/5 max-sm:w-full max-sm:inline-block max-sm:mb-1">
                <div className="inline-flex w-1/3 max-sm:inline-block max-sm:w-full max-sm:mr-3 max-sm:mb-3">
                  <CategorySelector />
                </div>
                <div className="inline-flex w-1/3 ml-5 max-sm:inline-block max-sm:w-full max-sm:ml-0">
                  {mainCategorySpread && productCategorySpread ? (
                    <ProductSelector
                      productCategorySpread={!productCategorySpread}
                      setProductCategorySpread={setProductCategorySpread}
                    />
                  ) : (
                    <ProductSelector
                      productCategorySpread={productCategorySpread}
                      setProductCategorySpread={setProductCategorySpread}
                    />
                  )}
                </div>
              </div>
              <button
                className="w-1/6 py-1 my-1 text-sm font-bold text-white rounded-md hover:bg-slate-400 bg-slate-300 max-sm:block max-sm:ml-auto max-sm:w-24 max-sm:h-10 dark:bg-DMMainTextColor dark:hover:bg-DMThrColor"
                onClick={onClickModal}
              >
                제품 추가
              </button>
            </div>
          )}

          <div className="flex justify-between h-12 mb-5">
            <input
              type="text"
              id="title"
              value={title}
              onChange={onChangeTitle}
              placeholder="제목을 입력하세요"
              maxLength={50}
              className="w-4/5 mb-1 border signup-input border-slate-300 sm:flex dark:bg-DMInputColor dark:border-DMInputBorder dark:text-white"
            />
            <button
              onClick={onClickThumModal}
              className={
                thumbnailImg.length === 0
                  ? `w-1/6 my-1 py-1 text-sm font-bold text-white rounded-md hover:bg-slate-400 bg-slate-300 max-sm:w-28 max-sm:ml-2 dark:bg-DMMainTextColor dark:hover:bg-DMThrColor`
                  : `w-1/6 my-1 py-1 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500 max-sm:w-28 max-sm:ml-2`
              }
            >
              {thumbnailImg.length === 0 ? `썸네일 선택` : `썸네일 수정`}
            </button>
          </div>
          <div>
            <TextEditor />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteReview;
