import React, { useState } from 'react';

const AdminLogin = ({ isOpen, onClose, onSuccess, showToast }) => {
  const [step, setStep] = useState('login'); // login, otp, success
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!username || !password) {
      showToast('Username dan password harus diisi', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        showToast('OTP telah dikirim ke WhatsApp', 'success');
        setStep('otp');
        // Show OTP for testing (if in development)
        if (data.otp && data.otp !== '***') {
          showToast(`[TEST] OTP: ${data.otp}`, 'warning');
        }
      } else {
        showToast(data.message || 'Gagal mengirim OTP', 'error');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      showToast('Error: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      showToast('OTP harus diisi', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ otp })
      });

      const data = await response.json();

      if (data.success) {
        showToast('Login berhasil!', 'success');
        setStep('success');
        localStorage.setItem('adminToken', data.token);
        setTimeout(() => {
          handleClose();
          onSuccess && onSuccess();
        }, 1000);
      } else {
        showToast(data.message || 'OTP salah', 'error');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      showToast('Error: ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('login');
    setUsername('');
    setPassword('');
    setOtp('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay} onClick={handleClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={handleClose}>✕</button>

        {step === 'login' && (
          <div style={styles.content}>
            <h2 style={styles.title}>🔐 Admin Login</h2>
            <p style={styles.subtitle}>Masukkan username dan password</p>

            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  style={styles.input}
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleSendOTP}
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.6 : 1
                }}
                disabled={loading}
              >
                {loading ? 'Mengirim OTP...' : 'Kirim OTP ke WhatsApp'}
              </button>
            </div>
          </div>
        )}

        {step === 'otp' && (
          <div style={styles.content}>
            <h2 style={styles.title}>✅ Verifikasi OTP</h2>
            <p style={styles.subtitle}>Masukkan kode OTP yang dikirim ke WhatsApp</p>

            <div style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Kode OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                  placeholder="000000"
                  style={{
                    ...styles.input,
                    textAlign: 'center',
                    fontSize: '24px',
                    letterSpacing: '8px',
                    fontWeight: 'bold'
                  }}
                  maxLength={6}
                  disabled={loading}
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                style={{
                  ...styles.submitBtn,
                  opacity: loading ? 0.6 : 1
                }}
                disabled={loading}
              >
                {loading ? 'Verifikasi...' : 'Verifikasi OTP'}
              </button>

              <button
                onClick={() => {
                  setStep('login');
                  setOtp('');
                }}
                style={styles.backBtn}
                disabled={loading}
              >
                Kembali
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div style={styles.successContent}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successTitle}>Login Berhasil!</h2>
            <p style={styles.successMessage}>Anda telah berhasil masuk sebagai admin</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    backgroundColor: 'var(--color-bg-secondary)',
    borderRadius: '12px',
    border: '1px solid var(--color-border)',
    padding: '32px',
    maxWidth: '400px',
    width: '90%',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
    position: 'relative',
    animation: 'slideIn 0.3s ease-out'
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--color-text)',
    fontSize: '24px',
    cursor: 'pointer',
    transition: 'color 0.2s'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--color-text)',
    margin: 0
  },
  subtitle: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--color-text)'
  },
  input: {
    padding: '12px',
    backgroundColor: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    color: 'var(--color-text)',
    fontSize: '14px',
    transition: 'border-color 0.2s',
    fontFamily: 'inherit'
  },
  submitBtn: {
    padding: '12px 24px',
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  backBtn: {
    padding: '12px 24px',
    backgroundColor: 'transparent',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s'
  },
  successContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
    textAlign: 'center'
  },
  successIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-success)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 'bold'
  },
  successTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--color-text)',
    margin: 0
  },
  successMessage: {
    fontSize: '14px',
    color: 'var(--color-text-secondary)',
    margin: 0
  }
};

export default AdminLogin;
