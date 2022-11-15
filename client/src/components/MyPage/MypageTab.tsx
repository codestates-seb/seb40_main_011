const MypageTab = (): JSX.Element => {
  return (
    <div className="">
      <div className="flex justify-center p-2 border-b">
        <ul className="flex flex-row justify-center w-[850px]">
          <li className="px-5 bordet-b">1</li>
          <li>2</li>
        </ul>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col justify-center border w-[850px] p-5">
          <div className="mb-2 text-lg">tilte</div>

          <div className="flex text-sm">
            <div className="px-3 py-0.5 bg-slate-300 rounded-lg">Category</div>
            <div className="px-3 py-0.5">Brand</div>
            <div className="px-3 py-0.5">Product</div>
            <div className="ml-auto text-slate-600">date</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MypageTab;
