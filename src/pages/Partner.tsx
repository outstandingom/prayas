import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle, Loader2, User, Mail, Phone, Building, Briefcase, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Partner() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ full_name: '', email: '', phone: '', organization: '', partnership_type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); e.stopPropagation(); setLoading(true); setError('');
    try {
      const { error } = await supabase.from('partners').insert([{ 
        full_name: formData.full_name.trim(), 
        email: formData.email.trim(), 
        phone: formData.phone.trim(), 
        organization: formData.organization.trim(), 
        partnership_type: formData.partnership_type.trim(), 
        message: formData.message.trim() 
      }]);
      
      if (error) throw error;
      setSuccess(true); 
      setFormData({ full_name: '', email: '', phone: '', organization: '', partnership_type: '', message: '' });
    } catch (err: any) { 
      if (err?.code === '42P01') {
        try {
          const fallbackMessage = `Organization: ${formData.organization}\nPartnership Type: ${formData.partnership_type}\n\n${formData.message}`;
          const { error: fallbackError } = await supabase.from('contact_messages').insert([{
            name: formData.full_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            subject: 'Partnership Inquiry',
            message: fallbackMessage.trim(),
            status: 'unread'
          }]);
          
          if (fallbackError) throw fallbackError;
          setSuccess(true);
          setFormData({ full_name: '', email: '', phone: '', organization: '', partnership_type: '', message: '' });
          return;
        } catch (fallbackErr: any) {
           setError(fallbackErr.message || t('partner.form.errorFallback', 'Submission failed. Please try again.'));
        }
      } else {
        setError(err.message || t('partner.form.errorFallback', 'Submission failed. Please try again.')); 
      }
    } 
    finally { setLoading(false); }
  };

  const LeftSidebar = () => (
    <div className="hidden lg:flex lg:w-[45%] relative bg-gray-900 fixed lg:sticky top-0 h-screen overflow-hidden">
      <img src="/PRAYASHEALTHCAMP.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-70" alt="Partner" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a192f] via-[#0a192f]/60 to-transparent" />
      
      <div className="relative z-10 flex flex-col justify-end p-12 text-white h-full w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-6 border border-white/20 shadow-lg">
            <Briefcase className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold tracking-wide">Corporate & NGO Partnerships</span>
            </div>
            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
            Together, we can create scalable impact.
            </h1>
            <p className="text-lg text-blue-100 font-medium max-w-md leading-relaxed">
            Collaborate with Prayas to amplify social change. Whether through CSR initiatives, joint projects, or sponsorships, your support drives meaningful progress.
            </p>
        </motion.div>
      </div>
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen flex flex-col lg:flex-row bg-white">
        <LeftSidebar />
        <div className="w-full lg:w-[55%] flex items-center justify-center p-6 sm:p-12 min-h-screen py-24 lg:py-12">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md w-full">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-50 text-blue-600 mb-8 shadow-inner ring-8 ring-blue-50/50">
              <CheckCircle className="w-12 h-12" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-4">{t('partner.success.title', 'Thank You! 🎉')}</h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              {t('partner.success.subtitle', 'Your partnership inquiry has been submitted successfully. Our team will review your application and get in touch with you shortly.')}
            </p>
            <div className="flex flex-col gap-4">
              <Link to="/" className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex justify-center items-center gap-2">
                Return to Home
              </Link>
              <button onClick={() => setSuccess(false)} className="w-full py-4 bg-white text-gray-600 rounded-xl font-bold hover:bg-gray-50 hover:text-gray-900 transition-all border border-gray-200 cursor-pointer">
                {t('partner.success.again', 'Submit another inquiry')}
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
              {t('partner.form.title', 'Partner With Us')}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Contact Person */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">{t('partner.form.fullName', 'Contact Person Name')} *</label>
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
                  placeholder={t('partner.form.fullNamePlaceholder', 'Enter your full name')} 
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>
            
            {/* Organization */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">{t('partner.form.organization', 'Organization / Company Name')} *</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="w-5 h-5 text-gray-400" />
                </div>
                <input 
                  type="text" 
                  name="organization" 
                  value={formData.organization} 
                  onChange={handleChange} 
                  required 
                  placeholder={t('partner.form.orgPlaceholder', 'Enter your organization name')} 
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium"
                />
              </div>
            </div>

            {/* Grid for Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">{t('partner.form.email', 'Email')} *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your@email.com" className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium" />
                  </div>
              </div>
              <div className="space-y-1.5">
                  <label className="text-sm font-bold text-gray-700">{t('partner.form.phone', 'Phone')} *</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone className="w-5 h-5 text-gray-400" />
                    </div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+91 98765 43210" className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-gray-900 placeholder:text-gray-400 font-medium" />
                  </div>
              </div>
            </div>

            {/* Partnership Type */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">{t('partner.form.partnershipType', 'Partnership Type')}</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                  </div>
                  <select name="partnership_type" value={formData.partnership_type} onChange={handleChange} className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-gray-900 cursor-pointer font-medium appearance-none">
                      <option value="">{t('partner.form.selectType', 'Select partnership type')}</option>
                      <option value="csr">{t('partner.form.type.csr', 'Corporate Social Responsibility (CSR)')}</option>
                      <option value="ngo_collab">{t('partner.form.type.ngoCollab', 'NGO Collaboration')}</option>
                      <option value="corporate_sponsor">{t('partner.form.type.corporateSponsor', 'Corporate Sponsor')}</option>
                      <option value="academic">{t('partner.form.type.academic', 'Academic Institution')}</option>
                      <option value="other">{t('partner.form.type.other', 'Other')}</option>
                  </select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-700">{t('partner.form.message', 'Message (Optional)')}</label>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={2} placeholder={t('partner.form.messagePlaceholder', 'Tell us how you would like to collaborate...') } className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10 transition-all text-gray-900 placeholder:text-gray-400 resize-none font-medium" />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-3">
                <div className="w-1 h-full bg-red-500 rounded-full" />
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5 cursor-pointer mt-4">
              {loading ? (<><Loader2 className="w-5 h-5 animate-spin" />{t('partner.form.submitting', 'Submitting...')}</>) : (<>{t('partner.form.submit', 'Submit Inquiry')} <ArrowRight className="w-5 h-5" /></>)}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
