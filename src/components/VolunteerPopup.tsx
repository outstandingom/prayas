// src/components/VolunteerPopup.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Send, CheckCircle, User, Mail, Phone, MapPin, Calendar } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface VolunteerPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function VolunteerPopup({ isOpen, onClose }: VolunteerPopupProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

            {success ? (
              <div className="p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00897B]/10 mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-[#00897B]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-[#263238] mb-2">Thank You! 🎉</h2>
                <p className="text-[#263238]/60 mb-6">
                  Your volunteer application has been submitted successfully. We'll get back to you soon!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#00897B] text-white rounded-lg font-medium hover:bg-[#00897B]/90 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#00897B]/10 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-[#00897B]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-[#263238]">Become a Volunteer</h2>
                      <p className="text-sm text-[#263238]/60">Join our mission to make a difference</p>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <User className="w-4 h-4 text-[#00897B]" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 bg-white border border-[#00897B]/20 rounded-lg focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                        <Mail className="w-4 h-4 text-[#00897B]" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="your@email.com"
                        className="w-full px-4 py-2.5 bg-white border border-[#00897B]/20 rounded-lg focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                        <Phone className="w-4 h-4 text-[#00897B]" />
                        Phone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 bg-white border border-[#00897B]/20 rounded-lg focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <MapPin className="w-4 h-4 text-[#00897B]" />
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Your address"
                      className="w-full px-4 py-2.5 bg-white border border-[#00897B]/20 rounded-lg focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
                    />
                  </div>

                  {/* Availability */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <Calendar className="w-4 h-4 text-[#00897B]" />
                      Availability
                    </label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-[#00897B]/20 rounded-lg focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238]"
                    >
                      <option value="">Select availability</option>
                      <option value="weekdays">Weekdays</option>
                      <option value="weekends">Weekends</option>
                      <option value="evenings">Evenings</option>
                      <option value="anytime">Anytime</option>
                      <option value="occasional">Occasional</option>
                    </select>
                  </div>

                  {/* Skills */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <User className="w-4 h-4 text-[#00897B]" />
                      Skills / Interests
                    </label>
                    <input
                      type="text"
                      name="skills"
                      value={formData.skills}
                      onChange={handleChange}
                      placeholder="e.g., Teaching, Event Management, Social Media"
                      className="w-full px-4 py-2.5 bg-white border border-[#00897B]/20 rounded-lg focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5">
                      <Send className="w-4 h-4 text-[#00897B]" />
                      Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us why you want to volunteer..."
                      className="w-full px-4 py-2.5 bg-white border border-[#00897B]/20 rounded-lg focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-[#00897B] text-white rounded-lg font-medium hover:bg-[#00897B]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#00897B]/20"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
