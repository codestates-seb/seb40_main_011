import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';
import { SelectBoxProps } from '../../types/mainPageTypes';
import { useState } from 'react';
export default function RvSelectBox({
  spread,
  setSpread,
  selected,
  setSelected,
  menu,
}: SelectBoxProps) {
  const [selector] = useState(menu);

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(true);
    setSelected(e.currentTarget.id);
  };

  return (
    <div className="relative flex flex-col w-40 dark:bg-DMThrColor">
      <button
        onClick={handleSelect}
        id={selected}
        className={` dark:text-gray-300 bg-white  dark:bg-DMMainColor  dark:border-DMThrColor flex justify-between alsolute t-0 text-sm h-10 rounded border border-slate-200 items-center px-4 pb-0.5 font-medium text-gray-500 ${
          spread &&
          'rounded-b-none bg-slate-200 text-gray-400 border-b-0 overflow-hidden'
        }`}
      >
        {selected} {spread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {spread && (
        <ul className="absolute w-full overflow-hidden bg-white border dark:border-gray-500 top-10 rounded-bl-xl rounded-br-xl drop-shadow-md">
          {selector
            .filter((el) => el !== selected)
            .map((el, idx) => (
              <button
                onClick={handleSelect}
                key={idx}
                id={el}
                className="flex items-center w-full px-4 pt-2 pb-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:bg-DMThrColor dark:text-gray-400 dark:hover:bg-gray-500"
              >
                {el}
              </button>
            ))}
        </ul>
      )}
    </div>
  );
}
