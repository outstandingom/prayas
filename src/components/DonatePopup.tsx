// src/components/DonatePopup.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, CheckCircle, CreditCard, Smartphone, Building2, IndianRupee, Gift } from 'lucide-react'

interface DonatePopupProps {
  isOpen: boolean
  onClose: () => void
}

const DONATION_AMOUNTS = [
  { value: 500, label: '₹500' },
  { value: 1000, label: '₹1,000' },
  { value: 2500, label: '₹2,500' },
  { value: 5000, label: '₹5,000' },
  { value: 10000, label: '₹10,000' },
]

export default function DonatePopup({ isOpen, onClose }: DonatePopupProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(1000)
  const [customAmount, setCustomAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [success, setSuccess] = useState(false)

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }

  const amount = customAmount ? parseInt(customAmount) : selectedAmount

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors z-50"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>

            {success ? (
              <div className="p-8 text-center">
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onClose()
                  }}
                  className="px-6 py-2.5 bg-[#FFF314] text-[#263238] rounded-lg font-medium hover:bg-[#FFF314]/90 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                {/* Header with Children Image */}
                <div className="relative h-48 rounded-t-2xl overflow-hidden">
                  <img
                    src="/IMG-20.JPG"
                    alt="Children smiling"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-[#FFF314]" />
                      <div>
                        <h2 className="text-xl font-bold text-white">Make a Donation</h2>
                        <p className="text-white/80 text-sm">Your support changes lives</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleDonate} className="p-6 space-y-5">
                  {/* Amount Selection */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#263238] mb-3">
                      <IndianRupee className="w-4 h-4 text-[#FFF314]" />
                      Select Amount
                    </label>
                    <div className="grid grid-cols-3 gap-2 mb-3">
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
                    <Heart className="w-5 h-5" />
                    Donate ₹{amount?.toLocaleString() || '0'}
                  </button>

                  <p className="text-center text-xs text-[#263238]/40">
                    Secured by SSL encryption. Your data is safe.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
