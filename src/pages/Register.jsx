import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    setLoading(true);
    try {
      await register(form.username, form.email, form.password);
      navigate('/wardrobe');
    } catch (err) {
      const data = err.response?.data;
      if (data?.username) setError('Username already taken.');
      else if (data?.email) setError('Email already registered.');
      else setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>

      {/* NAVBAR */}
      <nav style={styles.nav}>
        <span onClick={() => navigate('/')} style={styles.navLogo}>
          ✦ StyleAI
        </span>
        <div style={styles.navLinks}>
          <span style={styles.navText}>Already have an account?</span>
          <button onClick={() => navigate('/login')} style={styles.navCta}>
            Sign in
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main style={styles.main}>
        <div style={styles.card}>
          <div style={styles.header}>
            <h1 style={styles.title}>Create your account</h1>
            <p style={styles.subtitle}>
              Start building your AI-powered wardrobe
            </p>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.field}>
              <label style={styles.label}>Username</label>
              <input
                name="username"
                type="text"
                placeholder="Choose a username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Email</label>
              <input
                name="email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Password</label>
              <input
                name="password"
                type="password"
                placeholder="Minimum 8 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>Confirm password</label>
              <input
                name="confirm"
                type="password"
                placeholder="Repeat your password"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>
            <button
              type="submit"
              style={loading ? { ...styles.btn, opacity: 0.7 } : styles.btn}
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create account →'}
            </button>
          </form>

          <p style={styles.cardFooter}>
            Already have an account?{' '}
            <Link to="/login" style={styles.footerLink}>Sign in</Link>
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
  title: {
    fontSize: '24px', fontWeight: 800, color: 'var(--text)',
    marginBottom: '8px', letterSpacing: '-0.5px',
  },
  subtitle: { fontSize: '14px', color: 'var(--text-muted)' },
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
    marginTop: '4px', cursor: 'pointer',
  },
  cardFooter: {
    textAlign: 'center', marginTop: '20px',
    fontSize: '13px', color: 'var(--text-muted)',
  },
  footerLink: { color: 'var(--primary)', fontWeight: 500 },
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