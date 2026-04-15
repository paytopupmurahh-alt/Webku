import React, { useState, useEffect } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ onBuy, showToast }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory === 'all' 
        ? '/api/products'
        : `/api/products?category=${selectedCategory}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data || []);
      } else {
        showToast('Gagal memuat produk', 'error');
        setProducts([]);
      }
    } catch (error) {
      console.error('Fetch products error:', error);
      showToast('Error: ' + error.message, 'error');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="products" style={styles.section}>
      <div style={styles.container}>
        <h2 style={styles.title}>Produk Tersedia</h2>
        
        <div style={styles.filterContainer}>
          <button
            onClick={() => setSelectedCategory('all')}
            style={{
              ...styles.filterBtn,
              ...(selectedCategory === 'all' ? styles.filterBtnActive : {})
            }}
          >
            Semua
          </button>
          <button
            onClick={() => setSelectedCategory('game')}
            style={{
              ...styles.filterBtn,
              ...(selectedCategory === 'game' ? styles.filterBtnActive : {})
            }}
          >
            🎮 Game
          </button>
        </div>

        {loading && (
          <div style={styles.loaderContainer}>
            <div style={styles.loader}></div>
            <p style={styles.loadingText}>Memuat produk...</p>
          </div>
        )}

        {!loading && products.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>Tidak ada produk yang tersedia</p>
          </div>
        )}

        {!loading && products.length > 0 && (
          <div style={styles.grid}>
            {products.map(product => (
              <ProductItem
                key={product.id}
                product={product}
                onBuy={onBuy}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '60px 20px',
    backgroundColor: 'var(--color-bg)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '32px',
    color: 'var(--color-text)',
    textAlign: 'center'
  },
  filterContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '32px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '10px 20px',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-text)',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  filterBtnActive: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    borderColor: 'var(--color-primary)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  loaderContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px'
  },
  loader: {
    border: '3px solid var(--color-bg-secondary)',
    borderRadius: '50%',
    borderTop: '3px solid var(--color-primary)',
    width: '40px',
    height: '40px',
    animation: 'spin 1s linear infinite'
  },
  loadingText: {
    marginTop: '16px',
    color: 'var(--color-text-secondary)',
    fontSize: '14px'
  },
  emptyState: {
    textAlign: 'center',
    padding: '60px 20px'
  },
  emptyText: {
    color: 'var(--color-text-secondary)',
    fontSize: '16px'
  }
};

export default ProductList;
