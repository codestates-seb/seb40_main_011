import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-start py-10 bg-white px-26 ">
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
            className="py-1.5 px-6 bg-blue-600 rounded-2xl text-white mt-16 text-center lg:text-2xl lg:py-3 lg:px-10 font-medium lg:rounded-3xl"
            onClick={() => navigate('/')}
          >
            {' '}
            최신 리뷰 보러 가기
          </button>
        </div>
        <div className="flex flex-col items-center justify-center my-16 md:flex-row ">
          <img
            src={require('../images/Dec-05-2022 14-15-32.gif')}
            alt=""
            className="object-cover w-full px-3"
          />
        </div>

        {/* <img
          src={require('../images/Dec-05-2022 10-35-53.gif')}
          alt=""
          className=""
        /> */}
      </div>
    </>
  );
};

export default LandingPage;
