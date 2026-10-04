import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Copy, 
  Check, 
  QrCode, 
  GraduationCap, 
  Stethoscope, 
  Users, 
  Trees, 
  Utensils, 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Smartphone,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface CauseItem {
  id: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  impactPoints: string[];
  icon: any;
  color: string;
  bgLight: string;
  accentBorder: string;
  image: string;
  note: string;
}

const CAUSES: CauseItem[] = [
  {
    id: 'education',
    badge: 'Education Support',
    title: 'Child Education & Sanskarshala',
    tagline: 'Empowering children with education, books, and computers',
    description:
      'Support evening Sanskarshala learning centers for underprivileged children. Your contribution funds textbooks, school uniforms, nutritious evening snacks, and computer literacy classes.',
    impactPoints: [
      '₹500 funds a month of study materials for 1 child',
      '₹1,500 provides a full school kit, bag, and uniform',
      '₹5,000 supports computer lab hardware & internet',
    ],
    icon: GraduationCap,
    color: 'text-blue-600',
    bgLight: 'bg-blue-50/70',
    accentBorder: 'border-blue-200',
    image: '/P1039409.JPG',
    note: 'Donation for Child Education & Sanskarshala',
  },
  {
    id: 'healthcare',
    badge: 'Medical Care',
    title: 'Free Healthcare & Mobile Medical Aid',
    tagline: 'Life-saving diagnosis, free medicines & health camps',
    description:
      'Help us bring qualified doctors, diagnostic camps, and free prescription medicines directly to remote tribal and rural villages where healthcare facilities are out of reach.',
    impactPoints: [
      '₹1,000 sponsors free medical checkups for 10 villagers',
      '₹2,500 funds diagnostic lab tests & essential medicines',
      '₹10,000 supports a full day multi-doctor village health camp',
    ],
    icon: Stethoscope,
    color: 'text-emerald-600',
    bgLight: 'bg-emerald-50/70',
    accentBorder: 'border-emerald-200',
    image: '/healthcaret.jpg',
    note: 'Donation for Healthcare & Medical Aid',
  },
  {
    id: 'women',
    badge: 'Livelihood & Dignity',
    title: 'Women Empowerment (Sabji Wali Didi)',
    tagline: 'Micro-loans, sewing machines & self-reliance',
    description:
      'Help women street vendors break free from predatory moneylenders. We provide zero-interest revolving capital loans, digital weighing scales, and vocational stitching training.',
    impactPoints: [
      '₹1,500 provides a digital weighing scale & trade kit',
      '₹3,500 funds a sewing machine for self-employment',
      '₹5,000 provides zero-interest working capital to double daily income',
    ],
    icon: Users,
    color: 'text-amber-600',
    bgLight: 'bg-amber-50/70',
    accentBorder: 'border-amber-200',
    image: '/WOMEN.jpeg',
    note: 'Donation for Sabji Wali Didi Women Empowerment',
  },
  {
    id: 'environment',
    badge: 'Green Planet',
    title: 'Kargil Vatika & Reforestation',
    tagline: 'Building living memorial forests & clean air reserves',
    description:
      'Join our green movement to plant dense native tree forests and revive urban lakes. Every tree is tagged, protected, and nurtured to adulthood with volunteer guardians.',
    impactPoints: [
      '₹500 plants and safeguards 5 native shade saplings',
      '₹2,000 sponsors a drip-irrigation green patch',
      '₹5,000 dedicates a living memorial grove with name plaque',
    ],
    icon: Trees,
    color: 'text-emerald-600',
    bgLight: 'bg-green-50/70',
    accentBorder: 'border-green-200',
    image: '/TREEGROW.jpg',
    note: 'Donation for Kargil Vatika Reforestation',
  },
  {
    id: 'nutrition',
    badge: 'Hunger Relief',
    title: 'Child Nutrition & Daily Hot Meals',
    tagline: 'Nourishing young minds to eliminate child malnutrition',
    description:
      'Nutritious food is the foundation of growth. We serve fresh, wholesome, protein-rich meals daily to children of daily-wage earners and slum dwellers across centers.',
    impactPoints: [
      '₹600 feeds wholesome meals to a child for 1 month',
      '₹2,000 provides milk & fruit supplements to 20 children',
      '₹6,000 sponsors 100 hot community meals during drives',
    ],
    icon: Utensils,
    color: 'text-rose-600',
    bgLight: 'bg-rose-50/70',
    accentBorder: 'border-rose-200',
    image: '/CHILDRENGROUP.jpg',
    note: 'Donation for Child Nutrition & Daily Meals',
  },
  {
    id: 'community',
    badge: 'Community Welfare',
    title: 'Rural Welfare & Emergency Relief',
    tagline: 'Clean drinking water, winter blankets & crisis relief',
    description:
      'Your general contribution allows Prayas to deploy rapid relief during winter chills, natural crises, and build sustainable water supply solutions in underserved villages.',
    impactPoints: [
      '₹1,000 provides warm winter blankets & clothes to 5 seniors',
      '₹3,000 supplies community drinking water filtration units',
      '₹10,000 emergency disaster & livelihood revival grant',
    ],
    icon: Building2,
    color: 'text-purple-600',
    bgLight: 'bg-purple-50/70',
    accentBorder: 'border-purple-200',
    image: '/P1039322.JPG',
    note: 'Donation for Rural Welfare & Relief',
  },
];

