//리뷰 작성 페이지
//안지은 작성

import React, { ChangeEvent, useCallback, useState } from 'react';
import '../components/common.css';
import CategorySelector from '../components/Selectors/CategorySelector';
import ProductSelector from '../components/Selectors/ProductSelector';
import TextEditor from '../components/ToastUI/TextEditor';
import useReview from '../store/review';
import AddProduct from '../components/Modal/AddProduct';
import ThumbnailModal from '../components/Modal/ThumbnailModal';
import useCategories from '../store/categories';
// import { useIsLogin } from '../store/login';

const WriteReview = () => {
  const { title, setTitle, thumbnailImg } = useReview();
  // const { isLogin } = useIsLogin();
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

  return (
    <div className="flex flex-col items-center justify-center w-full bg-zinc-100 max-md:pt-0">
      <div className="bg-white lg:w-[64rem] mx-auto w-full pb-14 px-10">
        {isModal === false ? null : (
          <AddProduct isModal={isModal} setIsModal={setIsModal} />
        )}
        {openThum === false ? null : (
          <ThumbnailModal openThum={openThum} setOpenThum={setOpenThum} />
        )}
        <div className="m-auto mt-8">
          <div className="flex justify-between h-12 mb-3">
            <div className="flex w-4/5">
              <div className="inline-flex w-1/3 ">
                <CategorySelector />
              </div>
              <div className="inline-flex w-1/3 ml-5 ">
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
              className="w-1/6 pb-1 mb-1 text-sm font-bold text-white rounded-md hover:bg-slate-400 bg-slate-300"
              onClick={onClickModal}
            >
              제품 추가하기
            </button>
          </div>
          <div className="flex justify-between h-12 mb-5">
            <input
              type="text"
              id="title"
              value={title}
              onChange={onChangeTitle}
              placeholder="제목을 입력하세요"
              maxLength={50}
              className="w-4/5 mb-1 border signup-input border-slate-300"
            />
            <button
              onClick={onClickThumModal}
              className={
                thumbnailImg.length === 0
                  ? `w-1/6 pb-1 mb-1 text-sm font-bold text-white rounded-md hover:bg-slate-400 bg-slate-300`
                  : `w-1/6 pb-1 mb-1 text-sm font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500`
              }
            >
              {thumbnailImg.length === 0
                ? `썸네일 선택하기`
                : `썸네일 수정하기`}
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
