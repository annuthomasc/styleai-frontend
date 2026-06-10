import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ClothingCard from '../components/ClothingCard';
import Navbar from '../components/Navbar';
import api from '../api/axios';

const CATEGORIES = ['top','bottom','shoes','outerwear','accessory','dress'];
const STYLES = ['casual','formal','smart-casual','sporty','party'];
const SEASONS = ['summer','winter','spring-autumn','all-season'];

const emptyForm = {
  name: '', category: 'top', color: '',
  style: 'casual', season: 'all-season', tags: '', notes: ''
};

export default function Wardrobe() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [analysing, setAnalysing] = useState(false);
  const [autotagged, setAutotagged] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    fetchItems();
  }, [user]);

  const fetchItems = async () => {
    try {
      const res = await api.get('/clothing/');
      setItems(res.data);
    } catch (err) {
      setError('Failed to load wardrobe.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setAutotagged(false);
    setForm(emptyForm);
  };

  const handleAutotag = async () => {
    if (!imageFile) return;
    setAnalysing(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      const res = await api.post('/clothing/autotag/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      const data = res.data;
      setForm({
        name: data.name || '',
        category: data.category || 'top',
        color: data.color || '',
        style: data.style || 'casual',
        season: data.season || 'all-season',
        tags: Array.isArray(data.tags) ? data.tags.join(', ') : '',
        notes: ''
      });
      setAutotagged(true);
    } catch (err) {
      setError('Failed to analyse image. Fill in details manually.');
    } finally {
      setAnalysing(false);
    }
  };
  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('category', form.category);
      formData.append('color', form.color);
      formData.append('style', form.style);
      formData.append('season', form.season);
      formData.append('notes', form.notes);
      const tags = form.tags.split(',').map(t => t.trim()).filter(Boolean);
      formData.append('tags', JSON.stringify(tags));
      if (imageFile) formData.append('image', imageFile);
  
      const res = await api.post('/clothing/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setItems([res.data, ...items]);
      setForm(emptyForm);
      setImageFile(null);
      setImagePreview(null);
      setAutotagged(false);
      setShowForm(false);
    } catch (err) {
      setError('Failed to add item. ' + (err.response?.data ? JSON.stringify(err.response.data) : ''));
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm('Remove this item from your wardrobe?')) return;
    try {
      await api.delete(`/clothing/${id}/`);
      setItems(items.filter(i => i.id !== id));
    } catch (err) {
      setError('Failed to delete item.');
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setAutotagged(false);
  };

  const filtered = filter === 'all'
    ? items
    : items.filter(i => i.category === filter);

  return (
    <div style={styles.page}>
      <Navbar />
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>My Wardrobe</h2>
            <p style={styles.subtitle}>{items.length} items in your collection</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
            {showForm ? '✕ Cancel' : '+ Add item'}
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {/* Add Form */}
        {showForm && (
          <div style={styles.formCard}>
            <h3 style={styles.formTitle}>Add clothing item</h3>

            {/* Image Upload Section */}
            <div style={styles.uploadSection}>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />

              {!imagePreview ? (
                <div
                  style={styles.uploadBox}
                  onClick={() => fileInputRef.current.click()}
                >
                  <p style={styles.uploadIcon}>📷</p>
                  <p style={styles.uploadText}>Click to upload a photo</p>
                  <p style={styles.uploadSubtext}>Claude AI will auto-fill the details</p>
                </div>
              ) : (
                <div style={styles.previewWrap}>
                  <img src={imagePreview} alt="Preview" style={styles.preview} />
                  <div style={styles.previewActions}>
                    <button
                      type="button"
                      onClick={handleAutotag}
                      disabled={analysing || autotagged}
                      style={autotagged
                        ? { ...styles.analyseBtn, background: '#D1FAE5', color: '#065F46' }
                        : styles.analyseBtn}
                    >
                      {analysing ? '✦ Analysing...' : autotagged ? '✅ Auto-filled' : '✦ Analyse with AI'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                        setAutotagged(false);
                        setForm(emptyForm);
                      }}
                      style={styles.removeImageBtn}
                    >
                      Remove photo
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleAdd} style={styles.form}>
              <div style={styles.formGrid}>
                <div style={styles.field}>
                  <label style={styles.label}>Item name *</label>
                  <input
                    name="name" value={form.name}
                    onChange={handleChange}
                    placeholder="e.g. White linen shirt"
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Color *</label>
                  <input
                    name="color" value={form.color}
                    onChange={handleChange}
                    placeholder="e.g. navy blue"
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Category</label>
                  <select name="category" value={form.category} onChange={handleChange}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Style</label>
                  <select name="style" value={form.style} onChange={handleChange}>
                    {STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Season</label>
                  <select name="season" value={form.season} onChange={handleChange}>
                    {SEASONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Tags (comma separated)</label>
                  <input
                    name="tags" value={form.tags}
                    onChange={handleChange}
                    placeholder="e.g. beach, summer, date night"
                  />
                </div>
              </div>
              <div style={styles.field}>
                <label style={styles.label}>Notes</label>
                <input
                  name="notes" value={form.notes}
                  onChange={handleChange}
                  placeholder="Any extra details..."
                />
              </div>
              <div style={styles.formActions}>
                <button type="submit" style={styles.saveBtn} disabled={saving}>
                  {saving ? 'Saving...' : 'Add to wardrobe'}
                </button>
                <button type="button" onClick={resetForm} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Filter tabs */}
        <div style={styles.filters}>
          {['all', ...CATEGORIES].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={filter === cat
                ? { ...styles.filterBtn, ...styles.filterActive }
                : styles.filterBtn}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div style={styles.empty}>Loading your wardrobe...</div>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: '32px', marginBottom: '12px' }}>👗</p>
            <p style={{ fontWeight: 600, marginBottom: '6px' }}>
              {filter === 'all' ? 'Your wardrobe is empty' : `No ${filter} items yet`}
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
              Add your first item using the button above
            </p>
          </div>
        ) : (
          <div style={styles.grid}>
            {filtered.map(item => (
              <ClothingCard key={item.id} item={item} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: '100vh', background: 'var(--bg)' },
  container: { maxWidth: '1100px', margin: '0 auto', padding: '28px 20px' },
  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '24px',
  },
  title: { fontSize: '22px', fontWeight: 700, marginBottom: '4px' },
  subtitle: { color: 'var(--text-muted)', fontSize: '14px' },
  addBtn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '10px',
    padding: '10px 20px', fontSize: '14px', fontWeight: 600,
  },
  error: {
    background: '#FEE2E2', color: '#991B1B',
    padding: '10px 14px', borderRadius: '8px',
    fontSize: '13px', marginBottom: '16px',
  },
  formCard: {
    background: 'var(--white)', border: '1px solid var(--border)',
    borderRadius: '12px', padding: '24px', marginBottom: '24px',
  },
  formTitle: { fontSize: '16px', fontWeight: 600, marginBottom: '16px' },
  uploadSection: { marginBottom: '20px' },
  uploadBox: {
    border: '2px dashed var(--border)', borderRadius: '12px',
    padding: '32px', textAlign: 'center', cursor: 'pointer',
    background: 'var(--surface)', transition: 'border-color 0.15s',
  },
  uploadIcon: { fontSize: '32px', marginBottom: '8px' },
  uploadText: { fontSize: '14px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' },
  uploadSubtext: { fontSize: '12px', color: 'var(--text-muted)' },
  previewWrap: { display: 'flex', gap: '20px', alignItems: 'flex-start' },
  preview: {
    width: '140px', height: '140px', objectFit: 'cover',
    borderRadius: '10px', border: '1px solid var(--border)',
  },
  previewActions: { display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '8px' },
  analyseBtn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '8px',
    padding: '10px 20px', fontSize: '13px', fontWeight: 600,
  },
  removeImageBtn: {
    background: 'transparent', color: 'var(--text-muted)',
    border: '1px solid var(--border)', borderRadius: '8px',
    padding: '8px 16px', fontSize: '13px',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  formGrid: {
    display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '14px',
  },
  field: { display: 'flex', flexDirection: 'column', gap: '5px' },
  label: { fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' },
  formActions: { display: 'flex', gap: '10px', marginTop: '4px' },
  saveBtn: {
    background: 'var(--primary)', color: 'var(--white)',
    border: 'none', borderRadius: '8px',
    padding: '10px 24px', fontSize: '14px', fontWeight: 600,
  },
  cancelBtn: {
    background: 'transparent', color: 'var(--text-muted)',
    border: '1px solid var(--border)', borderRadius: '8px',
    padding: '10px 20px', fontSize: '14px',
  },
  filters: { display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' },
  filterBtn: {
    background: 'var(--white)', color: 'var(--text-muted)',
    border: '1px solid var(--border)', borderRadius: '20px',
    padding: '5px 14px', fontSize: '12px', fontWeight: 500,
  },
  filterActive: {
    background: 'var(--primary)', color: 'var(--white)',
    border: '1px solid var(--primary)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
    gap: '14px',
  },
  empty: {
    textAlign: 'center', padding: '60px 20px',
    color: 'var(--text-muted)', fontSize: '15px',
  },
};