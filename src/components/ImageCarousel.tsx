// Update these specific parts in ImageCarousel.tsx

// Section container
<div className="relative py-16 sm:py-24 md:py-32 bg-[#E8F5E9]/50 border-y border-[#00897B]/5 overflow-hidden select-none">

// Section header badge
<span className="text-[#00897B] font-mono text-[10px] sm:text-xs uppercase tracking-widest font-semibold">
  Our Reach
</span>

// Title
<h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-4 text-[#263238] px-2">
  Explore Our Core Sectors
</h2>

// Navigation buttons
<button
  onClick={toPrev}
  className="p-2 sm:p-3 rounded-full glass hover:bg-[#00897B] hover:text-white transition-all cursor-pointer touch-manipulation"
  aria-label="Previous slide"
>
  <ChevronLeft size={20} />
</button>

<button
  onClick={() => setIsPaused(!isPaused)}
  className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-[#263238]/5 hover:bg-[#263238]/10 border border-[#263238]/10 transition-colors text-[#00897B] touch-manipulation"
  aria-label={isPaused ? "Play" : "Pause"}
>
  {isPaused ? <Play size={16} className="ml-0.5 sm:ml-1" /> : <Pause size={16} />}
</button>

<button
  onClick={toNext}
  className="p-2 sm:p-3 rounded-full glass hover:bg-[#00897B] hover:text-white transition-all cursor-pointer touch-manipulation"
  aria-label="Next slide"
>
  <ChevronRight size={20} />
</button>

// Card image border
<div
  className="relative rounded-2xl shadow-xl border border-[#00897B]/10 overflow-hidden bg-[#263238]/5"
  style={{ width: cardWidth, height: cardHeight }}
>

// Card title badge
<motion.div
  className="text-xs sm:text-sm font-medium text-[#00897B] whitespace-nowrap bg-[#263238]/95 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#263238]/20 pointer-events-none shadow-sm"
  style={{ maxWidth: cardWidth + 20, overflow: 'hidden', textOverflow: 'ellipsis' }}
>
  {item.title}
</motion.div>
