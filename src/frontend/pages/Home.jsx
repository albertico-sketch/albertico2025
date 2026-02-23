import { Categories, FeaturedProducts, Hero } from '../components';
import BestSellers from '../components/BestSellers/BestSellers';
import { useAllProductsContext } from '../contexts/ProductsContextProvider';

const Home = () => {
  const { products: productsFromContext } = useAllProductsContext();

  if (productsFromContext.length < 1) {
    return <main className='full-page'></main>;
  }

  return (
    <main>
      <Hero />
      <BestSellers />
      <Categories />
      <FeaturedProducts />
    </main>
  );
};

export default Home;
