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
            <p className="mb-1 overflow-hidden text-lg text-ellipsis line-clamp-2">
              {el.answers.content[0].content}
            </p>
            <button
              className="text-slate-500 w-full font-medium text-sm px-2 pt-1 pb-1.5 bg-slate-300/60 hover:bg-slate-300"
              onClick={handleMore}
            >
              <span className="font-bold pr-0.5">
                {count - 1} 개의 답글 더보기
              </span>
            </button>
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
