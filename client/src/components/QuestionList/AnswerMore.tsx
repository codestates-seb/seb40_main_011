import { AnswerMoreProps } from '../../types/mainPageTypes';

export default function AnswerMore({
  count,
}: AnswerMoreProps): React.ReactElement {
  return (
    <div className="text-slate-500 font-medium text-sm px-2 pt-1 pb-1.5 bg-slate-300/60 hover:bg-slate-300">
      <span className="font-bold pr-0.5">{count}</span>
      개의 답글 더보기
    </div>
  );
}
