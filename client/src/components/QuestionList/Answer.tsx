import BodyTop from './BodyTop';
import { AnswerProps } from '../../types/mainPageTypes';
import Avatar from '../Avatar/Avatar';

export default function Answer({
  createdAt,
  nickname,
  content,
  writerId,
  id,
  adoptedId,
  image,
}: AnswerProps) {
  console.log(adoptedId);
  return (
    <div className="w-full flex mt-3 mb-1">
      <div className="flex-none ml-10 mt-3">
        <Avatar image={image} />
      </div>
      <div className="w-full pl-2">
        <BodyTop
          createdAt={createdAt}
          nickname={nickname}
          adoptedId={adoptedId}
        />
        <div className="flex relative">
          <div
            className={`grow px-4 pt-2 pb-3 rounded bg-white text-gray-600 font-medium mr-2 ${
              id === adoptedId && `ring ring-green-400`
            }`}
          >
            {content}
          </div>
          {id === adoptedId && (
            <div className="tracking-tight absolute text-sm font-medium bg-green-500 text-white px-3 rounded-full pt-1 pb-1.5 right-6 -top-4">
              채택된 답변
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
