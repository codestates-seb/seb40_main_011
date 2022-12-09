import { GrCube } from 'react-icons/gr';
import { FiMonitor } from 'react-icons/fi';
import { BiMouseAlt } from 'react-icons/bi';
import { BsKeyboard, BsLaptop, BsThreeDots } from 'react-icons/bs';
import { TfiDesktop } from 'react-icons/tfi';
import { CategoryProps } from '../../types/mainPageTypes';

export const categoryList = [
  { id: 'all', name: '전체 보기', icon: <GrCube size="30" /> },
  { id: 'desktop', name: '데스크탑', icon: <TfiDesktop size="30" /> },
  { id: 'laptop', name: '노트북', icon: <BsLaptop size="30" /> },
  { id: 'monitor', name: '모니터', icon: <FiMonitor size="30" /> },
  { id: 'keyboard', name: '키보드', icon: <BsKeyboard size="30" /> },
  { id: 'mouse', name: '마우스', icon: <BiMouseAlt size="30" /> },
  { id: 'etc', name: 'etc', icon: <BsThreeDots size="30" /> },
];

const MainCategory = ({ setCategory, category }: CategoryProps) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setCategory(e.currentTarget.id);
  };

  return (
    <div className="flex w-full overflow-hidden overflow-x-auto bg-white rounded-full flex-nowrap dark:bg-DMSubColor dark:text-gray-400">
      {categoryList.map((el, idx) => {
        return (
          <button
            key={idx}
            onClick={onClick}
            id={el.id}
            className={`flex-none h-14 pb-0.5 rounded-full md:grow lg:snap-x w-28 grow-0 md:hover:bg-slate-200/70 md:hover:text-slate-500 font-medium md:dark:hover:bg-slate-700 md:dark:hover:text-gray-300 ${
              category === el.id &&
              'bg-slate-300 dark:bg-slate-600 dark:text-white'
            }`}
          >
            <div>{el.name}</div>
          </button>
        );
      })}
    </div>
  );
};

export default MainCategory;
