//회원가입 페이지
//안지은 작성
import React, { ChangeEvent, useCallback, useState } from 'react';
import SignUpButton from '../components/Buttons/SignUp';
import '../components/common.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
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

  const navigator = useNavigate();

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await axios
          .post('http://localhost:3001/signup', {
            email: email,
            password: password,
            displayName: name,
          })
          .then((res) => {
            console.log('User token', res.data.jwt);
            localStorage.setItem('token', res.data.jwt);
            navigator('/');
          });
      } catch (err) {
        console.log('error', err);
      }
    },
    [name, email, password]
  );

  //이름
  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('닉네임은 2글자 이상 5글자 미만으로 입력해주세요');
      setIsName(false);
    } else {
      setNameMessage('사용 가능한 닉네임입니다');
      setIsName(true);
    }
  }, []);

  //이메일
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
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
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
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

  return (
    <div className="flex items-center justify-center h-screen border-2 border-sky-500">
      <div className="px-20 py-12 m-auto border shadow-lg rounded-xl border-zinc-500">
        <img
          src={require('../images/logo.png')}
          alt=""
          className="pb-10 m-auto w-52"
        />
        <form
          name="signup"
          action="/signup"
          method="POST"
          className="mb-3"
          onSubmit={onSubmit}
        >
          <label className="font-medium">User Name</label>
          <br />
          <input
            type="text"
            id="username"
            value={name}
            onChange={onChangeName}
            placeholder="이름을 입력하세요"
            className="signup-input"
          />
          {name.length > 0 && (
            <p
              className={`message ${
                isName ? 'signup-p-true' : 'signup-p-false'
              }`}
            >
              {nameMessage}
            </p>
          )}
          <br />
          <label className="font-medium">Email</label>
          <br />
          <input
            type="text"
            id="email"
            value={email}
            onChange={onChangeEmail}
            placeholder="이메일을 입력하세요"
            className="signup-input"
          />
          {email.length > 0 && (
            <p
              className={`message ${
                isEmail ? 'signup-p-true' : 'signup-p-false'
              }`}
            >
              {emailMessage}
            </p>
          )}
          <br />
          <label className="font-medium">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={onChangePassword}
            placeholder="비밀번호를 입력하세요"
            className="signup-input"
          />
          {password.length > 0 && (
            <p
              className={`message ${
                isPassword ? 'signup-p-true' : 'signup-p-false'
              }`}
            >
              {passwordMessage}
            </p>
          )}
          <br />
          <label className="font-medium">Repeat Password</label>
          <br />
          <input
            type="password"
            id="password-repeat"
            placeholder="비밀번호를 입력하세요"
            className="signup-input"
            onChange={onChangePasswordCheck}
          />
          {passwordCheck.length > 0 && (
            <p
              className={`message ${
                isPasswordCheck ? 'signup-p-true' : 'signup-p-false'
              }`}
            >
              {passwordCheckMessage}
            </p>
          )}
          <div className="flex items-center justify-center mt-10">
            <SignUpButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
