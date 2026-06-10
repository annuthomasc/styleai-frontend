import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/wardrobe" style={styles.brandLink}>✦ StyleAI</Link>
      </div>
      <div style={styles.links}>
        <Link to="/wardrobe" style={styles.link}>Wardrobe</Link>
        <Link to="/suggest" style={styles.link}>Get Outfit</Link>
      </div>
      <div style={styles.user}>
        <span style={styles.username}>👋 {user?.username}</span>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 28px', background: '#A0785A', color: '#FAF7F4',
    position: 'sticky', top: 0, zIndex: 100,
    boxShadow: '0 2px 8px rgba(160,120,90,0.15)',
  },
  brand: { fontWeight: 700, fontSize: '20px', letterSpacing: '0.02em' },
  brandLink: { color: '#FAF7F4', textDecoration: 'none' },
  links: { display: 'flex', gap: '28px' },
  link: {
    color: '#F5EFE8', textDecoration: 'none',
    fontSize: '14px', fontWeight: 500,
    transition: 'color 0.15s',
  },
  user: { display: 'flex', alignItems: 'center', gap: '14px' },
  username: { fontSize: '14px', color: '#F5EFE8' },
  logoutBtn: {
    background: 'transparent', border: '1px solid #F5EFE8',
    color: '#F5EFE8', padding: '6px 16px', borderRadius: '20px',
    cursor: 'pointer', fontSize: '13px', fontWeight: 500,
    transition: 'background 0.15s',
  },
};