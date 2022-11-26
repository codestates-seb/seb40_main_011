import { AnswerMoreProps } from '../../types/mainPageTypes';

export default function AnswerMore({
  count,
}: AnswerMoreProps): React.ReactElement {
  return (
    <div className="mt-1.5 text-gray-400 font-medium text-sm px-2 pb-0.5 rounded hover:bg-slate-200 hover:text-gray-500 group">
      <span className="font-bold text-gray-500 pr-0.5 text-base group-hover:text-gray-800">
        {count}
      </span>
      개의 댓글 더보기
    </div>
  );
}
