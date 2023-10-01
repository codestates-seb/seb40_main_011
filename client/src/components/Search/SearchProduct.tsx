import { getSearchProduct } from '../../util/apiCollection';
import { useEffect, useState, useMemo } from 'react';
import { Product } from '../../types/mainPageTypes';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { domain } from '../../constant';

const SearchProduct = ({ keyword }: { keyword: string }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProductData = useMemo(() => {
    const fetchData = async () => {
      const { data } = await getSearchProduct(keyword);
      setProducts(data.reviewLists);
    };
    return fetchData;
  }, [keyword]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  const onProductClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/categories/review/${e.currentTarget.id}`);
  };

  //페이지네이션
  const onPageClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id === 'down' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (e.currentTarget.id === 'up' && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const NoResult = () => {
    if (products.length < 1) {
      return (
        <div className="flex w-full justify-center">
          <img
            className="object-fit"
            src={require('../../images/noSearchResult.png')}
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center justify-center w-full lg:w-[64rem] mx-auto bg-zinc-100 dark:bg-DMMainColor px-4">
      <div className="mt-8 md:mt-16 mb-4 justify-start w-full text-3xl font-bold dark:text-white tracking-tighter">
        # {keyword}
        <span className="font-normal dark:text-white/40"> 제품 검색 결과</span>
      </div>
      <NoResult />
      <div className="mb-6 flex flex-row w-full max-sm:flex-col">
        {products?.map((el, idx) => {
          return (
            <div
              key={idx}
              className="mx-2 
              group flex flex-col sm:flex-[1_1_40%] lg:flex-[1_1_30%] flex-[1_1_50%] my-1 hover:bg-white dark:hover:bg-DMSubColor rounded-3xl dark:hover:text-white "
            >
              <div
                role="button"
                onClick={onProductClick}
                id={el.id.toString()}
                className="overflow-hidden aspect-[16/9] bg-slate-200 rounded-3xl group-hover:rounded-b-none"
              >
                {el.thumbnail.length === 0 ? (
                  <img
                    className="object-cover w-full h-full scale-105"
                    src={require('../../images/noSearchResult.png')}
                  />
                ) : (
                  <img
                    className="object-cover w-full h-full scale-105"
                    src={`${domain}${el.thumbnail}`}
                  />
                )}
              </div>
              <div>
                <div className="pt-6 px-4">{el.name}</div>
                <div className="flex pb-8 px-4 justify-between dark:text-white/50">
                  <div>{el.type.toLowerCase()}</div>
                  <div>{el.createdAt}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        {totalPages > 1 ? (
          <div className="flex p-4 justify-center">
            <button
              onClick={onPageClick}
              id="down"
              className="p-4 rounded-full hover:bg-slate-300 ease-in-out duration-150"
            >
              <FaChevronLeft size="30" />
            </button>
            <div className="mx-16 font-bold text-xl flex items-center">
              <div className="p-2">{currentPage}</div>
              <div className="p-2">/</div>
              <div className="text-gray-500 p-2">{totalPages}</div>
            </div>
            <button
              onClick={onPageClick}
              id="up"
              className="p-4 rounded-full hover:bg-slate-300 ease-in-out duration-150"
            >
              <FaChevronRight size="30" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchProduct;
