// [GET]
import { getProducts } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Product } from '../../types/mainPageTypes';
import MainCategory from '../Selectors/MainCategory';
import { useNavigate } from 'react-router-dom';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { useIsLogin } from '../../store/login';

const ProductList = () => {
  const navigate = useNavigate();
  const { isLogin } = useIsLogin();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState('all');
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const offset = (currentPage - 1) * 9;

  const getParsedDate = (createdAt: string) => {
    return new Date(createdAt).toLocaleDateString('ko-KR');
  };

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await getProducts();
      setProducts(data.cards.reverse());
      setTotalPage(Math.ceil(data.cards.length / 9));

      if (category === 'all') {
        setProducts(data.cards);
      } else {
        setProducts(
          data.cards.filter((el: Product) => el.type.toLowerCase() === category)
        );
        setTotalPage(
          Math.ceil(
            data.cards.filter(
              (el: Product) => el.type.toLowerCase() === category
            ).length / 9
          )
        );
      }
    };
    getProductData();
  }, [category]);

  //베스트 리뷰 클릭시 해당 리뷰로 가짐
  const onReviewClick = () => {
    if (!isLogin) {
      navigate('/login');
    } else {
      navigate('/review/write');
    }
  };

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
    <>
      {products === undefined ? (
        <div>loading</div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-row w-2/3 justify-between items-center px-8 my-4 ">
              <h1 className="font-bold text-xl items-center flex ">
                제품 카테고리
              </h1>
              <button
                onClick={onReviewClick}
                className="font-medium text-white pb-0.5 px-5 h-10 rounded-full bg-blue-500 hover:bg-blue-400"
              >
                리뷰쓰기
              </button>
            </div>
            <div className="w-full flex justify-center items-center">
              <MainCategory
                setCategory={setCategory}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
          <div className="flex items-center justify-center ">
            <div className="m-16 flex flex-wrap w-4/5 ">
              {products.slice(offset, offset + 9).map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className="mb-12 flex w-full lg:w-1/3 md:w-1/2 justify-center drop-shadow-productList p-4 lg:px-16 hover:-translate-y-1 transition ease-in-out hover:scale-110"
                  >
                    <div
                      role="button"
                      onClick={onProductClick}
                      id={el.id.toString()}
                      className="flex flex-col w-full bg-white rounded-b-lg"
                    >
                      {el?.filePath === null ? (
                        <img
                          src={require('../../images/Image-null.png')}
                          className="object-contain rounded-t-lg h-48"
                        />
                      ) : (
                        <img
                          className="object-contain w-full rounded-t-lg h-48"
                          src={`https://codetech.nworld.dev${el?.filePath}`}
                        />
                      )}

                      <div className="h-full flex flex-col justify-between">
                        <div className="p-2 border-t-2 w-full border-slate-300">
                          {el.name}
                        </div>
                        <div className="flex p-2 justify-between items-center">
                          <div className="p-1 px-2 rounded-full bg-slate-100 text-slate-600 text-sm">
                            {el.type.toLowerCase()}
                          </div>
                          <div className="text-sm ">
                            {getParsedDate(el.createdAt)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
