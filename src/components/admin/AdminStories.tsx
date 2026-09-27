// src/components/admin/AdminStories.tsx
import { useState, useEffect, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import { 
  Plus, Edit, Trash2, RefreshCw, ArrowUp, ArrowDown, X, Save, AlertCircle, 
  Image as ImageIcon, Loader2, Eye, Users, MapPin, BookOpen, CheckCircle
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

interface Story {
  id: string
  image_url: string
  title: string
  story: string
  name: string
  location: string
  display_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

type StoryForm = Omit<Story, 'id' | 'display_order' | 'created_at' | 'updated_at'> & { display_order?: number }

export default function AdminStories() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Story | null>(null)
  const [uploading, setUploading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [imagePreview, setImagePreview] = useState<string>('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const [formData, setFormData] = useState<StoryForm>({
    image_url: '',
    title: '',
    story: '',
    name: '',
    location: '',
    is_active: true,
  })

  const DEFAULT_STORIES: Story[] = [
    {
      id: 'story-1',
      title: 'Zero Interest Micro-Loan Changed My Life',
      story: 'I used to pay ₹100 daily interest to moneylenders. With Prayas zero-interest micro-loan and QR code, I cleared all debt and now save ₹400 daily to fund my children\'s education.',
      name: 'Kalyani Didi',
      location: 'Indore Mandi, MP',
      image_url: '/WOMEN.jpeg',
      display_order: 1,
      is_active: true
    },
    {
      id: 'story-2',
      title: 'From Muddy Well to Tap Water at Home',
      story: 'Before Prayas adopted our village, my daughters used to walk 3 kilometers every morning to fetch water. Today clean drinking water is available right at our doorstep.',
      name: 'Sunita Devi',
      location: 'Barwani District, MP',
      image_url: '/ruraldevelopment.jpeg',
      display_order: 2,
      is_active: true
    },
    {
      id: 'story-3',
      title: 'Solar Streetlights Saved Our Village',
      story: 'Before Prayas installed solar lights, we had no streetlights and children couldn\'t study at night. Now our entire village is illuminated and studying under solar power.',
      name: 'Rameshwar Prasad',
      location: 'Sindoda Village, MP',
      image_url: '/P1039322.JPG',
      display_order: 3,
      is_active: true
    },
    {
      id: 'story-4',
      title: 'From Shy Boy to Assembly Leader',
      story: 'Before joining Sanskarshala, my son was shy and struggling in school. Now he leads morning assembly and helps younger kids with homework happily.',
      name: 'Geeta Sharma',
      location: 'Indore, MP',
      image_url: '/education1.jpeg',
      display_order: 4,
      is_active: true
    },
    {
      id: 'story-5',
      title: 'Custom Uniform Contracting Enterprise',
      story: 'After finishing the 6-month tailoring course at Prayas Sewing Center, I got a contract to stitch 300 school uniforms. I bought my second machine and hired two neighbors!',
      name: 'Shanti Solanki',
      location: 'Dhar District, MP',
      image_url: '/assets/women-empowerment/sewing-training.jpeg',
      display_order: 5,
      is_active: true
    }
  ]

  const saveLocalStories = (items: Story[]) => {
    setStories(items)
    localStorage.setItem('prayas_impact_stories', JSON.stringify(items))
  }

  const fetchStories = async () => {
    setLoading(true)
    setError('')

    // Read from localStorage first
    try {
      const saved = localStorage.getItem('prayas_impact_stories')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStories(parsed)
        } else {
          saveLocalStories(DEFAULT_STORIES)
        }
      } else {
        saveLocalStories(DEFAULT_STORIES)
      }
    } catch (e) {
      setStories(DEFAULT_STORIES)
    }

    // Try Supabase in background
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('display_order', { ascending: true })
      
      if (!error && data && data.length > 0) {
        saveLocalStories(data)
      }
    } catch (err: any) {
      console.log('Supabase stories fetch skipped:', err?.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStories()
  }, [])

  const uploadImage = async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 10)}.${fileExt}`
      const filePath = `stories/${fileName}`
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
    
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    
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
      image_url: '',
      title: '',
      story: '',
      name: '',
      location: '',
      is_active: true,
    })
    setImagePreview('')
    setEditing(null)
    setSuccessMessage('')
    setError('')
  }

  const openAddModal = () => {
    resetForm()
    setModalOpen(true)
  }

  const openEditModal = (story: Story) => {
    setEditing(story)
    setFormData({
      image_url: story.image_url,
      title: story.title,
      story: story.story,
      name: story.name,
      location: story.location,
      is_active: story.is_active,
    })
    setImagePreview(story.image_url)
    setModalOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { image_url, title, story, name, location, is_active } = formData
    
    if (!image_url || !title || !story || !name || !location) {
      setError('All fields are required. Please fill in all fields.')
      return
    }

    const payloadItem: Story = {
      id: editing ? editing.id : `story-${Date.now()}`,
      image_url: image_url.trim(),
      title: title.trim(),
      story: story.trim(),
      name: name.trim(),
      location: location.trim(),
      display_order: editing ? editing.display_order : (stories.reduce((max, s) => Math.max(max, s.display_order), 0) + 1),
      is_active,
      updated_at: new Date().toISOString(),
    }

    let updatedList: Story[] = []
    if (editing) {
      updatedList = stories.map(s => s.id === editing.id ? payloadItem : s)
    } else {
      updatedList = [...stories, payloadItem]
    }
    saveLocalStories(updatedList)

    setSuccessMessage(editing ? 'Story updated successfully!' : 'Story created successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    setModalOpen(false)
    resetForm()

    // Try Supabase in background
    try {
      if (editing) {
        await supabase.from('stories').update(payloadItem).eq('id', editing.id)
      } else {
        await supabase.from('stories').insert([payloadItem])
      }
    } catch (err: any) {
      console.log('Background Supabase update skipped:', err?.message)
    }
  }

  const deleteStory = async (id: string) => {
    if (!confirm('Delete this story permanently?')) return
    const updated = stories.filter(s => s.id !== id)
    saveLocalStories(updated)
    setSuccessMessage('Story deleted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)

    try {
      await supabase.from('stories').delete().eq('id', id)
    } catch (err: any) {
      console.log('Background Supabase delete skipped:', err?.message)
    }
  }

  const moveStory = async (id: string, direction: 'up' | 'down') => {
    const index = stories.findIndex(s => s.id === id)
    if (direction === 'up' && index === 0) return
    if (direction === 'down' && index === stories.length - 1) return
    
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    const updated = [...stories]
    const temp = updated[index]
    updated[index] = updated[targetIndex]
    updated[targetIndex] = temp

    updated.forEach((item, idx) => {
      item.display_order = idx + 1
    })

    saveLocalStories(updated)
    setSuccessMessage('Order updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
    
    try {
      await supabase.from('stories').upsert(
        updated.map(s => ({ id: s.id, display_order: s.display_order }))
      )
    } catch (err: any) {
      console.log('Background Supabase reorder skipped:', err?.message)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-24 pt-20 sm:pt-24 px-3 sm:px-4 md:px-6">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-20 right-4 z-50 bg-green-50 text-green-700 px-4 py-3 rounded-lg shadow-lg border border-green-200 max-w-sm animate-slide-in">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">{successMessage}</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 sm:p-4 rounded-xl flex items-center gap-2 border border-red-200 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0" /> 
          <span>{error}</span>
          <button onClick={() => setError('')} className="ml-auto text-red-400 hover:text-red-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Sticky Header */}
      <div className="sticky top-[88px] md:top-0 z-30 bg-white/95 backdrop-blur-sm -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 border-b border-border/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground flex items-center gap-2">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-[#263238] flex-shrink-0" />
            <span className="truncate">Impact Stories</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            {stories.length} stories • Manage your impact stories
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <button 
            onClick={fetchStories} 
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
            <span>Add Story</span>
          </button>
        </div>
      </div>

      {loading && stories.length === 0 ? (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <Loader2 className="w-6 h-6 animate-spin text-primary mr-2" /> Loading...
        </div>
      ) : stories.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed rounded-xl bg-muted/20">
          <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm">No stories found. Add your first story!</p>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto -mx-3 sm:mx-0">
            <table className="w-full text-sm min-w-[768px]">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider w-12">#</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Image</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Title / Story</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden md:table-cell">Person</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Location</th>
                  <th className="text-left p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider hidden lg:table-cell">Status</th>
                  <th className="text-center p-3 sm:p-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((story, idx) => (
                  <tr key={story.id} className="border-b border-border last:border-0 hover:bg-muted/10 transition">
                    <td className="p-3 sm:p-4 text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span className="font-mono text-xs">{idx + 1}</span>
                        <div className="flex flex-col ml-1 sm:ml-2">
                          <button 
                            onClick={() => moveStory(story.id, 'up')} 
                            disabled={idx === 0} 
                            className="text-muted-foreground/40 hover:text-foreground disabled:opacity-20 p-0.5"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button 
                            onClick={() => moveStory(story.id, 'down')} 
                            disabled={idx === stories.length - 1} 
                            className="text-muted-foreground/40 hover:text-foreground disabled:opacity-20 p-0.5"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex-shrink-0 border border-border/50">
                        {story.image_url ? (
                          <img src={story.image_url} alt={story.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <ImageIcon className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div>
                        <div className="font-medium text-foreground text-sm">{story.title}</div>
                        <div className="text-xs text-muted-foreground truncate max-w-[200px]">{story.story}</div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden md:table-cell">
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span className="text-sm">{story.name}</span>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden lg:table-cell">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs">{story.location}</span>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4 hidden lg:table-cell">
                      <span className={`px-2 py-1 rounded-full text-[10px] sm:text-xs font-semibold ${story.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {story.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button 
                          onClick={() => navigate('/stories')} 
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-muted-foreground hover:text-blue-600 transition"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(story)} 
                          className="p-1.5 rounded-lg hover:bg-primary/10 text-muted-foreground hover:text-primary transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteStory(story.id)} 
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
          <Plus className="w-5 h-5" /> Add New Story
        </button>
      </div>

      {/* Modal - Add/Edit Story */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => {
              if (!loading) setModalOpen(false)
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-2xl p-4 sm:p-6 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-[#263238]">
                  {editing ? 'Edit Story' : 'Add New Story'}
                </h2>
                <button 
                  onClick={() => setModalOpen(false)} 
                  className="p-1 rounded-lg hover:bg-gray-100 transition"
                  disabled={loading}
                >
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* File Upload & Image URL */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Upload Image *</label>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#FFF314]/10 file:text-[#263238] hover:file:bg-[#FFF314]/20"
                      disabled={uploading}
                    />
                    {uploading && <Loader2 className="w-5 h-5 animate-spin text-primary flex-shrink-0" />}
                  </div>
                  
                  {/* Image Preview */}
                  {(imagePreview || formData.image_url) && (
                    <div className="mt-2 aspect-video rounded-lg border border-gray-200 overflow-hidden max-h-48 sm:max-h-64 bg-gray-50 relative">
                      <img 
                        src={imagePreview || formData.image_url} 
                        alt="Preview" 
                        className="w-full h-full object-cover" 
                      />
                      {uploading && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-white" />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-1">Or paste a URL below</p>
                  <input
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => {
                      setFormData({ ...formData, image_url: e.target.value })
                      if (!imagePreview) setImagePreview(e.target.value)
                    }}
                    className="w-full mt-1 px-3 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#263238] focus:ring-2 focus:ring-[#263238]/10 transition"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., Education for All"
                    className="w-full mt-1 px-3 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#263238] focus:ring-2 focus:ring-[#263238]/10 transition"
                    required
                  />
                </div>

                {/* Story/Description */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Story *</label>
                  <textarea
                    value={formData.story}
                    onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                    rows={4}
                    placeholder="Write the inspiring story here..."
                    className="w-full mt-1 px-3 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#263238] focus:ring-2 focus:ring-[#263238]/10 transition resize-none"
                    required
                  />
                </div>

                {/* Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <Users className="w-4 h-4" /> Person's Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Priya Sharma"
                      className="w-full mt-1 px-3 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#263238] focus:ring-2 focus:ring-[#263238]/10 transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Rajasthan, India"
                      className="w-full mt-1 px-3 sm:px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-[#263238] focus:ring-2 focus:ring-[#263238]/10 transition"
                      required
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</label>
                  <div className="flex items-center gap-4 mt-1">
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        checked={formData.is_active === true} 
                        onChange={() => setFormData({ ...formData, is_active: true })} 
                        className="w-4 h-4 text-[#263238]"
                      /> 
                      Active
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer">
                      <input 
                        type="radio" 
                        checked={formData.is_active === false} 
                        onChange={() => setFormData({ ...formData, is_active: false })} 
                        className="w-4 h-4 text-[#263238]"
                      /> 
                      Inactive
                    </label>
                  </div>
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-gray-200">
                  <button 
                    type="button" 
                    onClick={() => setModalOpen(false)} 
                    className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-gray-100 transition"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={loading || uploading} 
                    className="px-6 py-2 bg-[#263238] text-white rounded-lg text-sm font-semibold hover:bg-[#263238]/90 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading || uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {loading || uploading ? 'Saving...' : (editing ? 'Update Story' : 'Create Story')}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
