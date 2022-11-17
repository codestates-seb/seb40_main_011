// [GET]
import { getProduct } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Product } from '../../types/mainPageTypes';
import MainCategory from '../Selectors/MainCategory';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>();
  const [category, setCategory] = useState('all');

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await getProduct();
      //카테고리 분기
      if (category === 'all') {
        setProducts(data);
      }
      //데이터에서 해당 카테고리에 맞는 친구 찾기
      else {
        setProducts(
          data.filter((el: Product) => el.type.toLowerCase() === category)
        );
      }
    };
    getProductData();
  }, [category]);

  const onReviewClick = () => {
    navigate('/reviews');
  };

  return (
    <>
      {products === undefined ? (
        <div>loading</div>
      ) : (
        <div className="flex flex-col">
          <div className="flex flex-row flex-start justify-evenly my-4">
            <h1 className="font-bold text-xl items-center flex">Products</h1>
            <button
              onClick={onReviewClick}
              className="border-2 px-3 py-1 border-slate-500 rounded-lg"
            >
              Review
            </button>
          </div>
          <div className="flex justify-center items-center">
            <MainCategory setCategory={setCategory} />
          </div>
          <div className="flex items-center justify-center">
            <div className="m-16 flex flex-wrap w-4/5 ">
              {products.map((el, idx) => {
                return (
                  <div
                    key={idx}
                    className="flex w-1/3 justify-center  drop-shadow-productList p-4"
                  >
                    <div className=" flex flex-col w-4/5 bg-white rounded-b-lg ">
                      <img className="rounded-t-lg" src={el.image} />
                      <div className="p-2 border-t-2">{el.name}</div>
                      <div className="flex p-2 justify-between">
                        <div>{el.type.toLowerCase()}</div>
                        <div className="이거 조회수로 바꿀거임">
                          {el.createdAt}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;
