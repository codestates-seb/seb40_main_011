import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../util/apiCollection';
import { useIsLogin } from '../store/login';
import {
  MdOutlineEmail,
  AiFillEyeInvisible,
  AiOutlineGoogle,
  AiFillEye,
  RiKakaoTalkFill,
  RiLockPasswordLine,
  BsFillPatchExclamationFill,
  SiNaver,
} from '../icons';
import { emailRegex, passwordRegex } from '../util/Regex';
import Confirm from '../components/Modal/Confirm';
import { useDarkMode } from '../store/darkMode';

export default function Login() {
  // 홈으로 이동
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  // 비밀번호 보이기
  const [passwordType, setPasswordType] = useState('password');
  const handlePasswordType = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (passwordType === 'password') return setPasswordType('text');
    if (passwordType === 'text') return setPasswordType('password');
  };

  // 이메일, 비밀번호
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이메일, 비밀번호 체크
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  //다크모드
  const { darkMode } = useDarkMode();

  // onChange inputs
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'email') {
      setEmail(value.trim());
      if (!emailRegex.test(value.trim())) {
        setIsValidEmail(false);
      } else if (emailRegex.test(value.trim())) {
        setIsValidEmail(true);
      }
    } else if (name === 'password') {
      setPassword(value.trim());
      if (!passwordRegex.test(value)) {
        setIsValidPassword(false);
      } else if (passwordRegex.test(value)) {
        setIsValidPassword(true);
      }
    }
  };
  // navigate signup
  const goSignup = () => {
    navigate('/signup');
  };

  // login status
  const { Login } = useIsLogin();
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      handleSubmit;
    }
  };

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.length === 0) {
      setMsg(errorMsg[0]);
      return setShowModal(true);
    }
    if (password.length === 0) {
      setMsg(errorMsg[1]);
      return setShowModal(true);
    }
    const loginResult = await postLogin({ email, password });
    switch (loginResult.status) {
      default:
        localStorage.setItem('refresh', loginResult.headers.get('refresh'));
        localStorage.setItem(
          'authorization',
          loginResult.headers.get('authorization')
        );
        Login(loginResult.headers.id);
        navigate(-1);
        break;
      case 401:
        // alert('이메일과 비밀번호가 일치하지 않습니다.');
        setShowModal(true);
        setMsg(errorMsg[2]);
        break;
    }
  };

  // naver.com login
  const handleNaver = () => {
    window.location.href =
      'https://codetech.nworld.dev/api/oauth2/authorize/naver';
    return;
  };

  // google login
  const handleGoogle = () => {
    window.location.href =
      'https://codetech.nworld.dev/api/oauth2/authorize/google';
  };

  // google login
  const handleKakao = () => {
    window.location.href =
      'https://codetech.nworld.dev/api/oauth2/authorize/kakao';
    return;
  };

  // showError 모달
  const [showModal, setShowModal] = useState(false);
  const errorMsg: string[] = [
    '이메일을 입력하지 않았습니다.',
    '비밀번호를 입력하지 않았습니다.',
    '아이디 또는 비밀번호를 잘못 입력했습니다.',
  ];
  const [msg, setMsg] = useState(errorMsg[0]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen pt-8 bg-slate-300 max-md:pt-0 max-md:justify-start dark:bg-DMMainColor">
      {showModal && <Confirm setShowModal={setShowModal} msg={msg} />}
      <div className="max-md:w-full md:w-[32rem] bg-white flex justify-center flex-col px-8 py-12 md:p-16 rounded-3xl max-md:rounded-none shadow-2xl/30 dark:bg-DMSubColor">
        <img
          src={
            !darkMode
              ? require('../images/logo.png')
              : require('../images/darkmode_logo.png')
          }
          alt=""
          className="w-56 pb-10 m-auto cursor-pointer"
          onClick={handleHomeClick}
        />
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 dark:bg-DMThrColor dark:ring-DMMainColor ${
              email.length > 5 && !isValidEmail
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type="text"
              className="absolute top-0 w-full h-full pt-3 text-base font-medium bg-transparent outline-none peer/email input-ani px-14 dark:text-white"
              value={email}
              name="email"
              onChange={handleInputs}
            ></input>
            <label
              className={`absolute font-medium top-4 left-14 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs dark:text-white ${
                email.length !== 0 &&
                'peer-valid/email:-translate-y-2.5 peer-valid/email:text-xs'
              }`}
            >
              이메일
            </label>
            <MdOutlineEmail className="absolute text-3xl text-gray-300 top-3.5 left-4" />
            {email.length > 5 && !isValidEmail && (
              <span className="relative flex items-center text-sm text-red-600 pointer-events-none top-16">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                유효한 이메일 주소가 아닙니다.
              </span>
            )}
          </div>
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 dark:bg-DMThrColor dark:ring-DMMainColor ${
              password.length > 5 && !isValidPassword
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type={passwordType}
              className="absolute top-0 w-full h-full pt-3 text-base font-medium bg-transparent outline-none peer/password input-ani px-14 dark:text-white"
              value={password}
              name="password"
              onChange={handleInputs}
              onKeyDown={handleEnter}
            ></input>
            <label
              className={`absolute font-medium top-4 left-14 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs dark:text-white ${
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
            <RiLockPasswordLine className="absolute text-3xl text-gray-300 top-3.5 left-4" />
            {password.length > 5 && !isValidPassword && (
              <span className="relative flex items-center text-sm text-red-600 pointer-events-none top-16">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                유효한 비밀번호가 아닙니다..
              </span>
            )}
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="w-full h-16 pb-1 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500"
          >
            로그인
          </button>
        </form>
        <div className="flex flex-col justify-center">
          <div
            role="button"
            onClick={() => handleKakao()}
            className="group flex items-center h-16 p-3 mt-4 bg-white border rounded-full group hover:border-0 hover:bg-yellow-300 dark:border-DMThrColor dark:bg-DMMainColor dark:hover:bg-yellow-300"
          >
            <RiKakaoTalkFill className="flex-none w-12 h-12 p-2 mr-2 overflow-hidden text-black bg-yellow-300 rounded-full group-hover:p-1 bg-border-0" />
            <div className="mr-12 font-bold text-center grow text-black/70 dark:text-white/70 dark:group-hover:text-black/80">
              카카오톡으로 로그인
            </div>
          </div>
          <div
            role="button"
            onClick={() => handleGoogle()}
            className="flex items-center h-16 p-3 mt-3 bg-white border rounded-full group hover:border-0 hover:bg-red-500 dark:border-DMThrColor dark:bg-DMMainColor dark:hover:hover:bg-red-500"
          >
            <AiOutlineGoogle className="flex-none w-12 h-12 p-2 mr-2 overflow-hidden text-white bg-red-500 rounded-full group-hover:p-1 bg-border-0" />
            <div className="mr-12 font-bold text-center grow text-black/70 group-hover:text-white dark:text-white/70">
              구글로 로그인
            </div>
          </div>
          <div
            role="button"
            onClick={() => handleNaver()}
            className="flex items-center h-16 p-3 mt-3 bg-white border rounded-full group hover:border-0 hover:bg-green-500 dark:border-DMThrColor dark:bg-DMMainColor dark:hover:bg-green-500"
          >
            <div className="flex-none w-12 h-12 mr-2 overflow-hidden p-1 group-hover:p-0.5 bg-green-500 rounded-full">
              <SiNaver className="w-full h-full text-green-500 bg-white rounded-full group-hover:p-0 ring-inset ring-4 ring-green-500 p-0.5" />
            </div>
            <div className="mr-12 font-bold text-center grow text-black/70 group-hover:text-black/80 group-hover:text-white dark:text-white/70">
              네이버로 로그인
            </div>
          </div>
          {/* <button className="flex justify-center items-center text-[34px] hover:text-[40px] font-black pb-1 w-16 h-16 rounded-full bg-white border hover:border-0 overflow-hidden text-gray-400 hover:text-white hover:bg-green-500 mx-8 duration-300">
            <div role="button" onClick={() => handleNaver()}>
              N
            </div>
          </button> */}
        </div>
      </div>
      <div className="my-4 pt-1.5 pb-2 px-8 bg-white/40 hover:bg-white/70 rounded-full dark:bg-DMSubColor/60 dark:hover:bg-DMSubColor">
        <label className="font-medium text-gray-500" htmlFor="goSignup">
          회원가입이 안되어있으시다구요?
        </label>
        <button
          className="ml-4 font-bold text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-600"
          onClick={goSignup}
          id="goSignup"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
