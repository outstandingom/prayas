// src/components/admin/AdminGallery.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Plus, Edit, Trash2, X, Check, ImageIcon, ArrowUp, ArrowDown, Eye, EyeOff } from 'lucide-react';

type GalleryItem = {
  id: string;
  image_url: string;
  title: string;
  description: string;
  category: string;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export default function AdminGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<GalleryItem>>({
    image_url: '',
    title: '',
    description: '',
    category: '',
    display_order: 0,
    is_active: true,
  });

  const fetchItems = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      if (error) throw error;
      setItems(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editing) {
        const { error } = await supabase
          .from('gallery')
          .update(formData)
          .eq('id', editing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('gallery')
          .insert([formData]);
        if (error) throw error;
      }
      await fetchItems();
      closeModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      const { error } = await supabase.from('gallery').delete().eq('id', id);
      if (error) throw error;
      await fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    try {
      const { error } = await supabase
        .from('gallery')
        .update({ is_active: !current })
        .eq('id', id);
      if (error) throw error;
      await fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const moveOrder = async (id: string, direction: 'up' | 'down') => {
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    
    const current = items[index];
    const target = items[targetIndex];
    try {
      const { error: e1 } = await supabase
        .from('gallery')
        .update({ display_order: target.display_order })
        .eq('id', current.id);
      if (e1) throw e1;
      const { error: e2 } = await supabase
        .from('gallery')
        .update({ display_order: current.display_order })
        .eq('id', target.id);
      if (e2) throw e2;
      await fetchItems();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const openModal = (item?: GalleryItem) => {
    if (item) {
      setEditing(item);
      setFormData(item);
    } else {
      setEditing(null);
      setFormData({ image_url: '', title: '', description: '', category: '', display_order: 0, is_active: true });
    }
    setIsModalOpen(true);
    setError('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditing(null);
    setFormData({ image_url: '', title: '', description: '', category: '', display_order: 0, is_active: true });
    setError('');
  };

  if (loading && items.length === 0) {
    return <div className="flex justify-center py-8"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gallery Images</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" /> Add Image
        </button>
      </div>

      {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md">{error}</div>}

      {items.length === 0 ? (
        <p className="text-muted-foreground">No images in the gallery yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item.id} className="relative bg-card border rounded-lg overflow-hidden shadow-sm group">
              <div className="relative aspect-square">
                <img src={item.image_url} alt={item.title || 'Gallery image'} className="w-full h-full object-cover" />
                {!item.is_active && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium px-2 py-1 bg-black/70 rounded">Hidden</span>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{item.title || 'Untitled'}</p>
                {item.category && <p className="text-xs text-muted-foreground truncate">{item.category}</p>}
                <div className="flex flex-wrap items-center gap-1 mt-2">
                  <button onClick={() => moveOrder(item.id, 'up')} className="p-1 rounded hover:bg-muted" title="Move up">
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => moveOrder(item.id, 'down')} className="p-1 rounded hover:bg-muted" title="Move down">
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => toggleActive(item.id, item.is_active)} className="p-1 rounded hover:bg-muted" title={item.is_active ? 'Hide' : 'Show'}>
                    {item.is_active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => openModal(item)} className="p-1 rounded hover:bg-muted" title="Edit">
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-1 rounded hover:bg-destructive/10 text-destructive" title="Delete">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">{editing ? 'Edit Image' : 'Add Image'}</h3>
              <button onClick={closeModal} className="p-1 rounded hover:bg-muted">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image URL *</label>
                <input
                  type="text"
                  value={formData.image_url || ''}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  required
                  placeholder="https://example.com/image.jpg"
                />
                {formData.image_url && (
                  <div className="mt-2 aspect-video rounded border overflow-hidden">
                    <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <input
                  type="text"
                  value={formData.category || ''}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-md px-3 py-2"
                  placeholder="e.g., Education, Healthcare"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Display Order (lower = higher priority)</label>
                <input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-full border rounded-md px-3 py-2"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active ?? true}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label className="text-sm font-medium">Active (visible on site)</label>
              </div>
              {error && <div className="text-destructive text-sm">{error}</div>}
              <div className="flex justify-end gap-2">
                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded-md hover:bg-muted">
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
