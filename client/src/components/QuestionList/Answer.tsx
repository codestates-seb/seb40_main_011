import { AiOutlineCheck } from 'react-icons/ai';
import BodyTop from './BodyTop';

export default function Answer() {
  return (
    <div className="flex mb-6">
      <div className="w-16 flex-none flex flex-col justify-center items-center pr-2 text-green-600 pb-1">
        <AiOutlineCheck className="text-3xl mb-0.5" />
        <span className="text-xs font-medium">채택됨</span>
      </div>
      <div className="">
        {/* <BodyTop /> */}
        <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
          <div className="px-6 pt-3 pb-4 border-b border-gray-200">
            Assumenda molestiae est quos aperiam quod maiores enim laboriosam
            et. At quia atque quidem aut consequatur. Incidunt tempore
            voluptatibus.
          </div>
        </div>
      </div>
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=male"
        alt=""
        className="w-12 h-12 rounded-full mx-2 flex-none ring ring-slate-200"
      />
    </div>
  );
}
