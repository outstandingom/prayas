import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, FileText, Download, ArrowRight, ExternalLink, Mail, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DOCUMENTS = [
  {
    id: 1,
    name: 'Form 10AB Income Tax Approval',
    category: 'Tax Exemption',
    description: 'Official approval under Section 10AB of Income Tax Act 1961 granting tax exemption status.',
    type: 'PDF Document',
    image: '/10ab.jpeg',
    badge: 'Section 10AB Approved',
    badgeColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
  },
  {
    id: 2,
    name: 'CSR-1 Registration Certificate',
    category: 'Corporate Registration',
    description: 'Ministry of Corporate Affairs CSR-1 registration letter (Reg No. AB5600296) for CSR funds.',
    type: 'PDF Document',
    image: '/CSR.jpeg',
    badge: 'Govt MCA Registered',
    badgeColor: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
  },
  {
    id: 3,
    name: 'Society Registration (Samiti Panjiyan)',
    category: 'Legal Registration',
    description: 'Official society registration certificate under Madhya Pradesh Society Registrikaran Adhiniyam 1973.',
    type: 'Image Document',
    image: '/SAMATI.jpeg',
    badge: 'EST. 2001 • Registered',
    badgeColor: 'bg-amber-500/10 text-amber-800 border-amber-500/20',
  },
  {
    id: 4,
    name: 'Executive Committee & Members List',
    category: 'Governance',
    description: 'Official registered list of governing board members, office bearers, and committee trustees.',
    type: 'PDF Document',
    image: '/P1039409.JPG',
    badge: 'Verified Committee',
    badgeColor: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
  },
  {
    id: 5,
    name: 'Organization Bylaws & Constitution',
    category: 'Governance',
    description: 'Constitutional bylaws, institutional guidelines, and governing principles of Prayas NGO.',
    type: 'PDF Document',
    image: '/P1039322.JPG',
    badge: 'Official Constitution',
    badgeColor: 'bg-red-500/10 text-red-700 border-red-500/20',
  },
];

export default function Certifications() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-[#263238] pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* ─── Ambient Glow Accents ─── */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">

        {/* ─── Page Header (Cleanly Offset Below Floating Navbar) ─── */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4 max-w-3xl mx-auto"
        >


          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#263238] tracking-tight leading-tight">
            {t('documents.title', 'Certifications &')}{' '}
            <span className="text-red-600">
              {t('documents.titleHighlight', 'Records')}
            </span>
          </h1>
          {/* Premium Underline Bar */}
          <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full shadow-xs" />

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {t(
              'documents.subtitle',
              'Official government registrations, tax exemption approvals, and legal records of Prayas Social Welfare Society. Full transparency guaranteed.'
            )}
          </p>
        </motion.div>

        {/* ─── Document Cards Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {DOCUMENTS.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl p-6 border border-gray-200/90 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5"
            >
              <div className="space-y-4">
                
                {/* Certificate Preview Frame (Full Visibility, No Crop) */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-inner group/img">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border backdrop-blur-md bg-white/90 shadow-sm ${doc.badgeColor}`}>
                      <CheckCircle2 size={12} />
                      {doc.badge}
                    </span>
                  </div>

                  {/* Document Type Label */}
                  <div className="absolute bottom-3 left-3 text-white text-xs font-medium font-mono flex items-center gap-1.5">
                    <FileText size={14} className="text-red-400" />
                    <span>{doc.type}</span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wider font-mono">
                    {doc.category}
                  </span>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#263238] leading-snug group-hover:text-red-600 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">
                    {doc.description}
                  </p>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-gray-100">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold bg-gray-50 hover:bg-red-50 text-[#263238] hover:text-red-600 border border-gray-200 hover:border-red-200 transition-all cursor-pointer shadow-xs"
                >
                  <Mail size={16} />
                  <span>Request Official Copy</span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </motion.div>
          ))}
        </div>

        {/* ─── Contact CTA Banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200/90 shadow-2xl text-center space-y-4 max-w-3xl mx-auto"
        >
          <div className="w-14 h-14 rounded-2xl bg-red-600/10 text-red-600 border border-red-600/20 flex items-center justify-center mx-auto">
            <FileText className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263238]">
            Need verified physical copies or audit reports?
          </h2>

          <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto font-sans leading-relaxed">
            We maintain complete operational transparency. Contact our legal compliance desk to request signed audit reports, tax exemption copies, or registration certificates.
          </p>

          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Contact Compliance Desk</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
