import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Recycle,
  Users,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle2,
  Download,
  Scissors,
  Package,
  Layers,
  ShieldCheck,
  Building2,
  FileCheck2,
  Eye,
  Send,
  Heart,
  HelpCircle,
  X,
  Factory
} from 'lucide-react';

// Product Catalog Data
const products = [
  {
    id: 'backpack-denim',
    category: 'school-bags',
    categoryName: 'School Bags & Backpacks',
    title: 'Navy Denim Pinstripe Backpack',
    subtitle: 'Heavy-duty student backpack made from upcycled jeans cutting waste',
    image: '/images/sustainable-bag/product-backpack-denim.jpg',
    features: [
      'Reinforced high-tensile denim construction',
      'Dual padded adjustable shoulder straps',
      'Spacious main zip chamber + front utility pocket',
      'Durable smooth brass zipper sliders',
      'Machine washable & eco-friendly'
    ],
    material: '100% Repurposed Denim Cutting Scrap',
    idealFor: 'School, college students, daily commuters',
    badge: 'Bestseller'
  },
  {
    id: 'backpack-maroon',
    category: 'school-bags',
    categoryName: 'School Bags & Backpacks',
    title: 'Plum Maroon Canvas & Denim Backpack',
    subtitle: 'Ergonomic multi-compartment daypack with contrast zip detailing',
    image: '/images/sustainable-bag/product-backpack-maroon.jpg',
    features: [
      'High-grade upcycled fabric panels',
      'Heavy-load tested top grab handle',
      'Water-repellent interior lining',
      'Generous book & lunch box capacity',
      'Long-lasting double stitch reinforcement'
    ],
    material: 'Upcycled Denim & Industrial Fabric',
    idealFor: 'School children & teenagers',
    badge: 'Popular'
  },
  {
    id: 'backpack-lightblue',
    category: 'school-bags',
    categoryName: 'School Bags & Backpacks',
    title: 'Sky Blue Curved Artisan Backpack',
    subtitle: 'Sleek curved-top backpack designed for lightweight comfort',
    image: '/images/sustainable-bag/product-backpack-lightblue.jpg',
    features: [
      'Curved zipper opening for fast access',
      'Reinforced bottom panel for abrasion resistance',
      'Breathable back panel padding',
      'Side loop for water bottle or keychain'
    ],
    material: 'Upcycled Denim Waste',
    idealFor: 'Coaching, tuition, everyday travel',
    badge: 'New Style'
  },
  {
    id: 'backpack-grey',
    category: 'school-bags',
    categoryName: 'School Bags & Backpacks',
    title: 'Steel Grey Urban Daypack',
    subtitle: 'Minimalist neutral tone backpack suitable for office and students',
    image: '/images/sustainable-bag/product-backpack-grey.jpg',
    features: [
      'Clean aesthetic matching corporate gifting needs',
      'Padded internal partition for 13-inch laptop/tablet',
      'Heavy-duty nylon threads at stress points',
      'Compact footprint with high storage density'
    ],
    material: 'Recycled Grey Denim & Industrial Fabric',
    idealFor: 'Office goers, students, field volunteers',
    badge: 'Eco Classic'
  },
  {
    id: 'tiffin-slate',
    category: 'tiffin-covers',
    categoryName: 'Tiffin & Lunch Bags',
    title: 'Insulated Slate Denim Lunch Tote',
    subtitle: 'Rugged protective lunch and tiffin carrier with dual carrying handles',
    image: '/images/sustainable-bag/product-tiffin-bag.jpg',
    features: [
      'Spacious base accommodates 3-tier round or flat lunchboxes',
      'Dual reinforced carry webbing handles',
      'Full top zipper keeps containers secure and upright',
      'Easily washable denim fabric resists food stains'
    ],
    material: 'Industrial Denim Fabric Waste',
    idealFor: 'Office workers, school students, daily carry',
    badge: 'Daily Essential'
  },
  {
    id: 'pencil-pouch-quilted',
    category: 'pouches',
    categoryName: 'Stationery & Organizer Pouches',
    title: 'Quilted Compass & Stationery Pouch',
    subtitle: 'Diamond-stitched long pouch for pens, geometry kits, and student tools',
    image: '/images/sustainable-bag/product-pencil-pouch.jpg',
    features: [
      'Artisanal diamond lattice contrast stitching',
      'Fits 30cm rulers, pens, markers, and compass sets',
      'Sturdy full-length zipper with puller tab',
      'Zero plastic lining — 100% textile construction'
    ],
    material: 'Upcycled Denim Waste',
    idealFor: 'School kits, stationery, cosmetic brushes',
    badge: 'Student Kit'
  },
  {
    id: 'planter-holder',
    category: 'pouches',
    categoryName: 'Stationery & Organizer Pouches',
    title: 'Upcycled Denim Tabletop Planter Sleeve',
    subtitle: 'Chic eco planter sleeve with sunflower applique and hanging handle',
    image: '/images/sustainable-bag/product-plant-holder.jpg',
    features: [
      'Handcrafted sunflower applique from scrap fabrics',
      'Sturdy carry loop for wall hanging or desk placement',
      'Fits standard 4 to 6-inch indoor plant nursery pots',
      'Eco-friendly alternative to plastic flower pots'
    ],
    material: 'Upcycled Denim & Colored Fabric Scrap',
    idealFor: 'Home decor, green corporate gifts, desk planters',
    badge: 'Green Living'
  },
  {
    id: 'organizer-pouch-beige',
    category: 'pouches',
    categoryName: 'Stationery & Organizer Pouches',
    title: 'Multi-Utility Travel & Desk Cube Pouch',
    subtitle: 'Boxy zippered pouch for charging cables, cosmetics, and toiletries',
    image: '/images/sustainable-bag/product-organizer-pouch.jpg',
    features: [
      'Structured rectangular silhouette prevents crushing contents',
      'Smooth heavy-duty zip with oversized slider',
      'Compact size slips easily into backpacks or luggage',
      'Washable and long-lasting fabric structure'
    ],
    material: 'Heavy Cotton Denim & Industrial Fabric',
    idealFor: 'Travel accessories, medicines, grooming items',
    badge: 'Organizer'
  }
];

