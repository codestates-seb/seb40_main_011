import create from 'zustand';
import { persist } from 'zustand/middleware';

interface LoginState {
  isLogin: boolean;
  initialToken: string | null;
  Login: () => void;
  Logout: () => void;
}

// export const initialToken = localStorage.getItem('authorization');
// export const [token, setToken] = useState<string|null>(null);

export const useIsLogin = create<LoginState>()(
  persist((set) => ({
    isLogin: false,
    initialToken: null,
    Login() {
      set(() => ({
        initialToken: localStorage.getItem('authorization'),
        isLogin: true,
      }));
    },
    Logout: () => set(() => ({ isLogin: false, initialToken: null })),
  }))
);
