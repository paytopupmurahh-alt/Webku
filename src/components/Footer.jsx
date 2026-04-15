import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.content}>
          <div style={styles.section}>
            <h3 style={styles.title}>Webku</h3>
            <p style={styles.description}>Top up game mudah, cepat, dan terjangkau</p>
          </div>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Menu</h4>
            <ul style={styles.links}>
              <li><a href="#home" style={styles.link}>Beranda</a></li>
              <li><a href="#products" style={styles.link}>Produk</a></li>
              <li><a href="#status" style={styles.link}>Cek Status</a></li>
            </ul>
          </div>
          <div style={styles.section}>
            <h4 style={styles.sectionTitle}>Kontak</h4>
            <p style={styles.contactText}>📧 support@webku.com</p>
            <p style={styles.contactText}>💬 WhatsApp: +62 812 345 678</p>
          </div>
        </div>
        <div style={styles.bottom}>
          <p style={styles.copyright}>© 2024 Webku. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderTop: '1px solid var(--color-border)',
    padding: '40px 20px 20px',
    marginTop: '60px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  title: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--color-primary)',
    margin: 0
  },
  description: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--color-text)',
    margin: 0
  },
  links: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  link: {
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s'
  },
  contactText: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0
  },
  bottom: {
    textAlign: 'center',
    paddingTop: '20px',
    borderTop: '1px solid var(--color-border)'
  },
  copyright: {
    fontSize: '13px',
    color: 'var(--color-text-secondary)',
    margin: 0
  }
};

export default Footer;
