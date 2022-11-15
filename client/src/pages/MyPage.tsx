//유저정보
//login state

import MypageTab from '../components/MyPage/MypageTab';
import Profile from '../components/MyPage/Profile';

function MyPage(): JSX.Element {
  return (
    <div>
      <Profile />
      <MypageTab />
      <button>회원 탈퇴</button>
    </div>
  );
}

export default MyPage;
