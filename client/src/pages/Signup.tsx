import React, {
  ChangeEvent,
  useCallback,
  useState,
  KeyboardEvent,
} from 'react';
import '../components/common.css';
import { useNavigate } from 'react-router-dom';
import { postSignup } from '../util/apiCollection';
import {
  BsFillPatchExclamationFill,
  AiFillEyeInvisible,
  AiFillEye,
} from '../icons';
import { emailRegex, passwordRegex } from '../util/Regex';
import Confirm from '../components/Modal/Confirm';
import { postEmailCertificationCheck, postEmail } from '../util/apiCollection';
import { useDarkMode } from '../store/darkMode';

const Signup = () => {
  //이름, 이메일, 인증번호, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [certification, setCertification] = useState<string>('');
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

  //인증메일 전송버튼 클릭 여부
  const [emailBut, setIsEmailBut] = useState<boolean>(false);
  //이메일 인증 완료 여부
  const [emailCheckCompletion, setEmailCheckCompletion] =
    useState<boolean>(false);

  //다크모드
  const { darkMode } = useDarkMode();

  // navigate login & home
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  const goLogin = () => {
    navigate('/login');
  };

  // 랜덤 뽑기 (1~6)
  const getNumber = () => {
    return Math.floor(Math.random() * (6 - 1) + 1);
  };

  // 랜덤 img-placeholder
  const imgPlaceholder = [
    '/images/806e6c95-9a43-4429-bb85-39cbb41b1efd.blob',
    '/images/070879f5-b47a-4442-b190-cc6c93ee30e1.blob',
    '/images/7e7e58ce-a06f-4041-b07b-136663eda5b8.blob',
    '/images/ed522189-3328-4c52-8036-570514053525.blob',
    '/images/e65b65a3-6b96-494c-9f69-cfde15b630c6.blob',
    '/images/745628a1-8a67-47c3-afe4-11bdba1491b2.blob',
  ];
  const image = imgPlaceholder[getNumber()];

  //이름
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 10) {
      setNameMessage('닉네임은 2글자 이상 10글자 미만으로 입력해주세요');
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

  //인증번호
  const onChangeCertification = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const certificationCurrent = e.target.value;
      setCertification(certificationCurrent);
    },
    []
  );

  //비밀번호
  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  //비밀번호 확인
  const onChangePasswordCheck = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
  const handleEnter = (
    e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>,
    next: string
  ) => {
    const key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
      if (next === 'signUpSubmit') {
        onSubmit;
      } else {
        document.getElementById(next)?.focus();
      }
    }
  };

  // error modal
  const [showModal, setShowModal] = useState(false);
  const modalMsg: string[] = [
    '닉네임을 입력하지 않았습니다.',
    '이메일을 입력하지 않았습니다.',
    '비밀번호를 입력하지 않았습니다.',
    '비밀번호 확인을 입력하지 않았습니다.',
    '이메일로 인증번호가 전송되었습니다',
    '이메일이 유효하지 않습니다',
    '인증번호를 입력하지 않았습니다',
    '이메일 인증이 완료되었습니다 :)',
    '인증번호가 유효하지 않습니다',
    '회원가입이 완료되었습니다',
    '회원가입 실패 ㅜㅜ 코드테크로 문의해주세요',
    '가입이 되어있는 이메일입니다 ㅜㅜ',
    '탈퇴한 이메일은 재가입이 불가능합니다 ㅜㅜ',
    '메일 인증이 확인되지 않은 경우 가입이 불가합니다',
  ];
  const [msg, setMsg] = useState(modalMsg[0]);

  //이메일 인증 => 메일 전송 클릭시 post 요청
  const emailButClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailData = {
      email: email,
    };

    if (email.length === 0) {
      setMsg(modalMsg[1]);
      setIsEmailBut(emailBut);
      return setShowModal(true);
    } else {
      const emailCheckReq = await postEmail(emailData);
      switch (emailCheckReq.status) {
        case 200:
          setMsg(modalMsg[4]);
          setShowModal(true);
          setIsEmailBut(true);
          break;
        case 400:
          setMsg(modalMsg[12]);
          setShowModal(true);
          break;
        case 404:
          setMsg(modalMsg[5]);
          setShowModal(true);
          break;
        case 409:
          setMsg(modalMsg[11]);
          setShowModal(true);
          break;
      }
    }
  };

  //이메일 인증 번호 작성 후 post 요청
  const emailNumCheckClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const emailNumData = {
      email: email,
      code: certification,
    };

    if (certification.length === 0) {
      setMsg(modalMsg[6]);
      setIsEmailBut(emailBut);
      return setShowModal(true);
    } else {
      const emailCheckReq = await postEmailCertificationCheck(emailNumData);
      switch (emailCheckReq.status) {
        case 200:
          setMsg(modalMsg[7]);
          setShowModal(true);
          setEmailCheckCompletion(true);
          setIsEmailBut(!emailBut);
          break;
        case 404:
          setMsg(modalMsg[8]);
          setShowModal(true);
          break;
      }
    }
  };

  // 회원가입 submit
  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (nickname.length === 0) {
      setMsg(modalMsg[0]);
      return setShowModal(true);
    }
    if (password.length === 0) {
      setMsg(modalMsg[2]);
      return setShowModal(true);
    }
    if (passwordCheck.length === 0) {
      setMsg(modalMsg[3]);
      return setShowModal(true);
    }
    if (emailCheckCompletion === false) {
      setMsg(modalMsg[13]);
      return setShowModal(true);
    }

    if (
      nickname.length !== 0 &&
      email.length !== 0 &&
      password.length !== 0 &&
      passwordCheck.length !== 0
    ) {
      const signupResult = await postSignup({
        email,
        password,
        nickname,
        image,
      });
      console.log(signupResult);
      switch (signupResult.status) {
        case 200:
          setMsg(modalMsg[9]);
          setShowModal(true);
          navigate('/login');
          break;
        case 401:
          setMsg(modalMsg[10]);
          setShowModal(true);
          break;
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen pt-8 bg-slate-300 max-md:pt-0 max-md:justify-start dark:bg-DMMainColor">
      {showModal && <Confirm msg={msg} setShowModal={setShowModal} />}
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
        <form name="signup" className="flex flex-col justify-center">
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 dark:bg-DMThrColor dark:ring-DMMainColor ${
              nickname.length > 5 && !isName
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type="text"
              id="nickname"
              className="absolute top-0 w-full h-full px-6 pt-3 text-base font-medium bg-transparent outline-none peer/email input-ani dark:text-white"
              value={nickname}
              name="nicmname"
              onChange={onChangeName}
              onKeyPress={(e) => handleEnter(e, 'email')}
            ></input>
            <label
              className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs dark:text-white ${
                nickname.length !== 0 &&
                'peer-valid/email:-translate-y-2.5 peer-valid/email:text-xs'
              }`}
            >
              닉네임
            </label>
            {nickname.length > 5 && !isName && (
              <span className="relative flex items-center text-xs font-medium text-red-600 pointer-events-none top-16">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                {nameMessage}
              </span>
            )}
          </div>
          {/* 이메일 */}
          {/* 이메일 */}
          {/* 이메일 */}
          {/* 이메일 */}
          <div className="flex">
            <div
              className={`grow relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 dark:bg-DMThrColor dark:ring-DMMainColor ${
                email.length > 5 && !isEmail
                  ? 'mb-10 ring-red-500 ring-2'
                  : 'mb-4'
              }`}
            >
              <input
                type="text"
                id="email"
                className="absolute top-0 w-full h-full px-6 pt-3 text-base font-medium bg-transparent outline-none peer/email input-ani dark:text-white"
                value={email}
                name="email"
                onChange={onChangeEmail}
                onKeyDown={(e) => handleEnter(e, 'but01')}
              ></input>
              <label
                className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs dark:text-white ${
                  email.length !== 0 &&
                  'peer-valid/email:-translate-y-2.5 peer-valid/email:text-xs'
                }`}
              >
                {emailCheckCompletion === false ? `이메일` : `이메일 인증완료`}
              </label>
              {email.length > 5 && !isEmail && (
                <span className="relative flex items-center text-xs font-medium text-red-600 pointer-events-none top-16">
                  <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                  {emailMessage}
                </span>
              )}
            </div>
            {/* 인증번호 버튼 */}
            {/* 인증번호 버튼 */}
            <button
              type="button"
              id="but01"
              className="px-3 pb-1 ml-2 text-base font-medium text-white rounded-md h-14 bg-slate-600 hover:bg-blue-500"
              onClick={emailButClick}
              onKeyDown={(e) => handleEnter(e, 'emailCertification')}
            >
              메일 전송
            </button>
          </div>
          {/* 이메일 검증 */}
          {/* 이메일 검증 */}
          {/* 이메일 검증 */}
          {/* 이메일 검증 */}
          {/* 인증 메일 전송 버튼 클릭했을 때만 뜸 */}
          {!emailBut ? null : (
            <div className="flex">
              <div
                className={`relative w-3/4 bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 mb-4 dark:bg-DMThrColor dark:ring-DMMainColor ${
                  email.length > 5 && !isEmail && 'ring-red-500 ring-2'
                }`}
              >
                <input
                  type="text"
                  id="emailCertification"
                  className="absolute top-0 w-full h-full px-6 pt-3 text-base font-medium bg-transparent rounded outline-none peer/email input-ani dark:text-white dark:bg-DMThrColor"
                  value={certification}
                  name="emailCertification"
                  onChange={onChangeCertification}
                  onKeyDown={(e) => handleEnter(e, 'but02')}
                ></input>
                <label
                  className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/email:-translate-y-2.5 peer-focus/email:text-xs dark:text-white ${
                    nickname.length !== 0 &&
                    'peer-valid/email:-translate-y-2.5 peer-valid/email:text-xs'
                  }`}
                >
                  인증번호 입력
                </label>
              </div>
              {/* 인증번호 완료버튼 */}
              <div className="relative w-1/4 ml-2 rounded h-14">
                <button
                  type="button"
                  id="but02"
                  className="w-full h-full pb-1 text-base font-medium text-white rounded-md bg-emerald-500 hover:bg-blue-500"
                  onClick={emailNumCheckClick}
                  onKeyPress={(e) => handleEnter(e, 'password')}
                >
                  인증 완료
                </button>
              </div>
            </div>
          )}
          {/* 비밀번호 */}
          {/* 비밀번호 */}
          {/* 비밀번호 */}
          {/* 비밀번호 */}
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 dark:bg-DMThrColor dark:ring-DMMainColor ${
              password.length > 5 && !isPassword
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type={passwordType}
              id="password"
              className="absolute top-0 w-full h-full px-6 pt-3 text-base font-medium bg-transparent outline-none peer/password input-ani dark:text-white"
              value={password}
              name="password"
              onChange={onChangePassword}
              onKeyPress={(e) => handleEnter(e, 'passwordCheck')}
            ></input>
            <label
              className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs dark:text-white ${
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
              <span className="relative flex items-center text-xs font-medium text-red-600 pointer-events-none top-16">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                {passwordMessage}
              </span>
            )}
          </div>
          {/* 비밀번호 확인 */}
          {/* 비밀번호 확인 */}
          {/* 비밀번호 확인 */}
          {/* 비밀번호 확인 */}
          <div
            className={`relative bg-gray-50 rounded h-14 ring-inset ring-1 ring-slate-200 hover:ring-slate-400 hover:ring-2 dark:bg-DMThrColor dark:ring-DMMainColor ${
              passwordCheck.length > 5 && !isPasswordCheck
                ? 'mb-10 ring-red-500 ring-2'
                : 'mb-4'
            }`}
          >
            <input
              type={passwordCheckType}
              id="passwordCheck"
              className="absolute top-0 w-full h-full px-6 pt-3 text-base font-medium bg-transparent outline-none peer/password input-ani dark:text-white"
              value={passwordCheck}
              name="password"
              onChange={onChangePasswordCheck}
              onKeyPress={(e) => handleEnter(e, 'signUpSubmit')}
            ></input>
            <label
              className={`absolute font-medium top-4 left-6 text-gray-500 duration-200 pointer-events-none peer-focus/password:-translate-y-2.5 peer-focus/password:text-xs dark:text-white ${
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
              <span className="relative flex items-center text-xs font-medium text-red-600 pointer-events-none top-16">
                <BsFillPatchExclamationFill className="inline mr-1 text-base mt-0.5" />
                {passwordCheckMessage}
              </span>
            )}
          </div>
          <button
            id="signUpSubmit"
            type="button"
            onClick={onSubmit}
            className="w-full h-16 pb-1 text-xl font-bold text-white bg-blue-600 rounded-md hover:bg-blue-500"
          >
            회원가입
          </button>
        </form>
      </div>
      <div className="my-4 pt-1.5 pb-2 px-8 hover:bg-white/20 rounded-full dark:hover:bg-DMSubColor">
        <label className="font-medium text-gray-500" htmlFor="goLogin">
          계정이 이미 있으시다구요?
        </label>
        <button
          className="ml-4 font-bold text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-600"
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
