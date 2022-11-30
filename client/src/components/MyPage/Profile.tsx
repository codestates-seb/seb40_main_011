//유저정보
//login state
import { useEffect, useState, SetStateAction } from 'react';
import EditProfile from '../Modal/EditProfile';
import EditPassword from '../Modal/EditPassword';
import EditProfileImg from '../Modal/EditProfileImg';
import { getUserProfile } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';

export interface UserProfile {
  email: string | undefined;
  nickname: string | undefined;
  image: string | undefined;
  point: number | undefined;
}

export interface EditProfileImgModalHandler {
  openEditProfileImgModalHandler: React.MouseEventHandler<HTMLButtonElement>;
}
export interface EditProfileModalHandler {
  openEditProfileModalHandler: React.MouseEventHandler<HTMLButtonElement>;
}
export interface EditPasswordModalHandler {
  openEditPasswordModalHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const Profile = () => {
  const [userProfileData, setUserProfileData] = useState<
    UserProfile | undefined
  >();

  const getUserProfileData = async () => {
    const data = await getUserProfile();

    switch (data.status) {
      case 200:
        setUserProfileData(data?.data);
        break;
      case 412:
        loginRefresh();
        getUserProfileData();
        break;
      default:
    }
  };
  useEffect(() => {
    getUserProfileData();
  }, []);

  // Modal
  const [isEditProfileImg, setIsEditProfileImg] = useState(false);
  const openEditProfileImgModalHandler = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setIsEditProfileImg(!isEditProfileImg);
  };

  const [isEditProfile, setIsEditProfile] = useState(false);
  const openEditProfileModalHandler = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setIsEditProfile(!isEditProfile);
  };

  const [isEditPassword, setIsEditPassword] = useState(false);
  const openEditPasswordModalHandler = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setIsEditPassword(!isEditPassword);
  };

  return (
    <div>
      {!isEditProfileImg ? null : (
        <EditProfileImg
          openEditProfileImgModalHandler={openEditProfileImgModalHandler}
          userProfileData={userProfileData}
        />
      )}
      {!isEditProfile ? null : (
        <EditProfile
          openEditProfileModalHandler={openEditProfileModalHandler}
        />
      )}
      {!isEditPassword ? null : (
        <EditPassword
          openEditPasswordModalHandler={openEditPasswordModalHandler}
        />
      )}

      <div className="flex items-center justify-center bg-slate-100">
        <div className="mx-10">
          <img
            src={`https://codetech.nworld.dev${userProfileData?.image}`}
            alt=""
            className="mt-10 border-none rounded-full bg-gray-400/90 w-60 h-60"
          />
          <div className="flex justify-center">
            <button
              className="px-12 py-2 mt-4 mb-10 bg-gray-400 rounded onClick={openModalHandler}"
              onClick={openEditProfileImgModalHandler}
            >
              사진 업로드
            </button>
          </div>
        </div>
        <div className="">
          <div className="m-3 mt-0 text-4xl font-bold">
            {userProfileData?.nickname}
          </div>
          <div className="m-2 text-sm font-semibold">
            {userProfileData?.email}
          </div>
          <div className="m-2 text-sm font-semibold">
            {userProfileData?.point} point
          </div>
          <div className="flex mt-3 mb-10">
            <button
              className="py-2 m-4 ml-0 bg-white rounded px-14"
              onClick={openEditProfileModalHandler}
            >
              닉네임 수정
            </button>
            <button
              className="py-2 m-4 bg-white rounded px-14"
              onClick={openEditPasswordModalHandler}
            >
              비밀번호 수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
