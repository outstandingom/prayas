// src/pages/Volunteer.tsx
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Send, CheckCircle } from 'lucide-react';

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00897B]/10 text-[#00897B] mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#263238] mb-2">Thank You!</h2>
          <p className="text-[#263238]/60">
            Your volunteer application has been submitted. We'll get back to you soon.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#00897B] hover:underline"
          >
            Submit another application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-[#00897B]/15 rounded-xl p-6 md:p-8 shadow-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00897B]/30 bg-[#E8F5E9] mb-4">
            <Heart className="w-4 h-4 text-[#00897B]" />
            <span className="text-sm font-medium text-[#00897B]">Join Our Mission</span>
          </div>
          <h1 className="text-2xl font-bold text-[#263238]">Volunteer Registration</h1>
          <p className="text-[#263238]/60 text-sm mt-1">
            Fill in your details and we'll connect with you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#263238] mb-1">Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#263238] mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">Availability (e.g., weekends, evenings)</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">Skills / Interests</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., teaching, event management, social media"
              className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#263238] mb-1">Message (optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#00897B] focus:ring-2 focus:ring-[#00897B]/10 transition-all text-[#263238] placeholder:text-[#263238]/40 resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#00897B] text-white rounded-lg font-medium btn-hover transition disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-[#00897B]/20"
          >
            {loading ? 'Submitting...' : (
              <>
                Submit Application <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
      }
