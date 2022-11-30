//제품 추가하기
//안지은 작성

import React, { ChangeEvent, useState } from 'react';
import CategorieSelector from '../Selectors/CategorieSelector';
import '../common.css';
import { useNavigate } from 'react-router-dom';
import useCategorie from '../../store/categorie';
import { selectProductImg } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';

interface ModalProps {
  isModal: boolean;
  setIsModal(state: boolean): void;
}

const AddProduct = ({ isModal, setIsModal }: ModalProps) => {
  const { clickName } = useCategorie();
  const navigate = useNavigate();

  //clickName 대문자로 변경
  const encoded = encodeURI(clickName);
  const upperText = encoded.toUpperCase();

  //제품 이름 작성한 것 저장
  const [name, setName] = useState('');
  const handelChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setName(e.target.value);
  };

  //제품 디테일 작성한 것 저장
  const [detail, setDetail] = useState('');
  const handelChangeDetail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setDetail(e.target.value);
  };

  //모달 열고 닫는 이벤트
  const openModalHandler = () => {
    setIsModal(!isModal);
  };

  const [productImg, setproductImg] = useState('/img');
  const [uploadImg, setUploadImg] = useState(false);
  //이미지 올리는 함수
  const handleChangeImg = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage: any = reader.result;
      setproductImg(resultImage);
      setUploadImg(true);
    };
  };

  //이미지 삭제하는 함수
  const handleDeletImg = async (e: any) => {
    setUploadImg(!uploadImg);
  };

  //request 타입으로 보낼 객체
  const productData: any = {
    name: name,
    type: upperText,
    detail: detail,
  };

  const handleSubmitImg = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([uploadImg] as any, { type: 'application/json' })
    );
    formData.append(
      'request',
      new Blob([JSON.stringify(productData)] as any, {
        type: 'application/json',
      })
    );

    //api 요청
    const submitForm = await selectProductImg(formData);
    switch (submitForm.status) {
      default:
        console.log(submitForm);
        // navigate('/review/write');
        // location.reload();
        break;
      case 412:
        loginRefresh();
        // handleSubmitImg(e);
        console.log('실패');
        break;
    }
  };

  return (
    <>
      <div>
        <div className="top-0 left-0 z-20 flex modal-bg">
          <div className="modal-window h-[650px]">
            <h1 className="px-24 pt-16 pb-8 text-3xl">제품을 추가해주세요</h1>
            <div className="flex justify-center ">
              <form
                id="form-data"
                className="w-2/3"
                encType="multipart/form-data"
              >
                <div className="pb-5">
                  <p className="modal-font">분류</p>
                  <CategorieSelector />
                </div>
                <div className="pb-5">
                  <p className="modal-font">제품 이름</p>
                  <input
                    className="justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 w-full"
                    type="text"
                    value={name}
                    onChange={handelChangeName}
                    placeholder="제품명을 입력해주세요"
                  />
                </div>
                <div className="pb-5">
                  <p className="modal-font">디테일</p>
                  <input
                    className="justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 w-full"
                    type="text"
                    value={detail}
                    onChange={handelChangeDetail}
                    placeholder="디테일을 입력해주세요"
                  />
                </div>
                <div className="pb-5">
                  <p className="modal-font">이미지 업로드</p>
                  {uploadImg === false ? (
                    <div className="flex rounded-lg w-[418px] bg-slate-200 h-28">
                      <div className="m-auto">
                        <input
                          type="file"
                          id="productImgUpload"
                          className="hidden"
                          accept="/image/*"
                          onChange={handleChangeImg}
                        />
                        <label
                          role="button"
                          htmlFor="productImgUpload"
                          className="text-sm text-gray-500 p-[10px] rounded-2xl bg-white"
                        >
                          이미지 업로드
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-[418px] rounded-lg bg-slate-200 h-28 overflow-hidden my-0 mx-auto items-center justify-center">
                      <div className="m-auto">
                        <img
                          src={productImg}
                          alt=""
                          className="relative object-cover w-full h-full"
                        />
                      </div>
                      <button
                        onClick={handleDeletImg}
                        className="text-sm text-gray-500 p-[10px] rounded-2xl bg-white absolute"
                      >
                        이미지 삭제
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex justify-center pt-4">
                  <button
                    className="w-1/3 py-3 mx-5 border rounded-3xl"
                    onClick={openModalHandler}
                  >
                    취소
                  </button>
                  <button
                    className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300"
                    onClick={handleSubmitImg}
                  >
                    완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
