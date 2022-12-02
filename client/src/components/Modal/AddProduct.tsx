//제품 추가하기
//안지은 작성

import React, { ChangeEvent, useState } from 'react';
import CategorySelector from '../Selectors/CategorySelector';
import '../common.css';
// import { useNavigate } from 'react-router-dom';
import useCategories from '../../store/categories';
import { selectProductImg } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';

interface ModalProps {
  isModal: boolean;
  setIsModal(state: boolean): void;
}

const AddProduct = ({ isModal, setIsModal }: ModalProps) => {
  const { clickName } = useCategories();
  // const navigate = useNavigate();

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
  const [img, setImg] = useState(false);
  const [uploadImg, setUploadImg] = useState('');
  //이미지 올리는 함수
  const handleChangeImg = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage: any = reader.result;
      setproductImg(resultImage);
      setImg(true);
      setUploadImg(e.target.files[0]);
    };
  };

  //이미지 삭제하는 함수
  const handleDeletImg = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setImg(!img);
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
    formData.append('file', uploadImg);
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
        location.reload();
        loginRefresh();
        break;
      case 412:
        loginRefresh();
        console.log('실패');
        break;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-30 flex items-center justify-center w-full h-screen bg-black/30 backdrop-blur-sm justify-content">
        <div className="modal-window h-[650px] z-40 overflow-hidden h-">
          <h1 className="px-24 pt-16 pb-8 text-3xl">제품을 추가해주세요</h1>
          <div className="flex justify-center ">
            <form
              id="form-data"
              className="w-2/3"
              encType="multipart/form-data"
            >
              <div className="pb-5">
                <p className="modal-font">분류</p>
                <CategorySelector />
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
                <div className="flex">
                  <p className="modal-font">디테일</p>
                  <p className="ml-1 text-sm text-red-600 font-nomal mt-[0.15rem]">
                    {' '}
                    &#33;필수
                  </p>
                </div>
                <input
                  className="justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 w-full"
                  type="text"
                  value={detail}
                  onChange={handelChangeDetail}
                  placeholder="디테일을 입력해주세요"
                />
              </div>
              <div className="pb-5">
                <p className="modal-font">제품 이미지</p>
                {img === false ? (
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
                  className="w-1/3 py-3 mx-5 font-bold text-white bg-blue-600 rounded-3xl hover:bg-blue-500"
                  onClick={handleSubmitImg}
                >
                  완료
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
