// src/pages/Volunteer.tsx
/*
  Run this SQL in Supabase SQL editor to create the volunteers table:

  CREATE TABLE IF NOT EXISTS public.volunteers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT,
    availability TEXT,
    skills TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT now()
  );

  ALTER TABLE public.volunteers ENABLE ROW LEVEL SECURITY;

  CREATE POLICY "Anyone can insert volunteers"
    ON public.volunteers FOR INSERT
    WITH CHECK (true);

  CREATE POLICY "Authenticated users can select volunteers"
    ON public.volunteers FOR SELECT
    USING (auth.role() = 'authenticated');

  CREATE POLICY "Authenticated users can update volunteers"
    ON public.volunteers FOR UPDATE
    USING (auth.role() = 'authenticated');
*/

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Send, CheckCircle, Loader2 } from 'lucide-react';

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
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase.from('volunteers').insert([
        {
          full_name: formData.full_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          address: formData.address.trim(),
          availability: formData.availability.trim(),
          skills: formData.skills.trim(),
          message: formData.message.trim(),
        },
      ]);

      if (insertError) throw insertError;

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
      console.error('Volunteer submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen bg-[#F1F8F5] flex items-center justify-center px-4 py-16 relative overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        <div className="text-center max-w-md w-full bg-white/80 backdrop-blur-sm border border-[#FFF314]/20 rounded-2xl p-8 shadow-xl relative z-20">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 text-[#FFF314] mb-4 shadow-inner">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#263238] mb-2">Thank You! ❤️</h2>
          <p className="text-[#263238]/60 text-sm">
            Your volunteer application has been submitted successfully. Our team will review your application and get in touch with you shortly.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-[#263238] hover:text-[#FFF314] hover:underline transition-colors font-medium cursor-pointer"
          >
            Submit another application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#F1F8F5] flex items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#FFF314]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#FFF314]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md border border-[#FFF314]/20 rounded-2xl p-6 md:p-8 shadow-xl relative z-20 mt-8 pointer-events-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FFF314]/30 bg-[#FFF314]/10 mb-4 shadow-sm">
            <Heart className="w-4 h-4 text-[#FFF314] fill-[#FFF314]" />
            <span className="text-xs font-bold text-[#263238] uppercase tracking-wider">Join Our Mission</span>
          </div>
          <h1 className="text-2xl font-bold text-[#263238]">Volunteer Registration</h1>
          <p className="text-[#263238]/60 text-sm mt-1 max-w-sm mx-auto">
            Fill in your details to become a volunteer and join us in creating lasting positive change.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 relative z-30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col relative z-40">
              <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full bg-white border border-[#FFF314]/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/50 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm relative z-50 cursor-text pointer-events-auto shadow-sm"
              />
            </div>
            <div className="flex flex-col relative z-40">
              <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
                className="w-full bg-white border border-[#FFF314]/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/50 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm relative z-50 cursor-text pointer-events-auto shadow-sm"
              />
            </div>
          </div>

          <div className="flex flex-col relative z-40">
            <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
              Phone *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+91 98765 43210"
              className="w-full bg-white border border-[#FFF314]/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/50 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm relative z-50 cursor-text pointer-events-auto shadow-sm"
            />
          </div>

          <div className="flex flex-col relative z-40">
            <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your city, state"
              className="w-full bg-white border border-[#FFF314]/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/50 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm relative z-50 cursor-text pointer-events-auto shadow-sm"
            />
          </div>

          <div className="flex flex-col relative z-40">
            <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
              Availability (e.g., weekends, evenings)
            </label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              placeholder="e.g., Weekends, 4-6 PM weekdays"
              className="w-full bg-white border border-[#FFF314]/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/50 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm relative z-50 cursor-text pointer-events-auto shadow-sm"
            />
          </div>

          <div className="flex flex-col relative z-40">
            <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
              Skills / Interests
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., teaching, event management, social media"
              className="w-full bg-white border border-[#FFF314]/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/50 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm relative z-50 cursor-text pointer-events-auto shadow-sm"
            />
          </div>

          <div className="flex flex-col relative z-40">
            <label className="block text-xs font-semibold text-[#263238]/70 uppercase tracking-wider mb-1">
              Message (optional)
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us a little about yourself or why you'd like to volunteer..."
              className="w-full bg-white border border-[#FFF314]/30 rounded-lg px-4 py-2.5 focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/50 transition-all text-[#263238] placeholder:text-[#263238]/40 text-sm resize-none relative z-50 cursor-text pointer-events-auto shadow-sm"
            />
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm relative z-50">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFF314] text-[#263238] rounded-lg font-bold hover:bg-[#FFF314]/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#FFF314]/20 btn-hover cursor-pointer text-sm relative z-50 pointer-events-auto mt-4"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
              </>
            ) : (
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
