import { AnswerMoreProps } from '../../types/mainPageTypes';

export default function AnswerMore({
  count,
}: AnswerMoreProps): React.ReactElement {
  return (
    <>
      {count === 0 ? null : (
        <div className="text-slate-500 dark:text-white/50 font-medium text-sm px-2 pt-1 pb-1.5 bg-slate-300/60 hover:bg-slate-300 dark:bg-black/20 dark:hover:bg-black/10">
          <span className="font-bold pr-0.5">{count}</span>
          개의 답변 더보기
        </div>
      )}
    </>
  );
}
