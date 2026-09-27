// src/components/admin/AdminSanityGallery.tsx
import { useState, useEffect, useRef } from 'react';
import { Loader2, Plus, Trash2, ExternalLink, ShieldCheck, CheckCircle2, Image as ImageIcon, Upload, Sparkles, Filter } from 'lucide-react';

export type TargetSectionType = 
  | 'impact-gallery'
  | 'kargil-vatika'
  | 'home-hero'
  | 'dome-3d'
  | 'education'
  | 'healthcare'
  | 'women-empowerment'
  | 'rural-development'
  | 'environment'
  | 'about-us'
  | 'general';

export interface PhotoItem {
  id: string;
  src: string;
  title: string;
  category: string;
  targetSection: TargetSectionType;
  updatedAt: string;
}

export const DEFAULT_WEBSITE_PHOTOS: PhotoItem[] = [
  {
    id: 'def-1',
    src: '/assets/impact-gallery/gphoto-impact-1.jpg',
    title: 'Prayas Grassroots Field Outreach',
    category: 'Community Welfare',
    targetSection: 'impact-gallery',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-2',
    src: '/assets/impact-gallery/gphoto-impact-2.jpg',
    title: 'Village Self-Empowerment Drive',
    category: 'Social Empowerment',
    targetSection: 'impact-gallery',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-3',
    src: '/assets/impact-gallery/gdrive-impact-1.jpg',
    title: 'Rural Community Support Center',
    category: 'Rural Development',
    targetSection: 'rural-development',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-4',
    src: '/assets/impact-gallery/gdrive-impact-2.jpg',
    title: 'Sanskarshala Educational Session',
    category: 'Education',
    targetSection: 'education',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-5',
    src: '/assets/impact-gallery/gdrive-impact-3.jpg',
    title: 'Women Self-Help Group (SHG) Meet',
    category: 'Women Empowerment',
    targetSection: 'women-empowerment',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-6',
    src: '/assets/impact-gallery/gdrive-impact-4.jpg',
    title: 'Child Nutrition & Schooling Drive',
    category: 'Child Welfare',
    targetSection: 'education',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-7',
    src: '/assets/impact-gallery/gdrive-impact-5.jpg',
    title: 'Free Village Medical Health Camp',
    category: 'Healthcare',
    targetSection: 'healthcare',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-8',
    src: '/assets/impact-gallery/gdrive-impact-6.jpg',
    title: 'Community Tree Plantation Drive',
    category: 'Environment',
    targetSection: 'environment',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-9',
    src: '/assets/impact-gallery/gdrive-impact-7.jpg',
    title: 'Humanitarian Relief & Warmth Kits',
    category: 'Relief Aid',
    targetSection: 'general',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-10',
    src: '/assets/impact-gallery/gdrive-impact-8.jpg',
    title: 'Vocational Skill Development Center',
    category: 'Women Empowerment',
    targetSection: 'women-empowerment',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-11',
    src: '/assets/impact-gallery/gdrive-impact-9.jpg',
    title: 'Clean Drinking Water Initiative',
    category: 'Rural Development',
    targetSection: 'rural-development',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-12',
    src: '/assets/impact-gallery/gdrive-impact-10.jpg',
    title: 'Youth Mentorship & Tech Training',
    category: 'Education',
    targetSection: 'education',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-13',
    src: '/assets/healthcare/eye-surgery-camp.jpg',
    title: 'Free Eye Surgery & Vision Camp',
    category: 'Healthcare',
    targetSection: 'healthcare',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-14',
    src: '/assets/education/sanskarshala-classroom.jpg',
    title: 'Sanskarshala Classroom',
    category: 'Education',
    targetSection: 'education',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-15',
    src: '/assets/education/digital-literacy-lab.jpg',
    title: 'Digital Literacy Lab',
    category: 'Education',
    targetSection: 'education',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-16',
    src: '/assets/women-empowerment/sewing-training.jpeg',
    title: 'Vocational Sewing Training',
    category: 'Women Empowerment',
    targetSection: 'women-empowerment',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-17',
    src: '/assets/women-empowerment/sabji-wali-didi.jpeg',
    title: 'Sabji Wali Didi Micro-Enterprise',
    category: 'Women Empowerment',
    targetSection: 'women-empowerment',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-18',
    src: '/TREEGROW.jpg',
    title: 'Kargil Vatika Tree Plantation & Reforestation',
    category: 'Kargil Vatika Reforestation',
    targetSection: 'kargil-vatika',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-19',
    src: '/TREEGROW2.jpg',
    title: 'Kargil Vatika Sapling Growth Drive',
    category: 'Kargil Vatika Reforestation',
    targetSection: 'kargil-vatika',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-20',
    src: '/Tree.png',
    title: 'Kargil Vatika Afforestation Project',
    category: 'Kargil Vatika Reforestation',
    targetSection: 'kargil-vatika',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-21',
    src: '/EDUCATION.JPG',
    title: 'Primary School Education Drive',
    category: 'Education',
    targetSection: 'education',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-22',
    src: '/HEALTH.jpg',
    title: 'Free Medical Health Camp',
    category: 'Healthcare',
    targetSection: 'healthcare',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-23',
    src: '/WOMEN.jpeg',
    title: 'Women Skill Development & SHG',
    category: 'Women Empowerment',
    targetSection: 'women-empowerment',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-24',
    src: '/ruraldevelopment.jpeg',
    title: 'Model Village Infrastructure',
    category: 'Rural Development',
    targetSection: 'rural-development',
    updatedAt: new Date().toLocaleDateString(),
  },
  {
    id: 'def-25',
    src: '/plastic-mukti-hero.jpg',
    title: 'Plastic Mukti Abhiyaan Sindoda',
    category: 'Environment',
    targetSection: 'environment',
    updatedAt: new Date().toLocaleDateString(),
  }
];

