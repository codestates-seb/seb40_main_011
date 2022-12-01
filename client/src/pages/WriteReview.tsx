//리뷰 작성 페이지
//안지은 작성

import React, { ChangeEvent, useCallback, useState } from 'react';
import '../components/common.css';
import CategorieSelector from '../components/Selectors/CategorieSelector';
import ProductSelector from '../components/Selectors/ProductSelector';
import TextEditor from '../components/ToastUI/TextEditor';
import useReview from '../store/review';
import AddProduct from '../components/Modal/AddProduct';
import { selectThumnailImg } from '../util/apiCollection';

const WriteReview = () => {
  const {
    title,
    setTitle,
    thumbnailBase64,
    thumbnailImg,
    setThumbnailBase64,
    setThumnailImg,
  } = useReview();
  const [isModal, setIsModal] = useState(false);

  //썸네일 이미지 (프리뷰) 데이터 들어온 이미지 주소 저장
  const [thumbnailCheck, setThumbnailCheck] = useState('/img');

  //타이틀
  const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const titleUpdate = e.target.value;
    setTitle(titleUpdate);
  }, []);

  //모달
  const onClickModal = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };

  //썸네일 이미지 저장
  const handleChangeImg = async (e: any) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const thumbnail: any = reader.result;
      setThumbnailCheck(thumbnail);
      setThumbnailBase64(e.target.files[0]);
    };
  };

  const handelSubmitThumbnail = async (e: any) => {
    const sizeData = {
      width: 400,
      height: 400,
    };

    e.preventDefault();
    const formData = new FormData();
    formData.append('file', thumbnailBase64);
    formData.append(
      'request',
      new Blob([JSON.stringify(sizeData)] as any, { type: 'application/json' })
    );

    // api 요청
    try {
      const thumbnailPostApi = await selectThumnailImg(formData);
      console.log(`thumbnailPostApi`, thumbnailPostApi.data);
      setThumnailImg(thumbnailPostApi.data);
      alert('업로드 완료!');
    } catch (err: unknown) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bg-slate-300 max-md:pt-0">
      <div className="bg-white lg:w-[64rem] pb-14 px-10">
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
              className="w-1/5 ml-20 so-button-nomal"
              onClick={onClickModal}
            >
              제품 추가하기
            </button>
          </div>
          <div className="flex">
            <input
              type="text"
              id="title"
              value={title}
              onChange={onChangeTitle}
              placeholder="제목을 입력하세요"
              className="w-4/5 mb-5 border signup-input border-slate-300"
            />
            <form encType="multipart/form-data">
              <input
                type="file"
                id="thumnail"
                accept="image/*"
                className="hidden"
                onChange={handleChangeImg}
              />
              <label
                role="button"
                htmlFor="thumnail"
                className="text-sm text-gray-500 p-[10px] rounded-2xl bg-white"
              >
                썸네일 선택하기
              </label>
              <button onClick={handelSubmitThumbnail}> 업로드</button>
            </form>
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
