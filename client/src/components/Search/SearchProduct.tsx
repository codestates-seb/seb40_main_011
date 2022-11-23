import { getProductTest } from '../../util/testApiCollection';
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

  useEffect(() => {
    const getProductData = async () => {
      //인스턴스 데이터
      const { data } = await getProductTest();
      //카테고리 분기
      if (category === 'all') {
        //all이 선택되면 전체에서 앞의 9개만 가지고 오기
        setProducts(data.slice(0, 9));
        setTotalPage(Math.ceil(data.length / 9));
        //data.length / 9 round up 해서 정수만큼 페이지네이션 구현 2페이지로 갈땐 (start + 9, end + 9) > 버튼 눌렀을때도
        //< 버튼누르면 반대로 뺴주기
      }
      //데이터에서 해당 카테고리에 맞는 친구 찾기
      else {
        //그 외 카테고리가 선택되면 카테고리명과 제품의 type을 비교해서 9개 가지고 오기
        setProducts(
          data
            .filter((el: Product) => el.type.toLowerCase() === category)
            .slice(0, 9)
        );
      }
    };
    getProductData();
  }, [category]);

  //베스트 리뷰 클릭시 해당 리뷰로 가짐
  const onReviewClick = () => {
    navigate('/review/create');
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
    <div className="flex flex-col items-center justify-center">
      <div className="mt-16 mb-4 mx-16 justify-start w-2/3 text-xl font-bold">
        # {keyword} 에 대한 제품 검색 결과
      </div>
      <div className="m-16 flex flex-wrap w-4/5">
        {products?.map((el, idx) => {
          return (
            <div
              key={idx}
              className="mb-12 flex lg:w-1/3 justify-center drop-shadow-productList p-4 px-20 hover:-translate-y-1 transition ease-in-out hover:scale-110"
            >
              <div
                role="button"
                onClick={onProductClick}
                id={el.id.toString()}
                className=" flex flex-col w-full bg-white rounded-b-lg"
              >
                <img className="rounded-t-lg h-48" src={el.image} />
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
  );
};

export default SearchProduct;
