import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useTranslation } from 'react-i18next'

interface FormData { name: string; email: string; phone: string; subject: string; message: string; }
const initialForm: FormData = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const contactInfo = useMemo(() => [
    { icon: MapPin, title: t('contact.info.address.title', 'Our Address'), details: [t('contact.info.address.line1', 'SAHAJ RESIDENCY, SCHEME NO.103, KESARBAGH,'), t('contact.info.address.line2', 'Indore- 452009, Madhya Pradesh, India')] },
    { icon: Phone, title: t('contact.info.phone.title', 'Call Us'), details: ['+91 98765 43210', '+91 11 2345 6789'] },
    { icon: Mail, title: t('contact.info.email.title', 'Email Us'), details: ['info@prayasfoundation.org', 'support@prayasfoundation.org'] },
  ], [t])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setStatus('idle'); setErrorMsg('')
    try {
      const { error } = await supabase.from('contact_messages').insert([{ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() || null, subject: form.subject.trim(), message: form.message.trim(), status: 'unread' }])
      if (error) throw error
      setStatus('success'); setForm(initialForm)
    } catch (err: any) {
      setStatus('error'); setErrorMsg(err?.message || t('contact.form.errorFallback', 'Something went wrong. Please try again.'))
    } finally { setLoading(false) }
  }

  const inputClass = 'w-full px-3 py-2 sm:py-2.5 rounded-xl border border-[#263238]/20 bg-white text-[#263238] placeholder:text-[#263238]/40 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition-all duration-200 text-sm'
  const labelClass = 'block text-xs sm:text-sm font-semibold text-[#263238] mb-1'

  return (
    <div className="min-h-screen w-full flex flex-col bg-white pt-20" style={{ paddingTop: 'var(--navbar-height, 80px)' }}>
      <div className="flex-1 w-full flex flex-col lg:flex-row">
        
        {/* Left Panel - Dark / Info */}
        <div className="lg:w-5/12 bg-[#263238] relative flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 min-h-[50vh] lg:min-h-[calc(100vh-var(--navbar-height,80px))]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FFF314 0%, transparent 50%), radial-gradient(circle at 80% 50%, #FFF314 0%, transparent 50%)' }} />
          
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="relative z-10 flex-1 flex flex-col justify-center">
            
            <div className="mb-6 lg:mb-10">
              <span className="text-[#FFF314] font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold bg-[#FFF314]/10 px-3 py-1.5 rounded-full inline-block mb-4">
                {t('contact.hero.label', 'Get In Touch')}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-3 leading-tight">
                {t('contact.hero.title', 'Contact')} <span className="text-[#FFF314]">{t('contact.hero.titleHighlight', 'Us')}</span>
              </h1>
              <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm">
                {t('contact.hero.subtitle', "Have a question, want to volunteer, or just want to say hello? We'd love to hear from you.")}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-5">
              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }} className="flex flex-col gap-2 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FFF314]/30 transition-all duration-200 group">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF314]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FFF314]/20 transition-colors">
                      <Icon className="w-4 h-4 text-[#FFF314]" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm mb-0.5">{info.title}</p>
                      {info.details.map((d, j) => <p key={j} className="text-white/60 text-xs leading-relaxed">{d}</p>)}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Panel - Form */}
        <div className="lg:w-7/12 bg-white flex items-center justify-center p-4 sm:p-8 lg:p-12 py-12">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full max-w-xl bg-white lg:bg-transparent rounded-3xl lg:border-none p-2 sm:p-4 lg:p-0">
            
            <div className="mb-4 lg:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-1">{t('contact.form.title', 'Send Us a Message')}</h2>
              <p className="text-[#263238]/60 text-xs sm:text-sm leading-relaxed">{t('contact.sidebar.subtitle', 'Fill in the form and our team will get back to you within 24 hours.')}</p>
            </div>

            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="flex flex-col items-center justify-center text-center py-10 lg:py-16 gap-3">
                  <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-green-500" />
                  <h3 className="text-lg sm:text-xl font-bold text-[#263238]">{t('contact.form.success.title', 'Message Sent!')}</h3>
                  <p className="text-[#263238]/60 text-xs sm:text-sm max-w-xs">{t('contact.form.success.subtitle', 'Thank you for reaching out. Our team will get back to you within 24 hours.')}</p>
                  <button onClick={() => setStatus('idle')} className="mt-3 px-6 py-2.5 bg-[#FFF314] text-[#263238] rounded-full font-bold text-sm hover:bg-[#FFF314]/90 transition-all shadow-md hover:shadow-lg">
                    {t('contact.form.success.again', 'Send Another Message')}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="name" className={labelClass}>{t('contact.form.name', 'Full Name')} <span className="text-red-500">*</span></label>
                      <input id="name" name="name" type="text" required placeholder="e.g. Ramesh Kumar" value={form.name} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>{t('contact.form.email', 'Email Address')} <span className="text-red-500">*</span></label>
                      <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="phone" className={labelClass}>{t('contact.form.phone', 'Phone Number')} <span className="text-red-500">*</span></label>
                      <input id="phone" name="phone" type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label htmlFor="subject" className={labelClass}>{t('contact.form.subject', 'Subject')} <span className="text-red-500">*</span></label>
                      <select id="subject" name="subject" required value={form.subject} onChange={handleChange} className={inputClass}>
                        <option value="">{t('contact.form.selectSubject', 'Select a subject')}</option>
                        <option value="General Inquiry">{t('contact.form.subjects.general', 'General Inquiry')}</option>
                        <option value="Donation">{t('contact.form.subjects.donation', 'Donation')}</option>
                        <option value="Volunteering">{t('contact.form.subjects.volunteering', 'Volunteering')}</option>
                        <option value="Partnership">{t('contact.form.subjects.partnership', 'Partnership')}</option>
                        <option value="Media & Press">{t('contact.form.subjects.media', 'Media & Press')}</option>
                        <option value="Other">{t('contact.form.subjects.other', 'Other')}</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="message" className={labelClass}>{t('contact.form.message', 'Message')} <span className="text-[#263238]/40 font-normal">({t('contact.form.optional', 'optional')})</span></label>
                      <textarea id="message" name="message" rows={4} placeholder="How can we help you?" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2 text-xs sm:text-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" /><span>{errorMsg}</span>
                    </div>
                  )}
                  <div className="pt-1">
                    <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.01 }} whileTap={{ scale: loading ? 1 : 0.99 }} className="w-full sm:w-auto px-8 py-2.5 sm:py-3 bg-[#263238] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#263238]/90 transition-all shadow-lg shadow-[#263238]/20 disabled:opacity-60 disabled:cursor-not-allowed">
                      {loading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t('contact.form.sending', 'Sending...')}</>) : (<><Send className="w-4 h-4" />{t('contact.form.submit', 'Send Message')}</>)}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
      
      {/* Hide scrollbar styles directly inline for this component context */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
