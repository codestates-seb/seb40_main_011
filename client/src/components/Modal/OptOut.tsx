//회원 탈퇴
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsXLg, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { OptOutModalHandler } from '../../pages/MyPage';
import { delAccount } from '../../util/apiCollection';
import { loginRefresh } from '../../util/loginRefresh';
import { useIsLogin } from '../../store/login';

export interface OptOutInputs {
  headers: Header;
  body: string;
}

interface Header {
  Authorization: string | null;
}

const OptOut = ({ openOptOutModalHandler }: OptOutModalHandler) => {
  const navigate = useNavigate();
  const { Logout } = useIsLogin();
  const [password, setPassword] = useState('');
  const [notiNew, setNotiNew] = useState(false);
  const [notiNumber, setNotiNumber] = useState(false);

  const [viewPassword, setViewPassword] = useState(false);
  const viewPasswordHandler = (e: React.MouseEvent<HTMLElement>) => {
    setViewPassword(!viewPassword);
  };

  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  };

  const handleOptOut = async () => {
    if (password.length === 0) {
      setNotiNumber(false);
      setNotiNew(true);
    } else {
      const data = { password: password };

      const accountResult = await delAccount(data);
      // console.log(accountResult);
      switch (accountResult.status) {
        case 200:
          localStorage.clear();
          Logout();
          navigate('/');
          break;
        case 412: {
          loginRefresh();
          accountResult();
          break;
        }
        case 404:
          setNotiNew(false);
          setNotiNumber(true);
          break;
        default:
      }
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="p-3 ml-auto" onClick={openOptOutModalHandler}>
          <BsXLg />
        </button>
        <div className="px-6 py-4 sm:px-12 sm:py-8">
          <div className="text-2xl sm:text-4xl">정말 탈퇴하시겠습니까?</div>
          <div className="my-2 mb-20 sm:text-xl text-slate-500">
            회원탈퇴를 위해 비빌번호를 입력해주세요
          </div>

          {notiNew ? (
            <div className="px-2 pt-2 pb-2 mb-2 text-sm font-medium text-red-500 bg-red-100 rounded">
              비밀번호를 입략해 주세요
            </div>
          ) : (
            <></>
          )}

          {notiNumber ? (
            <div className="px-2 pt-2 pb-2 mb-2 text-sm font-medium text-red-500 bg-red-100 rounded">
              비밀번호가 일치하지 않습니다.
            </div>
          ) : (
            <></>
          )}

          <div className="flex items-end p-1 px-2 border-b">
            {viewPassword ? (
              <input
                type="text"
                value={password}
                onChange={handlePassword}
                placeholder="비밀번호"
                className="flex w-full pb-1 text-sm sm:text-lg dark:bg-DMSubColor"
              />
            ) : (
              <input
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder="비밀번호"
                className="flex w-full pb-1 text-sm sm:text-lg dark:bg-DMSubColor"
              />
            )}

            <button onClick={viewPasswordHandler} className="p-2">
              {viewPassword ? (
                <BsFillEyeSlashFill className="w-[20px] h-[20px]  text-slate-500" />
              ) : (
                <BsFillEyeFill className="w-[20px] h-[20px]  text-slate-500" />
              )}
            </button>
          </div>
          <div className="text-sm text-slate-500">
            {/* {true ? '비밀번호를 입력해주시요' : '비밀번호가 일치하지 않습니다.'} */}
          </div>
        </div>

        <div className="flex justify-center pt-8 mb-10">
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl dark:bg-DMMainTextColor dark:border-DMSubTextColor"
            onClick={openOptOutModalHandler}
          >
            아니요
          </button>
          <button
            className="w-1/3 py-3 mx-5 text-white bg-blue-600 rounded-3xl hover:bg-blue-500"
            onClick={handleOptOut}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptOut;
