import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';

export default function HeaderTextButton({ name }: { name: string }) {
  const navigate = useNavigate();
  const { Logout } = useIsLogin();
  const onClick = () => {
    switch (name) {
      case 'login':
        navigate('/login');
        break;
      case 'signup':
        navigate('/signup');
        break;
      case 'My Page':
        navigate('/mypage');
        break;
      case 'logout' || 'hamburgerLogout':
        localStorage.removeItem('refresh');
        localStorage.removeItem('authorization');
        Logout();
        navigate('/');
    }
  };

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
