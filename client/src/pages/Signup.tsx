//회원가입 페이지
//안지은, 김광민 작성
import React, { ChangeEvent, useCallback, useState } from 'react';
// import SignUpButton from '../components/Buttons/SignUp';
import '../components/common.css';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../util/apiCollection';
import {
  BsFillPatchExclamationFill,
  AiFillEyeInvisible,
  AiFillEye,
} from '../icons';
import { emailRegex, passwordRegex } from '../util/Regex';

const Signup = () => {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordCheck, setPasswordCheck] = useState<string>('');

  //오류메세지 상태저장
  const [nameMessage, setNameMessage] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordCheckMessage, setPasswordCheckMessage] = useState<string>('');

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState<boolean>(false);

  // navigate login & home
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  const goLogin = () => {
    navigate('/login');
  };

  // 회원가입 submit
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const signupResult = await postSignup({ email, password, nickname });
    switch (signupResult.status) {
      case 200:
        alert('회원가입되었습니다.');
        navigate('/login');
        break;
      case 401:
        console.error(signupResult.status + ' Error');
        break;
    }
  };

  //이름
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 20) {
      setNameMessage('닉네임은 2글자 이상 20글자 미만으로 입력해주세요');
      setIsName(false);
    } else {
      setNameMessage('사용 가능한 닉네임입니다');
      setIsName(true);
    }
  }, []);

  //이메일
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 올바르지 않습니다');
      setIsEmail(false);
    } else {
      setEmailMessage('사용 가능한 이메일입니다');
      setIsEmail(true);
    }
  }, []);

  //비밀번호
  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCurrent = e.target.value;
      setPassword(passwordCurrent);

      if (!passwordRegex.test(passwordCurrent)) {
        setPasswordMessage(
          '숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요'
        );
        setIsPassword(false);
      } else {
        setPasswordMessage('안전한 비밀번호입니다)');
        setIsPassword(true);
      }
    },
    []
  );

  //비밀번호 확인
  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordCheckCurrent = e.target.value;
      setPasswordCheck(passwordCheckCurrent);

      if (password === passwordCheckCurrent) {
        setPasswordCheckMessage('비밀번호가 일치합니다');
        setIsPasswordCheck(true);
      } else {
        setPasswordCheckMessage('비밀번호가 일치하지 않습니다');
        setIsPasswordCheck(false);
      }
    },
    [password]
  );

  // 비밀번호 보이기
  const [passwordType, setPasswordType] = useState('password');
  const handlePasswordType = () => {
    if (passwordType === 'password') return setPasswordType('text');
    if (passwordType === 'text') return setPasswordType('password');
  };
  const [passwordCheckType, setPasswordCheckType] = useState('password');
  const handlePasswordCheckType = () => {
    if (passwordCheckType === 'password') return setPasswordCheckType('text');
    if (passwordCheckType === 'text') return setPasswordCheckType('password');
  };

  // handleEnter
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      onSubmit;
    }
  };

  return (
    <div className="w-full h-screen bg-slate-300 pt-8 max-md:pt-0 flex flex-col items-center justify-center">
      <div className="max-md:w-full md:w-[32rem] bg-white flex justify-center flex-col p-16 rounded-3xl max-md:rounded-none shadow-2xl/30">
        <img
          src={require('../images/logo.png')}
          alt=""
          className="pb-10 m-auto w-56 cursor-pointer"
          onClick={handleHomeClick}
        />
        <form
          name="signup"
          action="https://codetech.nworld.dev/api/register"
          method="POST"
          className="flex flex-col justify-center"
          onSubmit={onSubmit}
        >
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 ${
              nickname.length > 5 && !isName
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type="text"
              className="peer/email input-ani outline-none bg-transparent text-base absolute w-full pt-3 px-6 top-0 h-full font-medium"
              value={nickname}
              name="email"
              onChange={onChangeName}
            ></input>
            <label
              className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs ${
                nickname.length !== 0 &&
                'peer-valid/email:-translate-y-2.5 peer-valid/email:text-xs'
              }`}
            >
              닉네임
            </label>
            {nickname.length > 5 && !isName && (
              <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                {nameMessage}
              </span>
            )}
          </div>
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 ${
              email.length > 5 && !isEmail
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type="text"
              className="peer/email input-ani outline-none bg-transparent text-base absolute w-full pt-3 px-6 top-0 h-full font-medium"
              value={email}
              name="email"
              onChange={onChangeEmail}
            ></input>
            <label
              className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs ${
                email.length !== 0 &&
                'peer-valid/email:-translate-y-2.5 peer-valid/email:text-xs'
              }`}
            >
              이메일
            </label>
            {email.length > 5 && !isEmail && (
              <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                {emailMessage}
              </span>
            )}
          </div>
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 ${
              password.length > 5 && !isPassword
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type={passwordType}
              className="peer/password input-ani outline-none bg-transparent text-base absolute pt-3 px-6 top-0 w-full h-full font-medium"
              value={password}
              name="password"
              onChange={onChangePassword}
              onKeyDown={handleEnter}
            ></input>
            <label
              className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs ${
                password.length !== 0 &&
                'peer-valid/password:-translate-y-2.5 peer-valid/password:text-xs'
              }`}
            >
              비밀번호
            </label>
            <div
              onClick={handlePasswordType}
              className="absolute text-3xl text-gray-300 top-3.5 right-4 hover:text-gray-600"
            >
              {passwordType === 'password' ? (
                <AiFillEyeInvisible />
              ) : (
                <AiFillEye />
              )}
            </div>
            {password.length > 5 && !isPassword && (
              <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                {passwordMessage}
              </span>
            )}
          </div>
          <div
            className={`relative bg-gray-50 rounded-bl rounded-br h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 ${
              passwordCheck.length > 5 && !isPasswordCheck
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type={passwordCheckType}
              className="peer/password input-ani outline-none bg-transparent text-base absolute pt-3 px-6 top-0 w-full h-full font-medium"
              value={passwordCheck}
              name="password"
              onChange={onChangePasswordCheck}
              onKeyDown={handleEnter}
            ></input>
            <label
              className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs ${
                passwordCheck.length !== 0 &&
                'peer-valid/password:-translate-y-2.5 peer-valid/password:text-xs'
              }`}
            >
              비밀번호 확인
            </label>
            <div
              onClick={handlePasswordCheckType}
              className="absolute text-3xl text-gray-300 top-3.5 right-4 hover:text-gray-600"
            >
              {passwordCheckType === 'password' ? (
                <AiFillEyeInvisible />
              ) : (
                <AiFillEye />
              )}
            </div>
            {passwordCheck.length > 5 && !isPasswordCheck && (
              <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                {passwordCheckMessage}
              </span>
            )}
          </div>
          {/* <div
            className="group mb-4 py-1 flex items-center justify-center text-3xl text-gray-300 hover:text-gray-500 "
            onClick={handlePasswordType}
          >
            {passwordType === 'password' ? (
              <AiFillEyeInvisible
                id="passwordShown"
                onClick={handlePasswordType}
                className=""
              />
            ) : (
              <AiFillEye
                id="passwordShown"
                onClick={handlePasswordType}
                className="text-3xl"
              />
            )}
            <label
              className="ml-2 pb-0.5 group-hover:font-medium cursor-pointer text-base text-gray-500 group-hover:text-gray-700"
              htmlFor="passwordShown"
            >
              {passwordType === 'password'
                ? '비밀번호 보기'
                : '비밀번호 감추기'}
            </label>
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-600 h-16 rounded-md text-xl font-bold pb-1 text-white hover:bg-blue-500"
          >
            회원가입
          </button>
        </form>
      </div>
      <div className="my-4 pt-1.5 pb-2 px-8 hover:bg-white/20 rounded-full">
        <label className="text-gray-500 font-medium" htmlFor="goLogin">
          계정이 이미 있으시다구요?
        </label>
        <button
          className="font-bold text-gray-700 hover:text-blue-600 ml-4"
          onClick={goLogin}
          id="goLogin"
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Signup;