// Production Stages
const productionStages = [
  {
    step: '01',
    title: 'Cutting & Preparation',
    desc: 'Sorting fresh industrial denim scrap, sorting by thickness and shade, and precision cutting using reusable master patterns.',
    icon: Scissors,
    color: 'from-amber-500 to-yellow-500',
    border: 'border-amber-200'
  },
  {
    step: '02',
    title: 'Stitching & Assembly',
    desc: 'Industrial sewing machines handle structural joins, edge piping, zipper insertion, and reinforced weight-bearing straps.',
    icon: Factory,
    color: 'from-blue-600 to-indigo-600',
    border: 'border-blue-200'
  },
  {
    step: '03',
    title: 'Finishing & Quality Checking',
    desc: 'Thorough inspection of every seam, stress point tensile test, zip smoothness verification, and careful thread trimming.',
    icon: ShieldCheck,
    color: 'from-emerald-600 to-green-500',
    border: 'border-emerald-200'
  },
  {
    step: '04',
    title: 'Packing & Production Handling',
    desc: 'Zero-plastic eco-tagging, batch documentation, inventory logging, and packaging ready for distribution or client shipment.',
    icon: Package,
    color: 'from-purple-600 to-pink-600',
    border: 'border-purple-200'
  }
];

// 5 Pillars Integration
const pillars = [
  {
    title: 'Rural Development',
    desc: 'Grassroots programmes for underserved communities in and around Simrol, Indore.',
    active: true
  },
  {
    title: 'Women Empowerment & Livelihood',
    desc: 'Skill-based income opportunities, regular employment, and direct profit sharing for rural women.',
    active: true
  },
  {
    title: 'Education & Skill Development',
    desc: 'Practical vocational training in industrial sewing, cutting, quality checking, and management.',
    active: true
  },
  {
    title: 'Health & Social Welfare',
    desc: 'Community health, safety measures, social support, and financial literacy at the centre.',
    active: false
  },
  {
    title: 'Environment & Sustainability',
    desc: 'Diverting fresh industrial denim waste from burning and landfills into reusable eco-friendly bags.',
    active: true
  }
];

// Credentials
const credentials = [
  {
    name: 'NITI Aayog Darpan Registration',
    desc: 'Institutional identity as a recognized non-profit organization with the Government of India.',
    tag: 'Govt. Verified'
  },
  {
    name: '12A Registration',
    desc: 'Tax-exempt status under Section 12A of the Income Tax Act for eligible non-profit charitable activities.',
    tag: 'Tax-Exempt'
  },
  {
    name: '80G Registration',
    desc: 'Enables individual and corporate donors to claim applicable tax exemptions on their contributions.',
    tag: 'Tax Benefits for Donors'
  },
  {
    name: 'CSR-1 Registration',
    desc: 'Registered with the Ministry of Corporate Affairs (MCA) for executing official CSR grant projects.',
    tag: 'MCA Approved'
  },
  {
    name: 'All Applicable Statutory Compliances',
    desc: 'Transparent annual filings, regular financial audits, and governance standards diligently met.',
    tag: '100% Compliant'
  }
];

