const EMOJI = {
  top: '👕', bottom: '👖', shoes: '👟',
  outerwear: '🧥', accessory: '👜', dress: '👗'
};

const STYLE_COLORS = {
  casual: '#8B7355', formal: '#5B6FA6',
  'smart-casual': '#5A8A6F', sporty: '#A07040', party: '#A05878'
};

export default function ClothingCard({ item, onDelete }) {
  return (
    <div style={styles.card}>
      <button
        onClick={() => onDelete(item.id)}
        style={styles.deleteBtn}
        title="Remove item"
      >
        ×
      </button>

      {item.image ? (
        <img src={item.image} alt={item.name} style={styles.image} />
      ) : (
        <div style={styles.emoji}>{EMOJI[item.category] || '👕'}</div>
      )}

      <div style={styles.name}>{item.name}</div>
      <div style={styles.meta}>
        <span style={styles.color}>{item.color}</span>
        <span style={{ ...styles.styleBadge, color: STYLE_COLORS[item.style] || '#8B7355' }}>
          {item.style}
        </span>
      </div>
      <div style={styles.season}>{item.season}</div>

      {Array.isArray(item.tags) && item.tags.length > 0 && (
        <div style={styles.tags}>
          {item.tags.slice(0, 3).map((tag, i) => (
            <span key={i} style={styles.tag}>{tag}</span>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--white)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '16px', position: 'relative',
    transition: 'box-shadow 0.15s, transform 0.15s',
    cursor: 'default',
  },
  deleteBtn: {
    position: 'absolute', top: '8px', right: '10px',
    background: 'none', border: 'none', fontSize: '20px',
    color: 'var(--text-muted)', lineHeight: 1, padding: '2px 6px',
    borderRadius: '4px', cursor: 'pointer',
  },
  image: {
    width: '100%', height: '120px', objectFit: 'cover',
    borderRadius: '8px', marginBottom: '8px',
  },
  emoji: { fontSize: '36px', textAlign: 'center', padding: '10px 0 8px' },
  name: {
    fontSize: '13px', fontWeight: '600', color: 'var(--text)',
    textAlign: 'center', marginBottom: '6px',
  },
  meta: {
    display: 'flex', justifyContent: 'center',
    gap: '8px', marginBottom: '4px',
  },
  color: { fontSize: '11px', color: 'var(--text-muted)' },
  styleBadge: { fontSize: '11px', fontWeight: '500' },
  season: {
    fontSize: '11px', color: 'var(--text-muted)',
    textAlign: 'center', marginBottom: '8px',
  },
  tags: {
    display: 'flex', flexWrap: 'wrap',
    gap: '4px', justifyContent: 'center',
  },
  tag: {
    fontSize: '10px', padding: '2px 8px',
    background: 'var(--surface)', color: 'var(--text-muted)',
    borderRadius: '20px', border: '1px solid var(--border)',
  },
};