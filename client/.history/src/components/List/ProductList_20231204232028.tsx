// [GET]
import { getProducts } from '../../util/apiCollection';
import { useEffect, useState, memo, useMemo, useCallback } from 'react';
import { Product } from '../../types/mainPageTypes';
import { useNavigate } from 'react-router-dom';
import MainCategory from '../Selectors/MainCategory';
import moment from 'moment';
import { format } from 'timeago.js';
import ScrollToTop from '../../util/ScrollToTop';
import { GrCube } from 'react-icons/gr';
import { FiMonitor } from 'react-icons/fi';
import { BiMouseAlt } from 'react-icons/bi';
import { BsKeyboard, BsLaptop, BsThreeDots } from 'react-icons/bs';
import { TfiDesktop } from 'react-icons/tfi';
import { domain } from '../../constant';

const ProductList = () => {
  ScrollToTop();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('all');
  // const offset = (currentPage - 1) * 9;
  const [viewMore, setViewMore] = useState(9);

  useEffect(() => {
    console.log('hi');
  }, []);

  useEffect(() => {
    let isCancelled = false;
    const getProductData = async () => {
      const { data } = await getProducts();
      if (!isCancelled) {
        if (category === 'all') {
          setProducts(data.cards.reverse());
        } else {
          setProducts(
            data.cards
              .reverse()
              .filter((el: Product) => el.type.toLowerCase() === category)
          );
        }
      }
    };
    getProductData();
    return () => {
      isCancelled = true;
    };
  }, [category]);

  const getMoreData = () => {
    if (viewMore < products.length) {
      setViewMore(viewMore + 9);
    }
  };

  const onProductClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/categories/review/${e.currentTarget.id}`);
  };

  const categoryList = useMemo(() => {
    return [
      { id: 'all', name: '전체 보기', icon: <GrCube size="30" /> },
      { id: 'desktop', name: '데스크탑', icon: <TfiDesktop size="30" /> },
      { id: 'laptop', name: '노트북', icon: <BsLaptop size="30" /> },
      { id: 'monitor', name: '모니터', icon: <FiMonitor size="30" /> },
      { id: 'keyboard', name: '키보드', icon: <BsKeyboard size="30" /> },
      { id: 'mouse', name: '마우스', icon: <BiMouseAlt size="30" /> },
      { id: 'etc', name: 'etc', icon: <BsThreeDots size="30" /> },
    ];
  }, []);

  const convertCallback = useCallback((type: string) => {
    return categoryList.filter((el) => el.id === type).map((el) => el.name);
  }, []);

  const NoElement = () => {
    if (products.length === 0) {
      return (
        <div className="flex justify-center w-full">
          <img
            className="object-fit"
            src={require('../../images/sryIcon2.png')}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-zinc-100 dark:bg-DMMainColor dark:text-gray-300 transition-all">
      <div className="mx-auto w-full lg:w-[64rem] flex flex-col items-center px-4">
        <MainCategory
          setCategory={setCategory}
          category={category}
          categoryList={categoryList}
        />
      </div>
      <div className="mx-auto w-full lg:w-[64rem] grid pt-4 px-1 pb-4">
        {products.slice(0, viewMore).map((el, idx): JSX.Element => {
          const { thumbnail } = el;
          return (
            <div
              key={idx}
              role="button"
              onClick={onProductClick}
              id={el.id.toString()}
              className="relative group flex flex-col sm:flex-[1_1_40%] lg:flex-[1_1_30%] flex-[1_1_50%] my-5 mx-3 hover:bg-white dark:hover:bg-DMSubColor rounded-3xl dark:hover:text-white"
            >
              <NoElement />
              <div className="overflow-hidden aspect-[16/9] bg-slate-200 rounded-3xl group-hover:rounded-b-none">
                <img
                  src={`${domain}${thumbnail}`}
                  className="object-cover w-full h-full scale-105"
                />
              </div>
              <div className="absolute -top-6 w-fit px-3 pt-0.5 pb-1 my-3 rounded-full bg-slate-300 text-slate-600 text-sm font-medium dark:hover:text-gray-700">
                {convertCallback(el.type.toLowerCase())}
              </div>
              <div className="p-4 pb-6 font-medium">
                <div className="line-clamp-1 ">{el.name}</div>
                <span>
                  <span className="text-sm tracking-tight text-gray-500/60 before:text-gray-300 dark:text-gray-400">
                    {moment(el.createdAt).format('MM월 DD일')}
                  </span>
                  <span className="before:content-['•'] before:mr-1.5 before:ml-1.5 text-gray-500/60 before:text-gray-300 tracking-tight text-sm dark:text-gray-400">
                    {format(el.createdAt)}
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
      {viewMore < products.length && (
        <div className="mx-auto w-full lg:w-[64rem] pb-12">
          <span
            role="button"
            onClick={getMoreData}
            className="flex items-center justify-center mx-4 text-lg font-medium tracking-tight rounded-xl h-14 bg-zinc-200/60 text-zinc-400 hover:text-zinc-500 dark:bg-DMThrColor dark:text-gray-300 hover:bg-zinc-300/50 dark:hover:text-gray-200 dark:hover:bg-DMMainTextColor"
          >
            더 보기
          </span>
        </div>
      )}
    </div>
  );
};

export default memo(ProductList);
