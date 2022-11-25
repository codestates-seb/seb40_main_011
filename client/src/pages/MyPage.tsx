//유저정보
//login state
import { useState } from 'react';
import MypageTab from '../components/MyPage/MypageTab';
import Profile from '../components/MyPage/Profile';
import OptOut from '../components/Modal/OptOut';

export interface OptOutModalHandler {
  openOptOutModalHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const MyPage = (): JSX.Element => {
  const [isOptOut, setIsOptOut] = useState(false);
  const openOptOutModalHandler = (event: React.MouseEvent<HTMLElement>) => {
    setIsOptOut(!isOptOut);
  };

  return (
    <div className="flex flex-col ">
      {isOptOut === false ? null : (
        <OptOut openOptOutModalHandler={openOptOutModalHandler} />
      )}
      <Profile />
      <MypageTab />
      <div className="flex justify-center">
        <button
          className="px-12 py-2 bg-gray-100 rounded m-14"
          onClick={openOptOutModalHandler}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
};

export default MyPage;
