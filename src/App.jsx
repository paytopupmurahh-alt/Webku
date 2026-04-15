import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductList from './components/ProductList';
import AdminLogin from './components/AdminLogin';
import Toast from './components/Toast';
import Footer from './components/Footer';

function App() {
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleAdminSuccess = () => {
    setIsAdmin(true);
    showToast('Selamat datang di panel admin!', 'success');
  };

  const handleBuy = (product) => {
    if (isAdmin) {
      showToast('Mode admin - transaksi tidak diproses', 'warning');
    } else {
      showToast(`${product.name} ditambahkan ke keranjang (fitur segera hadir)`, 'info');
    }
  };

  return (
    <div style={styles.app}>
      <Navbar onAdminClick={() => setAdminLoginOpen(true)} />
      <main style={styles.main}>
        <Hero />
        <ProductList onBuy={handleBuy} showToast={showToast} />
      </main>
      <Footer />

      <AdminLogin
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={handleAdminSuccess}
        showToast={showToast}
      />

      {/* Toast Container */}
      <div style={styles.toastContainer}>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            id={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>

      {/* Global animation styles */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          ${styles.navbarSm}
        }
      `}</style>
    </div>
  );
}

const styles = {
  app: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)'
  },
  main: {
    flex: 1
  },
  toastContainer: {
    position: 'fixed',
    bottom: 0,
    right: 0,
    pointerEvents: 'none',
    zIndex: 999
  },
  navbarSm: `
    nav {
      padding: 12px 16px;
    }
  `
};

export default App;
