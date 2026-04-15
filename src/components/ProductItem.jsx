import React from 'react';

const ProductItem = ({ product, onBuy }) => {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img 
          src={product.image} 
          alt={product.name}
          style={styles.image}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = '<div style="width:100%;height:200px;background:var(--color-bg-secondary);display:flex;align-items:center;justify-content:center;color:var(--color-text-secondary);">Gambar tidak tersedia</div>';
          }}
        />
      </div>
      <div style={styles.content}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.description}>{product.description}</p>
        <div style={styles.footer}>
          <span style={styles.price}>Rp {product.price.toLocaleString('id-ID')}</span>
          <button 
            style={styles.buyBtn}
            onClick={() => onBuy(product)}
          >
            Beli Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    transition: 'all 0.2s',
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    overflow: 'hidden',
    backgroundColor: 'var(--color-bg)'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.2s'
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    flex: 1
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--color-text)',
    margin: 0
  },
  description: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0,
    flex: 1
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto'
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'var(--color-primary)'
  },
  buyBtn: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  }
};

export default ProductItem;
