export default function Footer() {
    return (
      <footer style={styles.footer}>
        <div style={styles.content}>
          <span style={styles.brand}>✦ StyleAI</span>
          <span style={styles.tagline}>AI-powered outfit suggestions from your own wardrobe</span>
        </div>
        <div style={styles.copyright}>
          © {new Date().getFullYear()} StyleAI · Built by Annu Thomas
        </div>
      </footer>
    );
  }
  
  const styles = {
    footer: {
      borderTop: '1px solid var(--border)',
      background: 'var(--surface)',
      padding: '20px',
      marginTop: 'auto',
      textAlign: 'center',
    },
    content: {
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', gap: '4px', marginBottom: '8px',
    },
    brand: { fontSize: '14px', fontWeight: 700, color: 'var(--primary)' },
    tagline: { fontSize: '12px', color: 'var(--text-muted)' },
    copyright: { fontSize: '11px', color: 'var(--text-muted)' },
  };