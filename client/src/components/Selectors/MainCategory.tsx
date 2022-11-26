import { GrCube } from 'react-icons/gr';
import { FiMonitor } from 'react-icons/fi';
import { BiMouseAlt } from 'react-icons/bi';
import { BsKeyboard, BsLaptop, BsTablet, BsThreeDots } from 'react-icons/bs';
import { CategoryProps } from '../../types/mainPageTypes';

const MainCategory = ({ setCategory, setCurrentPage }: CategoryProps) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setCategory(e.currentTarget.id);
    console.log(e.currentTarget.id);
    setCurrentPage(1);
  };
  const categoryList = [
    { id: 'All', icon: <GrCube size="30" /> },
    { id: 'Monitor', icon: <FiMonitor size="30" /> },
    { id: 'Mouse', icon: <BiMouseAlt size="30" /> },
    { id: 'keyboard', icon: <BsKeyboard size="30" /> },
    { id: 'Laptop', icon: <BsLaptop size="30" /> },
    { id: 'Tablet', icon: <BsTablet size="30" /> },
    { id: 'etc', icon: <BsThreeDots size="30" /> },
  ];

  return (
    <div className="max-lg:flex-wrap flex my-4 w-2/3 justify-between items-center">
      {categoryList.map((el, idx) => {
        return (
          <button
            key={idx}
            onClick={onClick}
            id={el.id.toLowerCase()}
            className="flex flex-col items-center justify-center w-24 p-4 ease-in-out duration-300 hover:bg-slate-300 hover:rounded-full"
          >
            <div>{el.icon}</div>
            <div>{el.id}</div>
          </button>
        );
      })}
    </div>
  );
};

export default MainCategory;
