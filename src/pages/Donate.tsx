import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, CreditCard, Smartphone, Building2, IndianRupee, Gift, Loader2, Copy, Check, QrCode, ChevronDown, ChevronUp, BookOpen, Stethoscope, Users, Trees, Utensils, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const DONATION_AMOUNTS = [
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1,000' },
  { value: 2500, label: '₹2,500' },
  { value: 5000, label: '₹5,000' },
  { value: 10000, label: '₹10,000' },
]

// Mapping for causes
const CAUSE_MAP: Record<string, { title: string; description: string; image: string }> = {
  education: {
    title: 'Child Education & Sanskarshala',
    description: 'Support quality education, books, uniforms, and computer labs for rural children',
    image: '/P1039409.JPG'
  },
  health: {
    title: 'Free Healthcare & Medical Aid',
    description: 'Fund rural medical checkups, free medicines, and disability support',
    image: '/healthcaret.jpg'
  },
  women: {
    title: 'Women Empowerment (Sabji Wali Didi)',
    description: 'Provide sewing machines, micro-business loans, and skill development',
    image: '/WOMEN.jpeg'
  },
  environment: {
    title: 'Kargil Vatika & Reforestation',
    description: 'Plant native trees to build living memorial forests and clean air reserves',
    image: '/TREEGROW.jpg'
  },
  food: {
    title: 'Child Nutrition & Daily Meals',
    description: 'Provide nutritious daily lunches to eliminate child hunger in slums',
    image: '/CHILDRENGROUP.jpg'
  },
  community: {
    title: 'Community & Village Development',
    description: 'Direct support for village drinking water wells and emergency relief',
    image: '/CSR.jpeg'
  },
}

