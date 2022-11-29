import { GrCube } from 'react-icons/gr';
import { FiMonitor } from 'react-icons/fi';
import { BiMouseAlt } from 'react-icons/bi';
import { BsKeyboard, BsLaptop, BsThreeDots } from 'react-icons/bs';
import { TfiDesktop } from 'react-icons/tfi';
import { CategoryProps } from '../../types/mainPageTypes';

const MainCategory = ({ setCategory, setCurrentPage }: CategoryProps) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setCategory(e.currentTarget.id);
    setCurrentPage(1);
  };
  const categoryList = [
    { id: 'all', name: '전체 보기', icon: <GrCube size="30" /> },
    { id: 'desktop', name: '데스크탑', icon: <TfiDesktop size="30" /> },
    { id: 'laptop', name: '노트북', icon: <BsLaptop size="30" /> },
    { id: 'monitor', name: '모니터', icon: <FiMonitor size="30" /> },
    { id: 'keyboard', name: '키보드', icon: <BsKeyboard size="30" /> },
    { id: 'mouse', name: '마우스', icon: <BiMouseAlt size="30" /> },
    { id: 'etc', name: 'etc', icon: <BsThreeDots size="30" /> },
  ];

  return (
    <div className="max-lg:flex-wrap flex my-4 w-2/3 justify-between items-center">
      {categoryList.map((el, idx) => {
        return (
          <button
            key={idx}
            onClick={onClick}
            id={el.id}
            className="flex flex-col items-center justify-center w-24 p-4 ease-in-out duration-300 hover:bg-slate-300 hover:rounded-full"
          >
            <div>{el.icon}</div>
            <div>{el.name}</div>
          </button>
        );
      })}
    </div>
  );
};

export default MainCategory;
