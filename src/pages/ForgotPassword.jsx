import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/auth/password-reset/', { email });
      setSent(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>✦ StyleAI</h1>
          <p style={styles.subtitle}>Reset your password</p>
        </div>

        {sent ? (
          <div style={styles.success}>
            <p style={{ fontWeight: 600, marginBottom: '8px' }}>Check your email</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              If an account exists for <strong>{email}</strong>, we've sent a password reset link.
              Check your spam folder if you don't see it.
            </p>
          </div>
        ) : (
          <>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Email address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                style={loading ? { ...styles.btn, opacity: 0.7 } : styles.btn}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send reset link'}
              </button>
            </form>
          </>
        )}

        <p style={styles.footer}>
          <Link to="/login" style={styles.footerLink}>← Back to sign in</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: 'var(--bg)', padding: '20px',
  },
  card: {
    background: 'var(--white)', borderRadius: '16px',
    padding: '40px', width: '100%', maxWidth: '420px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 24px rgba(160,120,90,0.10)',
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  logo: { fontSize: '28px', color: 'var(--primary)', marginBottom: '6px' },
  subtitle: { color: 'var(--text-muted)', fontSize: '14px' },
  error: {
    background: '#FEE2E2', color: '#991B1B',
    padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '16px',
  },
  success: {
    background: '#D1FAE5', color: '#065F46',
    padding: '16px', borderRadius: '10px',
    textAlign: 'center', marginBottom: '8px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '500', color: 'var(--text)' },
  btn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '10px',
    padding: '12px', fontSize: '15px', fontWeight: '600',
  },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '13px' },
  footerLink: { color: 'var(--primary)', fontWeight: '500' },
};