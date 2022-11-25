import create from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginState {
  isLogin: boolean;
  initialToken: string | null;
  loginId: number | null;
  Login: (id: number) => void;
  Logout: () => void;
}

export const useIsLogin = create<LoginState>()(
  persist((set) => ({
    isLogin: false,
    initialToken: null,
    loginId: null,
    Login(id) {
      set(() => ({
        initialToken: localStorage.getItem('authorization'),
        isLogin: true,
        loginId: id,
      }));
    },
    Logout: () =>
      set(() => ({ isLogin: false, initialToken: null, loginId: null })),
  }))
);
