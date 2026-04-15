import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AdminLogin from './components/AdminLogin';
import Toast from './components/Toast';
import Footer from './components/Footer';

function App() {
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products dari API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Gagal memuat produk');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Gagal memuat produk');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar onAdminClick={() => setAdminLoginOpen(true)} />
      <main>
        <Hero />

        {/* Products Section */}
        <section className="py-12 px-4 md:px-8 lg:px-16 bg-black">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white">
              Produk Kami
            </h2>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <span className="ml-3 text-lg text-gray-300">Loading...</span>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="flex justify-center items-center py-20">
                <div className="text-center">
                  <p className="text-red-500 text-lg font-semibold mb-4">{error}</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition"
                  >
                    Coba Lagi
                  </button>
                </div>
              </div>
            )}

            {/* Products Grid */}
            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                  <div
                    key={product.id}
                    className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/50 transition-shadow duration-300 border border-gray-800 hover:border-blue-500"
                  >
                    {/* Product Image */}
                    <div className="w-full h-48 bg-gray-800 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="text-xl font-bold text-white mb-2 truncate">
                        {product.name}
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2 h-10">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-400">
                          {formatPrice(product.price)}
                        </span>
                        <button
                          onClick={() => handleBuy(product)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          Beli
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="flex justify-center items-center py-20">
                <p className="text-gray-400 text-lg">Belum ada produk</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <AdminLogin
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccess={handleAdminSuccess}
        showToast={showToast}
      />

      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
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
      `}</style>
    </div>
  );
}

export default App;
