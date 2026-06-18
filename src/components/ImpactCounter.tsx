// Update these specific parts in ImpactCounter.tsx

// Counter card container
<div ref={ref} className="flex flex-col items-center p-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-[#00897B]/10 relative overflow-hidden group hover:shadow-xl transition-all duration-300 h-full hover-lift">
  <div className="absolute inset-0 bg-gradient-to-br from-[#00897B]/5 to-[#E8F5E9]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  
  {/* Number */}
  <div className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-[#00897B] mb-2 drop-shadow-md relative z-10">
    {count.toLocaleString()}{suffix}
  </div>
  
  {/* Label */}
  <div className="text-[#263238]/80 font-mono text-xs md:text-sm uppercase tracking-widest text-center relative z-10 font-semibold">
    {label}
  </div>
  
  {/* Description */}
  <div className="text-[#263238]/60 text-xs md:text-sm text-center relative z-10 mt-3 leading-relaxed max-w-xs">
    {description}
  </div>
</div>

// Section header badge
<span className="text-[#00897B] font-mono text-xs uppercase tracking-widest font-semibold bg-[#00897B]/10 px-4 py-2 rounded-full inline-block">
  Our Impact in Numbers
</span>

// Title
<h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#263238] mt-4">
  Making a Difference Together
</h2>

// Divider
<div className="w-20 h-1 bg-[#00897B] mx-auto mt-4 rounded-full"></div>

// Description text
<p className="text-[#263238]/60 mt-4 max-w-2xl mx-auto">
  Every number represents a life touched, a community empowered, and hope restored.
</p>

// Bottom decorative line
<div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-[#00897B] to-transparent rounded-full"></div>
