import XsRoundedButton from '../Buttons/XsRoundedButton';

export interface btn {
  name: string;
}

export default function BodyTop() {
  return (
    <div className="flex justify-between mb-1.5 items-center">
      <span>
        <span className="font-semibold">ivy</span>
        <span className="text-sm font-medium before:content-['•'] before:mr-1.5 before:ml-1.5 before:text-gray-400 font-medium text-gray-400">
          2022.11.9
        </span>
      </span>
      <div>
        <XsRoundedButton name={'수정'} />
        <XsRoundedButton name={'삭제'} />
      </div>
    </div>
  );
}
