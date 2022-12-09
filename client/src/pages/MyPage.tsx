//유저정보
//login state
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsExclamationTriangle } from 'react-icons/bs';
import MypageTab from '../components/MyPage/MypageTab';
import Profile from '../components/MyPage/Profile';
import OptOut from '../components/Modal/OptOut';
import { useIsLogin } from '../store/login';
import { useEffect } from 'react';
import { loginRefresh } from '../util/loginRefresh';

export interface OptOutModalHandler {
  openOptOutModalHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const MyPage = (): JSX.Element => {
  const navigate = useNavigate();

  const { isLogin } = useIsLogin();

  const [isOptOut, setIsOptOut] = useState(false);
  const openOptOutModalHandler = () => {
    setIsOptOut(!isOptOut);
  };

  useEffect(() => {
    loginRefresh();
  }, []);

  return (
    <>
      {isLogin ? (
        <>
          <div className="flex flex-col bg-white dark:bg-DMThrColor">
            {isOptOut === false ? null : (
              <OptOut openOptOutModalHandler={openOptOutModalHandler} />
            )}
            <Profile />
            <MypageTab />
            <div className="flex justify-center">
              <button
                className="flex items-center font-medium w-32 sm:w-[10rem] md:w-[12rem] justify-center h-12 py-2 mx-1 rounded-xl  bg-zinc-50 hover:bg-zinc-200/80 dark:bg-DMSubColor/20 hover:dark:bg-DMSubColor/60 my-12 text-black/30 hover:text-black/60 dark:text-white/60 hover:dark:text-white/80"
                // className="px-12 py-2 rounded-2xl bg-slate-300 m-14 dark:text-white dark:bg-DMMainColor"
                onClick={openOptOutModalHandler}
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            {' '}
            <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-100 dark:bg-DMMainColor dark:text-white">
              <div className="flex flex-col items-center ">
                <div className="mb-3">
                  <BsExclamationTriangle className="w-40 h-40" />
                </div>
                <h2 className="leading-10 text-left">
                  <p className="mb-10 text-3xl font-extrabold text-center ">
                    Not Found
                  </p>
                  <p className="mb-3 text-2xl font-medium text-center text-black dark:text-white">
                    죄송합니다.
                  </p>
                  <p className="text-lg text-center text-black dark:text-white">
                    로그인이 필요한 서비스입니다.
                  </p>
                </h2>
              </div>
              <button
                className="px-10 py-3 my-28 bg-slate-300 rounded-xl dark:bg-DMThrColor dark:text-white"
                onClick={() => navigate('/login')}
              >
                로그인 페이지로 이동
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MyPage;
