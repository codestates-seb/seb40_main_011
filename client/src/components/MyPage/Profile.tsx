//유저정보
//login state
import { useEffect, useState, SetStateAction } from 'react';
import EditProfile from '../Modal/EditProfile';
import EditPassword from '../Modal/EditPassword';
import EditProfileImg from '../Modal/EditProfileImg';
import { getUserProfile } from '../../util/apiCollection';
import userInfo from '../../store/userInfo';
import { UserInfo } from '../../store/userInfo';

export interface UserProfile {
  email: string;
  nickname: string;
  image: string;
  point: number;
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
  let { email, nickname, image, point } = userInfo<UserInfo>((state) => state);

  const [userProfileData, setUserProfileData] = useState<UserProfile>();

  useEffect(() => {
    const getUserProfileData = async () => {
      const { data } = await getUserProfile();
      setUserProfileData(data);
    };
    getUserProfileData();
    email = userProfileData?.email;
    nickname = userProfileData?.nickname;
    image = userProfileData?.image;
    point = userProfileData?.point;
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
