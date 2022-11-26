import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import { SelectBoxProps } from '../../types/mainPageTypes';
import { useState } from 'react';
export default function RvSelectBox({
  spread,
  setSpread,
  selected,
  setSelected,
}: SelectBoxProps) {
  const [menu] = useState(['최신 순', '별점 순']);

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(true);
    setSelected(e.currentTarget.id);
  };

  return (
    <div className="relative flex flex-col w-40">
      <button
        onClick={handleSelect}
        id={selected}
        className={`flex justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 ${
          spread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0'
        }`}
      >
        {selected} {spread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {spread && (
        <ul className="absolute w-full top-10 border bg-white rounded-bl-xl rounded-br-xl overflow-hidden drop-shadow-md">
          {menu
            .filter((el) => el !== selected)
            .map((el, idx) => (
              <button
                onClick={handleSelect}
                key={idx}
                id={el}
                className="w-full px-4 text-sm pb-3 pt-2 hover:bg-gray-100 flex items-center text-gray-500 hover:text-gray-900 font-medium"
              >
                {el}
              </button>
            ))}
        </ul>
      )}
    </div>
  );
}
