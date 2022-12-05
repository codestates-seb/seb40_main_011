import HeaderTextButton from '../Buttons/HeaderTextButton';
import SearchBar from './SearchBar';
import { BsFillSunFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useIsLogin } from '../../store/login';
import { GiHamburgerMenu } from '../../icons';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
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
    return <BiSearch className="text-3xl mr-2" />;
  };

  const [searchBar, setSearchBar] = useState(false);
  const handleSearchBar = () => {
    setSearchBar(!searchBar);
  };

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
        <div className="flex-none flex flex-row h-full">
          <button className="h-full flex flex-row items-center md:hidden">
            {searchBar ? null : (
              <button className="sm:hidden" onClick={handleSearchBar}>
                <MobileSearch />
              </button>
            )}
            <span className="material-icons text-2xl w-14 h-14 rounded-full hover:bg-slate-100 flex items-center justify-center">
              <GiHamburgerMenu onClick={onBurgerClicked} />
            </span>
          </button>
          {menu ? (
            <div
              onClick={onBurgerClicked}
              className="fixed inset-0 h-screen w-full flex justify-content justify-center items-center"
            >
              <BurgurDropDown />
            </div>
          ) : null}
          <div className="max-md:hidden flex">
            {!isLogin ? (
              <>
                {/* <button className="h-full flex flex-row items-center mx-2">
                  <span className="material-icons text-2xl w-14 h-14 rounded-full hover:bg-slate-100 flex items-center justify-center">
                    <BsFillSunFill />
                  </span>
                </button> */}
                <div>
                  <HeaderTextButton name="login" />
                  <HeaderTextButton name="signup" />
                </div>
              </>
            ) : (
              <>
                {/* <button className="h-full flex flex-row items-center mx-2">
                  <span className="material-icons text-2xl w-14 h-14 rounded-full hover:bg-slate-100 flex items-center justify-center">
                    <BsFillSunFill />
                  </span>
                </button> */}
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
