import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';

export default function HeaderTextButton({ name }: { name: string }) {
  const navigate = useNavigate();
  const { Logout } = useIsLogin();
  const onClick = () => {
    switch (name) {
      case 'hamburgerLogin':
      case '로그인':
        navigate('/login');
        break;
      case 'hamburgerSignup':
      case '회원가입':
        navigate('/signup');
        break;
      case 'hamburgerMyPage':
      case '마이페이지':
        navigate('/mypage');
        break;
      case 'hamburgerLogout':
      case '로그아웃':
        localStorage.removeItem('refresh');
        localStorage.removeItem('authorization');
        Logout();
        navigate('/');
    }
  };

  if (name === 'hamburgerMyPage') {
    return (
      <button
        onClick={onClick}
        className="p-2 w-full text-lg hover:bg-slate-100 my-4 dark:hover:bg-DMThrColor"
      >
        마이페이지
      </button>
    );
  }

  if (name === 'hamburgerLogout') {
    return (
      <button
        onClick={onClick}
        className="p-2 w-full text-lg hover:bg-slate-100 dark:hover:bg-DMThrColor"
      >
        로그아웃
      </button>
    );
  }

  if (name === 'hamburgerLogin') {
    return (
      <button
        onClick={onClick}
        className="p-2 w-full text-lg hover:bg-slate-100 my-4 dark:hover:bg-DMThrColor"
      >
        로그인
      </button>
    );
  }

  if (name === 'hamburgerSignup') {
    return (
      <button
        onClick={onClick}
        className="p-2 w-full text-lg hover:bg-slate-100 dark:hover:bg-DMThrColor"
      >
        회원가입
      </button>
    );
  }

  return (
    <>
      <button
        onClick={onClick}
        className="h-full w-28 font-medium text-lg hover:bg-slate-100 hover:border-b-4 hover:border-slate-500 box-content dark:hover:bg-DMThrColor dark:hover:border-none"
      >
        {name}
      </button>
    </>
  );
}
