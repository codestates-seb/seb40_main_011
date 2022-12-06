// [GET]
import { getProducts } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Product } from '../../types/mainPageTypes';
import MainCategory from '../Selectors/MainCategory';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { format } from 'timeago.js';
import { categoryList } from '../Selectors/MainCategory';
import Spinner from '../../util/Spinner';
import ScrollToTop from '../../util/ScrollToTop';

const ProductList = () => {
  ScrollToTop();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('all');
  // const offset = (currentPage - 1) * 9;
  const [viewMore, setViewMore] = useState(9);

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await getProducts();
      if (category === 'all') {
        await setProducts(data.cards.reverse());
      } else {
        setProducts(
          data.cards
            .reverse()
            .filter((el: Product) => el.type.toLowerCase() === category)
        );
      }
    };
    getProductData();
  }, [category]);

  const getMoreData = () => {
    if (viewMore < products.length) {
      setViewMore(viewMore + 9);
    }
  };

  const onProductClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/categories/review/${e.currentTarget.id}`);
  };

  const convertToKR: any = (type: string) => {
    return categoryList.filter((el) => el.id === type).map((el) => el.name);
  };

  const NoElement = () => {
    if (products.length === 0) {
      return (
        <div className="flex w-full justify-center">
          <img
            className="object-fit"
            src={require('../../images/sryIcon2.png')}
          />
        </div>
      );
    }
    return null;
  };

  const [spinner, setSpinner] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSpinner(false);
    }, 1000);
  }, []);

  return (
    <>
      {spinner ? (
        <Spinner />
      ) : (
        <div className="bg-zinc-100">
          <div className="mx-auto w-full lg:w-[64rem] flex flex-col items-center px-4">
            <MainCategory setCategory={setCategory} category={category} />
          </div>
          <div className="mx-auto w-full lg:w-[64rem] flex flex-wrap pt-4 px-1 pb-4">
            <NoElement />
            {products.slice(0, viewMore).map((el, idx): JSX.Element => {
              const { thumbnail } = el;
              return (
                <div
                  key={idx}
                  role="button"
                  onClick={onProductClick}
                  id={el.id.toString()}
                  className="relative group flex flex-col sm:flex-[1_1_40%] lg:flex-[1_1_30%] flex-[1_1_50%] my-5 mx-3 hover:bg-white rounded-3xl"
                >
                  <div className="overflow-hidden aspect-[16/9] bg-slate-200 rounded-3xl group-hover:rounded-b-none">
                    <img
                      src={`https://codetech.nworld.dev${thumbnail}`}
                      className="h-full w-full object-cover scale-105"
                    />
                  </div>
                  <div className="absolute -top-6 w-fit px-3 pt-0.5 pb-1 my-3 rounded-full bg-slate-300 text-slate-600 text-sm font-medium">
                    {convertToKR(el.type.toLowerCase())}
                  </div>
                  <div className="p-4 font-medium pb-6">
                    <div className="line-clamp-1">{el.name}</div>
                    <span>
                      <span className="text-gray-500/60 before:text-gray-300 text-sm tracking-tight">
                        {moment(el.createdAt).format('MM월 DD일')}
                      </span>
                      <span className="before:content-['•'] before:mr-1.5 before:ml-1.5 text-gray-500/60 before:text-gray-300 tracking-tight text-sm">
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
                className="mx-4 rounded-xl h-14 flex items-center justify-center bg-zinc-200/60  hover:bg-zinc-300/50 text-lg font-medium text-zinc-400 hover:text-zinc-500 tracking-tight"
              >
                더 보기
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProductList;
