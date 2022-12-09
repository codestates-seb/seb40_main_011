import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useIsLogin } from '../store/login';

export default function SocialLogin() {
  const { Login } = useIsLogin();
  const navigate = useNavigate();

  /**access token */
  const token: string | null = new URL(window.location.href).searchParams.get(
    'access_token'
  );

  /**refresh token */
  const refreshToken: any = new URL(window.location.href).searchParams.get(
    'refresh_token'
  );

  /** id */
  const id: string | null = new URL(window.location.href).searchParams.get(
    'id'
  );

  useEffect(() => {
    const tokenStr: string = 'Bearer ' + token;
    switch (token === null) {
      case false: {
        localStorage.setItem('authorization', tokenStr);
        localStorage.setItem('refresh', refreshToken);
        Login(Number(id));
        navigate('/');
        break;
      }
      case true: {
        navigate('/');
        break;
      }
      default: {
        navigate('/');
      }
    }
  }, [token]);

  return <div></div>;
}