export default function Donate() {
  const { t } = useTranslation();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bankCopiedField, setBankCopiedField] = useState<string | null>(null);

  const UPI_ID = '8818882178.1@hdfc';
  const PAYEE_NAME = 'Prayas Samaj Sevi Sanstha';

  const copyToClipboard = (text: string, id: string, isBank = false) => {
    navigator.clipboard.writeText(text);
    if (isBank) {
      setBankCopiedField(id);
      setTimeout(() => setBankCopiedField(null), 2000);
    } else {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getUpiUrl = (note: string) => {
    return `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
      PAYEE_NAME
    )}&cu=INR&tn=${encodeURIComponent(note)}`;
  };

  const getQrUrl = (note: string) => {
    const upiPayload = getUpiUrl(note);
    return `https://api.qrserver.com/v1/create-qr-code/?size=450x450&data=${encodeURIComponent(
      upiPayload
    )}&margin=12&format=svg`;
  };

  return (
    <div className="min-h-screen bg-slate-50/60 text-[#263238] pt-24 sm:pt-32 pb-24 selection:bg-red-500 selection:text-white">
      {/* ─── Hero Section ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 sm:mb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs sm:text-sm font-bold shadow-xs">
            <Heart className="w-4 h-4 fill-red-500" />
            <span>100% Tax Deductible (80G & 12A Certified)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Choose a Cause, <br />
            <span className="text-red-600">Scan & Transform Lives</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Directly support the initiatives that matter most to you. Simply scan the designated QR code with Google Pay, PhonePe, Paytm, or any UPI app.
          </p>
        </motion.div>
      </div>

      {/* ─── Alternating Causes Section (Zig-Zag Layout) ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        {CAUSES.map((cause, index) => {
          const isEven = index % 2 === 0;
          const qrUrl = getQrUrl(cause.note);
          const upiUrl = getUpiUrl(cause.note);
          const Icon = cause.icon;

          return (
            <motion.div
              key={cause.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/60 border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              <div
                className={`flex flex-col ${
                  isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 sm:gap-12 lg:gap-16`}
              >
                {/* ─── Text / Cause Info Column ─── */}
                <div className="flex-1 w-full space-y-6">
                  {/* Badge & Icon */}
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-2xl ${cause.bgLight} ${cause.color} shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-500 font-mono">
                      {cause.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
                      {cause.title}
                    </h2>
                    <p className="text-sm sm:text-base font-semibold text-red-600 mt-1">
                      {cause.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    {cause.description}
                  </p>

                  {/* Impact Highlights */}
                  <div className="space-y-2.5 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">
                      How Your Contribution Helps:
                    </p>
                    <div className="space-y-2">
                      {cause.impactPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-medium">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Direct Pay Button & Desktop Helper */}
                  <div className="pt-3 flex flex-wrap items-center gap-3">
                    <a
                      href={upiUrl}
                      className="inline-flex sm:hidden items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md shadow-red-600/20 active:scale-98 transition-all"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Tap to Donate via UPI App</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <button
                      onClick={() => copyToClipboard(UPI_ID, cause.id)}
                      className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700 transition-all cursor-pointer"
                    >
                      {copiedId === cause.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">UPI ID Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-gray-500" />
                          <span>Copy UPI ID: <strong className="font-mono text-gray-900">{UPI_ID}</strong></span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* ─── Big QR Code Card Column ─── */}
                <div className="w-full lg:w-[380px] shrink-0 flex flex-col items-center">
                  <div className="w-full max-w-[340px] bg-gray-50/60 rounded-3xl p-6 border border-gray-100/80 hover:border-gray-200 transition-all duration-300 shadow-sm group relative">
                    {/* QR Code Container */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col items-center relative overflow-hidden">
                      <img
                        src={qrUrl}
                        alt={`Scan to donate for ${cause.title}`}
                        className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-lg transition-transform duration-300 group-hover:scale-102"
                        loading="lazy"
                      />

                      <div className="mt-3 flex items-center justify-center gap-1.5 text-gray-500 text-[11px] font-semibold">
                        <QrCode className="w-3.5 h-3.5 text-red-500" />
                        <span>Scan with any UPI App</span>
                      </div>
                    </div>

                    {/* Supported UPI Apps Pills */}
                    <div className="mt-4 pt-3 border-t border-gray-100 text-center">
                      <p className="text-[11px] text-gray-400 font-medium">
                        GPay • PhonePe • Paytm • BHIM • Cred • Amazon Pay
                      </p>
                    </div>

                    {/* Verified Payee Tag */}
                    <div className="mt-2 text-center">
                      <span className="inline-block text-[11px] font-bold text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-200/80 shadow-2xs">
                        Verified: {PAYEE_NAME}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ─── Bank Transfer & 80G Tax Exemption Section ─── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 sm:mt-28">
        <div className="bg-gradient-to-br from-[#263238] to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FFF314] text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                <Building2 className="w-3.5 h-3.5" />
                <span>Direct Bank Transfer (NEFT / RTGS / IMPS)</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Official Account Information
              </h3>
              <p className="text-sm text-gray-300">
                For corporate CSR contributions or large donor transfers, please use our registered institutional bank account.
              </p>
            </div>

            {/* Bank Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {/* Bank Name */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-xs text-gray-400 uppercase font-mono tracking-wider mb-1">Bank Name</p>
                <p className="text-base font-bold text-white">HDFC Bank</p>
                <p className="text-xs text-gray-400 mt-1">Savings Account</p>
              </div>

              {/* Account Number */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-xs text-gray-400 uppercase font-mono tracking-wider mb-1">Account Number</p>
                <div className="flex items-center justify-between">
                  <p className="text-base font-mono font-bold text-white">50200118537529</p>
                  <button
                    onClick={() => copyToClipboard('50200118537529', 'acc', true)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                    title="Copy Account Number"
                  >
                    {bankCopiedField === 'acc' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Prayas Samaj Sevi Sanstha</p>
              </div>

              {/* IFSC Code */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-xs text-gray-400 uppercase font-mono tracking-wider mb-1">IFSC Code</p>
                <div className="flex items-center justify-between">
                  <p className="text-base font-mono font-bold text-white">HDFC0003886</p>
                  <button
                    onClick={() => copyToClipboard('HDFC0003886', 'ifsc', true)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                    title="Copy IFSC"
                  >
                    {bankCopiedField === 'ifsc' ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 mt-1">Kesharbagh Branch, Indore</p>
              </div>
            </div>

            {/* Tax Receipt Note */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#FFF314] shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-gray-200">
                  <span className="font-bold text-white">Need an 80G Tax Exemption Receipt?</span>
                  <p className="text-gray-300 mt-0.5">
                    After contributing, kindly email your transaction screenshot, PAN, and full name to{' '}
                    <strong className="text-white underline decoration-amber-400 underline-offset-2">
                      prayas1samajiksevisanstha@gmail.com
                    </strong>
                  </p>
                </div>
              </div>

              <a
                href="mailto:prayas1samajiksevisanstha@gmail.com?subject=Donation%20Receipt%20Request%2080G"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-[#263238] font-bold text-xs hover:bg-gray-100 transition shrink-0"
              >
                <span>Email Receipt Request</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-8 text-center text-xs sm:text-sm text-gray-500 max-w-xl mx-auto space-y-1">
          <p className="font-semibold text-gray-700">100% Transparency & Direct Ground Impact</p>
          <p>
            Prayas Samaj Sevi Sanstha is an officially registered non-governmental organization dedicated to empowering underprivileged communities across India.
          </p>
        </div>
      </div>
    </div>
  );
}
