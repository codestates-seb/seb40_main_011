// Snack Review List fetching & boxing comp
import { Suspense, useEffect } from 'react';
import BestReviewList from '../components/List/BestReviewList';
import ProductList from '../components/List/ProductList';
import QuestionList from '../components/List/QuestionList';
import useReview from '../store/review';
import useCategories from '../store/categories';

const Main = () => {
  const {
    setTitle,
    setContent,
    setProductId,
    setThumbnailBase64,
    setThumnailImg,
  } = useReview();

  const { clearClickName } = useCategories();

  useEffect(() => {
    setTitle('');
    setContent('');
    setProductId('');
    setThumbnailBase64('');
    setThumnailImg('');
    clearClickName('');
  }, []);
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <BestReviewList />
        <ProductList />
        <QuestionList />
      </Suspense>
    </>
  );
};

export default Main;