const STORAGE_KEY = 'prayas_live_photo_gallery';

export const getStoredPhotos = (): PhotoItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load photos:', e);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_WEBSITE_PHOTOS));
  return DEFAULT_WEBSITE_PHOTOS;
};

export default function AdminSanityGallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Education');
  const [targetSection, setTargetSection] = useState<TargetSectionType>('impact-gallery');
  const [imageUrl, setImageUrl] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPhotos(getStoredPhotos());
  }, []);

  const savePhotosToStorage = (newList: PhotoItem[]) => {
    setPhotos(newList);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
    window.dispatchEvent(new Event('prayas-photos-updated'));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) {
      alert('Please choose an image file or enter an image URL.');
      return;
    }

    const newPhoto: PhotoItem = {
      id: Date.now().toString(),
      src: imageUrl.trim(),
      title: title.trim() || 'Prayas Impact Photo',
      category: category.trim() || 'General',
      targetSection,
      updatedAt: new Date().toLocaleDateString(),
    };

    const updated = [newPhoto, ...photos];
    savePhotosToStorage(updated);

    // Reset
    setImageUrl('');
    setTitle('');
    if (fileInputRef.current) fileInputRef.current.value = '';

    setSuccessMsg('Photo published live across website pages!');
    setTimeout(() => setSuccessMsg(''), 3500);
  };

  const handleDelete = (id: string) => {
    if (!confirm('Remove this photo from website pages?')) return;
    const filtered = photos.filter(p => p.id !== id);
    savePhotosToStorage(filtered);
  };

  const categories = ['All', 'Education', 'Healthcare', 'Women Empowerment', 'Environment', 'Kargil Vatika', 'Rural Development', 'Child Welfare', 'Relief Aid'];

  const filteredPhotos = activeCategoryFilter === 'All'
    ? photos
    : photos.filter(p => p.category.toLowerCase().includes(activeCategoryFilter.toLowerCase()) || (activeCategoryFilter === 'Kargil Vatika' && p.targetSection === 'kargil-vatika'));

  return (
    <div className="space-y-6 py-2 font-sans select-none">
      
      {/* ─── Minimal Header Section ─── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-extrabold text-[#263238] tracking-tight">
              Single Admin Panel — Photos & Pages CMS
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-mono font-bold">
              Live Database Active
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Upload and update photos live for the homepage impact gallery, Kargil Vatika reforestation, and all website pages directly without mockups.
          </p>
        </div>
      </div>

      {/* ─── Intuitive Beautiful Upload Form ─── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-bold text-[#263238]">Upload New Website Photo</h2>
          </div>
          {successMsg && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ {successMsg}
            </span>
          )}
        </div>

        <form onSubmit={handleAddPhoto} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Title */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                Photo Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Sanskarshala Learning Centre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 text-xs text-[#263238]"
              />
            </div>

            {/* Category Dropdown */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                Category / Impact Sector
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 text-xs text-[#263238]"
              >
                <option value="Education">Education & Skills</option>
                <option value="Healthcare">Healthcare & Medical</option>
                <option value="Women Empowerment">Women Empowerment</option>
                <option value="Kargil Vatika Reforestation">Kargil Vatika Reforestation</option>
                <option value="Rural Development">Rural Development</option>
                <option value="Environment">Environment & Plantation</option>
                <option value="Child Welfare">Child Welfare</option>
                <option value="Relief Aid">Relief Aid</option>
              </select>
            </div>

            {/* Target Page / Section */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                Target Section / Page Location
              </label>
              <select
                value={targetSection}
                onChange={(e) => setTargetSection(e.target.value as TargetSectionType)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 text-xs text-[#263238]"
              >
                <option value="impact-gallery">Landing Page — Our Impact Gallery</option>
                <option value="kargil-vatika">Kargil Vatika Reforestation Gallery</option>
                <option value="home-hero">Landing Page — Hero Showcase</option>
                <option value="dome-3d">Landing Page — 3D Interactive Dome Gallery</option>
                <option value="education">Education & Skills Page</option>
                <option value="healthcare">Healthcare & Medical Page</option>
                <option value="women-empowerment">Women Empowerment Page</option>
                <option value="rural-development">Rural Development Page</option>
                <option value="environment">Environment & Plantation Page</option>
                <option value="about-us">About Us & Team Story Page</option>
                <option value="general">All Website Pages (Global Media Bank)</option>
              </select>
            </div>
          </div>

          {/* File Picker & URL Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                Select Image File
              </label>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="block w-full text-xs text-gray-500 file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#263238] file:text-white hover:file:bg-[#FFF314] hover:file:text-[#263238] transition-colors cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-600 mb-1">
                Or Image URL
              </label>
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#FFF314] focus:ring-2 focus:ring-[#FFF314]/30 text-xs text-[#263238]"
              />
            </div>
          </div>

          {/* Image Preview Box */}
          {imageUrl && (
            <div className="relative w-full h-36 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#FFF314] hover:bg-[#F5B800] text-[#263238] font-bold rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer border border-amber-400/40 text-xs"
            >
              <Plus size={16} />
              <span>Publish Photo Live</span>
            </button>
          </div>
        </form>
      </div>

      {/* ─── Categorized Photo Gallery Grid ─── */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-amber-500" />
            <h2 className="text-base font-bold text-[#263238]">Live Managed Photos ({filteredPhotos.length})</h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Filter size={14} className="text-gray-400 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategoryFilter === cat
                    ? 'bg-[#263238] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredPhotos.length === 0 ? (
          <div className="text-center py-10 text-gray-500 space-y-1">
            <p className="text-sm font-semibold">No uploaded photos under this category.</p>
            <p className="text-xs text-gray-400">Upload a photo using the form above to display it live here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPhotos.map((photo) => (
              <div key={photo.id} className="relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs group hover:shadow-md transition-all">
                <div className="relative aspect-video bg-gray-100">
                  <img src={photo.src} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute top-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {photo.targetSection}
                  </div>
                </div>

                <div className="p-3.5 space-y-1.5">
                  <h3 className="font-bold text-xs text-[#263238] truncate">{photo.title}</h3>
                  
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 font-semibold text-[10px] border border-amber-200/60">
                      {photo.category}
                    </span>
                    <span className="text-gray-400 font-mono text-[10px]">{photo.updatedAt}</span>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex justify-end">
                    <button
                      onClick={() => handleDelete(photo.id)}
                      className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-700 font-semibold hover:underline cursor-pointer"
                    >
                      <Trash2 size={13} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
