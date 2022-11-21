import { useNavigate } from 'react-router-dom';

export default function HeaderTextButton({ name }: { name: string }) {
  const navigate = useNavigate();
  const onLoginClick = () => {
    navigate('/login');
  };
  const onSignUpClick = () => {
    navigate('/signup');
  };
  return (
    <>
      <button
        onClick={
          name === 'login' ? () => onLoginClick() : () => onSignUpClick()
        }
        className="h-full w-28 font-medium text-lg hover:bg-slate-100 hover:border-b-4 hover:border-slate-500 box-content"
      >
        {name}
      </button>
    </>
  );
}
