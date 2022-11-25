import BodyTop from './BodyTop';
import AnswerMore from './AnswerMore';

export interface count {
  count: number;
}

export default function Question() {
  return (
    <div className="flex my-6 mr-16">
      <img
        src="https://xsgames.co/randomusers/avatar.php?g=female"
        alt=""
        className="w-12 h-12 rounded-full mx-2 ring ring-slate-200"
      />
      <div>
        <BodyTop />
        <div className="ring-1 ring-gray-200 rounded-xl overflow-hidden bg-white">
          <div className="px-6 pt-3 pb-4 border-b border-gray-200">
            Assumenda molestiae est quos aperiam quod maiores enim laboriosam
            et. At quia atque quidem aut consequatur. Incidunt tempore
            voluptatibus.
          </div>
        </div>
        <AnswerMore count={3} />
      </div>
    </div>
  );
}
