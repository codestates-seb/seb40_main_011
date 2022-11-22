import create from 'zustand';

interface LoginState {
  isLogin: boolean;
  // authorization: null | string;
  Login: () => void;
  Logout: () => void;
}

export const initialToken = localStorage.getItem('authorization');

export const useIsLogin = create<LoginState>((set) => ({
  isLogin: false,
  Login() {
    set({
      isLogin: true,
    });
  },
  Logout: () => set({ isLogin: false }),
}));
