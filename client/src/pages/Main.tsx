// Snack Review List fetching & boxing comp
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ProductList from '../components/List/ProductList';
import ReviewList from '../components/List/ReviewList';

const Main = () => {
  return (
    <>
      <Header></Header>
      <ReviewList></ReviewList>
      <ProductList></ProductList>
      <Footer></Footer>
    </>
  );
};

export default Main;
