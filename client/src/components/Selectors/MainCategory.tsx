import { CategoryProps } from '../../types/mainPageTypes';

const MainCategory = ({
  setCategory,
  category,
  categoryList,
}: CategoryProps) => {
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
