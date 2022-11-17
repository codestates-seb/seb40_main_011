import { AiFillCheckCircle } from 'react-icons/ai';
import BodyTop from './BodyTop';

export default function PendingAnswer() {
  return (
    <div className="flex mb-6">
      <div className="w-16 flex-none flex items-center">
        <button className="flex flex-col justify-center items-center text-slate-300 hover:text-slate-500 group hover:bg-slate-200 px-1.5 pt-1.5 pb-2 rounded-lg">
          <AiFillCheckCircle className="text-3xl mb-0.5" />
          <span className="text-xs font-medium text-slate-400 group-hover:text-slate-600">
            채택하기
          </span>
        </button>
      </div>
      <div className="">
        <BodyTop />
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
