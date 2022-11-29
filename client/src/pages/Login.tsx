import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin, postGoogle } from '../util/apiCollection';
import { useIsLogin } from '../store/login';
import {
  MdOutlineEmail,
  AiFillEyeInvisible,
  AiOutlineGoogle,
  AiFillEye,
  RiKakaoTalkFill,
  RiLockPasswordLine,
  BsFillPatchExclamationFill,
} from '../icons';
import { emailRegex, passwordRegex } from '../util/Regex';
import Confirm from '../components/Modal/Confirm';

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

  // 이메일, 비밀번호 유효성 검사
  // const passwordPattern = new RegExp('^[a-zA-Z0-9!@#$%^*+=-]+$');
  // const emailPattern = new RegExp(
  //   '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
  // );

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
      case 200:
        localStorage.setItem('refresh', loginResult.headers.get('refresh'));
        localStorage.setItem(
          'authorization',
          loginResult.headers.get('authorization')
        );
        Login(loginResult.headers.id);
        navigate('/');
        break;
      case 401:
        // alert('이메일과 비밀번호가 일치하지 않습니다.');
        console.error(loginResult.status + ' Error');
        break;
      default:
    }
  };

  // google login
  const handleGoogle = async () => {
    const loginResult = await postGoogle();
  };

  // showError 모달
  const [showModal, setShowModal] = useState(false);
  const errorMsg: [string, string] = [
    '이메일을 입력하지 않았습니다.',
    '비밀번호를 입력하지 않았습니다.',
  ];
  const [msg, setMsg] = useState(errorMsg[0]);

  return (
    <div className="w-full h-screen bg-slate-300 pt-8 max-md:pt-0 flex flex-col items-center justify-center max-md:justify-start">
      {showModal && <Confirm setShowModal={setShowModal} msg={msg} />}
      <div className="max-md:w-full md:w-[32rem] bg-white flex justify-center flex-col p-16 rounded-3xl max-md:rounded-none shadow-2xl/30">
        <img
          src={require('../images/logo.png')}
          alt=""
          className="w-56 pb-10 m-auto cursor-pointer"
          onClick={handleHomeClick}
        />
        <form onSubmit={handleSubmit} className="flex flex-col justify-center">
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 ${
              email.length > 5 && !isValidEmail
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type="text"
              className="absolute top-0 w-full h-full pt-3 text-base font-medium bg-transparent outline-none peer/email input-ani px-14"
              value={email}
              name="email"
              onChange={handleInputs}
            ></input>
            <label
              className={`absolute font-medium top-4 left-14 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs ${
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
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 ${
              password.length > 5 && !isValidPassword
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type={passwordType}
              className="absolute top-0 w-full h-full pt-3 text-base font-medium bg-transparent outline-none peer/password input-ani px-14"
              value={password}
              name="password"
              onChange={handleInputs}
              onKeyDown={handleEnter}
            ></input>
            <label
              className={`absolute font-medium top-4 left-14 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs ${
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

        {/* <span className="py-10 font-medium text-center text-gray-400">
          or use your sns account
        </span> */}
        <div className="flex flex-row justify-center pt-12">
          <button className="mx-8">
            <RiKakaoTalkFill className="w-16 h-16 p-3 overflow-hidden text-gray-400 duration-300 bg-white border rounded-full hover:p-2 hover:border-0 hover:text-black hover:bg-yellow-300 bg-border-0" />
          </button>
          <a
            href="/oauth2/authorization/google"
            className="mx-8"
            target="_blank"
          >
            <AiOutlineGoogle
              onClick={handleGoogle}
              className="w-16 h-16 p-3 overflow-hidden text-gray-400 duration-300 bg-white border rounded-full hover:p-2 hover:border-0 hover:text-white hover:bg-red-500 bg-border-0"
            />
          </a>
          <button className="flex justify-center items-center text-[34px] hover:text-[40px] font-black pb-1 w-16 h-16 rounded-full bg-white border hover:border-0 overflow-hidden text-gray-400 hover:text-white hover:bg-green-500 mx-8 duration-300">
            <div className="pointer-events-none">N</div>
          </button>
        </div>
      </div>
      <div className="my-4 pt-1.5 pb-2 px-8 hover:bg-white/20 rounded-full">
        <label className="font-medium text-gray-500" htmlFor="goSignup">
          회원가입이 안되어있으시다구요?
        </label>
        <button
          className="ml-4 font-bold text-gray-700 hover:text-blue-600"
          onClick={goSignup}
          id="goSignup"
        >
          회원가입
        </button>
      </div>
    </div>
  );
}
