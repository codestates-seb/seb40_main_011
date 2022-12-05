const LandingPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-start py-10 px-26">
        <div>
          <p className="text-6xl font-medium">관심있는 장비! 사고싶은 장비!</p>
          <br />
          <p className="flex font-semibold text-7xl">
            <p className="mr-5 text-blue-600">자세한 리뷰가</p>
            궁금하다면?
          </p>
        </div>
        <div className="flex mt-20">
          <img
            src={require('../images/Dec-05-2022 11-14-13.gif')}
            alt=""
            className="w-2/4"
          />
          <div className="flex flex-col items-center justify-center w-full max-w-3xl mt-20">
            <img
              src={require('../images/logo.png')}
              alt=""
              className="w-7/12"
            />
            <button className="py-1.5 px-4 bg-blue-600 rounded-2xl text-white mt-16">
              {' '}
              메인 페이지로 이동
            </button>
          </div>
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
