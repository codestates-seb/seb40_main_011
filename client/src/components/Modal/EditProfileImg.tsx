//프로필 이미지 변경
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsXLg } from 'react-icons/bs';
import { EditProfileImgModalHandler } from '../MyPage/Profile';
import { editProfileImg } from '../../util/apiCollection';

const EditProgileImg = ({
  openEditProfileImgModalHandler,
}: EditProfileImgModalHandler) => {
  // 이미지 전송 후 이미지 리렌더링
  const [userImg, setUserImg] = useState('/img');
  const [uploadImg, setUploadImg] = useState();

  const navigate = useNavigate();

  const handleChangeImg = async (e: any) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onloadend = () => {
      const resultImage: any = reader.result;
      setUserImg(resultImage);
      setUploadImg(e.target.files[0]);
    };
  };

  // const dummy: any = `{"password": null, "nickname": null }`;
  const dummy: any = { password: null, nickname: null };

  const handleSubmitImg = async () => {
    const formData = new FormData();
    formData.append(
      'file',
      new Blob([uploadImg] as any, {
        type: 'application/json',
      })
    );
    formData.append(
      'patch',
      new Blob([JSON.stringify(dummy)] as any, {
        type: 'application/json',
      })
    );

    console.log(`마이페이지`, formData);

    const submitImg = await editProfileImg(formData);
    switch (submitImg.status) {
      case 200:
        navigate('/mypage');
        location.reload();
        break;
      case 415:
        alert('이미지를 선택 해주세요');
        break;
      default:
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-window h-[700px]">
        <button
          className="p-3 ml-auto"
          onClick={openEditProfileImgModalHandler}
        >
          <BsXLg />
        </button>
        <div className="px-24 py-16">
          <div className="text-4xl">프로필을 수정하시겠습니까?</div>
          <div className="my-2 text-xl text-slate-500">
            새로운 프로필을 업로드해주세요
          </div>
          <div className="flex flex-col items-center justify-center mt-5">
            <img
              src={userImg}
              alt=""
              className="rounded-full w-60 h-60 bg-slate-100"
            />
            <input
              type="file"
              accept="imgge/*"
              id="imgUpload"
              className="hidden"
              onChange={handleChangeImg}
            />
            <label
              role="button"
              htmlFor="imgUpload"
              className="px-6 py-2 m-5 rounded-2xl bg-slate-300"
            >
              이미지 업로드
            </label>
          </div>

          <div className="flex justify-center pt-20">
            <button
              className="w-1/3 py-3 mx-5 border rounded-3xl"
              onClick={openEditProfileImgModalHandler}
            >
              취소
            </button>
            <button
              className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300"
              onClick={handleSubmitImg}
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProgileImg;
