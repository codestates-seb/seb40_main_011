import { useNavigate } from 'react-router-dom';
import { BsExclamationTriangle } from 'react-icons/bs';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        {' '}
        <div className="flex flex-col items-center justify-center w-full bg-slate-100 dark:bg-DMMainColor dark:text-white">
          <div className="flex flex-col items-center mt-40">
            <div className="mb-3">
              <BsExclamationTriangle className="w-40 h-40" />
            </div>
            <h2 className="leading-10 text-left">
              <p className="mb-10 text-4xl font-extrabold text-center">
                Not Found
              </p>
              <p className="mb-3 text-3xl font-medium text-center text-black dark:text-white">
                죄송합니다.
              </p>
              <p className="text-xl text-center text-black dark:text-white">
                요청하신 페이지를 찾을 수 없습니다.
              </p>
            </h2>
          </div>
          <button
            className="px-10 py-3 my-28 bg-slate-300 rounded-2xl text-medium dark:bg-DMThrColor dark:text-white"
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
