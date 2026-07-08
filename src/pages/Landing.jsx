import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>

      {/* STICKY NAV */}
      <nav style={styles.nav}>
        <span style={styles.navLogo}>✦ StyleAI</span>
        <div style={styles.navLinks}>
          <button onClick={() => navigate('/login')} style={styles.navLogin}>Sign in</button>
          <button onClick={() => navigate('/register')} style={styles.navCta}>Try for free</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.heroWrap}>
        <div style={styles.hero}>
          {/* <div style={styles.badge}>✦ Claude Vision AI + RAG Pipeline</div> */}
          <h1 style={styles.heroTitle}>
            Your wardrobe,<br />
            <span style={styles.heroAccent}>understood by AI</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Upload your clothes. Claude Vision reads every photo automatically.
            Describe your occasion. Get outfit suggestions from your actual wardrobe.
          </p>
          <div style={styles.heroBtns}>
            <button
              onClick={() => navigate('/register')}
              style={styles.primaryBtn}
            >
              Create free account →
            </button>
            <button
              onClick={() => navigate('/login')}
              style={styles.ghostBtn}
            >
              Sign in
            </button>
          </div>
        </div>

        {/* STATS ROW — outside the constrained hero div */}
        <div style={styles.statsRow}>
          {[
            { value: '1024', label: 'Dimension Embeddings' },
            { value: 'RAG', label: 'Powered Retrieval' },
            { value: 'pgvector', label: 'Cosine Similarity' },
            { value: 'Claude AI', label: 'Vision + Generation' },
          ].map((s, i) => (
            <div
              key={s.label}
              style={{
                ...styles.stat,
                borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              }}
            >
              <span style={styles.statValue}>{s.value}</span>
              <span style={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS — dark section */}
      <div style={{
        backgroundColor: '#2C1F15',
        padding: '30px 20px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '11px', fontWeight: 700, color: '#A0785A',
          textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px',
        }}>
          How it works
        </p>
        <h2 style={{
          fontSize: '27px', fontWeight: 700, color: '#FAF7F4',
          marginBottom: '48px', letterSpacing: '-0.5px',
        }}>
          From photo to outfit in seconds
        </h2>
        <div style={styles.stepsGrid}>
          {[
            { num: '01', title: 'Upload a clothing photo', desc: 'Claude Vision AI reads the image and fills in name, category, colour, style, season, and tags automatically. No manual typing needed.' },
            { num: '02', title: 'Build your wardrobe', desc: 'Each item is converted to a 1024-dimension Voyage AI embedding and stored in pgvector. Your wardrobe becomes a searchable semantic database.' },
            { num: '03', title: 'Describe your occasion', desc: 'Type anything — beach party, job interview, first date. StyleAI understands context and meaning, not just keywords.' },
            { num: '04', title: 'Get grounded suggestions', desc: 'A RAG pipeline retrieves your most relevant items via cosine similarity. Claude AI suggests complete outfits with item photos and reasoning.' },
          ].map(step => (
            <div key={step.num} style={styles.stepCard}>
              <span style={{
                display: 'block', fontSize: '12px', fontWeight: 800,
                color: '#A0785A', marginBottom: '14px', letterSpacing: '0.06em',
              }}>
                {step.num}
              </span>
              <h3 style={{
                fontSize: '16px', fontWeight: 700,
                color: '#FAF7F4', marginBottom: '10px',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontSize: '13px', color: '#B8A898', lineHeight: 1.75, margin: 0,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* TECH STACK */}
      <section style={styles.techSection}>
        <p style={styles.sectionLabel}>Under the hood</p>
        <h2 style={styles.sectionTitle}>
          Built with production-grade AI infrastructure
        </h2>
        <div style={styles.techGrid}>
          {[
            { icon: '🧠', title: 'Claude Vision AI', desc: 'Multimodal analysis of clothing photos — category, colour, style, season, and tags extracted automatically from every image.', tag: 'claude-sonnet-4-6' },
            { icon: '🔍', title: 'Voyage AI Embeddings', desc: 'voyage-3 model generates 1024-dimension semantic vectors for every clothing item description and occasion query.', tag: 'voyage-3' },
            { icon: '⚡', title: 'pgvector Similarity Search', desc: 'PostgreSQL extension stores embedding vectors. Cosine distance search retrieves the top 10 most semantically relevant items.', tag: 'pgvector 0.8.2' },
            { icon: '🎯', title: 'Grounded Generation', desc: 'Claude only sees the retrieved items — not your entire wardrobe. Suggestions are grounded in what you actually own.', tag: 'RAG pipeline' },
            { icon: '🔐', title: 'JWT Authentication', desc: 'Access and refresh tokens with automatic silent refresh via Axios interceptors. Password reset via Resend email.', tag: 'simplejwt' },
            { icon: '☁️', title: 'Cloud Deployed', desc: 'Django REST backend on Railway with PostgreSQL. React frontend on GitHub Pages. Images stored on Cloudinary CDN.', tag: 'Railway + GitHub Pages' },
          ].map(t => (
            <div key={t.title} style={styles.techCard}>
              <div style={styles.techIconWrap}>
                <span style={styles.techIcon}>{t.icon}</span>
              </div>
              <div>
                <h4 style={styles.techTitle}>{t.title}</h4>
                <p style={styles.techDesc}>{t.desc}</p>
                <span style={styles.techTag}>{t.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BANNER */}
      <div style={{
        backgroundColor: '#A0785A',
        padding: '60px 20px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '36px', fontWeight: 800, color: '#FFFFFF',
            marginBottom: '16px', letterSpacing: '-0.5px',
          }}>
            Ready to try it?
          </h2>
          <p style={{
            fontSize: '17px', color: 'rgba(255,255,255,0.80)',
            lineHeight: 1.7, marginBottom: '36px',
          }}>
            Create a free account. Add a few clothing items.
            Get your first AI outfit suggestion in under 2 minutes.
          </p>
          <button
            onClick={() => navigate('/register')}
            style={{
              backgroundColor: '#FFFFFF', color: '#A0785A',
              border: 'none', borderRadius: '10px',
              padding: '15px 32px', fontSize: '16px',
              fontWeight: 700, cursor: 'pointer',
            }}
          >
            Get started free →
          </button>
        </div>
      </div>

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
  page: { minHeight: '100vh', backgroundColor: '#FAF7F4', fontFamily: 'inherit' },

  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '16px 40px', borderBottom: '1px solid #E8D9C8',
    backgroundColor: '#FFFFFF', position: 'sticky', top: 0, zIndex: 100,
  },
  navLogo: { fontSize: '18px', fontWeight: 700, color: '#A0785A', letterSpacing: '-0.3px' },
  navLinks: { display: 'flex', gap: '10px', alignItems: 'center' },
  navLogin: {
    background: 'none', border: 'none', color: '#8B7355',
    fontSize: '14px', fontWeight: 500, cursor: 'pointer', padding: '8px 14px',
  },
  navCta: {
    backgroundColor: '#A0785A', color: '#FFFFFF', border: 'none',
    borderRadius: '8px', padding: '8px 18px', fontSize: '14px',
    fontWeight: 600, cursor: 'pointer',
  },

  heroWrap: {
    backgroundColor: '#FAF7F4',
    borderBottom: '1px solid #E8D9C8',
  },
  hero: {
    textAlign: 'center', padding: '40px 20px 20px',
    maxWidth: '720px', margin: '0 auto',
  },
  badge: {
    display: 'inline-block', backgroundColor: '#F5EFE8',
    border: '1px solid #E8D9C8', borderRadius: '20px',
    padding: '6px 18px', fontSize: '12px', fontWeight: 600,
    color: '#A0785A', marginBottom: '28px', letterSpacing: '0.02em',
  },
  heroTitle: {
    fontSize: '54px', fontWeight: 800, lineHeight: 1.1,
    color: '#3D2B1F', marginBottom: '22px', letterSpacing: '-1px',
  },
  heroAccent: { color: '#A0785A' },
  heroSubtitle: {
    fontSize: '18px', color: '#8B7355', lineHeight: 1.75,
    marginBottom: '38px', maxWidth: '520px', margin: '0 auto 38px',
  },
  heroBtns: {
    display: 'flex', gap: '12px', justifyContent: 'center',
    flexWrap: 'wrap', marginBottom: '48px',
  },
  primaryBtn: {
    backgroundColor: '#A0785A', color: '#FFFFFF', border: 'none',
    borderRadius: '10px', padding: '14px 28px', fontSize: '15px',
    fontWeight: 700, cursor: 'pointer',
  },
  ghostBtn: {
    backgroundColor: 'transparent', color: '#A0785A',
    border: '1.5px solid #A0785A', borderRadius: '10px',
    padding: '14px 28px', fontSize: '15px', fontWeight: 600, cursor: 'pointer',
  },

  statsRow: {
    display: 'flex', justifyContent: 'center',
    borderTop: '1px solid #E8D9C8',
    backgroundColor: '#FFFFFF',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  stat: {
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    padding: '20px 0', flex: '1 1 0', minWidth: '100px',
  },
  statValue: {
    fontSize: '18px', fontWeight: 800, color: '#A0785A', marginBottom: '4px',
  },
  statLabel: {
    fontSize: '11px', color: '#8B7355', fontWeight: 500,
    textTransform: 'uppercase', letterSpacing: '0.06em',
  },

  stepsGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left',
  },
  stepCard: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '14px', padding: '28px 24px',
  },

  techSection: {
    backgroundColor: '#F5EFE8', padding: '30px 20px', textAlign: 'center',
  },
  sectionLabel: {
    fontSize: '11px', fontWeight: 700, color: '#8B7355',
    textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '14px',
  },
  sectionTitle: {
    fontSize: '28px', fontWeight: 800, color: '#3D2B1F',
    marginBottom: '48px', letterSpacing: '-0.5px',
  },
  techGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '16px', maxWidth: '1000px', margin: '0 auto', textAlign: 'left',
  },
  techCard: {
    backgroundColor: '#FFFFFF', border: '1px solid #E8D9C8',
    borderRadius: '14px', padding: '24px', display: 'flex', gap: '16px',
  },
  techIconWrap: {
    width: '44px', height: '44px', backgroundColor: '#F5EFE8',
    borderRadius: '10px', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexShrink: 0,
  },
  techIcon: { fontSize: '22px' },
  techTitle: { fontSize: '15px', fontWeight: 700, color: '#3D2B1F', marginBottom: '6px' },
  techDesc: { fontSize: '13px', color: '#8B7355', lineHeight: 1.65, marginBottom: '10px' },
  techTag: {
    display: 'inline-block', backgroundColor: '#F5EFE8', color: '#A0785A',
    fontSize: '11px', fontWeight: 600, padding: '3px 10px',
    borderRadius: '20px', border: '1px solid #E8D9C8',
  },

  footer: {
    borderTop: '1px solid #E8D9C8', backgroundColor: '#F5EFE8',
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