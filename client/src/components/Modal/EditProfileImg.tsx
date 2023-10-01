//프로필 이미지 변경
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsXLg } from 'react-icons/bs';
import { EditProfileImgModalHandler } from '../MyPage/Profile';
import { UserProfile } from '../MyPage/Profile';
import { editProfileImg } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
import { domain } from '../../constant';

const EditProgileImg = (
  // { openEditProfileImgModalHandler }: EditProfileImgModalHandler,
  { openEditProfileImgModalHandler, userProfileData }: any
) => {
  // 이미지 전송 후 이미지 리렌더링
  const [userImg, setUserImg] = useState(`${domain}${userProfileData?.image}`);
  const [uploadImg, setUploadImg] = useState();
  const [notiNew, setNotiNew] = useState(false);
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

    const submitImg = await editProfileImg(formData);
    switch (submitImg.status) {
      case 200:
        navigate('/mypage');
        location.reload();
        break;
      case 412: {
        loginRefresh();
        handleSubmitImg();
        break;
      }
      case 415:
        setNotiNew(true);
        break;
      default:
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button
          className="p-3 ml-auto"
          onClick={openEditProfileImgModalHandler}
        >
          <BsXLg />
        </button>
        <div className="px-6 py-4 sm:px-12 sm:py-8">
          <div className="text-lg sm:text-4xl">프로필을 수정하시겠습니까?</div>
          <div className="my-2 sm:text-xl text-slate-500">
            새로운 프로필을 업로드해주세요
          </div>
          <div className="flex flex-col items-center justify-center object-cover mt-5">
            <img
              src={
                userProfileData?.image === 'null' ||
                userProfileData?.image === null
                  ? require('../../images/placeholder-img-profile.png')
                  : userImg
              }
              alt=""
              className="rounded-full sm:w-60 sm:h-60 w-28 h-28 bg-slate-100"
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
              className="px-6 py-2 m-5 rounded-2xl bg-slate-300 dark:bg-DMMainColor"
            >
              이미지 업로드
            </label>
            {notiNew ? (
              <div className="px-2 pt-2 pb-2 my-2 text-sm font-medium text-red-500 bg-red-100 rounded">
                이미지를 선택 해주세요
              </div>
            ) : (
              <></>
            )}
          </div>

          <div className="flex justify-center pt-10 mb-5 sm:mb-10 sm:pt-20">
            <button
              className="w-1/3 py-3 mx-5 border rounded-3xl dark:bg-DMMainTextColor dark:border-DMSubTextColor "
              onClick={openEditProfileImgModalHandler}
            >
              취소
            </button>
            <button
              className="w-1/3 py-3 mx-5 text-white bg-blue-600 rounded-3xl hover:bg-blue-500"
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
