import { GrCube } from 'react-icons/gr';
import { FiMonitor } from 'react-icons/fi';
import { BiMouseAlt } from 'react-icons/bi';
import { BsKeyboard, BsLaptop, BsTablet, BsThreeDots } from 'react-icons/bs';

// 버튼을 누르면 해당 데이터를 필터링해서 props로 productList에 올려야함 ;;
interface CategoryProps {
  setCategory: any;
}

const MainCategory = ({ setCategory }: CategoryProps) => {
  const onClick = (e: React.MouseEvent<HTMLElement>) => {
    setCategory(e.currentTarget.id);
  };
  return (
    <div className="flex space-x-20 my-4 w-4/5 justify-center">
      <button
        onClick={onClick}
        id="all"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <GrCube size="30" />
        </div>
        <div>All</div>
      </button>
      <button
        onClick={onClick}
        id="monitor"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <FiMonitor size="30" />
        </div>
        <div>Monitor</div>
      </button>
      <button
        onClick={onClick}
        id="mouse"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <BiMouseAlt size="30" />
        </div>
        <div>Mouse</div>
      </button>
      <button
        onClick={onClick}
        id="keyboard"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <BsKeyboard size="30" />
        </div>
        <div>Keyboard</div>
      </button>
      <button
        onClick={onClick}
        id="laptop"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <BsLaptop size="30" />
        </div>
        <div>Laptop</div>
      </button>
      <button
        onClick={onClick}
        id="tablet"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <BsTablet size="30" />
        </div>
        <div>Tablet</div>
      </button>
      <button
        onClick={onClick}
        id="etc"
        className="flex flex-col items-center justify-center"
      >
        <div>
          <BsThreeDots size="30" />
        </div>
        <div>etc</div>
      </button>
    </div>
  );
};

export default MainCategory;
