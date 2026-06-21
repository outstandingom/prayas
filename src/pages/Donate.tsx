// src/pages/Donate.tsx
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'   // <-- new import
import { motion } from 'framer-motion'
import { Heart, CreditCard, Smartphone, Building2, IndianRupee, Gift, Loader2 } from 'lucide-react'

const DONATION_AMOUNTS = [
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1,000' },
  { value: 2500, label: '₹2,500' },
  { value: 5000, label: '₹5,000' },
  { value: 10000, label: '₹10,000' },
]

// Mapping for cause display
const CAUSE_MAP: Record<string, { title: string; description: string }> = {
  food: { title: 'Food Security', description: 'Provide meals to families in need' },
  education: { title: 'Education', description: 'Support quality education for children' },
  health: { title: 'Healthcare', description: 'Fund medical care and health camps' },
  environment: { title: 'Environment', description: 'Help protect our planet' },
  shelter: { title: 'Shelter & Housing', description: 'Provide safe homes for the homeless' },
  water: { title: 'Clean Water', description: 'Ensure access to safe drinking water' },
  animals: { title: 'Animal Welfare', description: 'Care for stray and abandoned animals' },
  community: { title: 'Community Support', description: 'Empower local communities' },
}

export default function Donate() {
  const [searchParams] = useSearchParams()
  const causeParam = searchParams.get('cause') || ''
  const cause = CAUSE_MAP[causeParam] || null

  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [loading, setLoading] = useState(false)

  const amount = customAmount ? parseInt(customAmount) : selectedAmount

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!amount || amount <= 0) {
      alert('Please select or enter a valid donation amount.')
      return
    }

    setLoading(true)
    const upiUrl = `upi://pay?pa=rp7682428@okaxis&pn=Raj%20Parmar&am=${amount}&cu=INR&tn=Payment%20for%20service`
    window.location.href = upiUrl
    setTimeout(() => setLoading(false), 5000)
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
            {cause ? `Donate for ${cause.title}` : 'Make a Donation'}
          </h1>
          {cause && (
            <p className="text-[#263238]/70 text-sm mt-1">{cause.description}</p>
          )}
          <p className="text-[#263238]/60 mt-2 max-w-md mx-auto">
            Your support empowers children, families, and communities to build a brighter future.
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
                Select Amount
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
                  placeholder="Custom amount"
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
                Payment Method
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
                    {method.disabled && <span className="text-[8px] text-gray-400">(coming soon)</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Impact Message */}
            <div className="bg-[#FFF314]/5 rounded-lg p-4 flex items-start gap-3 border border-[#FFF314]/10">
              <Gift className="w-5 h-5 text-[#FFF314] mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#263238]">Your Impact</p>
                <p className="text-xs text-[#263238]/60">
                  {amount && amount >= 5000
                    ? 'Your donation can educate 5 children for a month'
                    : amount && amount >= 1000
                    ? 'Your donation can provide meals to 50 people'
                    : 'Every contribution makes a difference'}
                  {cause && ` for ${cause.title}`}
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
                  Redirecting...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 fill-current" />
                  Donate ₹{amount?.toLocaleString() || '0'}
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#263238]/40">
              You will be redirected to your UPI app to complete the payment.
            </p>
          </form>
        </motion.div>

        <div className="mt-8 text-center text-sm text-[#263238]/40">
          <p>100% of your donation goes directly to our programs.</p>
          <p className="mt-1">Prayas Samaj Sevi Sanstha is a registered NGO.</p>
        </div>
      </div>
    </div>
  )
}
