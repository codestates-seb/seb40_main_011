import { XsRoundedButtonProps } from '../../types/mainPageTypes';

export default function XsRoundedButton({ name }: XsRoundedButtonProps) {
  return (
    <div className="text-xs font-medium px-3 rounded-full mx-0.5 py-0.5 text-gray-400 hover:text-gray-500 hover:font-bold hover:bg-gray-200">
      {name}
    </div>
  );
}
