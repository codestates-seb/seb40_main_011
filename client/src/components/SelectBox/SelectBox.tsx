// import React, { useEffect, useRef, useState } from 'react';
import React, { useState } from 'react';
import Option from './Option';
import { AiFillCaretDown } from 'react-icons/ai';
import { AiFillCaretUp } from 'react-icons/ai';

export default function SelectBox() {
  const [spread, setSpread] = useState(false);
  // const options = React.useRef() as React.MutableRefObject<HTMLUListElement>;
  // const options = React.useRef() as React.MutableRefObject<HTMLDivElement>;

  const handleSelect = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSpread(!spread);
  };

  // const handleClickOutside = (e: MouseEvent) => {
  //   if (spread && !options.current.contains(e.target)) setSpread(!spread);
  //   if (options.current && !options.current.contains(e.target))
  //     setSpread(!spread);
  //   console.log(options.current);
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [options]);

  return (
    <div className="relative flex flex-col w-40">
      <button
        onClick={handleSelect}
        className={`flex justify-between alsolute t-0 text-sm bg-white h-10 rounded border border-slate-200 flex items-center px-4 pb-0.5 font-medium text-gray-500 ${
          spread &&
          'rounded-bl-none rounded-br-none bg-slate-200 text-gray-400 border-b-0'
        }`}
      >
        오래된 순 {spread ? <AiFillCaretUp /> : <AiFillCaretDown />}
      </button>
      {spread && (
        <ul
          // ref={options}
          onClick={handleSelect}
          className="absolute w-full top-10 border bg-white rounded-bl-xl rounded-br-xl overflow-hidden drop-shadow-md"
        >
          <Option />
          <Option />
        </ul>
      )}
    </div>
  );
}
