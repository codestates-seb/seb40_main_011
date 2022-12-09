import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-start py-10 bg-white px-26 dark:bg-DMMainColor">
        <div className="flex flex-col items-center lg:mt-20">
          <p className="text-2xl font-medium lg:text-6xl sm:text-3xl md:text-4xl">
            관심있는 장비! 사고싶은 장비!
          </p>
          <br />
          <p className="flex pr-1 text-3xl font-semibold lg:text-7xl sm:text-4xl md:text-5xl">
            <p className="pl-1 mr-3 text-blue-600 lg:mr-5">자세한 리뷰가 </p>
            {` `}궁금하다면?
          </p>
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
