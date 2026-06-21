// src/components/admin/AdminContacts.tsx
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Mail, Phone, Clock, CheckCircle, Eye, Trash2, RefreshCw, AlertCircle, Search, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ContactMessage {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: 'unread' | 'read' | 'replied'
  created_at: string
}

const STATUS_COLORS = {
  unread: 'bg-red-100 text-red-700 border-red-200',
  read: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  replied: 'bg-green-100 text-green-700 border-green-200',
}

const STATUS_LABELS = {
  unread: 'Unread',
  read: 'Read',
  replied: 'Replied',
}

export default function AdminContacts() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMsg, setSelectedMsg] = useState<ContactMessage | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read' | 'replied'>('all')
  const [search, setSearch] = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)

  const fetchMessages = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setMessages(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMessages()
  }, [])

  const markAs = async (id: string, status: 'read' | 'replied') => {
    await supabase.from('contact_messages').update({ status }).eq('id', id)
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)))
    if (selectedMsg?.id === id) setSelectedMsg((prev) => prev ? { ...prev, status } : prev)
  }

  const deleteMsg = async (id: string) => {
    if (!confirm('Delete this message permanently?')) return
    setDeleting(id)
    await supabase.from('contact_messages').delete().eq('id', id)
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (selectedMsg?.id === id) setSelectedMsg(null)
    setDeleting(null)
  }

  const handleOpen = async (msg: ContactMessage) => {
    setSelectedMsg(msg)
    if (msg.status === 'unread') {
      await markAs(msg.id, 'read')
    }
  }

  const filtered = messages.filter((m) => {
    const matchStatus = filterStatus === 'all' || m.status === filterStatus
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q)
    return matchStatus && matchSearch
  })

  const unreadCount = messages.filter((m) => m.status === 'unread').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            Contact Messages
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                {unreadCount} new
              </span>
            )}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {messages.length} total message{messages.length !== 1 ? 's' : ''} received
          </p>
        </div>
        <button
          onClick={fetchMessages}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition text-sm font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          {(['all', 'unread', 'read', 'replied'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                filterStatus === s
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {loading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground">
              <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mr-2" />
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No messages found</p>
            </div>
          ) : (
            <AnimatePresence>
              {filtered.map((msg) => (
                <motion.button
                  key={msg.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  onClick={() => handleOpen(msg)}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    selectedMsg?.id === msg.id
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : msg.status === 'unread'
                      ? 'border-border bg-card shadow-sm font-semibold'
                      : 'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <p className={`text-sm truncate ${msg.status === 'unread' ? 'font-bold text-foreground' : 'font-medium text-foreground'}`}>
                      {msg.name}
                      {msg.status === 'unread' && (
                        <span className="ml-2 w-2 h-2 bg-red-500 rounded-full inline-block" />
                      )}
                    </p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold shrink-0 ${STATUS_COLORS[msg.status]}`}>
                      {STATUS_LABELS[msg.status]}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate mb-1">{msg.subject}</p>
                  <p className="text-xs text-muted-foreground truncate opacity-70">{msg.message}</p>
                  <div className="flex items-center gap-1 mt-2 text-[10px] text-muted-foreground/60">
                    <Clock className="w-3 h-3" />
                    {new Date(msg.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-3">
          {selectedMsg ? (
            <motion.div
              key={selectedMsg.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-card rounded-2xl border border-border p-6 space-y-5 sticky top-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-foreground">{selectedMsg.subject}</h2>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    From: <span className="font-medium text-foreground">{selectedMsg.name}</span>
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${STATUS_COLORS[selectedMsg.status]}`}>
                  {STATUS_LABELS[selectedMsg.status]}
                </span>
              </div>

              {/* Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-muted/30 border border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                  <a href={`mailto:${selectedMsg.email}`} className="text-primary hover:underline truncate">{selectedMsg.email}</a>
                </div>
                {selectedMsg.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <a href={`tel:${selectedMsg.phone}`} className="text-foreground hover:underline">{selectedMsg.phone}</a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm col-span-full">
                  <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">
                    {new Date(selectedMsg.created_at).toLocaleString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Message</p>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap bg-muted/20 rounded-xl p-4 border border-border">
                  {selectedMsg.message}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2 border-t border-border">
                <a
                  href={`mailto:${selectedMsg.email}?subject=Re: ${selectedMsg.subject}`}
                  onClick={() => markAs(selectedMsg.id, 'replied')}
                  className="flex items-center gap-2 px-4 py-2 bg-[#263238] text-white rounded-lg text-sm font-semibold hover:bg-[#263238]/90 transition"
                >
                  <Mail className="w-4 h-4" />
                  Reply via Email
                </a>
                {selectedMsg.status !== 'replied' && (
                  <button
                    onClick={() => markAs(selectedMsg.id, 'replied')}
                    className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Mark Replied
                  </button>
                )}
                <button
                  onClick={() => deleteMsg(selectedMsg.id)}
                  disabled={deleting === selectedMsg.id}
                  className="ml-auto flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-semibold hover:bg-red-100 transition disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground rounded-2xl border border-dashed border-border bg-muted/20">
              <Eye className="w-10 h-10 mb-3 opacity-30" />
              <p className="text-sm">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
