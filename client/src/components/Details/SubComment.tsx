import { SubCommentProps } from '../../types/mainPageTypes';
import { SubComments } from '../../types/mainPageTypes';

const SubComment = ({
  subComments,
  setMoreComment,
  moreComment,
}: SubCommentProps) => {
  console.log(subComments);

  const onEditClick = (e: any) => {
    console.log(subComments);
  };

  const onSubCommentHide = () => {
    setMoreComment(!moreComment);
    console.log(moreComment);
  };

  return (
    <>
      {subComments?.map((el: SubComments, idx: number) => (
        <div className="w-full flex my-6 mr-16" key={idx}>
          <img
            src={el.profileImg}
            alt=""
            className="w-12 h-12 rounded-full mx-2 ring ring-slate-200"
          />
          <div className="w-2/3">
            <div className="flex justify-between mb-1.5 items-center">
              <span>
                <span className="font-semibold">{el.nickname}</span>
                <span className="text-sm font-medium before:content-['•'] before:mr-1.5 before:ml-1.5 before:text-gray-400 font-medium text-gray-400">
                  {el.createdAt}
                </span>
              </span>
              <div>
                <button
                  onClick={onEditClick}
                  className="text-xs border border-gray-200 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200"
                >
                  수정
                </button>
                <button className="text-xs border border-gray-200 font-medium px-3 bg-white rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200">
                  삭제
                </button>
              </div>
            </div>
            <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
              <div className="px-6 pt-3 pb-4 border-b border-gray-200">
                {el.subComment}
              </div>
              <form
                action=""
                className="flex flex-row items-center hover:bg-slate-50 peer-invalid:bg-slate-50 "
              ></form>
            </div>
            <button
              onClick={onSubCommentHide}
              className="mt-1.5 text-gray-400 font-medium text-sm px-2 pb-0.5 rounded hover:bg-slate-200 hover:text-gray-500 group"
            >
              <div className="font-bold text-gray-500 pr-0.5 text-base group-hover:text-gray-800">
                접기
              </div>
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default SubComment;
