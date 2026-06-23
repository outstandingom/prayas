// src/pages/Contact.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'

interface FormData { name: string; email: string; phone: string; subject: string; message: string }
const initialForm: FormData = { name: '', email: '', phone: '', subject: '', message: '' }

export default function Contact() {
  const { t } = useTranslation()
  const [form, setForm] = useState<FormData>(initialForm)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const contactInfo = useMemo(() => [
    { icon: MapPin, title: t('contact.info.address.title', 'Our Address'), details: [t('contact.info.address.line1', '123, Community Center,'), t('contact.info.address.line2', 'New Delhi – 110001, India')] },
    { icon: Phone, title: t('contact.info.phone.title', 'Call Us'), details: ['+91 98765 43210', '+91 11 2345 6789'] },
    { icon: Mail, title: t('contact.info.email.title', 'Email Us'), details: ['info@prayasfoundation.org', 'support@prayasfoundation.org'] },
    { icon: Clock, title: t('contact.info.hours.title', 'Working Hours'), details: [t('contact.info.hours.weekdays', 'Mon – Sat: 9:00 AM – 6:00 PM'), t('contact.info.hours.sunday', 'Sunday: Closed')] },
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

  const inputClass = 'w-full px-4 py-3 rounded-xl border border-[#263238]/20 bg-white text-[#263238] placeholder:text-[#263238]/40 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 transition-all duration-200 text-sm'
  const labelClass = 'block text-sm font-semibold text-[#263238] mb-1.5'

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Banner */}
      <div className="bg-[#263238] py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #FFF314 0%, transparent 50%), radial-gradient(circle at 80% 50%, #FFF314 0%, transparent 50%)' }} />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10">
          <span className="text-[#FFF314] font-mono text-xs uppercase tracking-widest font-semibold bg-[#FFF314]/10 px-4 py-2 rounded-full inline-block mb-4">
            {t('contact.hero.label', 'Get In Touch')}
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
            {t('contact.hero.title', 'Contact')} <span className="text-[#FFF314]">{t('contact.hero.titleHighlight', 'Us')}</span>
          </h1>
          <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto">
            {t('contact.hero.subtitle', "Have a question, want to volunteer, or just want to say hello? We'd love to hear from you.")}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Left – Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#263238] mb-2">{t('contact.sidebar.title', "Let's Talk")}</h2>
              <p className="text-[#263238]/60 text-sm leading-relaxed">{t('contact.sidebar.subtitle', 'Fill in the form and our team will get back to you within 24 hours.')}</p>
            </div>
            <div className="space-y-4">
              {contactInfo.map((info, i) => {
                const Icon = info.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} className="flex items-start gap-4 p-4 rounded-2xl bg-[#263238]/5 border border-[#263238]/10 hover:border-[#FFF314]/50 transition-all duration-200 group">
                    <div className="w-10 h-10 rounded-xl bg-[#FFF314]/20 flex items-center justify-center shrink-0 group-hover:bg-[#FFF314]/40 transition-colors">
                      <Icon className="w-5 h-5 text-[#263238]" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#263238] text-sm mb-1">{info.title}</p>
                      {info.details.map((d, j) => <p key={j} className="text-[#263238]/60 text-xs leading-relaxed">{d}</p>)}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right – Contact Form */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3 bg-white rounded-3xl border border-[#263238]/10 shadow-xl shadow-[#263238]/5 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-6">{t('contact.form.title', 'Send Us a Message')}</h2>

            {status === 'success' && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center py-12 gap-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
                <h3 className="text-xl font-bold text-[#263238]">{t('contact.form.success.title', 'Message Sent!')}</h3>
                <p className="text-[#263238]/60 text-sm max-w-sm">{t('contact.form.success.subtitle', 'Thank you for reaching out. Our team will get back to you within 24 hours.')}</p>
                <button onClick={() => setStatus('idle')} className="mt-2 px-6 py-2.5 bg-[#FFF314] text-[#263238] rounded-full font-semibold text-sm hover:bg-[#FFF314]/90 transition-all">
                  {t('contact.form.success.again', 'Send Another Message')}
                </button>
              </motion.div>
            )}

            {status !== 'success' && (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>{t('contact.form.name', 'Full Name')} <span className="text-red-500">*</span></label>
                    <input id="name" name="name" type="text" required placeholder="e.g. Ramesh Kumar" value={form.name} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>{t('contact.form.email', 'Email Address')} <span className="text-red-500">*</span></label>
                    <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className={labelClass}>{t('contact.form.phone', 'Phone Number')} <span className="text-[#263238]/40 font-normal">({t('contact.form.optional', 'optional')})</span></label>
                    <input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} className={inputClass} />
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
                <div>
                  <label htmlFor="message" className={labelClass}>{t('contact.form.message', 'Your Message')} <span className="text-red-500">*</span></label>
                  <textarea id="message" name="message" required rows={5} placeholder={t('contact.form.messagePlaceholder', 'Tell us how we can help you...')} value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} />
                </div>
                {status === 'error' && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" /><span>{errorMsg}</span>
                  </div>
                )}
                <motion.button type="submit" disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: loading ? 1 : 0.98 }} className="w-full py-3.5 bg-[#263238] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#263238]/90 transition-all shadow-lg shadow-[#263238]/20 disabled:opacity-60 disabled:cursor-not-allowed">
                  {loading ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{t('contact.form.sending', 'Sending...')}</>) : (<><Send className="w-4 h-4" />{t('contact.form.submit', 'Send Message')}</>)}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
