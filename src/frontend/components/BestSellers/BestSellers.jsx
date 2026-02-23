import { useAllProductsContext } from '../../contexts/ProductsContextProvider';
import ProductCard from '../ProductCard/ProductCard';
import Title from '../Title/Title';
import styles from './BestSellers.module.css';
import { useState, useEffect } from 'react';

const BestSellers = () => {
  const { products: productsFromContext, salesData } = useAllProductsContext();
  const [timeFilter, setTimeFilter] = useState('day'); // 'day' or 'week'
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (salesData && productsFromContext.length > 0) {
      const filteredSales = timeFilter === 'day' 
        ? salesData.dailySales 
        : salesData.weeklySales;
      
      // Obtener los productos más vendidos
      const topProducts = filteredSales
        .sort((a, b) => b.quantity - a.quantity)
        .slice(0, 6)
        .map(sale => {
          const product = productsFromContext.find(p => p._id === sale.productId);
          return product ? { ...product, soldQuantity: sale.quantity } : null;
        })
        .filter(Boolean);
      
      setBestSellers(topProducts);
    }
  }, [salesData, productsFromContext, timeFilter]);

  if (bestSellers.length === 0) {
    return null;
  }

  return (
    <section className='section'>
      <Title>Productos Más Vendidos</Title>
      
      <div className={styles.filterContainer}>
        <button 
          className={`btn ${timeFilter === 'day' ? 'btn-activated' : 'btn-hipster'}`}
          onClick={() => setTimeFilter('day')}
        >
          Hoy
        </button>
        <button 
          className={`btn ${timeFilter === 'week' ? 'btn-activated' : 'btn-hipster'}`}
          onClick={() => setTimeFilter('week')}
        >
          Esta Semana
        </button>
      </div>

      <div className={`container ${styles.bestSellersCenter}`}>
        {bestSellers.map((product) => (
          <div key={product._id} className={styles.productWrapper}>
            <ProductCard product={product} />
            <div className={styles.salesBadge}>
              <span>Vendidos: {product.soldQuantity}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BestSellers;