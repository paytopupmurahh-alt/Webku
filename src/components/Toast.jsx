import React from 'react';

const Toast = ({ message, type, id, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      default:
        return 'ℹ';
    }
  };

  return (
    <div style={{
      ...styles.toast,
      ...styles[`toast_${type}`]
    }}>
      <span style={styles.icon}>{getIcon()}</span>
      <span>{message}</span>
    </div>
  );
};

const styles = {
  toast: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    padding: '16px 24px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    animation: 'slideIn 0.3s ease-out',
    zIndex: 1001,
    maxWidth: '400px',
    wordBreak: 'break-word'
  },
  icon: {
    fontSize: '18px',
    fontWeight: 'bold'
  },
  toast_success: {
    backgroundColor: 'var(--color-success)'
  },
  toast_error: {
    backgroundColor: 'var(--color-danger)'
  },
  toast_warning: {
    backgroundColor: 'var(--color-warning)'
  },
  toast_info: {
    backgroundColor: 'var(--color-primary)'
  }
};

export default Toast;
