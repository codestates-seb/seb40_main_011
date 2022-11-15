// Snack Review List fetching & boxing comp
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import ProductList from '../components/List/ProductList';
import useFetch from '../util/useFetch';

const Main = () => {
  const url = '/review';
  const isPending = useFetch(url)[1];

  return (
    <>
      <Header></Header>
      {isPending ? <div>loading...</div> : <div>hi</div>}
      <ProductList></ProductList>
      <Footer></Footer>
    </>
  );
};

export default Main;
