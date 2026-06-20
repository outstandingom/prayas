// src/pages/Volunteer.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Send, CheckCircle, Loader2, User, Mail, Phone, MapPin, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Volunteer() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    availability: '',
    skills: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);
    setError('');

    try {
      const { error } = await supabase.from('volunteers').insert([{
        full_name: formData.full_name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        availability: formData.availability.trim(),
        skills: formData.skills.trim(),
        message: formData.message.trim(),
      }]);

      if (error) throw error;

      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        availability: '',
        skills: '',
        message: '',
      });
    } catch (err: any) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen bg-[#F1F8F5] flex items-center justify-center px-4 py-16 relative overflow-hidden pointer-events-auto">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md w-full bg-white rounded-2xl p-8 shadow-xl relative z-20 border border-[#FFF314]/20 pointer-events-auto"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 text-[#FFF314] mb-4 shadow-inner">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#263238] mb-2">Thank You! 🎉</h2>
          <p className="text-[#263238]/60 text-sm">
            Your volunteer application has been submitted successfully. Our team will review your application and get in touch with you shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#263238] hover:text-[#FFF314] hover:underline transition-colors font-medium cursor-pointer pointer-events-auto"
          >
            Submit another application
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F1F8F5] flex items-center justify-center px-4 py-20 relative overflow-hidden pointer-events-auto">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl bg-white rounded-2xl border border-[#FFF314]/20 shadow-xl relative z-20 overflow-hidden pointer-events-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FFF314]/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-[#FFF314]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#263238]">Become a Volunteer</h2>
              <p className="text-sm text-[#263238]/60">Join our mission to make a difference</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 pointer-events-auto">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-1.5 pointer-events-auto">
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
              className="w-full px-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 pointer-events-auto cursor-text"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                className="w-full px-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 pointer-events-auto cursor-text"
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
                className="w-full px-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 pointer-events-auto cursor-text"
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
              className="w-full px-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 pointer-events-auto cursor-text"
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
              className="w-full px-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] pointer-events-auto cursor-pointer"
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
              className="w-full px-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 pointer-events-auto cursor-text"
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
              className="w-full px-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 resize-none pointer-events-auto cursor-text"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm pointer-events-auto">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFF314] text-[#263238] rounded-lg font-medium hover:bg-[#FFF314]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#FFF314]/20 cursor-pointer pointer-events-auto"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
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
      </motion.div>
    </section>
  );
}
