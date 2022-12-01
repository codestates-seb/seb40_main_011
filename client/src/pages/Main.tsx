// Snack Review List fetching & boxing comp
import { useEffect } from 'react';
import BestReviewList from '../components/List/BestReviewList';
import ProductList from '../components/List/ProductList';
import QuestionList from '../components/List/QuestionList';
import useReview from '../store/review';
import useCategorie from '../store/categorie';

const Main = () => {
  const {
    setTitle,
    setContent,
    setProductId,
    setThumbnailBase64,
    setThumnailImg,
  } = useReview();

  const { clearClickName } = useCategorie();

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
      <BestReviewList />
      <ProductList />
      <QuestionList />
    </>
  );
};

export default Main;
