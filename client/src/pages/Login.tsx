import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsFillPatchExclamationFill } from 'react-icons/bs';
import { MdOutlineEmail } from 'react-icons/md';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { AiOutlineGoogle } from 'react-icons/ai';
import { AiFillEye } from 'react-icons/ai';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { RiLockPasswordLine } from 'react-icons/ri';

export default function Login() {
  interface inputs {
    email: string;
    password: string;
  }

  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState('password');
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const handlePasswordType = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (passwordType === 'password') return setPasswordType('text');
    if (passwordType === 'text') return setPasswordType('password');
  };

  const handleHomeClick = () => {
    navigate('/');
  };

  const emailPattern = new RegExp(
    '^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
  );
  const passwordPattern = new RegExp('^[a-zA-Z0-9!@#$%^*+=-]+$');

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    if (name === 'email') {
      setInputs({
        ...inputs,
        [name]: value,
      });
      if (!emailPattern.test(value.trim())) {
        setIsValid({ ...isValid, [name]: false });
      } else if (emailPattern.test(value.trim())) {
        setIsValid({ ...isValid, [name]: true });
      }
    } else if (name === 'password') {
      setInputs({
        ...inputs,
        [name]: value,
      });
      if (!passwordPattern.test(value)) {
        setIsValid({ ...isValid, [name]: false });
      } else if (emailPattern.test(value)) {
        setIsValid({ ...isValid, [name]: true });
      }
    }
  };

  const handleSubmit = () => {
    return;
  };

  return (
    <div className="w-full min-h-screen bg-slate-300 pt-20 flex flex-col items-center">
      <div className="max-md:w-full md:w-[36rem] bg-white flex justify-center flex-col pt-8 pb-12 rounded-2xl">
        <div className="flex justify-center items-center hover:scale-105 duration-500">
          <h1 className="font-extrabold text-3xl tracking-tighter text-slate-400 mr-2">
            Log in to
          </h1>
          <button className="w-52 py-12" onClick={handleHomeClick}>
            <img src={require('../images/logo.png')} alt="" className="" />
          </button>
        </div>
        <div className="px-12 flex justify-center">
          <form onSubmit={handleSubmit}>
            <div className="relative bg-gray-50 rounded w-96 h-14 mb-10 ring-1 ring-slate-200">
              <input
                type="text"
                className="peer/email input-ani outline-none bg-transparent text-base absolute pt-3 px-4 top-0 left-10 w-full h-full font-medium"
                value={inputs.email}
                name="email"
                onChange={handleInputs}
              ></input>
              <label
                className={`absolute font-medium top-4 left-14 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs ${
                  inputs.email.length !== 0 &&
                  'peer-valid/email:-translate-y-2.5 peer-valid/email:text-xs'
                }`}
              >
                E-mail
              </label>
              <MdOutlineEmail className="absolute text-3xl text-gray-300 top-3.5 left-4" />
              {inputs.email.length > 5 && !isValid.email && (
                <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                  <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                  유효한 이메일 주소가 아닙니다.
                </span>
              )}
            </div>
            <div className="relative bg-gray-50 rounded w-96 h-14 mb-12 ring-1 ring-slate-200">
              <input
                type={passwordType}
                className="peer/password input-ani outline-none bg-transparent text-base absolute pt-3 px-4 top-0 left-10 w-full h-full font-medium"
                value={inputs.password}
                name="password"
                onChange={handleInputs}
              ></input>
              <label
                className={`absolute font-medium top-4 left-14 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs ${
                  inputs.password.length !== 0 &&
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
              {inputs.password.length > 5 && !isValid.password && (
                <span className="relative pointer-events-none top-16 text-sm text-red-600 flex items-center">
                  <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                  유효한 비밀번호가 아닙니다..
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 h-16 rounded-md text-xl font-bold pb-1 text-white hover:bg-blue-500"
            >
              Log in
            </button>
          </form>
        </div>
        <span className="text-center text-gray-400 font-medium text-sm py-4">
          or use your sns account
        </span>
        <div className="flex flex-row justify-center mb-4">
          <button className="mx-8">
            <RiKakaoTalkFill className="text-3xl p-2 w-16 h-16 rounded-full bg-white border overflow-hidden text-gray-400 hover:text-black hover:bg-yellow-300 bg-border-0 hover:rotate-12 duration-500" />
          </button>
          <button className="mx-8">
            <AiOutlineGoogle className="text-3xl p-2 w-16 h-16 rounded-full bg-white border overflow-hidden text-gray-400 hover:text-white hover:bg-red-500 bg-border-0 hover:rotate-12 duration-500" />
          </button>
          <button className="flex justify-center items-center text-[36px] font-black pb-1 w-16 h-16 rounded-full bg-white border overflow-hidden text-gray-400 hover:text-white hover:bg-green-500 bg-border-0 mx-8 hover:rotate-12 duration-500">
            <div className="pointer-events-none">N</div>
          </button>
        </div>
      </div>
      <div className="my-4 text-lg">
        <span className="font-medium text-gray-500">
          회원가입이 안되어있으시다구요?
        </span>
        <button className="font-bold ml-2 text-gray-700 hover:text-blue-600">
          회원가입
        </button>
      </div>
    </div>
  );
}
