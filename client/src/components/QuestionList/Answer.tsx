import BodyTop from './BodyTop';
import { AnswerProps } from '../../types/mainPageTypes';

export default function Answer({
  createdAt,
  nickname,
  content,
  writerId,
  id,
  adoptedId,
}: AnswerProps) {
  return (
    <div className="w-full flex mt-3 mb-1">
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        alt=""
        className="w-12 h-12 rounded-2xl mx-3 ml-16 mt-3 ring ring-slate-200"
      />
      <div className="w-full">
        <BodyTop
          createdAt={createdAt}
          nickname={nickname}
          adoptedId={adoptedId}
        />
        <div className="flex relative">
          <div
            className={`grow px-4 pt-2 pb-3 rounded bg-white text-gray-600 font-medium mr-2 ${
              id === adoptedId && `ring-2 ring-inset ring-emerald-200`
            }`}
          >
            {content}
          </div>
          {id === adoptedId && (
            <div className="tracking-tight absolute text-sm font-medium bg-green-500 text-white px-3 rounded-full pt-0.5 pb-1 right-6 -top-3">
              채택된 답변
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
