import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const OCCASIONS = [
  'Casual dinner with friends',
  'Formal job interview',
  'Beach party',
  'Office workday',
  'First date at a nice restaurant',
  'Outdoor hiking trip',
  'Wedding as a guest',
  'Gym workout',
];

const EMOJI = {
  top: '👕', bottom: '👖', shoes: '👟',
  outerwear: '🧥', accessory: '👜', dress: '👗'
};

export default function Suggest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('suggest');
  const [occasion, setOccasion] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultOccasion, setResultOccasion] = useState('');
  const [history, setHistory] = useState([]);
  const [wardrobe, setWardrobe] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchHistory();
    fetchWardrobe();
  }, [user]);

  const fetchWardrobe = async () => {
    try {
      const res = await api.get('/clothing/');
      setWardrobe(res.data);
    } catch (err) {}
  };

  const fetchHistory = async () => {
    try {
      const res = await api.get('/suggestions/');
      setHistory(res.data);
    } catch (err) {}
  };

  const getItemById = (id) => wardrobe.find(w => w.id === id);

  const handleSuggest = async () => {
    if (!occasion.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const res = await api.post('/suggest/', { occasion });
      setResult(res.data);
      setResultOccasion(occasion);
      fetchHistory();
    } catch (err) {
      const msg = err.response?.data?.error;
      setError(msg || 'Failed to get suggestion. Make sure you have items in your wardrobe.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuggestion = async (id) => {
    if (!window.confirm('Delete this suggestion?')) return;
    try {
      await api.delete(`/suggestions/${id}/`);
      setHistory(history.filter(s => s.id !== id));
    } catch (err) {
      setError('Failed to delete suggestion.');
    }
  };

  const ItemCard = ({ item }) => (
    <div style={styles.itemCard}>
      {item.image ? (
        <img src={item.image} alt={item.name} style={styles.itemImage} />
      ) : (
        <div style={styles.itemEmoji}>{EMOJI[item.category] || '👕'}</div>
      )}
      <span style={styles.itemName}>{item.name}</span>
    </div>
  );

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>

        <div style={styles.header}>
          <h2 style={styles.title}>Outfit Suggestions</h2>
          <p style={styles.subtitle}>AI picks outfits from your wardrobe</p>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          <button
            onClick={() => setActiveTab('suggest')}
            style={activeTab === 'suggest' ? { ...styles.tab, ...styles.tabActive } : styles.tab}
          >
            ✦ Get Outfit
          </button>
          <button
            onClick={() => setActiveTab('history')}
            style={activeTab === 'history' ? { ...styles.tab, ...styles.tabActive } : styles.tab}
          >
            Past Suggestions
            {history.length > 0 && (
              <span style={styles.tabBadge}>{history.length}</span>
            )}
          </button>
        </div>

        {/* ── SUGGEST TAB ── */}
        {activeTab === 'suggest' && (
          <div>
            <div style={styles.card}>
              <p style={styles.sectionLabel}>Quick occasions</p>
              <div style={styles.chips}>
                {OCCASIONS.map(o => (
                  <button
                    key={o}
                    onClick={() => setOccasion(o)}
                    style={occasion === o
                      ? { ...styles.chip, ...styles.chipActive }
                      : styles.chip}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <p style={{ ...styles.sectionLabel, marginTop: '16px' }}>Or describe it</p>
              <div style={styles.inputRow}>
                <input
                  type="text"
                  placeholder="e.g. rooftop birthday party in summer..."
                  value={occasion}
                  onChange={e => setOccasion(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSuggest()}
                  style={styles.input}
                />
                <button
                  onClick={handleSuggest}
                  disabled={loading || !occasion.trim()}
                  style={loading || !occasion.trim()
                    ? { ...styles.suggestBtn, opacity: 0.6 }
                    : styles.suggestBtn}
                >
                  {loading ? '✦ Thinking...' : '✦ Suggest'}
                </button>
              </div>
            </div>

            {error && <div style={styles.error}>{error}</div>}

            {loading && (
              <div style={{ ...styles.card, textAlign: 'center', padding: '40px' }}>
                <p style={{ fontSize: '28px', marginBottom: '12px' }}>✦</p>
                <p style={{ fontWeight: 600, color: 'var(--primary)', marginBottom: '6px' }}>
                  Analysing your wardrobe...
                </p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Claude AI is picking the best outfit for you
                </p>
              </div>
            )}

            {result && !loading && (
              <div>
                <p style={{ ...styles.sectionLabel, marginBottom: '14px' }}>
                  Outfits for: <strong style={{ color: 'var(--text)', textTransform: 'none' }}>
                    {resultOccasion}
                  </strong>
                </p>
                {result.outfits?.map((outfit, i) => {
                  const outfitItems = (outfit.item_ids || [])
                    .map(id => getItemById(id))
                    .filter(Boolean);
                  return (
                    <div key={i} style={styles.outfitCard}>
                      <div style={styles.outfitHeader}>
                        <h3 style={styles.outfitTitle}>✦ {outfit.title}</h3>
                        <span style={styles.outfitBadge}>Outfit {i + 1}</span>
                      </div>
                      {outfitItems.length > 0 && (
                        <div style={styles.itemsRow}>
                          {outfitItems.map((item, j) => (
                            <ItemCard key={j} item={item} />
                          ))}
                        </div>
                      )}
                      <p style={styles.reasoning}>{outfit.reasoning}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── HISTORY TAB ── */}
        {activeTab === 'history' && (
          <div>
            {history.length === 0 ? (
              <div style={styles.empty}>
                <p style={{ fontSize: '28px', marginBottom: '10px' }}>👗</p>
                <p style={{ fontWeight: 600, marginBottom: '6px' }}>No past suggestions yet</p>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  Get your first outfit suggestion to see history here
                </p>
              </div>
            ) : (
              history.map((s) => (
                <div key={s.id} style={styles.historyCard}>
                  <div style={styles.historyTop}>
                    <div>
                      <p style={styles.historyOccasion}>{s.occasion}</p>
                      <p style={styles.historyDate}>
                        {new Date(s.created_at).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSuggestion(s.id)}
                      style={styles.deleteBtn}
                      title="Delete"
                    >✕</button>
                  </div>
                  {s.items?.length > 0 && (
                    <div style={styles.itemsRow}>
                      {s.items.map((item, j) => (
                        <ItemCard key={j} item={item} />
                      ))}
                    </div>
                  )}
                  <p style={styles.historyReasoning}>{s.reasoning}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  container: { maxWidth: '800px', margin: '0 auto', padding: '28px 20px' },
  header: { marginBottom: '20px' },
  title: { fontSize: '22px', fontWeight: 700, marginBottom: '4px' },
  subtitle: { color: 'var(--text-muted)', fontSize: '14px' },
  tabs: {
    display: 'flex', gap: '0', marginBottom: '24px',
    borderBottom: '1px solid var(--border)',
  },
  tab: {
    background: 'none', border: 'none',
    borderBottom: '2px solid transparent',
    padding: '10px 20px', fontSize: '14px', fontWeight: 500,
    color: 'var(--text-muted)', cursor: 'pointer',
    marginBottom: '-1px', display: 'flex',
    alignItems: 'center', gap: '6px', transition: 'all 0.15s',
  },
  tabActive: {
    color: 'var(--primary)',
    borderBottom: '2px solid var(--primary)',
  },
  tabBadge: {
    background: 'var(--primary)', color: 'var(--white)',
    fontSize: '11px', fontWeight: 600,
    padding: '1px 7px', borderRadius: '20px',
  },
  card: {
    background: 'var(--white)', border: '1px solid var(--border)',
    borderRadius: '14px', padding: '20px', marginBottom: '20px',
    boxShadow: 'var(--shadow)',
  },
  sectionLabel: {
    fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)',
    textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '10px',
  },
  chips: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
  chip: {
    background: 'var(--surface)', color: 'var(--text-muted)',
    border: '1px solid var(--border)', borderRadius: '20px',
    padding: '6px 14px', fontSize: '13px', fontWeight: 500,
    transition: 'all 0.15s',
  },
  chipActive: {
    background: 'var(--primary)', color: 'var(--white)',
    border: '1px solid var(--primary)',
  },
  inputRow: { display: 'flex', gap: '10px' },
  input: { flex: 1 },
  suggestBtn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '10px',
    padding: '10px 20px', fontSize: '14px', fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  error: {
    background: '#FEE2E2', color: '#991B1B',
    padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '16px',
  },
  outfitCard: {
    background: 'var(--white)', border: '1px solid var(--border)',
    borderRadius: '14px', padding: '20px', marginBottom: '14px',
    borderLeft: '4px solid var(--primary)', boxShadow: 'var(--shadow)',
  },
  outfitHeader: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '16px',
  },
  outfitTitle: { fontSize: '16px', fontWeight: 700, color: 'var(--primary)' },
  outfitBadge: {
    fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)',
    background: 'var(--surface)', padding: '3px 10px',
    borderRadius: '20px', border: '1px solid var(--border)',
  },
  itemsRow: {
    display: 'flex', flexWrap: 'wrap',
    gap: '12px', marginBottom: '16px',
  },
  itemCard: {
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', gap: '6px', width: '90px',
  },
  itemImage: {
    width: '80px', height: '80px', objectFit: 'cover',
    borderRadius: '10px', border: '1px solid var(--border)',
  },
  itemEmoji: {
    width: '80px', height: '80px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: 'var(--surface)', borderRadius: '10px',
    border: '1px solid var(--border)', fontSize: '32px',
  },
  itemName: {
    fontSize: '11px', color: 'var(--text)',
    textAlign: 'center', fontWeight: 500, lineHeight: 1.3,
  },
  reasoning: {
    fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.7,
    borderTop: '1px solid var(--border)', paddingTop: '12px',
  },
  historyCard: {
    background: 'var(--white)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '18px', marginBottom: '12px',
    boxShadow: 'var(--shadow)',
  },
  historyTop: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '14px',
  },
  historyOccasion: { fontSize: '14px', fontWeight: 700, marginBottom: '3px' },
  historyDate: { fontSize: '12px', color: 'var(--text-muted)' },
  deleteBtn: {
    background: 'none', border: '1px solid var(--border)',
    color: 'var(--text-muted)', width: '28px', height: '28px',
    borderRadius: '50%', fontSize: '13px', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    cursor: 'pointer', flexShrink: 0,
  },
  historyReasoning: {
    fontSize: '12px', color: 'var(--text-muted)',
    lineHeight: 1.6, borderTop: '1px solid var(--border)', paddingTop: '10px',
  },
  empty: {
    textAlign: 'center', padding: '60px 20px',
    color: 'var(--text-muted)',
  },
};