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

  const BurgurDropDown = () => {
    if (menu && isLogin) {
      return (
        <div
          className={`drop-shadow-xl m-1 p-2 md:hidden items-center justify-evenly rounded-lg bg-white fixed top-20 right-1 h-[12rem] w-[12rem] flex flex-col`}
        >
          <HeaderTextButton name="hamburgerMyPage" />
          <HeaderTextButton name="hamburgerLogout" />
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
          className={`drop-shadow-xl m-1 p-2 md:hidden items-center justify-evenly rounded-lg bg-white fixed top-20 right-1 h-[12rem] w-[12rem] flex flex-col`}
        >
          <HeaderTextButton name="hamburgerLogin" />
          <HeaderTextButton name="hamburgerSignup" />
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
      <button className="sm:hidden" onClick={handleSearchBar}>
        <BiSearch className="mr-2 text-3xl" />
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
    <div className="sticky top-0 z-20 bg-white">
      <div className="max-xl:w-full xl:w-[80rem] mx-auto px-4 h-20 flex flex-row items-center justify-between">
        <button
          className={searchBar ? 'hidden' : `flex-none`}
          onClick={handleHomeClick}
        >
          <img
            src={require('../../images/logo.png')}
            alt=""
            className="inline-block w-40 mb-1 mr-2"
          />
        </button>
        <SearchBar searchBar={searchBar} setSearchBar={setSearchBar} />
        <div className="flex flex-row flex-none h-full">
          <div className="flex flex-row items-center h-full md:hidden">
            {searchBar ? null : <MobileSearch />}
            <span className="flex items-center justify-center text-2xl rounded-full material-icons w-14 h-14 hover:bg-slate-100">
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
            {darkMode ? (
              <button
                className="flex flex-row items-center h-full mx-2"
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              >
                <span className="flex items-center justify-center text-2xl text-gray-600 rounded-full material-icons w-14 h-14 hover:bg-slate-100">
                  <BsFillMoonFill />
                </span>
              </button>
            ) : (
              <button
                className="flex flex-row items-center h-full mx-2"
                onClick={() => {
                  setDarkMode(!darkMode);
                }}
              >
                <span className="flex items-center justify-center text-2xl rounded-full material-icons w-14 h-14 hover:bg-slate-100">
                  <BsFillSunFill />
                </span>
              </button>
            )}

            {!isLogin ? (
              <>
                <div>
                  <HeaderTextButton name="login" />
                  <HeaderTextButton name="signup" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <HeaderTextButton name="My Page" />
                  <HeaderTextButton name="logout" />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
