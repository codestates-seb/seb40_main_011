import HeaderTextButton from '../Buttons/HeaderTextButton';
import SearchBar from './SearchBar';
import { BsFillSunFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate('/');
  };
  // const [login, setIsLogin] = useState(false);
  // const dispatch = useDispatch();
  // const logIn = useSelector((state) => state.isLogin);
  // const token = useSelector((state) => state.authorization);
  // const navigate = useNavigate();

  // const openModalHandler = (el) => {
  //   let temp = el.target.id;
  //   let change = !modalOpen[temp];
  //   if (!logIn) {
  //     setModalOpen({ ...modalOpen, [temp]: change });
  //   } else {
  //     if (temp === 'logout') {
  //       dispatch(loginActions.logout());
  //       localStorage.removeItem('refresh');
  //       localStorage.removeItem('authorization');
  //       navigate('/');
  //     } else if (temp === 'myprofile') {
  //       bringmydata();
  //     }
  //   }
  // };

  // const userMenu = useRef(null);

  // const modalCloseHandler = ({ target }) => {
  //   if (typeof userMenu.current === 'undefined' || userMenu.current === null) {
  //     return;
  //   } else if (!userMenu.current.contains(target))
  //     setModalOpen({ login: false, signup: false });
  // };

  // useEffect(() => {
  //   window.addEventListener('mousedown', modalCloseHandler);
  //   return () => {
  //     window.removeEventListener('mousedown', modalCloseHandler);
  //   };
  // });

  // const bringmydata = async () => {
  //   //prettier-ignore
  //   const response = await fetch("/api/auth/member", {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json", authorization: token },
  //   });

  //   let res = response;
  //   if (!res.ok) {
  //     return alert('에러가 발생하였습니다');
  //   } else {
  //     await res.json().then((data) => navigate('/myprofile', { state: data }));
  //   }
  // };

  // const handleHomeClick = () => {
  //   navigate('/');
  // };

  return (
    <div className="sticky top-0 z-50 shadow bg-white">
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
          <HeaderTextButton name="Login" />
          <HeaderTextButton name="Register" />
        </div>
      </div>
    </div>
  );
}
