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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald/10 text-emerald mb-4">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-muted-foreground">
            Your volunteer application has been submitted. We'll get back to you soon.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            Submit another application
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald/30 bg-emerald/5 mb-4">
            <Heart className="w-4 h-4 text-emerald" />
            <span className="text-sm font-medium text-emerald">Join Our Mission</span>
          </div>
          <h1 className="text-2xl font-bold">Volunteer Registration</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Fill in your details and we'll connect with you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Availability (e.g., weekends, evenings)</label>
            <input
              type="text"
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Skills / Interests</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g., teaching, event management, social media"
              className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Message (optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full bg-background/50 border border-border/50 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald text-white rounded-md font-medium hover:bg-emerald/90 transition disabled:opacity-50 flex items-center justify-center gap-2"
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
