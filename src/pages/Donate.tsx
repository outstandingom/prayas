// src/pages/Donate.tsx
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { Heart, CreditCard, Smartphone, Building2, IndianRupee, Gift, Loader2, Banknote, Copy, Check, QrCode, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const DONATION_AMOUNTS = [
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1,000' },
  { value: 2500, label: '₹2,500' },
  { value: 5000, label: '₹5,000' },
  { value: 10000, label: '₹10,000' },
]

// Mapping for cause display with demo images
const CAUSE_MAP: Record<string, { title: string; description: string; image: string }> = {
  food: { 
    title: 'Food Security', 
    description: 'Provide meals to families in need',
    image: '/images/food-security.jpg'
  },
  education: { 
    title: 'Education', 
    description: 'Support quality education for children',
    image: '/images/education.jpg'
  },
  health: { 
    title: 'Healthcare', 
    description: 'Fund medical care and health camps',
    image: '/images/healthcare.jpg'
  },
  environment: { 
    title: 'Environment', 
    description: 'Help protect our planet',
    image: '/images/environment.jpg'
  },
  shelter: { 
    title: 'Shelter & Housing', 
    description: 'Provide safe homes for the homeless',
    image: '/images/shelter.jpg'
  },
  water: { 
    title: 'Clean Water', 
    description: 'Ensure access to safe drinking water',
    image: '/images/water.jpg'
  },
  animals: { 
    title: 'Animal Welfare', 
    description: 'Care for stray and abandoned animals',
    image: '/images/animals.jpg'
  },
  community: { 
    title: 'Community Support', 
    description: 'Empower local communities',
    image: '/images/community.jpg'
  },
}

export default function Donate() {
  const { t } = useTranslation()
  const [searchParams] = useSearchParams()
  const causeParam = searchParams.get('cause') || ''
  const cause = CAUSE_MAP[causeParam] || null

  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrCopied, setQrCopied] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const amount = customAmount ? parseInt(customAmount) : selectedAmount

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!amount || amount <= 0) {
      alert('Please select or enter a valid donation amount.')
      return
    }

    setLoading(true)
    
    // Updated UPI ID
    const upiUrl = `upi://pay?pa=8818882178.1@hdfc&pn=Prayas%20Samaj%20Sevi%20Sanstha&am=${amount}&cu=INR&tn=Donation%20to%20Prayas%20NGO`
    
    window.location.href = upiUrl
    setTimeout(() => setLoading(false), 5000)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyQRToClipboard = () => {
    navigator.clipboard.writeText('public/BANKQR.jpeg')
    setQrCopied(true)
    setTimeout(() => setQrCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8" style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 mb-4">
            <Heart className="w-8 h-8 text-[#FFF314] fill-[#FFF314]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">
            {cause ? `${t('donate.header.donateFor', 'Donate for')} ${cause.title}` : t('donate.header.title', 'Make a Donation')}
          </h1>
          {cause && (
            <>
              <p className="text-[#263238]/70 text-sm mt-1">{cause.description}</p>
              <div className="mt-3 max-w-xs mx-auto rounded-xl overflow-hidden shadow-md border border-[#FFF314]/20">
                <img 
                  src={cause.image} 
                  alt={cause.title} 
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.currentTarget.src = '/images/placeholder.jpg')}
                />
              </div>
            </>
          )}
          <p className="text-[#263238]/60 mt-2 max-w-md mx-auto">
            {t('donate.header.subtitle', 'Your support empowers children, families, and communities to build a brighter future.')}
          </p>
        </div>

        {/* Donation Form */}
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
                <IndianRupee className="w-4 h-4 text-[#FFF314]" />
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
                        ? 'bg-[#FFF314] text-[#263238] shadow-lg shadow-[#FFF314]/20'
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
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#FFF314]/20 rounded-lg focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/10 transition-all text-[#263238] placeholder:text-[#263238]/40"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-3">
                <Smartphone className="w-4 h-4 text-[#FFF314]" />
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
                        ? 'bg-[#FFF314] text-[#263238] shadow-lg shadow-[#FFF314]/20'
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
            <div className="bg-[#FFF314]/5 rounded-lg p-4 flex items-start gap-3 border border-[#FFF314]/10">
              <Gift className="w-5 h-5 text-[#FFF314] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#263238]">{t('donate.impact.title', 'Your Impact')}</p>
                <p className="text-xs text-[#263238]/60">
                  {amount && amount >= 5000
                    ? t('donate.impact.high', 'Your donation can educate 5 children for a month')
                    : amount && amount >= 1000
                    ? t('donate.impact.mid', 'Your donation can provide meals to 50 people')
                    : t('donate.impact.low', 'Every contribution makes a difference')}
                  {cause && ` ${t('donate.impact.for', 'for')} ${cause.title}`}
                </p>
              </div>
            </div>

            {/* Donate Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#FFF314] text-[#263238] rounded-lg font-bold text-lg hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
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

            <p className="text-center text-xs text-[#263238]/40">
              {t('donate.form.upiNote', 'You will be redirected to your UPI app to complete the payment.')}
            </p>
          </form>
        </motion.div>

        {/* Bank Transfer Details with HIGHLIGHTED QR Code */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8 border-2 border-[#FFF314]/30 relative overflow-hidden"
        >
          {/* Highlighted Banner */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFF314] via-[#FFD700] to-[#FFF314]"></div>
          
          {/* Glowing Effect */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FFF314]/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#FFF314]/5 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#FFF314]/10 rounded-lg">
                <QrCode className="w-6 h-6 text-[#263238]" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#263238] flex items-center gap-2">
                  {t('donate.bank.title', 'Direct Bank Transfer')}
                  <span className="text-xs bg-[#FFF314] text-[#263238] px-2 py-0.5 rounded-full font-medium animate-pulse">
                    QR Available
                  </span>
                </h2>
                <p className="text-sm text-[#263238]/60">
                  {t('donate.bank.subtitle', 'You can also donate directly to our bank account via NEFT / RTGS / IMPS.')}
                </p>
              </div>
            </div>
            
            {/* Highlighted QR Code Section */}
            <div className="mb-6 bg-gradient-to-r from-[#FFF314]/5 to-[#FFF314]/10 rounded-xl p-4 border-2 border-[#FFF314]/30 shadow-lg shadow-[#FFF314]/10">
              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full flex items-center justify-between gap-2 text-sm font-semibold text-[#263238] hover:text-[#263238]/80 transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-[#FFF314] rounded-lg">
                    <QrCode className="w-5 h-5 text-[#263238]" />
                  </div>
                  <span className="text-base">
                    {showQR ? 'Hide Bank QR Code' : '📱 Scan to Pay with Bank QR'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#FFF314] text-[#263238] px-2 py-1 rounded-full font-medium animate-bounce">
                    NEW
                  </span>
                  {showQR ? (
                    <ChevronUp className="w-5 h-5 text-[#263238]/60 group-hover:text-[#263238] transition" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#263238]/60 group-hover:text-[#263238] transition" />
                  )}
                </div>
              </button>
              
              {showQR && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4 pt-4 border-t border-[#FFF314]/20"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative group bg-white p-4 rounded-xl shadow-lg">
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
                        className="absolute top-2 right-2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors hover:scale-110 transform"
                        title="Copy QR URL"
                      >
                        {qrCopied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-[#263238]" />
                        )}
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-[#263238]/60">
                        <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Scan with any UPI app
                      </div>
                    </div>
                    <p className="text-xs text-[#263238]/40 mt-1">
                      UPI ID: 8818882178.1@hdfc
                    </p>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Bank Account Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-[#263238]/50 text-xs">Bank Name</span>
                <p className="font-semibold text-[#263238]">HDFC Bank</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-[#263238]/50 text-xs">IFSC Code</span>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#263238]">HDFC0003886</p>
                  <button 
                    onClick={() => copyToClipboard('HDFC0003886')}
                    className="text-[#263238]/40 hover:text-[#263238] transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                <span className="text-[#263238]/50 text-xs">Account Number</span>
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#263238]">50200118537529</p>
                  <button 
                    onClick={() => copyToClipboard('50200118537529')}
                    className="text-[#263238]/40 hover:text-[#263238] transition"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg md:col-span-2">
                <span className="text-[#263238]/50 text-xs">Branch Address</span>
                <p className="font-semibold text-[#263238] text-sm">
                  Upper Ground Floor, G-9, HIG Colony, Main Road, Near Police Station, Indore - 452011, Madhya Pradesh
                </p>
              </div>
            </div>
            <div className="mt-4 text-xs text-[#263238]/40 bg-[#FFF314]/5 p-3 rounded-lg border border-[#FFF314]/10">
              <p>💡 After transferring, please email us at <strong className="text-[#263238]">info.growhaz@gmail.com</strong> with your transaction details and name so we can acknowledge your contribution.</p>
            </div>
          </div>
        </motion.div>

        <div className="mt-8 text-center text-sm text-[#263238]/40">
          <p>100% {t('donate.footer.p1', 'of your donation goes directly to our programs.')}</p>
          <p className="mt-1">{t('donate.footer.p2', 'Prayas Samaj Sevi Sanstha is a registered NGO.')}</p>
        </div>
      </div>
    </div>
  )
}
