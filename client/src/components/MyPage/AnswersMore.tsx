import { useState } from 'react';

export const AnswersMore = ({ el }: any) => {
  const [more, setMore] = useState(false);

  const handleMore = (e: any) => {
    setMore(!more);
  };

  const count = el.answers.content.length;

  return (
    <>
      <div>
        {!more ? (
          <>
            <p className="mb-1 overflow-hidden text-lg dark:text-white text-black font-medium text-ellipsis line-clamp-2 ">
              {el.answers.content[0].content}
            </p>
            {count > 1 ? (
              <button
                className="mb-2 text-gray-400 font-medium text-sm px-2 pb-0.5 rounded hover:bg-slate-200 hover:text-gray-500 "
                onClick={handleMore}
              >
                <span className="font-bold pr-0.5  dark:text-gray-300 dark:hover:text-black/70">
                  {count - 1} 개의 답글 더보기
                </span>
              </button>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        {more ? (
          <>
            {el.answers.content.map((ele: any, idx: number) => {
              return (
                <>
                  <div
                    className="mb-1 overflow-hidden text-lg text-ellipsis line-clamp-2"
                    key={idx}
                  >
                    - {ele.content}
                  </div>
                </>
              );
            })}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
export default AnswersMore;
