export default function Footer() {
  return (
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
  );
}

const styles = {
  footer: {
    borderTop: '1px solid #E8D9C8',
    backgroundColor: '#F5EFE8',
    padding: '28px 40px',
  },
  footerContent: {
    maxWidth: '1000px', margin: '0 auto',
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', flexWrap: 'wrap', gap: '8px',
  },
  footerBrand: { fontSize: '15px', fontWeight: 700, color: '#A0785A' },
  footerTagline: { fontSize: '13px', color: '#8B7355' },
  footerCredit: { fontSize: '12px', color: '#8B7355' },
};