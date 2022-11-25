import XsRoundedButton from '../Buttons/XsRoundedButton';
import { BodyTopProps } from '../../types/mainPageTypes';

export default function BodyTop({ nickname, createdAt }: BodyTopProps) {
  // const formatter = new Intl.NumberFormat('kr', { compactDisplay: 'short' });

  return (
    <div className="flex text-sm font-medium justify-between mb-1.5 items-center">
      <span>
        <span className="text-gray-800">{nickname}</span>
        <span className="before:content-['•'] before:mr-1.5 before:ml-1.5 text-gray-400">
          {/* {createdAt.toLocaleString('en')} */}
          {createdAt}
        </span>
      </span>
      <div>
        <XsRoundedButton name={'수정'} />
        <XsRoundedButton name={'삭제'} />
      </div>
    </div>
  );
}
