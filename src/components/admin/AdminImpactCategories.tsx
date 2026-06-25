// src/components/admin/AdminImpactCategories.tsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, RefreshCw, ArrowUp, ArrowDown, X, Save, AlertCircle, Layers } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Category {
  id: string
  title: string
  description: string
  image_url: string
  slug: string
  display_order: number
  is_active: boolean
}

type CategoryForm = Omit<Category, 'id' | 'display_order' | 'created_at' | 'updated_at'> & { display_order?: number }

export default function AdminImpactCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [formData, setFormData] = useState<CategoryForm>({
    title: '',
    description: '',
    image_url: '',
    slug: '',
    is_active: true,
  })

  const fetchCategories = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('impact_categories')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) {
      setError(error.message)
    } else {
      setCategories(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      slug: '',
      is_active: true,
    })
    setEditing(null)
  }

  const openAddModal = () => {
    resetForm()
    setModalOpen(true)
  }

  const openEditModal = (cat: Category) => {
    setEditing(cat)
    setFormData({
      title: cat.title,
      description: cat.description,
      image_url: cat.image_url,
      slug: cat.slug,
      is_active: cat.is_active,
    })
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { title, description, image_url, slug, is_active } = formData
    if (!title || !description || !image_url || !slug) {
      alert('All fields are required.')
      return
    }

    if (editing) {
      const { error } = await supabase
        .from('impact_categories')
        .update({
          title,
          description,
          image_url,
          slug,
          is_active,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editing.id)
      if (!error) {
        fetchCategories()
        setModalOpen(false)
        resetForm()
      } else {
        alert('Error updating: ' + error.message)
      }
    } else {
      const maxOrder = categories.reduce((max, c) => Math.max(max, c.display_order), 0)
      const { error } = await supabase
        .from('impact_categories')
        .insert([{
          title,
          description,
          image_url,
          slug,
          display_order: maxOrder + 1,
          is_active,
        }])
      if (!error) {
        fetchCategories()
        setModalOpen(false)
        resetForm()
      } else {
        alert('Error creating: ' + error.message)
      }
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category permanently?')) return
    const { error } = await supabase
      .from('impact_categories')
      .delete()
      .eq('id', id)
    if (!error) {
      fetchCategories()
    } else {
      alert('Error deleting: ' + error.message)
    }
  }

  const moveCategory = async (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id)
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === categories.length - 1) return

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const current = categories[index]
    const target = categories[targetIndex]

    const tempOrder = current.display_order
    current.display_order = target.display_order
    target.display_order = tempOrder

    const { error } = await supabase
      .from('impact_categories')
      .upsert([
        { id: current.id, display_order: current.display_order },
        { id: target.id, display_order: target.display_order },
      ])
    if (!error) {
      fetchCategories()
    } else {
      alert('Error reordering: ' + error.message)
    }
  }

  return (
    <div className="space-y-6 pb-24">
      {/* Sticky Header – always visible */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm -mx-4 px-4 py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Layers className="w-6 h-6 text-primary flex-shrink-0" />
            <span className="truncate">Impact Categories</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            {categories.length} categories • Manage your impact areas
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <button
            onClick={fetchCategories}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-medium whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#263238] text-white rounded-lg hover:bg-[#263238]/90 transition text-sm font-medium whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2 border border-red-200">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
          Loading...
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl bg-muted/20">
          <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No categories found. Add your first one!</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Order</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Slug</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Image</th>
                  <th className="text-left p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-center p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition">
                    <td className="p-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs">{idx + 1}</span>
                        <div className="flex flex-col ml-2">
                          <button
                            onClick={() => moveCategory(cat.id, 'up')}
                            disabled={idx === 0}
                            className="text-muted-foreground/40 hover:text-foreground disabled:opacity-20"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => moveCategory(cat.id, 'down')}
                            disabled={idx === categories.length - 1}
                            className="text-muted-foreground/40 hover:text-foreground disabled:opacity-20"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-foreground">{cat.title}</td>
                    <td className="p-4 text-muted-foreground text-xs font-mono">{cat.slug}</td>
                    <td className="p-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                        <img src={cat.image_url} alt={cat.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cat.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {cat.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => openEditModal(cat)}
                          className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(cat.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Fixed Bottom Action Bar (mobile-friendly) */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-border/50 p-4 flex justify-center md:hidden">
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 w-full max-w-sm px-6 py-3 bg-[#263238] text-white rounded-xl shadow-lg hover:bg-[#263238]/90 transition font-medium"
        >
          <Plus className="w-5 h-5" />
          Add New Category
        </button>
      </div>

      {/* Modal for Add/Edit */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl shadow-2xl border border-border w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  {editing ? 'Edit Category' : 'Add New Category'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="p-1 rounded-lg hover:bg-muted transition">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Image URL *</label>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    required
                  />
                  {formData.image_url && (
                    <div className="mt-2 w-20 h-20 rounded-lg overflow-hidden border border-border">
                      <img src={formData.image_url} alt="preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Slug (URL path) *</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="e.g., education"
                    className="w-full mt-1 px-4 py-2 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
                  <div className="flex items-center gap-3 mt-1">
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="radio"
                        checked={formData.is_active === true}
                        onChange={() => setFormData({ ...formData, is_active: true })}
                      />
                      Active
                    </label>
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="radio"
                        checked={formData.is_active === false}
                        onChange={() => setFormData({ ...formData, is_active: false })}
                      />
                      Inactive
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#263238] text-white rounded-lg text-sm font-semibold hover:bg-[#263238]/90 transition flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editing ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
