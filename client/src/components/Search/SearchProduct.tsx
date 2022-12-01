import { getSearchProduct } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Product } from '../../types/mainPageTypes';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';

const SearchProduct = ({ keyword }: any) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>();
  const [category, setCategory] = useState('all');
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageAmount = {
    page: '0',
    size: '9',
  };

  console.log(products);
  useEffect(() => {
    const getProductData = async () => {
      const { data } = await getSearchProduct(keyword);
      setProducts(data.reviewLists);
    };
    getProductData();
  }, [category]);

  const onProductClick = (e: React.MouseEvent<HTMLElement>) => {
    navigate(`/categories/review/${e.currentTarget.id}`);
  };

  //페이지네이션
  const onPageClick = (e: React.MouseEvent<HTMLElement>) => {
    if (e.currentTarget.id === 'down' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    if (e.currentTarget.id === 'up' && currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-[64rem]">
      <div className="mt-16 mb-4 justify-start w-full text-xl font-bold">
        # {keyword} 에 대한 제품 검색 결과
      </div>
      <div className="my-16 flex flex-row w-full">
        {products?.map((el, idx) => {
          return (
            <div
              key={idx}
              className="w-1/4 drop-shadow-productList mr-4 hover:-translate-y-1 transition ease-in-out hover:scale-110"
            >
              <div
                role="button"
                onClick={onProductClick}
                id={el.id.toString()}
                className=" flex flex-col w-full bg-white rounded-b-lg"
              >
                <img
                  className="rounded-t-lg h-48"
                  src={require('../../images/Image-null.png')}
                />
                <div>
                  <div className="p-2 border-t-2 border-slate-300">
                    {el.name}
                  </div>
                  <div className="flex p-2 justify-between">
                    <div>{el.type.toLowerCase()}</div>
                    <div className="이거 평점으로 바꿀거임">{el.createdAt}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full">
        {totalPage > 1 ? (
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
              <div className="text-gray-500 p-2">{totalPage}</div>
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
