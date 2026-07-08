import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function ForgotPassword() {
  const navigate = useNavigate();
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
            <h1 style={styles.title}>Reset your password</h1>
            <p style={styles.subtitle}>
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {sent ? (
            <div style={styles.success}>
              <p style={{ fontWeight: 600, marginBottom: '8px' }}>
                Check your email
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                If an account exists for <strong>{email}</strong>, we've sent a
                password reset link. Check your spam folder if you don't see it.
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
                  {loading ? 'Sending...' : 'Send reset link →'}
                </button>
              </form>
            </>
          )}

          <p style={styles.cardFooter}>
            <Link to="/login" style={styles.footerLink}>
              ← Back to sign in
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
  success: {
    background: '#D1FAE5', color: '#065F46',
    padding: '16px', borderRadius: '10px',
    textAlign: 'center', marginBottom: '8px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontSize: '13px', fontWeight: 500, color: 'var(--text)' },
  btn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '10px',
    padding: '13px', fontSize: '15px', fontWeight: 700,
    cursor: 'pointer',
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