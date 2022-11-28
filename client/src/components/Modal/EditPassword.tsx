//회원 탈퇴
import { useState } from 'react';
import { BsXLg, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { EditPasswordModalHandler } from '../MyPage/Profile';
import { editPassword } from '../../util/apiCollection';
import { passwordRegex } from '../../util/Regex';

export interface Password {
  oldPassword: string;
  newPassword: string;
  newCheckPassword: string;
}
const EditPassword = ({
  openEditPasswordModalHandler,
}: EditPasswordModalHandler) => {
  const [prePassword, setPrePassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const [prePasswordError, setPrePasswordError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordCheckError, setPasswordCheckError] = useState(false);

  const [viewPrePassword, setViewPrePassword] = useState(false);
  const [viewPassword, setViewPassword] = useState(false);
  const [viewPasswordCheck, setViewPasswordCheck] = useState(false);

  const viewPrePasswordHandler = (e: React.MouseEvent<HTMLElement>) => {
    setViewPrePassword(!viewPrePassword);
  };
  const viewPasswordHandler = (e: React.MouseEvent<HTMLElement>) => {
    setViewPassword(!viewPassword);
  };
  const viewPasswordCheckHandler = (e: React.MouseEvent<HTMLElement>) => {
    setViewPasswordCheck(!viewPasswordCheck);
  };

  const handlePrePassword = (e: any) => {
    setPrePassword(e.target.value);
    if (!prePassword || !passwordRegex.test(prePassword)) {
      setPrePasswordError(true);
    } else {
      setPrePasswordError(false);
    }
  };
  const handlePassword = (e: any) => {
    setPassword(e.target.value);
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const handlePasswordCheck = (e: any) => {
    setPasswordCheck(e.target.value);
    if (password !== passwordCheck) {
      setPasswordCheckError(true);
    } else {
      setPasswordCheckError(false);
    }
  };

  const handleSubmitPassword = () => {
    const data: Password = {
      oldPassword: prePassword,
      newPassword: password,
      newCheckPassword: passwordCheck,
    };
    const submitEditNick = async () => {
      await editPassword(data);
    };
    submitEditNick();
  };

  return (
    <div className="modal-bg">
      <div className="modal-window">
        <button className="p-3 ml-auto" onClick={openEditPasswordModalHandler}>
          <BsXLg />
        </button>
        <div className="px-24 py-16">
          <div className="mb-6 text-3xl">비밀번호를 변경하시겠습니까?</div>

          <div className="flex items-end border-b ">
            {viewPrePassword ? (
              <input
                type="text"
                value={prePassword}
                onChange={handlePrePassword}
                placeholder="현재 비빌번호를 입력해주세요"
                className="flex w-full p-1.5 mt-4"
              />
            ) : (
              <input
                type="password"
                value={prePassword}
                onChange={handlePrePassword}
                placeholder="현재 비빌번호를 입력해주세요"
                className="flex w-full p-1.5 mt-4"
              />
            )}

            <button onClick={viewPrePasswordHandler} className="p-2">
              {viewPrePassword ? (
                <BsFillEyeSlashFill className="w-[20px] h-[20px]  text-slate-500" />
              ) : (
                <BsFillEyeFill className="w-[20px] h-[20px]  text-slate-500" />
              )}
            </button>
          </div>
          <div
            className={`text-sm text-red-600 ${
              prePasswordError ? 'visible' : 'invisible'
            }`}
          >
            비밀번호가 일치하지 않습니다
          </div>
          <div className="flex items-end border-b">
            {viewPassword ? (
              <input
                type="text"
                value={password}
                onChange={handlePassword}
                placeholder="새 비빌번호를 입력해주세요 "
                className="flex w-full p-1.5 mt-4"
              />
            ) : (
              <input
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder="새 비빌번호를 입력해주세요 "
                className="flex w-full p-1.5 mt-4"
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
          <div
            className={`text-sm text-red-600 ${
              passwordError ? 'visible' : 'invisible'
            }`}
          >
            숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요
          </div>

          <div className="flex items-end border-b">
            {viewPasswordCheck ? (
              <input
                type="text"
                value={passwordCheck}
                onChange={handlePasswordCheck}
                placeholder="새 비빌번호를 확인해주세요"
                className="flex w-full p-1.5 mt-4"
              />
            ) : (
              <input
                type="password"
                value={passwordCheck}
                onChange={handlePasswordCheck}
                placeholder="새 비빌번호를 확인해주세요"
                className="flex w-full p-1.5 mt-4"
              />
            )}

            <button onClick={viewPasswordCheckHandler} className="p-2">
              {viewPasswordCheck ? (
                <BsFillEyeSlashFill className="w-[20px] h-[20px]  text-slate-500" />
              ) : (
                <BsFillEyeFill className="w-[20px] h-[20px]  text-slate-500" />
              )}
            </button>
          </div>

          <div
            className={`text-sm text-red-600 ${
              passwordCheckError ? 'visible' : 'invisible'
            }`}
          >
            비밀번호가 일치하지 않습니다
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl"
            onClick={openEditPasswordModalHandler}
          >
            취소
          </button>
          <button
            className="w-1/3 py-3 mx-5 border rounded-3xl bg-slate-300"
            onClick={handleSubmitPassword}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPassword;
