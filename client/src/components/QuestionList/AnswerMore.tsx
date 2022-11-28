import { AnswerMoreProps } from '../../types/mainPageTypes';

export default function AnswerMore({
  count,
}: AnswerMoreProps): React.ReactElement {
  return (
    <div className="text-slate-400 font-medium text-sm px-2 pt-1 pb-1.5 bg-slate-200/80 hover:bg-slate-500 hover:text-white group">
      <span className="font-bold text-slate-400 pr-0.5 group-hover:text-white">
        {count}
      </span>
      개의 댓글 더보기
    </div>
  );
}