// Partnership Options
const partnershipTracks = [
  {
    title: 'CSR Partnerships',
    desc: 'Partner with Prayas through your Corporate Social Responsibility mandate to sponsor machines, skill training cohorts, and center expansion.',
    icon: Building2
  },
  {
    title: 'Corporate Collaborations',
    desc: 'Bulk order eco-friendly sustainable denim bags for employee welcome kits, conferences, workshops, and festive gifting.',
    icon: Package
  },
  {
    title: 'Institutional Support',
    desc: 'Schools, colleges, and NGOs collaborate to replace plastic school bags with long-lasting upcycled denim bags for students.',
    icon: FileCheck2
  },
  {
    title: 'Eligible Grants & Funding',
    desc: 'Funding foundations and impact investors back our circular economy model and women empowerment enterprise.',
    icon: TrendingUp
  },
  {
    title: 'Donor Partnerships',
    desc: 'Individual philanthropists contribute to provide equipment stipends, healthcare benefits, and capital support for rural artisans.',
    icon: Heart
  }
];

// Gallery Images
const galleryImages = [
  {
    src: '/images/sustainable-bag/women-artisans-team.jpg',
    title: 'Our Women Artisan Team at Simrol Centre',
    caption: '25 rural women working together with dignity, skilled production, and pride'
  },
  {
    src: '/images/sustainable-bag/workshop-collection.jpg',
    title: 'Simrol Workshop & Jack Sewing Workstations',
    caption: 'Modern industrial sewing machines, batch quality checking, and finished products'
  },
  {
    src: '/images/sustainable-bag/bags-display-1.jpg',
    title: 'Finished Product Showcase',
    caption: 'Durable school backpacks, multi-purpose totes, and zippered tiffin bags'
  },
  {
    src: '/images/sustainable-bag/bags-display-2.jpg',
    title: 'Batch Production Ready for Dispatch',
    caption: 'Various colorways and patterns assembled entirely from fresh denim cutting scrap'
  },
  {
    src: '/images/sustainable-bag/product-plant-holder.jpg',
    title: 'Eco Planter Holder Detail',
    caption: 'Sunflower motif handcrafted with scrap fabrics on upcycled denim sleeve'
  },
  {
    src: '/images/sustainable-bag/product-pencil-pouch.jpg',
    title: 'Diamond Quilted Stationery Pouches',
    caption: 'High-density quilted construction ensuring rugged student utility'
  }
];

