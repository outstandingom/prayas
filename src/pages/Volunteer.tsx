import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Heart, Send, CheckCircle, Loader2, User, Mail, Phone, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Volunteer() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', address: '', availability: '', skills: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); e.stopPropagation(); setLoading(true); setError('');
    try {
      const { error } = await supabase.from('volunteers').insert([{ 
        full_name: formData.full_name.trim(), 
        email: formData.email.trim(), 
        phone: formData.phone.trim(), 
        address: formData.address.trim(), 
        availability: formData.availability.trim(), 
        skills: formData.skills.trim(), 
        message: formData.message.trim() 
      }]);
      if (error) throw error;
      setSuccess(true); 
      setFormData({ full_name: '', email: '', phone: '', address: '', availability: '', skills: '', message: '' });
    } catch (err: any) { 
      setError(err.message || t('volunteer.form.errorFallback', 'Submission failed. Please try again.')); 
    } finally { 
      setLoading(false); 
    }
  };

  const LeftSidebar = () => (
    <div className="hidden lg:flex lg:w-[45%] relative bg-gray-900 fixed lg:sticky top-0 h-screen overflow-hidden">
      <img src="/CHILDRENGROUP.jpg" className="absolute inset-0 w-full h-full object-cover opacity-70" alt="Volunteer" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="relative z-10 flex flex-col justify-end p-12 text-white h-full w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md mb-6 border border-white/30 shadow-lg">
            <Heart className="w-4 h-4 text-red-400 fill-red-400" />
            <span className="text-sm font-bold tracking-wide">Join Our Community</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Be the reason someone smiles today.
            </h1>
            <p className="text-lg text-gray-200 font-medium max-w-md leading-relaxed">
            Your time and skills can create a lasting impact. Join Prayas in our mission to empower lives across rural and urban India.
            </p>
        </motion.div>
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-white">
        <LeftSidebar />

        {/* Right Side Success */}
        <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 min-h-screen pt-[100px] lg:pt-12">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md w-full">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 mb-8 shadow-inner ring-8 ring-emerald-50/50">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{t('volunteer.success.title', 'Thank You! 🎉')}</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              {t('volunteer.success.subtitle', 'Your volunteer application has been submitted successfully. Our team will review your application and get in touch with you shortly.')}
            </p>
            <div className="flex flex-col gap-4">
              <Link to="/" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2">
                Return to Home
              </Link>
              <button onClick={() => setSuccess(false)} className="w-full py-4 bg-white text-gray-600 rounded-xl font-bold hover:bg-gray-50 hover:text-gray-900 transition-all border border-gray-200 cursor-pointer">
                {t('volunteer.success.again', 'Submit another application')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white">
      <LeftSidebar />

      {/* Right side form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center px-6 sm:px-12 py-24 lg:py-12 min-h-screen">
        <motion.div 
          initial={{ opacity: 0, x: 20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-xl mx-auto mt-10 lg:mt-12"
        >
          <div className="mb-5">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-1.5">
              {t('volunteer.form.title', 'Become a Volunteer')}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">{t('volunteer.form.fullName', 'Full Name')} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  name="full_name" 
                  value={formData.full_name} 
                  onChange={handleChange} 
                  required 
                  placeholder={t('volunteer.form.fullNamePlaceholder', 'Enter your full name')} 
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>
            
            {/* Grid for Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">{t('volunteer.form.email', 'Email')} *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium" />
                  </div>
              </div>
              <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">{t('volunteer.form.phone', 'Phone')} *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium" />
                  </div>
              </div>
            </div>

            {/* Address */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">{t('volunteer.form.address', 'Address')}</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <MapPin className="w-5 h-5 text-gray-400" />
                  </div>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder={t('volunteer.form.addressPlaceholder', 'Your address')} className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium" />
              </div>
            </div>

            {/* Grid for Availability & Skills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Availability */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">{t('volunteer.form.availability', 'Availability')}</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <select name="availability" value={formData.availability} onChange={handleChange} className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-900 cursor-pointer font-medium appearance-none">
                        <option value="">{t('volunteer.form.selectAvailability', 'Select availability')}</option>
                        <option value="weekdays">{t('volunteer.form.avail.weekdays', 'Weekdays')}</option>
                        <option value="weekends">{t('volunteer.form.avail.weekends', 'Weekends')}</option>
                        <option value="evenings">{t('volunteer.form.avail.evenings', 'Evenings')}</option>
                        <option value="anytime">{t('volunteer.form.avail.anytime', 'Anytime')}</option>
                        <option value="occasional">{t('volunteer.form.avail.occasional', 'Occasional')}</option>
                    </select>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-700">{t('volunteer.form.skills', 'Skills / Interests')}</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Heart className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} placeholder={t('volunteer.form.skillsPlaceholder', 'e.g., Teaching...')} className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">{t('volunteer.form.message', 'Message (Optional)')}</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder={t('volunteer.form.messagePlaceholder', 'Tell us why you want to volunteer...') } className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10 transition-all text-gray-900 placeholder:text-gray-400 resize-none font-medium" />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-3">
                <div className="w-1 h-full bg-red-500 rounded-full" />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-3 bg-red-600 text-white rounded-xl font-bold text-lg hover:bg-red-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-red-600/25 hover:shadow-xl hover:shadow-red-600/40 hover:-translate-y-0.5 cursor-pointer mt-4">
              {loading ? (<><Loader2 className="w-5 h-5 animate-spin" />{t('volunteer.form.submitting', 'Submitting...')}</>) : (<>{t('volunteer.form.submit', 'Submit Application')} <ArrowRight className="w-5 h-5" /></>)}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
