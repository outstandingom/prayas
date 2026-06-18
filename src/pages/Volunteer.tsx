// Update these specific parts in Volunteer.tsx

// Success icon
<div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00897B]/10 text-[#00897B] mb-4">
  <CheckCircle className="w-8 h-8" />
</div>

// Form container
<div className="w-full max-w-2xl bg-white/80 backdrop-blur-sm border border-[#00897B]/15 rounded-xl p-6 md:p-8 shadow-lg">

// Badge
<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00897B]/30 bg-[#E8F5E9] mb-4">
  <Heart className="w-4 h-4 text-[#00897B]" />
  <span className="text-sm font-medium text-[#00897B]">Join Our Mission</span>
</div>

// Title
<h1 className="text-2xl font-bold text-[#263238]">Volunteer Registration</h1>

// Description
<p className="text-[#263238]/60 text-sm mt-1">
  Fill in your details and we'll connect with you.
</p>

// Input fields - add input-focus class
<input
  type="text"
  name="full_name"
  value={formData.full_name}
  onChange={handleChange}
  required
  className="w-full bg-white/80 border border-[#00897B]/15 rounded-lg px-4 py-2.5 input-focus text-[#263238] placeholder:text-[#263238]/40"
/>

// Submit button
<button
  type="submit"
  disabled={loading}
  className="w-full py-3 bg
