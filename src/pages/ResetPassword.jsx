import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/password-reset/confirm/', { uid, token, password });
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      const msg = err.response?.data?.error;
      setError(msg || 'This reset link is invalid or has expired.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>✦ StyleAI</h1>
          <p style={styles.subtitle}>Set a new password</p>
        </div>

        {success ? (
          <div style={styles.success}>
            <p style={{ fontWeight: 600, marginBottom: '8px' }}>Password reset successful</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <>
            {error && <div style={styles.error}>{error}</div>}
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>New password</label>
                <input
                  type="password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Confirm new password</label>
                <input
                  type="password"
                  placeholder="Repeat your new password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                style={loading ? { ...styles.btn, opacity: 0.7 } : styles.btn}
                disabled={loading}
              >
                {loading ? 'Resetting...' : 'Reset password'}
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