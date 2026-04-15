import React from 'react';

const Hero = () => {
  return (
    <section style={styles.hero}>
      <div style={styles.container}>
        <div style={styles.content}>
          <h1 style={styles.title}>
            Top Up Game <span style={styles.highlight}>Murah & Instan</span>
          </h1>
          <p style={styles.subtitle}>
            Proses cepat, harga terjangkau, dan aman. Dapatkan diamond, coin, atau item favorit kamu sekarang!
          </p>
          <div style={styles.features}>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>⚡</span>
              <span>Instan Proses</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🛡️</span>
              <span>100% Aman</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>💰</span>
              <span>Harga Terbaik</span>
            </div>
            <div style={styles.feature}>
              <span style={styles.featureIcon}>🎮</span>
              <span>8+ Game</span>
            </div>
          </div>
          <button style={styles.cta} onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}>
            Mulai Top Up Sekarang
          </button>
        </div>
        <div style={styles.decoration}>
          <div style={styles.floatingIcons}>
            <span style={{ ...styles.icon, animation: 'float 3s ease-in-out infinite' }}>🎮</span>
            <span style={{ ...styles.icon, animation: 'float 4s ease-in-out 0.5s infinite' }}>💎</span>
            <span style={{ ...styles.icon, animation: 'float 5s ease-in-out 1s infinite' }}>⚡</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </section>
  );
};

const styles = {
  hero: {
    padding: '80px 20px',
    background: 'linear-gradient(135deg, var(--color-bg) 0%, var(--color-bg-secondary) 100%)',
    borderBottom: '1px solid var(--color-border)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    alignItems: 'center'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  title: {
    fontSize: '48px',
    fontWeight: 'bold',
    lineHeight: '1.2',
    color: 'var(--color-text)'
  },
  highlight: {
    color: 'var(--color-primary)'
  },
  subtitle: {
    fontSize: '18px',
    color: 'var(--color-text-secondary)',
    lineHeight: '1.6'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px'
  },
  feature: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px',
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    fontSize: '14px'
  },
  featureIcon: {
    fontSize: '20px'
  },
  cta: {
    padding: '16px 32px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: 'fit-content'
  },
  decoration: {
    position: 'relative',
    height: '300px'
  },
  floatingIcons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: '40px',
    fontSize: '60px'
  },
  icon: {
    filter: 'drop-shadow(0 4px 12px rgba(255, 140, 0, 0.2))'
  },
  '@media (max-width: 768px)': {
    container: {
      gridTemplateColumns: '1fr',
      padding: '40px 20px'
    },
    title: {
      fontSize: '32px'
    },
    subtitle: {
      fontSize: '16px'
    }
  }
};

export default Hero;
