//회원가입 페이지
//안지은 작성
import SignUpButton from '../components/Buttons/SignUp';
import '../components/common.css';

// interface User {
//   id: string;
//   password: string;
// }

// const [user, setUser] = useState<User>({ id: '', password: '' });
// const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
//   const { name, value } = e.target;
//   setUser({ ...user, [name]: value });
// };

const SignUpPage = () => {
  return (
    <div className="flex items-center justify-center h-screen border-2 border-sky-500">
      <div className="px-20 py-12 m-auto border shadow-lg rounded-xl border-zinc-500">
        <img
          src={require('../images/logo.png')}
          alt=""
          className="pb-10 m-auto w-52"
        />
        <form name="signup" method="POST" className="mb-3">
          <label className="font-medium">User Name</label>
          <br />
          <input
            type="text"
            placeholder="이름을 입력하세요"
            className="signup-input"
          />
          <p className="hidden signup-p-true">사용할 수 있는 아이디입니다</p>
          <p className="hidden signup-p-false">
            아이디는 네 글자 이상이어야 합니다
          </p>
          <br />
          <label className="font-medium">Email</label>
          <br />
          <input
            type="text"
            placeholder="이메일을 입력하세요"
            className="signup-input"
          />
          <p className="hidden signup-p-true">사용할 수 있는 이메일입니다</p>
          <br />
          <label className="font-medium">Password</label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="signup-input"
          />
          <p className="hidden signup-p-false">
            비밀번호는 특수문자를 포함하고 있어야합니다
          </p>
          <br />
          <label className="font-medium">Repeat Password</label>
          <br />
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="signup-input"
          />
          <p className="hidden signup-p-false">비밀번호가 일치하지 않습니다</p>
          <div className="flex items-center justify-center mt-10">
            <SignUpButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