export default function Donate() {
  const { t } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const causeParam = searchParams.get('cause') || ''
  
  const [selectedCauseKey, setSelectedCauseKey] = useState<string>(
    CAUSE_MAP[causeParam] ? causeParam : ''
  )
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCopied, setQrCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const activeCause = selectedCauseKey ? CAUSE_MAP[selectedCauseKey] : null
  const amount = customAmount ? parseInt(customAmount) : selectedAmount

  const handleCauseSelect = (key: string) => {
    setSelectedCauseKey(key)
    if (key) {
      setSearchParams({ cause: key }, { replace: true })
    } else {
      setSearchParams({}, { replace: true })
    }
  }

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!amount || amount <= 0) {
      alert('Please select or enter a valid donation amount.')
      return
    }

    setLoading(true)

    const causeName = activeCause ? activeCause.title : 'General Welfare'
    const upiUrl = `upi://pay?pa=8818882178.1@hdfc&pn=Prayas%20Samaj%20Sevi%20Sanstha&am=${amount}&cu=INR&tn=Donation%20for%20${encodeURIComponent(causeName)}`

    window.location.href = upiUrl
    setTimeout(() => setLoading(false), 5000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyQRToClipboard = () => {
    navigator.clipboard.writeText('8818882178.1@hdfc')
    setQrCopied(true)
    setTimeout(() => setQrCopied(false), 2000)
  }

  const svgFallback = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23263238"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="20" fill="%23FFFFFF" font-weight="bold"%3EPrayas NGO Cause%3C/text%3E%3C/svg%3E'

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-3xl mx-auto">
        
        {/* ─── Header ─── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 mb-4">
            <Heart className="w-8 h-8 text-amber-500 fill-amber-500" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            {activeCause ? `${t('donate.header.donateFor', 'Donate for')} ${activeCause.title}` : t('donate.header.title', 'Make a Donation')}
          </h1>
          
          {activeCause ? (
            <>
              <p className="text-[#263238]/70 text-sm mt-1">{activeCause.description}</p>
              <div className="mt-3 max-w-xs mx-auto rounded-xl overflow-hidden shadow-md border border-gray-200">
                <img
                  src={activeCause.image}
                  alt={activeCause.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.currentTarget.src = svgFallback)}
                />
              </div>
            </>
          ) : (
            <p className="text-[#263238]/60 mt-2 max-w-md mx-auto">
              {t('donate.header.subtitle', 'Your support empowers children, families, and communities to build a brighter future.')}
            </p>
          )}
        </div>

        {/* ─── SELECT CAUSE SECTION ─── */}
        <div className="mb-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-200/90 space-y-3">
          <label className="text-xs font-mono font-bold uppercase tracking-wider text-gray-500 block text-center">
            Select A Specific Cause To Direct Your Donation:
          </label>

          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => handleCauseSelect('')}
              className={`py-2 px-3.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                !selectedCauseKey
                  ? 'bg-[#FFF314] text-[#263238] border-[#E6DB00] shadow-sm'
                  : 'bg-gray-50 text-[#263238] border-gray-200 hover:border-[#FFF314]/50'
              }`}
            >
              General Welfare Fund
            </button>

            {Object.entries(CAUSE_MAP).map(([key, item]) => (
              <button
                key={key}
                type="button"
                onClick={() => handleCauseSelect(key)}
                className={`py-2 px-3.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                  selectedCauseKey === key
                    ? 'bg-[#FFF314] text-[#263238] border-[#E6DB00] shadow-sm'
                    : 'bg-gray-50 text-[#263238] border-gray-200 hover:border-[#FFF314]/50'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* ─── ORIGINAL DONATION FORM FIELDS & FLOW PRESERVED ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <form onSubmit={handleDonate} className="space-y-6">
            
            {/* Amount Selection */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-3">
                <IndianRupee className="w-4 h-4 text-amber-500" />
                {t('donate.form.selectAmount', 'Select Amount')}
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mb-3">
                {DONATION_AMOUNTS.map((amt) => (
                  <button
                    key={amt.value}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amt.value)
                      setCustomAmount('')
                    }}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      selectedAmount === amt.value && !customAmount
                        ? 'bg-[#FFF314] text-[#263238] shadow-md'
                        : 'bg-gray-100 text-[#263238] hover:bg-[#FFF314]/10'
                    }`}
                  >
                    {amt.label}
                  </button>
                ))}
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#263238]/40 font-medium">₹</span>
                <input
                  type="number"
                  placeholder={t('donate.form.customAmount', 'Custom amount')}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount(null)
                  }}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/20 transition-all text-[#263238] placeholder:text-[#263238]/40"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-3">
                <Smartphone className="w-4 h-4 text-amber-500" />
                {t('donate.form.paymentMethod', 'Payment Method')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'card', label: 'Card', icon: CreditCard, disabled: true },
                  { id: 'netbanking', label: 'Net Banking', icon: Building2, disabled: true },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    disabled={method.disabled}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all cursor-pointer ${
                      paymentMethod === method.id
                        ? 'bg-[#FFF314] text-[#263238] shadow-md'
                        : method.disabled
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed opacity-60'
                        : 'bg-gray-100 text-[#263238] hover:bg-[#FFF314]/10'
                    }`}
                  >
                    <method.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{method.label}</span>
                    {method.disabled && <span className="text-[8px] text-gray-400">({t('donate.form.comingSoon', 'coming soon')})</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Impact Message */}
            <div className="bg-amber-500/5 rounded-lg p-4 flex items-start gap-3 border border-amber-500/20">
              <Gift className="w-5 h-5 text-amber-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#263238]">{t('donate.impact.title', 'Your Impact')}</p>
                <p className="text-xs text-[#263238]/70">
                  {amount && amount >= 5000
                    ? t('donate.impact.high', 'Your donation can educate 5 children for a month')
                    : amount && amount >= 1000
                    ? t('donate.impact.mid', 'Your donation can provide meals to 50 people')
                    : t('donate.impact.low', 'Every contribution makes a difference')}
                  {activeCause && ` ${t('donate.impact.for', 'for')} ${activeCause.title}`}
                </p>
              </div>
            </div>

            {/* Donate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FFF314] hover:bg-[#FBE000] text-[#263238] border border-[#E6DB00] rounded-lg font-bold text-lg transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t('donate.form.redirecting', 'Redirecting...')}
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-current" />
                  {t('donate.form.donateBtn', 'Donate')} ₹{amount?.toLocaleString() || '0'}
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#263238]/60">
              {t('donate.form.upiNote', 'You will be redirected to your UPI app to complete the payment.')}
            </p>
          </form>
        </motion.div>

        {/* ─── ORIGINAL BANK TRANSFER DETAILS WITH HIGHLIGHTED QR CODE ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-200 relative overflow-hidden"
        >
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-amber-500/10 rounded-lg">
                <QrCode className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#263238] flex items-center gap-2">
                  {t('donate.bank.title', 'Direct Bank Transfer')}
                  <span className="text-xs bg-[#FFF314] text-[#263238] border border-[#E6DB00] px-2 py-0.5 rounded-full font-medium">
                    QR Available
                  </span>
                </h2>
                <p className="text-sm text-[#263238]/60">
                  {t('donate.bank.subtitle', 'You can also donate directly to our bank account via NEFT / RTGS / IMPS.')}
                </p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="mb-6 bg-gray-50 rounded-xl p-4 border border-gray-200 shadow-sm">
              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full flex items-center justify-between gap-2 text-sm font-semibold text-[#263238] hover:text-amber-600 transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-amber-500/10 rounded-lg">
                    <QrCode className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className="text-base">
                    {showQR ? 'Hide Bank QR Code' : '📱 Scan to Pay with Bank QR'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {showQR ? (
                    <ChevronUp className="w-5 h-5 text-[#263238]/60 group-hover:text-amber-600 transition" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#263238]/60 group-hover:text-amber-600 transition" />
                  )}
                </div>
              </button>

              {showQR && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative group bg-white p-4 rounded-xl shadow-lg border border-gray-200">
                      <img
                        src="/BANKQR.jpeg"
                        alt="Bank QR Code for UPI Payment"
                        className="w-56 h-56 object-contain rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50" y="100" font-family="Arial" font-size="16" fill="%236b7280"%3EQR Code%3C/text%3E%3Ctext x="30" y="130" font-family="Arial" font-size="14" fill="%236b7280"%3ENot Available%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <button
                        onClick={copyQRToClipboard}
                        className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors cursor-pointer"
                        title="Copy QR URL"
                      >
                        {qrCopied ? (
                          <Check className="w-4 h-4 text-emerald-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#263238]" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs font-bold text-[#263238] mt-3">
                      UPI VPA: <span className="text-amber-600 font-mono">8818882178.1@hdfc</span>
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bank Account Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80">
                <span className="text-[#263238]/50 text-xs">Bank Name</span>
                <p className="font-semibold text-[#263238]">HDFC Bank</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80">
                <span className="text-[#263238]/50 text-xs">IFSC Code</span>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#263238]">HDFC0003886</p>
                  <button
                    onClick={() => copyToClipboard('HDFC0003886')}
                    className="text-amber-600 hover:text-amber-700 transition cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80 md:col-span-2">
                <span className="text-[#263238]/50 text-xs">Account Number</span>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#263238]">50200118537529</p>
                  <button
                    onClick={() => copyToClipboard('50200118537529')}
                    className="text-amber-600 hover:text-amber-700 transition cursor-pointer"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200/80 md:col-span-2">
                <span className="text-[#263238]/50 text-xs">Branch Address</span>
                <p className="font-semibold text-[#263238] text-sm">
                  SAHAJ RESIDENCY, SCHEME NO.103, KESARBAGH, Indore- 452009, Madhya Pradesh, India
                </p>
              </div>
            </div>

            <div className="mt-4 text-xs text-[#263238]/70 bg-gray-50 p-3 rounded-lg border border-gray-200">
              <p>💡 After transferring, please email us at <strong className="text-[#263238]">prayas1samajiksevisanstha@gmail.com</strong> with your transaction details and name so we can send an official 80G receipt.</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm text-[#263238]/60">
          <p>100% {t('donate.footer.p1', 'of your donation goes directly to our programs.')}</p>
          <p className="mt-1">{t('donate.footer.p2', 'Prayas Samaj Sevi Sanstha is a registered NGO.')}</p>
        </div>

      </div>
    </div>
  )
}
