// Snack Review List fetching & boxing comp
import { useEffect, Suspense, lazy } from 'react';

const BestReviewList = lazy(() => import('../components/List/BestReviewList'));
const ProductList = lazy(() => import('../components/List/ProductList'));
const QuestionList = lazy(() => import('../components/List/QuestionList'));
import useReview from '../store/review';
import useCategories from '../store/categories';
import Spinner from '../util/Spinner';

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
    <div className="bg-zinc-100 dark:bg-DMMainColor ">
      <Suspense fallback={<Spinner />}>
        <BestReviewList />
        <ProductList />
        <QuestionList />
      </Suspense>
    </div>
  );
};

export default Main;
