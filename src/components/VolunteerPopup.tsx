// src/components/VolunteerPopup.tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Send, CheckCircle, User, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface VolunteerPopupProps {
  isOpen: boolean
  onClose: () => void
  className?: string
}

export default function VolunteerPopup({ isOpen, onClose, className = '' }: VolunteerPopupProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
    skills: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.position = 'unset'
      document.body.style.width = 'unset'
    }
  }, [isOpen])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)
    setError('')

    try {
      const { error } = await supabase.from('volunteers').insert([{
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        availability: formData.availability.trim(),
        skills: formData.skills.trim(),
        message: formData.message.trim(),
      }])

      if (error) throw error

      setSuccess(true)
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        availability: '',
        skills: '',
        message: '',
      })
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="volunteer-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-[99999] flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm ${className}`}
          onClick={handleOverlayClick}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <motion.div
            key="volunteer-popup-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-lg max-h-[80vh] sm:max-h-[85vh] md:max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl mt-16 sm:mt-20 md:mt-24 lg:mt-28"
            onClick={(e) => e.stopPropagation()}
            style={{ zIndex: 100000 }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-3 right-3 z-50 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-gray-200 hover:border-[#FFF314] cursor-pointer"
              aria-label="Close volunteer popup"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {success ? (
              <div className="p-6 sm:p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FFF314]/10 mb-4 sm:mb-6"
                >
                  <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#FFF314]" />
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#263238] mb-2">Thank You! 🎉</h2>
                <p className="text-sm sm:text-base text-[#263238]/60 mb-4 sm:mb-6">
                  Your volunteer application has been submitted successfully. We'll get back to you soon!
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#FFF314] text-[#263238] rounded-lg font-medium hover:bg-[#FFF314]/90 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="p-4 sm:p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FFF314]/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-[#FFF314]" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-[#263238]">Become a Volunteer</h2>
                      <p className="text-xs sm:text-sm text-[#263238]/60">Join our mission to make a difference</p>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <User className="w-4 h-4 text-[#FFF314]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm sm:text-base"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                        <Mail className="w-4 h-4 text-[#FFF314]" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm sm:text-base"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                        <Phone className="w-4 h-4 text-[#FFF314]" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm sm:text-base"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <MapPin className="w-4 h-4 text-[#FFF314]" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <Calendar className="w-4 h-4 text-[#FFF314]" />
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] text-sm sm:text-base"
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings</option>
                      <option value="anytime">Anytime</option>
                      <option value="occasional">Occasional</option>
                    </select>
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <User className="w-4 h-4 text-[#FFF314]" />
                      Skills / Interests
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g., Teaching, Event Management, Social Media"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <Send className="w-4 h-4 text-[#FFF314]" />
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us why you want to volunteer..."
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 resize-none text-sm sm:text-base"
                    />
                  </div>

                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-2.5 sm:py-3 bg-[#FFF314] text-[#263238] rounded-lg font-medium hover:bg-[#FFF314]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#FFF314]/20 cursor-pointer text-sm sm:text-base"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#263238]/30 border-t-[#263238] rounded-full animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
