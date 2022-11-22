import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiOutlineGoogle } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';
import { postLogin } from '../util/apiCollection';
import { useIsLogin } from '../store/login';

export default function Login() {
  // 홈으로 이동
  const navigate = useNavigate();
  // const handleHomeClick = () => {
  //   navigate('/');
  // };

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
  const passwordPattern = new RegExp('^[a-zA-Z0-9!@#$%^*+=-]+$');
  const emailPattern = new RegExp(
    '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
  );

  // onChange inputs
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'email') {
      setEmail(value.trim());
      if (!emailPattern.test(value.trim())) {
        setIsValidEmail(false);
      } else if (emailPattern.test(value.trim())) {
        setIsValidEmail(true);
      }
    } else if (name === 'password') {
      setPassword(value.trim());
      if (!passwordPattern.test(value)) {
        setIsValidPassword(false);
      } else if (emailPattern.test(value)) {
        setIsValidPassword(true);
      }
    }
  };

  // login status
  const { Login, Logout } = useIsLogin();

  // submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginResult = await postLogin({ email, password });
    switch (loginResult.status) {
      case 200:
        localStorage.setItem('refresh', loginResult.headers.get('refresh'));
        localStorage.setItem(
          'authorization',
          loginResult.headers.get('authorization')
        );
        Login();
        navigate('/');
        break;
      case 401:
        Logout();
        alert('이메일과 비밀번호가 일치하지 않습니다.');
        console.error(loginResult.status + ' Error');
        break;
      default:
    }
  };

  return (
    <div className="w-full bg-slate-300 pt-20 pb-32 flex flex-col items-center">
      <div className="max-md:w-full md:w-[32rem] bg-white flex justify-center flex-col p-12 rounded-2xl">
        <h1 className="font-bold text-4xl text-slate-800 mt-4 mb-12 text-center">
          Login
        </h1>
        <div className="flex justify-center items-center hover:scale-105 duration-500">
          {/* <button className="w-52 py-12" onClick={handleHomeClick}>
            <img src={require('../images/logo.png')} alt="" className="" />
          </button> */}
        </div>
        <div className="flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="relative bg-gray-50 rounded w-96 h-14 mb-4 ring-1 ring-slate-200">
              <input
                type="text"
                className="peer/email input-ani outline-none bg-transparent text-base absolute w-full pt-3 px-14 top-0 h-full font-medium"
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
                E-mail
              </label>
              <MdOutlineEmail className="absolute text-3xl text-gray-300 top-3.5 left-4" />
              {/* {email.length > 5 && !isValidEmail && (
                <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                  <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                  유효한 이메일 주소가 아닙니다.
                </span>
              )} */}
            </div>
            <div className="relative bg-gray-50 rounded w-96 h-14 mb-4 ring-1 ring-slate-200">
              <input
                type={passwordType}
                className="peer/password input-ani outline-none bg-transparent text-base absolute pt-3 px-14 top-0 w-full h-full font-medium"
                value={password}
                name="password"
                onChange={handleInputs}
              ></input>
              <label
                className={`absolute font-medium top-4 left-14 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs ${
                  password.length !== 0 &&
                  'peer-valid/password:-translate-y-2.5 peer-valid/password:text-xs'
                }`}
              >
                Password
              </label>
              <RiLockPasswordLine className="absolute text-3xl text-gray-300 top-3.5 left-4" />
              <button
                onClick={handlePasswordType}
                className="absolute text-3xl text-gray-300 top-3.5 right-4 hover:text-gray-600"
              >
                {passwordType === 'password' ? (
                  <AiFillEyeInvisible />
                ) : (
                  <AiFillEye />
                )}
              </button>
              {/* {password.length > 5 && !isValidPassword && (
                <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                  <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                  유효한 비밀번호가 아닙니다..
                </span>
              )} */}
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="w-full bg-blue-600 h-16 rounded-md text-xl font-bold pb-1 text-white hover:bg-blue-500"
            >
              Log in
            </button>
          </form>
        </div>
        {/* <span className="text-center text-gray-400 font-medium py-10">
          or use your sns account
        </span> */}
        <div className="flex flex-row justify-center mb-4 pt-12">
          <button className="mx-8">
            <RiKakaoTalkFill className="text-3xl p-2 w-16 h-16 rounded-full bg-white border overflow-hidden text-gray-400 hover:text-black hover:bg-yellow-300 bg-border-0 duration-500" />
          </button>
          <button className="mx-8">
            <AiOutlineGoogle className="text-3xl p-2 w-16 h-16 rounded-full bg-white border overflow-hidden text-gray-400 hover:text-white hover:bg-red-500 bg-border-0 duration-500" />
          </button>
          <button className="flex justify-center items-center text-[36px] font-black pb-1 w-16 h-16 rounded-full bg-white border overflow-hidden text-gray-400 hover:text-white hover:bg-green-500 bg-border-0 mx-8 duration-500">
            <div className="pointer-events-none">N</div>
          </button>
        </div>
      </div>
      <div className="my-4">
        <span className="text-gray-500">회원가입이 안되어있으시다구요?</span>
        <button className="font-bold ml-2 text-gray-700 hover:text-blue-600">
          회원가입
        </button>
      </div>
    </div>
  );
}
