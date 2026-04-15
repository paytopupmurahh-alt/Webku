import React, { useState } from 'react';

const Navbar = ({ onAdminClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🎮</span>
          <span style={styles.logoText}>Webku</span>
        </div>

        <button 
          style={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        <div style={{
          ...styles.menu,
          display: isMenuOpen ? 'flex' : 'none'
        }}>
          <a href="#home" style={styles.navLink}>Beranda</a>
          <a href="#products" style={styles.navLink}>Produk</a>
          <a href="#status" style={styles.navLink}>Cek Status</a>
          <button 
            onClick={() => {
              onAdminClick();
              setIsMenuOpen(false);
            }}
            style={styles.adminBtn}
          >
            Admin
          </button>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    position: 'sticky',
    top: 0,
    zIndex: 100
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '16px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--color-primary)'
  },
  logoIcon: {
    fontSize: '28px'
  },
  logoText: {
    color: 'var(--color-primary)'
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
    flexDirection: 'row'
  },
  navLink: {
    color: 'var(--color-text)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.2s'
  },
  adminBtn: {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  menuButton: {
    display: 'none',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-primary)',
    fontSize: '24px',
    cursor: 'pointer'
  },
  '@media (max-width: 768px)': {
    menuButton: {
      display: 'block'
    },
    menu: {
      position: 'absolute',
      top: '60px',
      right: '0',
      backgroundColor: 'var(--color-bg-secondary)',
      flexDirection: 'column',
      width: '100%',
      padding: '16px',
      gap: '12px',
      borderTop: '1px solid var(--color-border)'
    }
  }
};

// Add media query styles
const mediaStyles = `
  @media (max-width: 768px) {
    [data-navbar-menu] {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      background-color: var(--color-bg-secondary);
      flex-direction: column;
      width: 100%;
      padding: 16px;
    }
    
    [data-navbar-button] {
      display: block !important;
    }
  }
`;

export default Navbar;
