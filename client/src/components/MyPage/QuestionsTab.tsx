const QuestionsTab = ({ reviewListData }: any) => {
  console.log(reviewListData?.content);

  return (
    <>
      {reviewListData?.content.length === 0 ? (
        <div className="flex flex-col justify-center w-[850px] p-5 mt-20">
          <div className="mb-2 text-xl text-center">
            좋아요한 리뷰가 없습니다
          </div>
        </div>
      ) : (
        <div> 데이터 있음 </div>
      )}
      {/* {userReview ?      
     {userReview.map((el, index): any => {
        return (
          <div className="flex flex-col justify-center w-[850px] p-5">
            <div className="mb-2 text-lg" key={index}>
              {el.tilte}
            </div>
            <div className="mb-2 overflow-hidden text-ellipsis line-clamp-2">
              {el.content}
            </div>
            <div className="flex text-sm">
              <div className="px-3 py-0.5 bg-slate-300 rounded-lg">
                {el.type}
              </div>
              <div className="px-3 py-0.5">{el.productname}</div>
              <div className="ml-auto text-slate-600">{el.createdAt}</div>
            </div>
          </div>
        );
      })} :
      <div></div> } */}
    </>
  );
};

export default QuestionsTab;
