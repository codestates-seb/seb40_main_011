//유저정보
//login state

import MypageTab from '../components/MyPage/MypageTab';
import Profile from '../components/MyPage/Profile';

const MyPage = (): JSX.Element => {
  return (
    <div className="flex flex-col ">
      <Profile />
      <MypageTab />
      <div className="flex justify-center">
        <button className="px-12 py-2 bg-gray-100 rounded m-14">
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
