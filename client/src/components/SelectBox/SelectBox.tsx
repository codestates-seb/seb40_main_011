import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import { Dispatch, SetStateAction } from 'react';

export default function SelectBox({
  spread,
  setSpread,
  selected,
  setSelected,
  setPendingSort,
  setAdoptSort,
}: {
  spread: boolean;
  setSpread: Dispatch<SetStateAction<boolean>>;
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
  setPendingSort?: Dispatch<SetStateAction<boolean>>;
  setAdoptSort?: Dispatch<SetStateAction<boolean>>;
}) {
  const filter = ['최신 순', '오래된 순'];
  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSelected(e.currentTarget.id);
    // console.log(e.currentTarget.id);
    // console.log(selected);
    if (setPendingSort !== undefined) {
      switch (selected) {
        case '최신 순':
          setPendingSort(false);
          break;
        case '오래된 순':
          setPendingSort(true);
          break;
      }
    } else if (setAdoptSort !== undefined) {
      switch (selected) {
        case '최신 순':
          setAdoptSort(false);
          break;
        case '오래된 순':
          setAdoptSort(true);
          break;
      }
    }
    setSpread(!spread);
  };

  const handleSpread = () => {
    setSpread(!spread);
  };

  return (
    <div className="relative flex flex-col w-40">
      <button
        onClick={handleSpread}
        className={`flex justify-between alsolute t-0 text-sm bg-white hover:bg-slate-300 h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500`}
      >
        {selected} <AiFillCaretDown />
      </button>
      {spread && (
        <ul className="z-30 absolute w-full top-0 border bg-white rounded overflow-hidden drop-shadow-md">
          {filter.map((el, idx) => (
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
      {spread && (
        <div
          onClick={handleSpread}
          className="z-20 fixed inset-0 h-screen w-full bg-black/10"
        />
      )}
    </div>
  );
}
