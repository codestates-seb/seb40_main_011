import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative flex flex-col items-center justify-start py-40 bg-zinc-100 dark:bg-DMMainColor px-26 ">
        <div className="flex flex-col items-center">
          <div className="text-5xl font-medium sm:text-6xl  tracking-tighter mb-1 sm:mb-3 dark:text-white text-black/70">
            관심있는 장비!
          </div>
          <div className="text-5xl font-medium sm:text-6xl  tracking-tighter mb-1 sm:mb-3 dark:text-white text-black/70">
            사고싶은 장비!
          </div>
          <div className="font-bold text-5xl sm:text-7xl lg:text-8xl pl-1 text-blue-600 mb-1 sm:mb-3 tracking-tighter">
            자세한 리뷰가
          </div>
          <div className="flex pr-1 text-5xl font-semibold sm:text-6xl lg:text-7xl tracking-tighter dark:text-white text-black">
            궁금하다면?
          </div>
          <button
            className=" pt-4 pb-5 tracking-tight text-3xl sm:text-6xl px-12 bg-blue-600 rounded-full text-white mt-12 text-center md:text-4xl md:mb-8 lg:pt-7 lg:pb-8 lg:px-16 font-medium\"
            onClick={() => navigate('/')}
          >
            최신 리뷰 보러 가기
          </button>
        </div>
        {/* <div className="flex flex-col items-center justify-center md:flex-row overflow-hidden">
          <img
            src={require('../images/Dec-05-2022 14-15-32.gif')}
            alt=""
            className="object-cover w-full px-3 scale-125 pt-16"
          />
        </div> */}
      </div>
    </>
  );
};

export default LandingPage;
