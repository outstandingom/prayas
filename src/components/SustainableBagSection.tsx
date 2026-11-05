import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Recycle, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  MapPin, 
  Handshake, 
  ShieldCheck,
  Scissors
} from 'lucide-react';

const impactStats = [
  {
    icon: Users,
    value: '25+',
    label: 'Rural Women Employed',
    detail: 'Minimum applicable wages & structured livelihood',
    accent: 'from-amber-500 to-yellow-500',
    border: 'border-amber-200/80',
    bg: 'bg-amber-50/70'
  },
  {
    icon: TrendingUp,
    value: '20%',
    label: 'Direct Profit-Sharing',
    detail: 'Distributed among artisans working at the centre',
    accent: 'from-emerald-600 to-green-500',
    border: 'border-emerald-200/80',
    bg: 'bg-emerald-50/70'
  },
  {
    icon: Recycle,
    value: '100%',
    label: 'Industrial Denim Upcycled',
    detail: 'Fresh jeans cutting scrap diverted from landfills',
    accent: 'from-blue-600 to-indigo-600',
    border: 'border-blue-200/80',
    bg: 'bg-blue-50/70'
  },
  {
    icon: MapPin,
    value: 'Simrol',
    label: 'Production Hub, Indore',
    detail: 'Equipped with modern industrial sewing machines',
    accent: 'from-rose-500 to-pink-500',
    border: 'border-rose-200/80',
    bg: 'bg-rose-50/70'
  }
];

const featuredProducts = [
  {
    title: 'Durable School Bags',
    desc: 'Heavy-duty backpacks made from denim waste with reinforced stitching and student-friendly compartments.',
    image: '/images/sustainable-bag/product-backpack-denim.jpg',
    tag: 'School & College',
    tagColor: 'bg-blue-100 text-blue-900 border-blue-200'
  },
  {
    title: 'Protective Tiffin Covers',
    desc: 'Dual-handle insulated lunch bags crafted for daily office and school carry, easily washable.',
    image: '/images/sustainable-bag/product-tiffin-bag.jpg',
    tag: 'Daily Commute',
    tagColor: 'bg-emerald-100 text-emerald-900 border-emerald-200'
  },
  {
    title: 'Stationery / Compass Cases',
    desc: 'Quilted zippered cases providing organized, long-lasting storage for student pens and kits.',
    image: '/images/sustainable-bag/product-pencil-pouch.jpg',
    tag: 'Student Kits',
    tagColor: 'bg-amber-100 text-amber-900 border-amber-200'
  },
  {
    title: 'Eco Planter Sleeves',
    desc: 'Chic desk planters handcrafted with denim scrap and sunflower applique for home and office decor.',
    image: '/images/sustainable-bag/product-plant-holder.jpg',
    tag: 'Eco Decor & Gifting',
    tagColor: 'bg-purple-100 text-purple-900 border-purple-200'
  }
];

