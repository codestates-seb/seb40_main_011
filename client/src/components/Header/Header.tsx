import HeaderTextButton from '../Buttons/HeaderTextButton';
import SearchBar from './SearchBar';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
import { GiHamburgerMenu } from '../../icons';
import { BiSearch } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useDarkMode } from '../../store/darkMode';

export default function Header() {
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };

  const onBurgerClicked = (e: any) => {
    setMenu(!menu);
  };

  const { isLogin } = useIsLogin();

  const DarkModeBtn = () => {
    if (darkMode) {
      return (
        <button
          className="flex flex-row items-center h-full mx-2"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          <span className="flex items-center justify-center text-2xl text-yellow-500 rounded-full material-icons w-14 h-14 hover:bg-slate-100 dark:hover:bg-DMThrColor">
            <BsFillMoonFill />
          </span>
        </button>
      );
    } else
      return (
        <button
          className="flex flex-row items-center h-full mx-2"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
        >
          <span className="flex items-center justify-center text-2xl text-red-500 rounded-full material-icons w-14 h-14 hover:bg-slate-100 ">
            <BsFillSunFill />
          </span>
        </button>
      );
  };

  const BurgurDropDown = () => {
    if (menu && isLogin) {
      return (
        <div
          className={`drop-shadow-xl m-1 p-2 md:hidden items-center justify-evenly rounded-lg bg-white fixed top-20 right-1 h-[16rem] w-[12rem] flex flex-col dark:bg-DMSubColor`}
        >
          <HeaderTextButton name="hamburgerMyPage" />
          <HeaderTextButton name="hamburgerLogout" />
          <DarkModeBtn />
          <div className="p-2 text-sm text-slate-400">
            <div>문의</div>
            <div>contact@codetech.com</div>
          </div>
        </div>
      );
    }
    if (!isLogin) {
      return (
        <div
          className={`drop-shadow-xl m-1 p-2 md:hidden items-center justify-evenly rounded-lg bg-white fixed top-20 right-1 h-[16rem] w-[12rem] flex flex-col dark:bg-DMSubColor`}
        >
          <HeaderTextButton name="hamburgerLogin" />
          <HeaderTextButton name="hamburgerSignup" />
          <DarkModeBtn />
          <div className="p-2 text-sm text-slate-400">
            <div>문의</div>
            <div>contact@codetech.com</div>
          </div>
        </div>
      );
    }
    return null;
  };

  const MobileSearch = () => {
    return (
      <button
        className="flex items-center justify-center rounded-full material-icons w-14 h-14 hover:bg-slate-100 dark:hover:bg-DMThrColor"
        onClick={handleSearchBar}
      >
        <BiSearch className="text-3xl" />
      </button>
    );
  };

  const [searchBar, setSearchBar] = useState(false);
  const handleSearchBar = () => {
    setSearchBar(!searchBar);
  };

  const { darkMode, setDarkMode } = useDarkMode();
  useEffect(() => {
    if (darkMode) {
      localStorage.setItem('color theme', 'dark');
      document.documentElement.classList.add('dark');
    } else {
      localStorage.setItem('color theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="sticky top-0 z-20 bg-white dark:bg-DMSubColor dark:text-white transition-all">
      <div className="max-xl:w-full xl:w-[80rem] mx-auto px-4 h-20 flex flex-row items-center justify-between">
        <button
          className={searchBar ? 'hidden' : `flex-none`}
          onClick={handleHomeClick}
        >
          <img
            src={
              darkMode
                ? require('../../images/darkmode_logo.png')
                : require('../../images/logo.png')
            }
            alt=""
            className="inline-block w-40 mb-1 mr-2"
          />
        </button>
        <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />
        <div className="flex flex-row flex-none h-full">
          <div className="flex flex-row items-center h-full md:hidden ">
            {searchBar ? null : <MobileSearch />}
            <span className="ml-2 flex items-center justify-center text-2xl rounded-full material-icons w-14 h-14 hover:bg-slate-100 dark:hover:bg-DMThrColor">
              <GiHamburgerMenu role="button" onClick={onBurgerClicked} />
            </span>
          </div>
          {menu ? (
            <>
              <div
                onClick={onBurgerClicked}
                className="fixed inset-0 flex items-center justify-center w-full h-screen justify-content"
              ></div>
              <BurgurDropDown />
            </>
          ) : null}
          <div className="flex max-md:hidden">
            <DarkModeBtn />
            {!isLogin ? (
              <>
                <div>
                  <HeaderTextButton name="로그인" />
                  <HeaderTextButton name="회원가입" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <HeaderTextButton name="마이페이지" />
                  <HeaderTextButton name="로그아웃" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
