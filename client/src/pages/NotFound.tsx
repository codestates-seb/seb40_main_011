import { useNavigate } from 'react-router-dom';
import { BsExclamationTriangle } from 'react-icons/bs';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        {' '}
        <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-100">
          <div className="flex flex-col items-center ">
            <div className="mb-3">
              <BsExclamationTriangle className="w-24 h-24" />
            </div>
            <h2 className="leading-10 text-left">
              <p className="mb-10 text-3xl font-extrabold text-center">
                Not Found
              </p>
              <p className="mb-3 text-2xl font-medium text-center text-black">
                죄송합니다.
              </p>
              <p className="text-lg text-center text-black">
                요청하신 페이지를 찾을 수 없습니다.
              </p>
            </h2>
          </div>
          <button
            className="px-10 py-3 my-28 bg-slate-300 rounded-xl"
            onClick={() => navigate('/')}
          >
            메인 페이지로 이동
          </button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
