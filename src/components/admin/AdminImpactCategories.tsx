// src/components/admin/AdminImpactCategories.tsx
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Plus, Edit, Trash2, RefreshCw, ArrowUp, ArrowDown, X, Save, AlertCircle, Layers, Loader2, 
  GripVertical, DollarSign, Target, Link as LinkIcon, Eye
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface Initiative {
  icon: string
  title: string
  description: string
}

interface Category {
  id: string
  title: string
  description: string
  image_url: string
  slug: string
  display_order: number
  is_active: boolean
  initiatives: Initiative[]
  funds_collected: number
  goal_funds: number
  redirect_url?: string
  created_at?: string
  updated_at?: string
}

type CategoryForm = Omit<Category, 'id' | 'display_order' | 'created_at' | 'updated_at'> & { display_order?: number }

export default function AdminImpactCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState<CategoryForm>({
    title: '',
    description: '',
    image_url: '',
    slug: '',
    is_active: true,
    initiatives: [],
    funds_collected: 0,
    goal_funds: 0,
    redirect_url: '',
  })

  const [initiativeInput, setInitiativeInput] = useState<Initiative>({ icon: '', title: '', description: '' })
  const [editingInitiativeIndex, setEditingInitiativeIndex] = useState<number | null>(null)

  const DEFAULT_CATEGORIES: Category[] = [
    {
      id: 'cat-1',
      title: 'Education & Skills',
      slug: 'education',
      description: 'Nurturing values, digital literacy, Sanskarshala learning, and career guidance for underprivileged children.',
      image_url: '/EDUCATION.JPG',
      display_order: 1,
      is_active: true,
      initiatives: [
        { icon: '📚', title: 'Sanskarshala', description: 'Value-based moral and academic education centers.' },
        { icon: '💻', title: 'Digital Literacy', description: 'Solar-powered computer labs and coding workshops.' },
        { icon: '🎯', title: 'Career Counselling', description: 'Guidance and entrance exam support for Grades 9-12.' }
      ],
      funds_collected: 450000,
      goal_funds: 600000,
      redirect_url: ''
    },
    {
      id: 'cat-2',
      title: 'Healthcare & Medical',
      slug: 'healthcare',
      description: 'Free health camps, blood donation drives, medicine distribution, and maternal care across rural regions.',
      image_url: '/HEALTH.jpg',
      display_order: 2,
      is_active: true,
      initiatives: [
        { icon: '🏥', title: 'Mobile Medical Vans', description: 'Bringing doctors and medicines to remote villages.' },
        { icon: '👁️', title: 'Free Eye Surgery Camps', description: 'Restoring sight to cataract-affected rural elders.' },
        { icon: '🩸', title: 'Blood Donation Drives', description: 'Community blood camps for emergency care.' }
      ],
      funds_collected: 380000,
      goal_funds: 500000,
      redirect_url: ''
    },
    {
      id: 'cat-3',
      title: 'Women Empowerment',
      slug: 'women-empowerment',
      description: 'Sabji Wali Didi micro-finance, sewing centers, self-help groups (SHG), and self-defence bootcamps.',
      image_url: '/WOMEN.jpeg',
      display_order: 3,
      is_active: true,
      initiatives: [
        { icon: '🛒', title: 'Sabji Wali Didi', description: 'Zero-interest micro-loans & digital scale kits.' },
        { icon: '🧵', title: 'Vocational Sewing Centers', description: '6-month certified tailoring and machine distribution.' },
        { icon: '🥋', title: 'Self-Defence Bootcamps', description: 'Martial arts & legal rights training for girls.' }
      ],
      funds_collected: 520000,
      goal_funds: 700000,
      redirect_url: ''
    },
    {
      id: 'cat-4',
      title: 'Kargil Vatika Reforestation',
      slug: 'kargil-vatika',
      description: 'Mass tree plantation, soil conservation, and urban forestry dedicated to national martyrs.',
      image_url: '/TREEGROW.jpg',
      display_order: 4,
      is_active: true,
      initiatives: [
        { icon: '🌳', title: 'Mass Sapling Plantation', description: 'Planting indigenous trees in memory of Kargil heroes.' },
        { icon: '💧', title: 'Drip Irrigation Setup', description: 'Ensuring 95%+ survival rate with sustainable watering.' },
        { icon: '🌿', title: 'Seed Ball Distribution', description: 'Community seed ball drives for eco-restoration.' }
      ],
      funds_collected: 610000,
      goal_funds: 800000,
      redirect_url: ''
    },
    {
      id: 'cat-5',
      title: 'Rural Development',
      slug: 'rural-development',
      description: 'Village adoption, clean drinking water plants, sanitation facilities, and rural solar infrastructure.',
      image_url: '/ruraldevelopment.jpeg',
      display_order: 5,
      is_active: true,
      initiatives: [
        { icon: '🏘️', title: 'Village Adoption (Adarsh Gram)', description: '360-degree transformation of remote hamlets.' },
        { icon: '🚰', title: 'Clean Water ATMs', description: 'RO filtration plants and deep aquifer borewells.' },
        { icon: '☀️', title: 'Solar Street Lighting', description: 'Illuminating dark village pathways for safety.' }
      ],
      funds_collected: 750000,
      goal_funds: 1000000,
      redirect_url: ''
    },
    {
      id: 'cat-6',
      title: 'Environment & Plantation',
      slug: 'environment',
      description: 'Seed ball drives, plastic-free campaigns, river cleanups, and sustainable community gardens.',
      image_url: '/TREEGROW2.jpg',
      display_order: 6,
      is_active: true,
      initiatives: [
        { icon: '♻️', title: 'Plastic Mukti Abhiyaan', description: 'Eliminating single-use plastics from villages.' },
        { icon: '🌱', title: 'Seed Ball Workshops', description: 'Engaging school children in seed ball creation.' },
        { icon: '🌊', title: 'River & Lake Cleanups', description: 'Restoring local water bodies and biodiversity.' }
      ],
      funds_collected: 290000,
      goal_funds: 400000,
      redirect_url: ''
    }
  ]

  const saveLocalCategories = (items: Category[]) => {
    setCategories(items)
    localStorage.setItem('prayas_impact_categories', JSON.stringify(items))
    window.dispatchEvent(new Event('prayas-categories-updated'))
  }

  const fetchCategories = async () => {
    setLoading(true)
    setError('')
    
    // First load from localStorage if present
    try {
      const saved = localStorage.getItem('prayas_impact_categories')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCategories(parsed)
        } else {
          saveLocalCategories(DEFAULT_CATEGORIES)
        }
      } else {
        saveLocalCategories(DEFAULT_CATEGORIES)
      }
    } catch (e) {
      setCategories(DEFAULT_CATEGORIES)
    }

    // Next try syncing with Supabase without crashing UI if offline/error
    try {
      const { data, error } = await supabase
        .from('impact_categories')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (!error && data && data.length > 0) {
        const parsed = data.map(item => ({
          ...item,
          initiatives: typeof item.initiatives === 'string' ? JSON.parse(item.initiatives) : item.initiatives || []
        }))
        saveLocalCategories(parsed)
      }
    } catch (err: any) {
      console.log('Supabase sync skipped, using local categories:', err?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${fileExt}`
      const filePath = `impact-categories/${fileName}`
      const { error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(filePath, file, { cacheControl: '3600', upsert: false })
      if (!uploadError) {
        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(filePath)
        if (urlData?.publicUrl) return urlData.publicUrl
      }
    } catch (e) {
      console.log('Storage upload skipped, converting to data URL')
    }
    
    // Fallback: convert to base64 Data URL for offline/local persistence
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const publicUrl = await uploadImage(file)
      setFormData({ ...formData, image_url: publicUrl })
      setSuccessMessage('Image uploaded successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err: any) {
      alert('Upload failed: ' + (err.message || 'Error processing file'))
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      slug: '',
      is_active: true,
      initiatives: [],
      funds_collected: 0,
      goal_funds: 0,
      redirect_url: '',
    })
    setEditing(null)
    setInitiativeInput({ icon: '', title: '', description: '' })
    setEditingInitiativeIndex(null)
    setSuccessMessage('')
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
      initiatives: cat.initiatives || [],
      funds_collected: cat.funds_collected || 0,
      goal_funds: cat.goal_funds || 0,
      redirect_url: cat.redirect_url || '',
    })
    setModalOpen(true)
  }

  const addInitiative = () => {
    if (!initiativeInput.title || !initiativeInput.description) {
      alert('Please fill in title and description for the initiative.')
      return
    }
    const newInit = { ...initiativeInput, icon: initiativeInput.icon || '📌' }
    if (editingInitiativeIndex !== null) {
      const updated = [...(formData.initiatives || [])]
      updated[editingInitiativeIndex] = newInit
      setFormData({ ...formData, initiatives: updated })
      setEditingInitiativeIndex(null)
    } else {
      setFormData({
        ...formData,
        initiatives: [...(formData.initiatives || []), newInit]
      })
    }
    setInitiativeInput({ icon: '', title: '', description: '' })
    setSuccessMessage('Initiative added successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }

  const removeInitiative = (index: number) => {
    const updated = (formData.initiatives || []).filter((_, i) => i !== index)
    setFormData({ ...formData, initiatives: updated })
    if (editingInitiativeIndex === index) {
      setEditingInitiativeIndex(null)
      setInitiativeInput({ icon: '', title: '', description: '' })
    }
  }

  const editInitiative = (index: number) => {
    const item = formData.initiatives?.[index]
    if (item) {
      setInitiativeInput(item)
      setEditingInitiativeIndex(index)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { title, description, image_url, slug, is_active, initiatives, funds_collected, goal_funds, redirect_url } = formData
    if (!title || !description || !image_url || !slug) {
      alert('All fields are required.')
      return
    }

    const payloadItem: Category = {
      id: editing ? editing.id : `cat-${Date.now()}`,
      title,
      description,
      image_url,
      slug,
      display_order: editing ? editing.display_order : (categories.reduce((max, c) => Math.max(max, c.display_order), 0) + 1),
      is_active,
      initiatives: initiatives || [],
      funds_collected: funds_collected || 0,
      goal_funds: goal_funds || 0,
      redirect_url: redirect_url || '',
      updated_at: new Date().toISOString(),
    }

    // Save locally first
    let updatedCategories: Category[] = []
    if (editing) {
      updatedCategories = categories.map(c => c.id === editing.id ? payloadItem : c)
    } else {
      updatedCategories = [...categories, payloadItem]
    }
    saveLocalCategories(updatedCategories)

    setSuccessMessage(editing ? 'Category updated successfully!' : 'Category created successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    setModalOpen(false)
    resetForm()

    // Try Supabase in background
    try {
      if (editing) {
        await supabase.from('impact_categories').update(payloadItem).eq('id', editing.id)
      } else {
        await supabase.from('impact_categories').insert([payloadItem])
      }
    } catch (err: any) {
      console.log('Background Supabase update skipped:', err?.message)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm('Delete this category permanently?')) return
    const updated = categories.filter(c => c.id !== id)
    saveLocalCategories(updated)
    setSuccessMessage('Category deleted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)

    try {
      await supabase.from('impact_categories').delete().eq('id', id)
    } catch (err: any) {
      console.log('Background Supabase delete skipped:', err?.message)
    }
  }

  const moveCategory = async (id: string, direction: 'up' | 'down') => {
    const index = categories.findIndex(c => c.id === id)
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === categories.length - 1) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...categories]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    // Update display orders
    updated.forEach((item, idx) => {
      item.display_order = idx + 1
    })

    saveLocalCategories(updated)
    setSuccessMessage('Order updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)

    try {
      await supabase.from('impact_categories').upsert(
        updated.map(c => ({ id: c.id, display_order: c.display_order }))
      )
    } catch (err: any) {
      console.log('Background Supabase reorder skipped:', err?.message)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData({ 
      ...formData, 
      title,
      slug: formData.slug || generateSlug(title)
    })
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 pt-20 sm:pt-24 px-3 sm:px-4 md:px-6">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 text-green-700 px-4 py-3 rounded-lg shadow-lg border border-green-200 max-w-sm animate-slide-in">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Sticky Header */}
      <div className="sticky top-[88px] md:top-0 z-30 bg-white/95 backdrop-blur-sm -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <Layers className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
            <span className="truncate">Impact Categories</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {categories.length} categories • Manage your impact areas
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <button 
            onClick={fetchCategories} 
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            <RefreshCw className="w-4 h-4" /> 
            <span className="hidden xs:inline">Refresh</span>
          </button>
          <button 
            onClick={openAddModal} 
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-[#263238] text-white rounded-lg hover:bg-[#263238]/90 transition text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            <Plus className="w-4 h-4" /> 
            <span>Add</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-xl flex items-center gap-2 border border-red-200 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading...
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl bg-muted/20">
          <Layers className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No categories found. Add your first one!</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="w-full text-sm min-w-[768px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-12">#</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Title</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden sm:table-cell">Slug</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Redirect URL</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-12">Image</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat, idx) => (
                  <tr key={cat.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition">
                    <td className="p-3 sm:p-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs">{idx + 1}</span>
                        <div className="flex flex-col ml-1 sm:ml-2">
                          <button 
                            onClick={() => moveCategory(cat.id, 'up')} 
                            disabled={idx === 0} 
                            className="text-muted-foreground/40 hover:text-foreground disabled:opacity-20 p-0.5"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => moveCategory(cat.id, 'down')} 
                            disabled={idx === categories.length - 1} 
                            className="text-muted-foreground/40 hover:text-foreground disabled:opacity-20 p-0.5"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div>
                        <div className="font-medium text-foreground text-sm truncate max-w-[150px]">{cat.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[150px]">{cat.description}</div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 text-muted-foreground text-xs font-mono hidden sm:table-cell">{cat.slug}</td>
                    <td className="p-3 sm:p-4 hidden md:table-cell">
                      {cat.redirect_url ? (
                        <a 
                          href={cat.redirect_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80 text-xs font-mono truncate max-w-[150px] block flex items-center gap-1"
                        >
                          <LinkIcon className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">{cat.redirect_url}</span>
                        </a>
                      ) : (
                        <span className="text-muted-foreground/40 text-xs">Not set</span>
                      )}
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img src={cat.image_url} alt={cat.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden lg:table-cell">
                      <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${cat.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {cat.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button 
                          onClick={() => navigate(`/impact/${cat.slug}`)} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(cat)} 
                          className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteCategory(cat.id)} 
                          className="p-1.5 rounded-lg hover:bg-red-50 text-muted-foreground hover:text-red-600 transition"
                          title="Delete"
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

      {/* Fixed Bottom Action Bar (mobile) */}
      <div className="fixed bottom-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-t border-border/50 p-3 sm:p-4 flex justify-center md:hidden">
        <button 
          onClick={openAddModal} 
          className="flex items-center justify-center gap-2 w-full max-w-xs px-6 py-3 bg-[#263238] text-white rounded-xl shadow-lg hover:bg-[#263238]/90 transition font-medium text-sm"
        >
          <Plus className="w-5 h-5" /> Add New Category
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-[#263238] rounded-2xl shadow-2xl border border-gray-200 w-full max-w-3xl p-5 sm:p-7 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto z-50"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
                <h2 className="text-lg sm:text-xl font-bold text-[#263238]">
                  {editing ? 'Edit Impact Category' : 'Add New Impact Category'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* File Upload & Image URL */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Upload Image *</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="block w-full text-xs text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#263238] file:text-white hover:file:bg-[#FFF314] hover:file:text-[#263238]"
                      disabled={uploading}
                    />
                    {uploading && <Loader2 className="w-5 h-5 animate-spin text-amber-500 flex-shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Or paste a URL below</p>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-[#263238] focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image_url && (
                    <div className="mt-2 aspect-video rounded-xl border border-gray-200 overflow-hidden max-h-48 sm:max-h-64 bg-gray-50">
                      <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                {/* Title & Slug */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-[#263238] focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Slug (URL) *</label>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      placeholder="e.g., education"
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-[#263238] focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1 font-mono">URL: /impact/{formData.slug || 'slug'}</p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-[#263238] focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition"
                    required
                  />
                </div>

                {/* Redirect URL */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                    <LinkIcon className="w-4 h-4 text-amber-500" /> Redirect URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.redirect_url || ''}
                    onChange={(e) => setFormData({ ...formData, redirect_url: e.target.value })}
                    placeholder="https://example.com/your-page"
                    className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-[#263238] focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave empty to use the default page. Users clicking "Learn More" will be redirected to this URL.
                  </p>
                </div>

                {/* Initiatives Management */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Initiatives (3 recommended)</label>
                  <div className="mt-2 space-y-2">
                    {formData.initiatives?.map((init, idx) => (
                      <div key={idx} className="flex flex-wrap items-center gap-2 bg-gray-50 border border-gray-200 p-2 sm:p-3 rounded-xl">
                        <GripVertical className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <span className="text-2xl flex-shrink-0">{init.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs text-[#263238] truncate">{init.title}</p>
                          <p className="text-xs text-gray-500 truncate">{init.description}</p>
                        </div>
                        <div className="flex items-center gap-1 ml-auto">
                          <button type="button" onClick={() => editInitiative(idx)} className="p-1.5 rounded-lg hover:bg-gray-200 text-[#263238]">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button type="button" onClick={() => removeInitiative(idx)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    {/* Add / Edit Initiative Form */}
                    <div className="border border-dashed border-gray-300 bg-gray-50/50 rounded-xl p-3 space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <input
                          type="text"
                          placeholder="Icon"
                          value={initiativeInput.icon}
                          onChange={(e) => setInitiativeInput({ ...initiativeInput, icon: e.target.value })}
                          className="w-16 px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-center font-mono"
                        />
                        <input
                          type="text"
                          placeholder="Title"
                          value={initiativeInput.title}
                          onChange={(e) => setInitiativeInput({ ...initiativeInput, title: e.target.value })}
                          className="flex-1 min-w-[120px] px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#263238]"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Description"
                        value={initiativeInput.description}
                        onChange={(e) => setInitiativeInput({ ...initiativeInput, description: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-[#263238]"
                      />
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={addInitiative}
                          className="text-xs font-bold px-3 py-1 bg-[#263238] text-white rounded-lg hover:bg-[#263238]/90 transition"
                        >
                          {editingInitiativeIndex !== null ? 'Update Initiative' : '+ Add Initiative'}
                        </button>
                        {editingInitiativeIndex !== null && (
                          <button
                            type="button"
                            onClick={() => {
                              setInitiativeInput({ icon: '', title: '', description: '' })
                              setEditingInitiativeIndex(null)
                            }}
                            className="text-xs text-gray-500 hover:underline"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funds */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-emerald-600" /> Funds Collected (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.funds_collected || 0}
                      onChange={(e) => setFormData({ ...formData, funds_collected: parseFloat(e.target.value) || 0 })}
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-[#263238] focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1">
                      <Target className="w-4 h-4 text-amber-500" /> Goal Funds (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.goal_funds || 0}
                      onChange={(e) => setFormData({ ...formData, goal_funds: parseFloat(e.target.value) || 0 })}
                      className="w-full mt-1 px-3.5 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-[#263238] focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">Status</label>
                  <div className="flex items-center gap-4 mt-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer">
                      <input type="radio" checked={formData.is_active === true} onChange={() => setFormData({ ...formData, is_active: true })} className="accent-[#263238]" /> Active
                    </label>
                    <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 cursor-pointer">
                      <input type="radio" checked={formData.is_active === false} onChange={() => setFormData({ ...formData, is_active: false })} className="accent-[#263238]" /> Inactive
                    </label>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                  <button type="button" onClick={() => setModalOpen(false)} className="px-5 py-2.5 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading || uploading} className="px-6 py-2.5 bg-[#263238] text-white rounded-xl text-xs font-bold hover:bg-[#263238]/90 transition flex items-center justify-center gap-2 shadow-sm disabled:opacity-50">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {loading ? 'Saving...' : (editing ? 'Update Category' : 'Create Category')}
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

// Add Check icon for success message
const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)
