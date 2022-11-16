// [GET]
import { getProduct } from '../../util/apiCollection';
import { useEffect, useState } from 'react';
import { Product } from '../../types/mainPageTypes';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const getProductData = async () => {
      const { data } = await getProduct();
      setProducts(data);
    };
    getProductData();
  }, []);
  console.log(products);

  return (
    <>
      {products === undefined ? (
        <div>loading</div>
      ) : (
        <>
          <div className="grid grid-rows-3 grid-flow-col gap-4 items-center h-3/5">
            {products.map((el, idx) => {
              return (
                <ul
                  className="flex flex-col items-center justify-center"
                  key={idx}
                >
                  <img className="w-1/2" src={el.image} />
                  <div>{el.name}</div>
                  <div>{el.createdAt}</div>
                </ul>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default ProductList;
