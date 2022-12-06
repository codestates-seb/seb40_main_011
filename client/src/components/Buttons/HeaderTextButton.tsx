import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';

export default function HeaderTextButton({ name }: { name: string }) {
  const navigate = useNavigate();
  const { Logout } = useIsLogin();
  const onClick = () => {
    switch (name) {
      case 'hamburgerLogin':
      case 'login':
        navigate('/login');
        break;
      case 'hamburgerSignup':
      case 'signup':
        navigate('/signup');
        break;
      case 'hamburgerMyPage':
      case 'My Page':
        navigate('/mypage');
        break;
      case 'hamburgerLogout':
      case 'logout':
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
        className="p-2 w-full text-lg hover:bg-slate-100"
      >
        My page
      </button>
    );
  }

  if (name === 'hamburgerLogout') {
    return (
      <button
        onClick={onClick}
        className="p-2 w-full text-lg hover:bg-slate-100"
      >
        Logout
      </button>
    );
  }

  if (name === 'hamburgerLogin') {
    return (
      <button
        onClick={onClick}
        className="p-2 w-full text-lg hover:bg-slate-100"
      >
        Login
      </button>
    );
  }

  if (name === 'hamburgerSignup') {
    return (
      <button
        onClick={onClick}
        className="p-2 w-full text-lg hover:bg-slate-100"
      >
        SignUp
      </button>
    );
  }

  return (
    <>
      <button
        onClick={onClick}
        className="h-full w-28 font-medium text-lg hover:bg-slate-100 hover:border-b-4 hover:border-slate-500 box-content"
      >
        {name}
      </button>
    </>
  );
}
