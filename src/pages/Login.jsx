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

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <span
          onClick={() => navigate('/')}
          style={styles.navLogo}
        >
          ✦ StyleAI
        </span>
        <div style={styles.navLinks}>
          <span style={styles.navText}>Don't have an account?</span>
          <button
            onClick={() => navigate('/register')}
            style={styles.navCta}
          >
            Create one free
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.logo}>Welcome back</h1>
            <p style={styles.subtitle}>Sign in to your wardrobe</p>
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
              {loading ? 'Signing in...' : 'Sign in →'}
            </button>
          </form>

          <p style={styles.cardFooter}>
            <Link to="/forgot-password" style={styles.footerLink}>
              Forgot password?
            </Link>
          </p>
        </div>
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <span style={styles.footerBrand}>✦ StyleAI</span>
          <span style={styles.footerTagline}>
            AI-powered outfit suggestions from your own wardrobe
          </span>
          <span style={styles.footerCredit}>
            © 2026 StyleAI · Built by Annu Thomas
          </span>
        </div>
      </footer>

    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh', display: 'flex', flexDirection: 'column',
    background: 'var(--bg)',
  },

  // NAV
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 40px', borderBottom: '1px solid var(--border)',
    background: 'var(--white)',
  },
  navLogo: {
    fontSize: '18px', fontWeight: 700, color: 'var(--primary)',
    cursor: 'pointer', letterSpacing: '-0.3px',
  },
  navLinks: { display: 'flex', gap: '12px', alignItems: 'center' },
  navText: { fontSize: '13px', color: 'var(--text-muted)' },
  navCta: {
    background: 'var(--primary)', color: 'var(--white)', border: 'none',
    borderRadius: '8px', padding: '8px 18px', fontSize: '13px',
    fontWeight: 600, cursor: 'pointer',
  },

  // MAIN
  main: {
    flex: 1, display: 'flex', alignItems: 'center',
    justifyContent: 'center', padding: '40px 20px',
  },
  card: {
    background: 'var(--white)', borderRadius: '16px',
    padding: '40px', width: '100%', maxWidth: '420px',
    border: '1px solid var(--border)',
    boxShadow: '0 4px 24px rgba(160,120,90,0.10)',
  },
  header: { textAlign: 'center', marginBottom: '28px' },
  logo: {
    fontSize: '24px', fontWeight: 800, color: 'var(--text)',
    marginBottom: '6px', letterSpacing: '-0.5px',
  },
  subtitle: { color: 'var(--text-muted)', fontSize: '14px' },
  error: {
    background: '#FEE2E2', color: '#991B1B',
    padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '16px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: 500, color: 'var(--text)' },
  btn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '10px',
    padding: '13px', fontSize: '15px', fontWeight: 700,
    marginTop: '6px', cursor: 'pointer',
  },
  cardFooter: {
    textAlign: 'center', marginTop: '20px',
    fontSize: '13px', color: 'var(--text-muted)',
  },
  footerLink: { color: 'var(--primary)', fontWeight: 500 },

  // FOOTER
  footer: {
    borderTop: '1px solid var(--border)', background: 'var(--surface)',
    padding: '28px 40px',
  },
  footerContent: {
    maxWidth: '1000px', margin: '0 auto',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '8px',
  },
  footerBrand: { fontSize: '15px', fontWeight: 700, color: 'var(--primary)' },
  footerTagline: { fontSize: '13px', color: 'var(--text-muted)' },
  footerCredit: { fontSize: '12px', color: 'var(--text-muted)' },
};