import HeaderTextButton from '../Buttons/HeaderTextButton';
import SearchBar from './SearchBar';
import { BsFillSunFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';

export default function Header() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  const { isLogin } = useIsLogin();

  return (
    <div className="sticky top-0 z-20 shadow bg-white">
      <div className="max-xl:w-full xl:w-[80rem] mx-auto px-4 h-20 flex flex-row items-center justify-between">
        <button className="flex-none" onClick={handleHomeClick}>
          <img
            src={require('../../images/logo.png')}
            alt=""
            className="inline-block w-40 mb-1"
          />
        </button>
        <SearchBar />
        <div className="flex-none flex flex-row h-full">
          <button className="h-full flex flex-row items-center mx-2">
            <span className="material-icons text-2xl w-14 h-14 rounded-full hover:bg-slate-100 flex items-center justify-center">
              <BsFillSunFill />
            </span>
          </button>
          {!isLogin ? (
            <div>
              <HeaderTextButton name="login" />
              <HeaderTextButton name="signup" />
            </div>
          ) : (
            <div>
              <HeaderTextButton name="My Page" />
              <HeaderTextButton name="logout" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
