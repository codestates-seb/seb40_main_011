//유저정보
//login state
import { useEffect, useState, SetStateAction } from 'react';
import EditProfile from '../Modal/EditProfile';
import EditPassword from '../Modal/EditPassword';
import EditProfileImg from '../Modal/EditProfileImg';
import { getUserProfile } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
import { useNavigate } from 'react-router-dom';
import { domain } from '../../constant';

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

  const navigate = useNavigate();
  const getUserProfileData = async () => {
    const data = await getUserProfile();

    switch (data.status) {
      case 200:
        setUserProfileData(data?.data);
        break;
      case 404:
        alert('다시 로그인 해 주세요');
        navigate('/login');
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

      <div className="flex flex-col items-center justify-center py-8 md:py-12 bg-zinc-100 dark:bg-DMMainColor dark:text-white text-black/70">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src={
              userProfileData?.image === 'null' ||
              userProfileData?.image === null
                ? require('../../images/placeholder-img-profile.png')
                : `${domain}${userProfileData?.image}`
            }
            alt=""
            className="object-cover border-none rounded-full bg-gray-400/90 w-32 md:w-48 h-32 md:h-48 md:mr-8"
          />
          <div className="lg:block flex-col pt-2">
            <div className="font-bold text-2xl pb-1 md:text-4xl md:pb-2 md:p-0 text-center md:text-left text-black dark:text-white">
              {userProfileData?.nickname}
            </div>
            <div className="text-xl font-medium text-center md:text-left text-black/60 dark:text-white/60 pb-1">
              {userProfileData?.email}
            </div>
            <div className="text-center md:text-left text-lg">
              <span className="font-bold mr-1 dark:text-white text-black">
                {userProfileData?.point}
              </span>
              <span className="dark:text-white/60 text-black/60">point</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center mt-8 sm:mb-0 lg:items-start lg:justify-start text-sm md:text-base">
          <button
            className="flex items-center font-medium w-28 sm:w-[10rem] md:w-[12rem] justify-center h-12 py-2 rounded-xl  hover:bg-slate-300 bg-white hover:dark:bg-black/80 dark:bg-DMSubColor mx-1 md:mx-2 text-black/80 dark:text-white/80 dark:hover:text-white"
            onClick={openEditProfileImgModalHandler}
          >
            사진 업로드
          </button>
          <button
            className="flex items-center font-medium w-28 sm:w-[10rem] md:w-[12rem] justify-center h-12 py-2 rounded-xl  hover:bg-slate-300 bg-white hover:dark:bg-black/80 dark:bg-DMSubColor mx-1 md:mx-2 text-black/80 dark:text-white/80 dark:hover:text-white"
            onClick={openEditProfileModalHandler}
          >
            닉네임 수정
          </button>
          <button
            className="flex items-center font-medium w-28 sm:w-[10rem] md:w-[12rem] justify-center h-12 py-2 rounded-xl  hover:bg-slate-300 bg-white hover:dark:bg-black/80 dark:bg-DMSubColor mx-1 md:mx-2 text-black/80 dark:text-white/80 dark:hover:text-white"
            onClick={openEditPasswordModalHandler}
          >
            비밀번호 수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
