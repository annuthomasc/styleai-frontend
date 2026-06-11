import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.username, form.password);
      navigate('/wardrobe');
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.logo}>✦ StyleAI</h1>
          <p style={styles.subtitle}>Sign in to your wardrobe</p>
          <p style={styles.tagline}>AI-powered outfit suggestions from your own wardrobe</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Username</label>
            <input
              name="username"
              type="text"
              placeholder="Enter your username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            style={loading ? { ...styles.btn, opacity: 0.7 } : styles.btn}
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <p style={{ ...styles.footer, marginTop: '12px', marginBottom: '0' }}>
          <Link to="/forgot-password" style={styles.footerLink}>Forgot password?</Link>
        </p>
        <p style={styles.footer}>
          Don't have an account?{' '}
            <Link to="/register" style={styles.footerLink}>Create one</Link>
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
  tagline: { fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' },
  error: {
    background: '#FEE2E2', color: '#991B1B',
    padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '16px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: '500', color: 'var(--text)' },
  btn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '10px',
    padding: '12px', fontSize: '15px', fontWeight: '600',
    marginTop: '6px',
  },
  footer: { textAlign: 'center', marginTop: '24px', fontSize: '13px', color: 'var(--text-muted)' },
  footerLink: { color: 'var(--primary)', fontWeight: '500' },
};