export default function SustainableBagProduction() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  // Form states
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    inquiryType: 'Bulk Bag Order',
    quantity: '50 - 100 units',
    message: ''
  });

  const nameInputId = useId();
  const orgInputId = useId();
  const emailInputId = useId();
  const phoneInputId = useId();
  const typeInputId = useId();
  const qtyInputId = useId();
  const msgInputId = useId();

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="w-full bg-[#FAF9F6] text-[#263238] font-sans min-h-screen pt-20">
      
      {/* ─── Top Breadcrumbs ─── */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center gap-2 text-xs font-mono text-gray-500 overflow-x-auto">
          <Link to="/" className="hover:text-amber-600 transition-colors shrink-0">Home</Link>
          <span>/</span>
          <Link to="/our-work" className="hover:text-amber-600 transition-colors shrink-0">What We Do</Link>
          <span>/</span>
          <span className="text-[#263238] font-bold shrink-0">Sustainable Bag Production</span>
        </div>
      </div>

      {/* ─── Hero Section (Slide 1 & 2) ─── */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 lg:py-20 border-b border-gray-200">
        {/* Ambient background accents */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-200/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-200/25 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-300 text-xs font-mono font-extrabold text-amber-900 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>PRAYAS SAMAJ SEVI SANSTHA • SOCIAL ENTERPRISE</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-[#263238] tracking-tight leading-[1.12]">
                Rural Women Sewing &amp; Sustainable Bag Production
              </h1>

              <div className="flex items-center gap-3">
                <div className="w-20 h-1.5 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full" />
                <span className="text-sm font-mono font-bold text-emerald-800 uppercase tracking-widest">
                  Through Upcycling of Industrial Waste
                </span>
              </div>

              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-sans">
                A pioneering social enterprise initiative by <strong>Prayas Samaj Sevi Sanstha</strong> based in <strong className="text-gray-900">Simrol, Indore (Madhya Pradesh)</strong>. We transform discarded fresh jeans manufacturing cutting scrap into premium, durable school bags, tiffin covers, and multi-purpose kits while creating structured employment, industrial skill training, and <span className="bg-emerald-100 text-emerald-900 font-bold px-2 py-0.5 rounded-md">20% direct profit sharing</span> for rural women artisans.
              </p>

              {/* Slide 2 Callout Quote */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 border border-amber-200/80">
                <p className="text-sm font-semibold text-[#263238] leading-relaxed flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Unified Vision:</strong> This project brings together <em>Women Empowerment, Livelihood, Skill Development, and Environment &amp; Sustainability</em> — all in one self-sustaining social initiative.
                  </span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#products-catalog"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-extrabold bg-[#F5B800] hover:bg-[#E5AA00] text-[#263238] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Eye className="w-4 h-4" />
                  <span>Explore Product Catalog</span>
                </a>

                <a
                  href="#inquiry-form"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold bg-[#263238] hover:bg-gray-800 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span>Bulk Order / CSR Inquiry</span>
                </a>

                <a
                  href="/document/Prayas_Rural-Women-Sewing-and-Sustainable-Bag-Production.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full text-xs font-mono font-bold bg-white text-gray-700 hover:text-[#263238] border border-gray-300 hover:border-gray-400 shadow-xs transition-all hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  <span>Download Presentation PDF (1.4MB)</span>
                </a>
              </div>

            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                <img 
                  src="/images/sustainable-bag/women-artisans-team.jpg" 
                  alt="Rural Women Artisans holding handmade upcycled bags"
                  className="w-full h-[380px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badges on Hero Image */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#263238] shadow-md flex items-center gap-1.5 border border-gray-100">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  <span>Simrol Center, Indore</span>
                </div>

                <div className="absolute top-4 right-4 bg-emerald-600 text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-bold shadow-md flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-yellow-300" />
                  <span>20% Profit Shared</span>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-base font-bold leading-snug">
                    Simrol Rural Women Artisan Collective
                  </p>
                  <p className="text-xs text-white/80 font-mono mt-0.5">
                    Industrial sewing, pattern cutting, and quality control
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ─── 4 Quick Impact Numbers ─── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            
            <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-gray-200 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#263238] mb-1">
                25+
              </div>
              <div className="text-xs sm:text-sm font-bold text-gray-700">Rural Women Employed</div>
              <div className="text-[11px] text-gray-500 font-mono mt-0.5">Minimum applicable wages</div>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-800 mb-1">
                20%
              </div>
              <div className="text-xs sm:text-sm font-bold text-emerald-950">Direct Profit-Sharing</div>
              <div className="text-[11px] text-emerald-700 font-mono mt-0.5">Shared directly with artisans</div>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-800 mb-1">
                100%
              </div>
              <div className="text-xs sm:text-sm font-bold text-blue-950">Industrial Scrap Repurposed</div>
              <div className="text-[11px] text-blue-700 font-mono mt-0.5">Diverted from landfills</div>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 text-center">
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-800 mb-1">
                4-Stage
              </div>
              <div className="text-xs sm:text-sm font-bold text-amber-950">Production Workflow</div>
              <div className="text-[11px] text-amber-700 font-mono mt-0.5">Cutting, stitching, QC &amp; pack</div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 5-Pillar Synergy Showcase (Slide 2) ─── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-amber-800 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ORGANIZATIONAL FOUNDATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#263238] tracking-tight">
            How This Project Fits Into Prayas&apos; Core Pillars
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto rounded-full my-3" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Prayas Samaj Sevi Sanstha operates across five transformative social pillars. This sustainable bag initiative strategically unites four key domains into a single high-impact social enterprise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {pillars.map((pil, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                pil.active 
                  ? 'bg-white border-amber-300 shadow-sm hover:shadow-md ring-1 ring-amber-400/20' 
                  : 'bg-gray-50 border-gray-200 opacity-80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-gray-500">0{idx + 1}</span>
                  {pil.active && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Active In Project
                    </span>
                  )}
                </div>
                <h3 className="text-base font-bold text-[#263238] mb-2 leading-snug">
                  {pil.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── The Need: Two Challenges, One Circular Solution (Slide 3 & 7) ─── */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-extrabold text-rose-700 uppercase tracking-widest block mb-2">
              THE NEED &amp; THE INNOVATION
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
              Two Critical Challenges, One Circular Solution
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 mx-auto rounded-full my-3" />
            <p className="text-sm sm:text-base text-gray-600">
              The project bridges two pervasive social and environmental gaps into a mutually reinforcing social enterprise model.
            </p>
          </div>

          {/* Two Challenges Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-12">
            
            {/* Challenge 1 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-50/70 to-pink-50/40 border border-rose-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  01
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider block">
                    Socio-Economic Challenge
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#263238]">
                    Challenge 1 — Rural Women
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                Rural women possess natural, practical stitching and tailoring skills honed at home, but face limited access to <strong>organised employment</strong>, modern production infrastructure, capital equipment, and sustainable, predictable income opportunities.
              </p>
              <div className="mt-4 pt-4 border-t border-rose-200/80 flex items-center gap-2 text-xs font-mono text-rose-800">
                <HelpCircle className="w-4 h-4 text-rose-600" />
                <span>Result: Unutilized talent &amp; economic vulnerability</span>
              </div>
            </div>

            {/* Challenge 2 */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-blue-50/70 to-indigo-50/40 border border-blue-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                  02
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider block">
                    Environmental Challenge
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#263238]">
                    Challenge 2 — Industrial Waste
                  </h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-sans">
                Jeans manufacturing and garment factories generate thousands of kilograms of <strong>fresh denim cutting waste</strong> during everyday production — a premium, high-strength textile resource that is currently discarded or burned rather than utilised productively.
              </p>
              <div className="mt-4 pt-4 border-t border-blue-200/80 flex items-center gap-2 text-xs font-mono text-blue-800">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span>Result: Environmental burden &amp; discarded resource</span>
              </div>
            </div>

          </div>

          {/* The Prayas Circular Flow (Slide 3 & 7 Diamond) */}
          <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-[#FAF9F6] border border-gray-200/90 shadow-lg">
            <div className="text-center mb-8">
              <span className="text-xs font-mono font-extrabold text-emerald-700 uppercase tracking-widest block mb-1">
                CIRCULAR UTILISATION OF INDUSTRIAL RESOURCES
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238]">
                The Solution: 4-Point Social Enterprise Model
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                    <Factory className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#263238] mb-1">1. Industrial Resource</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Collect fresh denim cutting waste directly from jeans manufacturing factories.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-mono text-blue-700 font-bold">
                  Zero Virgin Raw Material
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                    <Scissors className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#263238] mb-1">2. Rural Skill</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Train rural women in industrial cutting, precision stitching, and finish engineering.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-mono text-amber-700 font-bold">
                  Empowering 25+ Women
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                    <Package className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#263238] mb-1">3. Sustainable Product</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Produce durable bags, tiffin covers, pencil cases, and planter sleeves.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-mono text-emerald-700 font-bold">
                  Long-lasting Quality
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-xs text-center flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 mx-auto rounded-full bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-[#263238] mb-1">4. Social Value</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Create regular livelihoods, 20% profit sharing, and measurable circular economy impact.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100 text-[11px] font-mono text-purple-700 font-bold">
                  Financial Independence
                </div>
              </div>

            </div>

            {/* Slide 7 Quote Banner */}
            <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center shadow-md">
              <p className="text-sm sm:text-base font-bold">
                &ldquo;A practical model of social enterprise — rural livelihood generation through circular utilisation of industrial resources.&rdquo;
              </p>
              <p className="text-xs text-emerald-200 font-mono mt-1">
                PRAYAS SAMAJ SEVI SANSTHA • SIMROL CENTRE
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ─── Products & Production Infrastructure (Slide 4, 9, 10) ─── */}
      <section id="products-catalog" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-extrabold text-amber-800 uppercase tracking-widest block mb-2">
            PRODUCTS &amp; INFRASTRUCTURE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
            Initial Product Categories
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full my-3" />
          <p className="text-sm sm:text-base text-gray-600">
            Useful, reusable products created from suitable fresh industrial denim cutting waste.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'school-bags', label: 'School Bags & Backpacks' },
            { id: 'tiffin-covers', label: 'Tiffin & Lunch Bags' },
            { id: 'pouches', label: 'Pouches & Planters' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold font-mono transition-all cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-[#263238] text-[#FFF314] shadow-md scale-105'
                  : 'bg-white text-gray-600 hover:text-[#263238] border border-gray-200 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {filteredProducts.map((prod) => (
            <div 
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Product Image Frame */}
                <div 
                  className="relative aspect-[4/3] bg-gray-50 overflow-hidden cursor-pointer p-3 border-b border-gray-100"
                  onClick={() => setActiveModalImage({ src: prod.image, title: prod.title, caption: prod.subtitle })}
                >
                  <img 
                    src={prod.image} 
                    alt={prod.title}
                    className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500"
                  />
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md bg-amber-100 text-amber-900 border border-amber-200 shadow-xs">
                    {prod.badge}
                  </span>

                  {/* Zoom hint icon */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-mono font-bold text-gray-400 uppercase tracking-wider block">
                    {prod.categoryName}
                  </span>

                  <h3 className="text-lg font-bold text-[#263238] group-hover:text-amber-800 transition-colors leading-snug">
                    {prod.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {prod.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-gray-100">
                    {prod.features.slice(0, 3).map((feat, fidx) => (
                      <div key={fidx} className="flex items-start gap-1.5 text-xs text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-gray-500 font-semibold truncate max-w-[140px]">
                  {prod.material}
                </span>
                <a
                  href="#inquiry-form"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      inquiryType: 'Bulk Bag Order',
                      message: `Inquiry regarding: ${prod.title}`
                    }));
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-amber-800 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Infrastructure Highlights */}
        <div className="bg-gradient-to-br from-[#263238] to-[#1E293B] text-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono text-[#F5B800] uppercase tracking-widest font-extrabold block">
                PRODUCTION INFRASTRUCTURE AT SIMROL
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Equipped for Commercial Grade Durability &amp; Scale
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                The Simrol centre is not just an artisanal workshop — it is a fully organized, structured production floor equipped with heavy-duty <strong>Jack industrial sewing machines</strong>, automated edge trimmers, precision pattern cutters, and quality assurance stations.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-gray-200">
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Jack Industrial Stitching Machines</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Stress-Tested Weight Carrying Capacity</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Heavy Gauge Brass / Nylon Runners</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 p-2.5 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Multi-layer Seam Binding Techniques</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div 
                className="relative rounded-2xl overflow-hidden shadow-lg border border-white/20 cursor-pointer group"
                onClick={() => setActiveModalImage({ 
                  src: '/images/sustainable-bag/workshop-collection.jpg', 
                  title: 'Simrol Centre Jack Sewing Machines & Production Line', 
                  caption: 'Industrial equipment and batch assembly workstations at the Simrol centre' 
                })}
              >
                <img 
                  src="/images/sustainable-bag/workshop-collection.jpg" 
                  alt="Industrial sewing machine and finished bags collection"
                  className="w-full h-[260px] sm:h-[300px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono">
                  <span className="font-bold block">Simrol Centre Workshop Floor</span>
                  <span className="text-white/80 text-[11px]">Click to view full photo</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ─── Women Employment & Production Workflow (Slide 5) ─── */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-extrabold text-amber-800 uppercase tracking-widest block mb-2">
              LIVELIHOOD &amp; EMPOWERMENT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
              Women Employment &amp; Livelihood
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-base text-gray-600">
              Creating structured, dignifying livelihood opportunities for rural women in Simrol.
            </p>
          </div>

          {/* Key Callout Banner (Slide 5 highlighted box) */}
          <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-bold">
                <TrendingUp className="w-4 h-4 text-yellow-300" />
                <span>DIRECT FINANCIAL EMPOWERMENT</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold leading-tight">
                20% of Profit Generated by the Centre is Distributed Among the Women Working at the Centre
              </h3>
              <p className="text-sm text-emerald-100 font-sans leading-relaxed">
                Beyond regular guaranteed wages, our profit-sharing mechanism ensures that every woman artisan holds a direct financial stake in the centre&apos;s growth and commercial success.
              </p>
            </div>

            <div className="shrink-0 p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
              <span className="text-4xl sm:text-5xl font-extrabold text-yellow-300 block">
                20%
              </span>
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Profit Share
              </span>
            </div>
          </div>

          {/* 3 Core Pillars of Employment */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            
            <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#263238] mb-2">Minimum Applicable Wages</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                All participating women receive guaranteed, fair minimum applicable wages, ensuring steady monthly family income without dependency on seasonal farm labor.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-4">
                <Scissors className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#263238] mb-2">Industrial Skill Development</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                Continuous training in heavy-duty industrial stitching, pattern laying, fabric cutting, zipper engineering, and rigorous multi-stage quality control.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FAF9F6] border border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-[#263238] mb-2">Regular, Structured Work</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-sans">
                Work at the Simrol centre provides a safe, respectful, hygienic, and collaborative workspace close to the women&apos;s homes and villages.
              </p>
            </div>

          </div>

          {/* 4 Production Stages (Slide 5 Workflow) */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono font-extrabold text-gray-500 uppercase tracking-widest block mb-1">
              THE 4 STAGES OF PRODUCTION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#263238]">
              From Denim Scraps to Finished Masterpieces
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productionStages.map((stg) => {
              const Icon = stg.icon;
              return (
                <div 
                  key={stg.step}
                  className={`p-6 rounded-3xl bg-[#FAF9F6] border ${stg.border} shadow-xs hover:shadow-md transition-all duration-300 relative group`}
                >
                  <span className="text-4xl font-extrabold text-gray-200 group-hover:text-amber-200 transition-colors absolute top-4 right-4">
                    {stg.step}
                  </span>
                  
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stg.color} text-white flex items-center justify-center shadow-md mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h4 className="text-lg font-bold text-[#263238] mb-2">
                    {stg.title}
                  </h4>

                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {stg.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── Social & Environmental Impact Matrix (Slide 6) ─── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-extrabold text-emerald-800 uppercase tracking-widest block mb-2">
            MEASURABLE OUTCOMES
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
            Social &amp; Environmental Impact
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 mx-auto rounded-full my-3" />
          <p className="text-sm sm:text-base text-gray-600">
            Delivering tangible value across community livelihoods and ecological conservation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Social Value Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-amber-200 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block">
                  COMMUNITY IMPACT
                </span>
                <h3 className="text-2xl font-extrabold text-[#263238]">
                  Social Value
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <h4 className="text-base font-bold text-[#263238] mb-1">
                  25 Rural Women Employed
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  Direct livelihood opportunities with minimum applicable wages, providing financial security and dignity of labor.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <h4 className="text-base font-bold text-[#263238] mb-1">
                  Skill Development &amp; Training
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  Comprehensive mastery in industrial stitching, pattern cutting, machine maintenance, finishing, and quality control.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <h4 className="text-base font-bold text-[#263238] mb-1">
                  20% Profit-Sharing Model
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  Women artisans directly share in the centre&apos;s commercial success, helping them build savings and invest in their children&apos;s future.
                </p>
              </div>
            </div>
          </div>

          {/* Environmental Value Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-200 shadow-md space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
                <Recycle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block">
                  ECOLOGICAL FOOTPRINT
                </span>
                <h3 className="text-2xl font-extrabold text-[#263238]">
                  Environmental Value
                </h3>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-base font-bold text-[#263238] mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Reduce</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  Divert thousands of kilograms of fresh denim waste from landfills, incineration, and municipal waste dumps.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-base font-bold text-[#263238] mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Reuse</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  Fresh cutting waste converted into productive, clean, high-tensile raw material without consuming virgin cotton or water.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80">
                <h4 className="text-base font-bold text-[#263238] mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>Upcycle</span>
                </h4>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-sans">
                  Industrial waste transformed into sustainable, durable, aesthetic consumer bags replacing synthetic plastic bags.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Project in Action Photo Gallery (Slide 8, 9, 10) ─── */}
      <section className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-extrabold text-amber-800 uppercase tracking-widest block mb-2">
              REAL GROUND MOMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
              Project in Action
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-sm sm:text-base text-gray-600">
              Prayas Samaj Sevi Sanstha&apos;s sustainable bag production project, showcasing the women, process, and products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((img, idx) => (
              <div 
                key={idx}
                className="rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => setActiveModalImage(img)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  <img 
                    src={img.src} 
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4 text-gray-700" />
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h4 className="text-sm font-bold leading-snug">{img.title}</h4>
                    <p className="text-[11px] text-white/80 font-mono mt-0.5 line-clamp-1">{img.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── Our Credentials & Registrations (Slide 11) ─── */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-mono font-extrabold text-blue-800 uppercase tracking-widest block mb-2">
            GOVERNANCE &amp; COMPLIANCE
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
            Our Credentials &amp; Registrations
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full my-3" />
          <p className="text-sm sm:text-base font-bold text-gray-700 uppercase tracking-wider font-mono">
            A Registered, Compliant &amp; CSR-Ready Organisation — All Key Organisational Registrations &amp; Compliances in Place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((cred, i) => (
            <div 
              key={i}
              className="p-6 rounded-3xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                    <FileCheck2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {cred.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#263238] mb-2 leading-snug">
                  {cred.name}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-sans">
                  {cred.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] font-mono font-bold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified &amp; Active</span>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ─── Ready for Partnerships (Slide 12) ─── */}
      <section id="partnerships" className="py-16 sm:py-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-mono font-extrabold text-amber-800 uppercase tracking-widest block mb-2">
              COLLABORATION &amp; SCALE
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#263238] tracking-tight">
              Ready for Partnerships
            </h2>
            <div className="w-20 h-1 bg-amber-500 mx-auto rounded-full my-3" />
            <p className="text-sm sm:text-base text-gray-600 font-sans">
              Prayas Samaj Sevi Sanstha is already registered, documented, and institutionally prepared to work with CSR partners, donors, corporates, and eligible funding agencies.
            </p>
            <p className="text-xs font-mono font-bold text-emerald-800 mt-2">
              From Registration to Implementation — Prayas is equipped to deliver impactful community development projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {partnershipTracks.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div 
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAF9F6] border border-gray-200 hover:border-amber-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center text-[#263238] group-hover:bg-amber-500 group-hover:text-white transition-colors mb-4 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-bold text-[#263238] mb-2 leading-snug">
                      {pt.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed font-sans">
                      {pt.desc}
                    </p>
                  </div>
                  <a
                    href="#inquiry-form"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        inquiryType: pt.title,
                        message: `We are interested in exploring ${pt.title} opportunities.`
                      }));
                    }}
                    className="mt-4 pt-3 border-t border-gray-200 text-xs font-mono font-bold text-amber-800 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Connect</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── Contact Us & Interactive Inquiry Section (Slide 13) ─── */}
      <section id="inquiry-form" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF9F6] rounded-3xl p-6 sm:p-10 lg:p-12 border border-gray-200/90 shadow-xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Contact Information (Slide 13 Exact Data) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono font-extrabold text-amber-800 uppercase tracking-widest block mb-2">
                  CONTACT SIMROL CENTRE
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#263238] tracking-tight">
                  Prayas Samaj Sevi Sanstha
                </h2>
                <p className="text-sm text-gray-600 font-mono mt-1">
                  Rural Women Sewing &amp; Sustainable Bag Production through Upcycling of Industrial Waste
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-gray-200 space-y-4 text-xs sm:text-sm">
                
                <div className="flex items-start gap-3 text-gray-700">
                  <MapPin className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#263238] block">Registered Address:</span>
                    <span>Sahaj Residency, Scheme No.103, Kesarbagh, Indore - 452009, Madhya Pradesh, India.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-gray-700">
                  <Building2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#263238] block">Production Center Facility:</span>
                    <span>Simrol, Indore, Madhya Pradesh</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#263238] block">Call &amp; WhatsApp:</span>
                    <a href="tel:+918989124880" className="hover:text-amber-700 transition-colors block">+91 89891 24880</a>
                    <a href="tel:+918827764170" className="hover:text-amber-700 transition-colors block">+91 88277 64170</a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#263238] block">Email:</span>
                    <a href="mailto:prayas1samajiksanstha@gmail.com" className="hover:text-amber-700 transition-colors">
                      prayas1samajiksanstha@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-gray-700">
                  <Building2 className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#263238] block">Social Media:</span>
                    <span className="font-mono text-gray-600">@prayas_samaj_sevi_sanstha</span>
                  </div>
                </div>

              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="text-xs sm:text-sm font-bold text-amber-950 text-center">
                  &ldquo;Together, we can create sustainable livelihoods while turning industrial waste into meaningful value.&rdquo;
                </p>
              </div>

            </div>

            {/* Right Interactive Inquiry Form */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-[#263238] mb-1">
                Send an Inquiry or Place an Order
              </h3>
              <p className="text-xs text-gray-500 font-mono mb-6">
                Fill this quick form for bulk orders, custom conference bags, or CSR partnership discussions.
              </p>

              {formSubmitted ? (
                <div className="p-8 text-center space-y-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-emerald-950">
                    Thank You for Your Interest!
                  </h4>
                  <p className="text-sm text-emerald-800 max-w-md mx-auto">
                    We have received your inquiry. Our team at Prayas Samaj Sevi Sanstha will contact you at <strong>{formData.email || formData.phone}</strong> shortly with product samples and CSR details.
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2 rounded-full bg-[#263238] text-white text-xs font-mono font-bold hover:bg-gray-800 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={nameInputId} className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                        Your Full Name *
                      </label>
                      <input
                        id={nameInputId}
                        type="text"
                        required
                        placeholder="e.g. Ramesh Patel"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF9F6]"
                      />
                    </div>
                    <div>
                      <label htmlFor={orgInputId} className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                        Company / Organization
                      </label>
                      <input
                        id={orgInputId}
                        type="text"
                        placeholder="e.g. CSR Foundation / School Name"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF9F6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={emailInputId} className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        id={emailInputId}
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF9F6]"
                      />
                    </div>
                    <div>
                      <label htmlFor={phoneInputId} className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        id={phoneInputId}
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF9F6]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor={typeInputId} className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                        Inquiry Nature
                      </label>
                      <select
                        id={typeInputId}
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF9F6]"
                      >
                        <option value="Bulk Bag Order">Bulk Bag Order (School / Event)</option>
                        <option value="CSR Partnerships">CSR Project Partnership</option>
                        <option value="Corporate Collaborations">Corporate Merchandise &amp; Gifting</option>
                        <option value="Centre Visit">Visit Simrol Production Facility</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor={qtyInputId} className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                        Estimated Quantity
                      </label>
                      <select
                        id={qtyInputId}
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF9F6]"
                      >
                        <option value="Sample Order (1 - 10)">Sample Order (1 - 10 units)</option>
                        <option value="Small Batch (25 - 50)">Small Batch (25 - 50 units)</option>
                        <option value="50 - 200 units">Medium Order (50 - 200 units)</option>
                        <option value="200 - 1000+ units">Large Bulk Order (200 - 1000+ units)</option>
                        <option value="CSR Sponsorship">CSR Equipment / Capital Grant</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor={msgInputId} className="block text-xs font-mono font-bold text-gray-700 uppercase mb-1">
                      Project Requirements / Message
                    </label>
                    <textarea
                      id={msgInputId}
                      rows={3}
                      placeholder="Specify your product choices (e.g., School Backpacks, Tiffin bags), custom branding needs, timeline, or CSR parameters..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 bg-[#FAF9F6]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-sm font-extrabold bg-[#F5B800] hover:bg-[#E5AA00] text-[#263238] shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry to Simrol Centre</span>
                  </button>

                  <p className="text-[11px] text-gray-500 text-center font-mono">
                    Direct reply from Prayas Samaj Sevi Sanstha within 24 business hours.
                  </p>

                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* ─── Lightbox Modal for Photo Inspection ─── */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActiveModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveModalImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[4/3] bg-gray-900 flex items-center justify-center">
                <img 
                  src={activeModalImage.src} 
                  alt={activeModalImage.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 bg-white space-y-1">
                <h4 className="text-xl font-bold text-[#263238]">
                  {activeModalImage.title}
                </h4>
                <p className="text-sm text-gray-600 font-sans">
                  {activeModalImage.caption}
                </p>
                <div className="pt-2 text-xs font-mono text-emerald-800 font-bold">
                  Simrol Centre • Prayas Samaj Sevi Sanstha
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