export default function SustainableBagSection() {
  return (
    <section 
      id="sustainable-bag-production"
      className="relative w-full bg-white text-[#263238] py-16 sm:py-20 lg:py-24 overflow-hidden border-b border-gray-200/80"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ─── Section Header ─── */}
        <div className="text-center space-y-3 max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-emerald-100 to-blue-100 border border-amber-300/60 shadow-xs text-xs font-mono font-extrabold text-[#263238] uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Flagship Social Enterprise • Circular Economy</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight leading-tight">
            Rural Women Sewing &amp; Sustainable Bag Production
          </h2>

          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 via-emerald-500 to-indigo-600 mx-auto rounded-full shadow-xs" />

          <p className="text-base sm:text-lg text-gray-600 font-sans leading-relaxed pt-2">
            Bridging the gap between discarded industrial denim waste and rural women&apos;s stitching talent — creating durable eco-friendly bags while generating dignified livelihood, industrial skills, and <strong className="text-[#263238] font-semibold">20% direct profit sharing</strong> for rural women artisans in Simrol, Indore.
          </p>
        </div>

        {/* ─── 4 Impact Stat Cards (Bento-style) ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
          {impactStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i}
                className={`relative p-6 rounded-3xl ${stat.bg} border ${stat.border} shadow-sm hover:shadow-md transition-all duration-300 group hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.accent} flex items-center justify-center text-white shadow-md`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight">
                    {stat.value}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#263238] mb-1">
                  {stat.label}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </div>

        {/* ─── Central Showcase: Real Photo Story & Product Line ─── */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-gray-200/90 shadow-xl mb-12 sm:mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Left 6 cols: Authentic Ground Photography & The Core Need */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Real Photo with Badges */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-gray-200 group">
                <img 
                  src="/images/sustainable-bag/women-artisans-team.jpg" 
                  alt="Rural Women Artisans at Simrol Center with Handcrafted Bags"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                {/* Center Location Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#263238] shadow-md border border-gray-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Simrol Centre, Indore (M.P.)</span>
                </div>

                {/* Profit Share Highlight Badge */}
                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-bold shadow-md flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-yellow-300" />
                  <span>20% Profit Shared</span>
                </div>

                {/* Bottom Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm sm:text-base font-bold leading-snug">
                    Women artisans at the Simrol production facility showcasing finished bags
                  </p>
                  <p className="text-xs text-white/80 font-mono mt-0.5">
                    Prayas Samaj Sevi Sanstha • Circular Enterprise
                  </p>
                </div>
              </div>

              {/* Two Challenges, One Solution Box */}
              <div className="bg-gray-50/90 p-5 sm:p-6 rounded-2xl border border-gray-200 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-wider text-amber-800">
                  <Scissors className="w-4 h-4 text-amber-600" />
                  <span>The Core Model: Two Challenges, One Solution</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                    <span className="text-[11px] font-mono font-bold text-rose-700 uppercase block mb-1">
                      Challenge 1: Rural Women
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Possess practical tailoring skills but lack organized employment and regular income.
                    </p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-200/80">
                    <span className="text-[11px] font-mono font-bold text-blue-700 uppercase block mb-1">
                      Challenge 2: Industrial Scrap
                    </span>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Jeans factories generate clean cutting waste discarded rather than utilized productively.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <p className="text-xs sm:text-sm font-medium text-emerald-950 leading-snug">
                    <strong>The Prayas Solution:</strong> Raw denim waste + artisan craftsmanship = sustainable products and direct financial empowerment!
                  </p>
                </div>
              </div>

            </div>

            {/* Right 6 cols: Product Lineup Grid */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-extrabold text-[#263238] tracking-tight">
                    Upcycled Product Collection
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-mono">
                    Useful, reusable everyday essentials from fresh denim waste
                  </p>
                </div>
                <span className="hidden sm:inline-block px-3 py-1 rounded-full bg-gray-100 text-xs font-mono font-bold text-gray-600 border border-gray-200">
                  Zero-Waste
                </span>
              </div>

              {/* 4 Products Mini-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {featuredProducts.map((prod, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl border border-gray-200/90 bg-gray-50/70 hover:bg-white transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-gray-200 bg-white">
                        <img 
                          src={prod.image} 
                          alt={prod.title}
                          className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className={`absolute top-2 left-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${prod.tagColor}`}>
                          {prod.tag}
                        </span>
                      </div>
                      <h4 className="font-bold text-[#263238] text-sm group-hover:text-amber-700 transition-colors">
                        {prod.title}
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed mt-1 font-sans">
                        {prod.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 4-Stage Workflow Pill */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <span className="text-[11px] font-mono font-extrabold uppercase text-gray-500 block mb-2">
                  Simrol 4-Stage Production Chain:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono font-bold text-[#263238]">
                  <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-xs">1. Cutting</div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-xs">2. Stitching</div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-xs">3. QC Check</div>
                  <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-xs">4. Packing</div>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ─── Bottom Highlight Banner & Direct Redirection CTA ─── */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#263238] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden border border-gray-700/50">
          
          {/* Subtle Ambient Decorative Gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Left Narrative */}
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F5B800] uppercase tracking-wider font-extrabold">
                <ShieldCheck className="w-4 h-4" />
                <span>Ready for Corporate CSR Partnerships &amp; Bulk Procurement</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
                Empower Rural Women Artisans Through Sustainable Bags
              </h3>

              <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed">
                Explore our full collection of handcrafted bags, artisan stories, CSR credentials (12A, 80G, CSR-1, NITI Aayog), and partner with our Simrol production centre.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-gray-300">
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> NITI Aayog Darpan
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 12A &amp; 80G Tax-Exempt
                </span>
                <span className="flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> CSR-1 Certified
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3.5 shrink-0 pt-2 lg:pt-0">
              
              {/* PRIMARY ACTION BUTTON */}
              <Link
                to="/sustainable-bag-production"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full text-base font-extrabold bg-[#F5B800] hover:bg-[#E5AA00] text-[#263238] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-amber-400/40 text-center"
              >
                <span>Explore Full Initiative</span>
                <ArrowRight className="w-5 h-5 text-[#263238]" />
              </Link>

              {/* SECONDARY PARTNER/INQUIRY BUTTON */}
              <Link
                to="/contact?subject=Sustainable%20Bag%20CSR%20%26%20Bulk%20Inquiry"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 text-center"
              >
                <Handshake className="w-4 h-4 text-amber-400" />
                <span>Partner / CSR Inquiry</span>
              </Link>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

