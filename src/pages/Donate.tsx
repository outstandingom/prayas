// src/pages/Donate.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, CheckCircle, CreditCard, Smartphone, Building2, IndianRupee, Gift } from 'lucide-react'

const DONATION_AMOUNTS = [
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1,000' },
  { value: 2500, label: '₹2,500' },
  { value: 5000, label: '₹5,000' },
  { value: 10000, label: '₹10,000' },
]

export default function Donate() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [success, setSuccess] = useState(false)

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }

  const amount = customAmount ? parseInt(customAmount) : selectedAmount

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#FFF314]/10 mb-6"
          >
            <CheckCircle className="w-10 h-10 text-[#FFF314]" />
          </motion.div>
          <h2 className="text-2xl font-bold text-[#263238] mb-2">Thank You! ❤️</h2>
          <p className="text-[#263238]/60 mb-2">
            Your generous donation of <strong>₹{amount?.toLocaleString()}</strong> will help change lives.
          </p>
          <p className="text-sm text-[#263238]/40 mb-6">
            You will receive a confirmation email shortly.
          </p>
          <a
            href="/"
            className="inline-block px-6 py-2.5 bg-[#FFF314] text-[#263238] rounded-lg font-medium hover:bg-[#FFF314]/90 transition-colors"
          >
            Return Home
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FFF314]/10 mb-4">
            <Heart className="w-8 h-8 text-[#FFF314] fill-[#FFF314]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#263238]">Make a Donation</h1>
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
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
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
                <CreditCard className="w-4 h-4 text-[#FFF314]" />
                Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'netbanking', label: 'Net Banking', icon: Building2 },
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all ${
                      paymentMethod === method.id
                        ? 'bg-[#FFF314] text-[#263238] shadow-lg shadow-[#FFF314]/20'
                        : 'bg-gray-100 text-[#263238] hover:bg-[#FFF314]/10'
                    }`}
                  >
                    <method.icon className="w-5 h-5" />
                    <span className="text-xs font-medium">{method.label}</span>
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
                </p>
              </div>
            </div>

            {/* Donate Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#FFF314] text-[#263238] rounded-lg font-bold text-lg hover:bg-[#FFF314]/90 transition-all shadow-lg shadow-[#FFF314]/20 flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5 fill-current" />
              Donate ₹{amount?.toLocaleString() || '0'}
            </button>

            <p className="text-center text-xs text-[#263238]/40">
              Secured by SSL encryption. Your data is safe.
            </p>
          </form>
        </motion.div>

        {/* Extra Info */}
        <div className="mt-8 text-center text-sm text-[#263238]/40">
          <p>100% of your donation goes directly to our programs.</p>
          <p className="mt-1">Prayas Samaj Sevi Sanstha is a registered NGO (Registration No. XYZ123).</p>
        </div>
      </div>
    </div>
  )
}
