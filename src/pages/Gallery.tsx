// src/pages/Gallery.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import DomeGallery, { type DomeGalleryImage } from '@/components/DomeGallery';

// Pure list of ground-level NGO photographs (strictly deduplicated & unique)
const ngoGalleryImages: DomeGalleryImage[] = [
  {
    "src": "/assets/impact-gallery/gphoto-impact-1.jpg",
    "alt": "Prayas Grassroots Field Outreach"
  },
  {
    "src": "/assets/impact-gallery/gphoto-impact-2.jpg",
    "alt": "Village Self-Empowerment Drive"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-1.jpg",
    "alt": "Rural Community Support Center"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-2.jpg",
    "alt": "Sanskarshala Educational Session"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-3.jpg",
    "alt": "Women Self-Help Group (SHG) Meet"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-4.jpg",
    "alt": "Child Nutrition & Schooling Drive"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-5.jpg",
    "alt": "Free Village Medical Health Camp"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-6.jpg",
    "alt": "Community Tree Plantation Drive"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-7.jpg",
    "alt": "Humanitarian Relief & Warmth Kits"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-8.jpg",
    "alt": "Vocational Skill Development Center"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-9.jpg",
    "alt": "Clean Drinking Water Initiative"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-10.jpg",
    "alt": "Youth Mentorship & Tech Training"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-11.jpg",
    "alt": "Elderly Care & Health Support"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-12.jpg",
    "alt": "Model Village Infrastructure Drive"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-13.jpg",
    "alt": "Community Sanitation Campaign"
  },
  {
    "src": "/assets/impact-gallery/gdrive-impact-14.jpg",
    "alt": "Grassroots Volunteer Assembly"
  },
  {
    "src": "/assets/healthcare/eye-surgery-camp.jpg",
    "alt": "Free Eye Surgery Camp"
  },
  {
    "src": "/assets/education/sanskarshala-classroom.jpg",
    "alt": "Sanskarshala Classroom"
  },
  {
    "src": "/assets/education/digital-literacy-lab.jpg",
    "alt": "Digital Literacy Lab"
  },
  {
    "src": "/assets/women-empowerment/sewing-training.jpeg",
    "alt": "Vocational Sewing Training"
  },
  {
    "src": "/assets/healthcare/elderly-care.jpeg",
    "alt": "Elderly Care Support"
  },
  {
    "src": "/assets/women-empowerment/sabji-wali-didi.jpeg",
    "alt": "Sabji Wali Didi Micro-Enterprise"
  },
  {
    "src": "/assets/education/children-group.jpg",
    "alt": "Sanskarshala Students Group"
  },
  {
    "src": "/TREEGROW.jpg",
    "alt": "Tree Plantation & Reforestation"
  },
  {
    "src": "/assets/relief/clean-water-tanker.jpeg",
    "alt": "Rural Clean Water Supply"
  },
  {
    "src": "/assets/relief/eshram-labour-rights.jpeg",
    "alt": "e-Shram Labour Rights Camp"
  },
  {
    "src": "/assets/relief/rural-development.jpeg",
    "alt": "Rural Development Assembly"
  },
  {
    "src": "/assets/relief/volunteer-leadership.jpeg",
    "alt": "Volunteer Leadership Drive"
  },
  {
    "src": "/assets/women-empowerment/handicraft-center.jpeg",
    "alt": "Women Handicraft Unit"
  },
  {
    "src": "/assets/women-empowerment/shg-collective.jpg",
    "alt": "SHG Collective Women Meet"
  },
  {
    "src": "/assets/education/educational-workshop.jpg",
    "alt": "Interactive Education Workshop"
  },
  {
    "src": "/assets/education/primary-learning.jpeg",
    "alt": "Primary School Mentorship"
  },
  {
    "src": "/assets/education/value-education.jpg",
    "alt": "Value Education Circle"
  },
  {
    "src": "/assets/healthcare/health-camp.jpeg",
    "alt": "Multi-Specialty Health Camp"
  },
  {
    "src": "/plastic-mukti-hero.jpg",
    "alt": "Plastic Mukti Abhiyaan"
  },
  {
    "src": "/Sindoda/IMG_20191022_121001 (1).jpg",
    "alt": "Sindoda Village Campaign 1"
  },
  {
    "src": "/Sindoda/IMG_20191030_112427.jpg",
    "alt": "Sindoda Village Campaign 2"
  },
  {
    "src": "/Sindoda/IMG_20191104_162653.jpg",
    "alt": "Sindoda Village Campaign 3"
  },
  {
    "src": "/Sindoda/IMG_20191106_104516.jpg",
    "alt": "Sindoda Village Campaign 4"
  },
  {
    "src": "/Sindoda/IMG_20191106_111020.jpg",
    "alt": "Sindoda Village Campaign 5"
  },
  {
    "src": "/Sindoda/IMG_20191113_121346.jpg",
    "alt": "Sindoda Village Campaign 6"
  },
  {
    "src": "/Sindoda/IMG_20191115_115816.jpg",
    "alt": "Sindoda Village Campaign 7"
  },
  {
    "src": "/Sindoda/IMG_20191115_115817.jpg",
    "alt": "Sindoda Village Campaign 8"
  },
  {
    "src": "/Sindoda/IMG_20191213_152317.jpg",
    "alt": "Sindoda Village Campaign 9"
  },
  {
    "src": "/Sindoda/IMG_20191213_152320.jpg",
    "alt": "Sindoda Village Campaign 10"
  },
  {
    "src": "/Sindoda/IMG_20191217_133958.jpg",
    "alt": "Sindoda Village Campaign 11"
  },
  {
    "src": "/Sindoda/IMG_20191217_134103.jpg",
    "alt": "Sindoda Village Campaign 12"
  },
  {
    "src": "/Sindoda/IMG_20191217_134432.jpg",
    "alt": "Sindoda Village Campaign 13"
  }
];

export default function Gallery() {
  const [images, setImages] = useState<DomeGalleryImage[]>(ngoGalleryImages);

  useEffect(() => {
    const loadLivePhotos = () => {
      try {
        const saved = localStorage.getItem('prayas_live_photo_gallery');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const adminImages: DomeGalleryImage[] = parsed
              .filter((p: any) => p.targetSection === 'dome-3d' || p.targetSection === 'impact-gallery' || p.targetSection === 'general')
              .map((p: any) => ({
                src: p.src,
                alt: p.title || 'Prayas Impact Photo',
              }));
            setImages([...adminImages, ...ngoGalleryImages]);
            return;
          }
        }
      } catch (e) {
        console.error('Failed loading live gallery photos:', e);
      }
      setImages(ngoGalleryImages);
    };

    loadLivePhotos();
    window.addEventListener('prayas-photos-updated', loadLivePhotos);
    return () => window.removeEventListener('prayas-photos-updated', loadLivePhotos);
  }, []);

  return (
    <div className="h-screen w-full bg-gradient-to-b from-slate-50 via-gray-50 to-white text-[#263238] flex flex-col pt-[var(--navbar-height,80px)] relative overflow-hidden">
      {/* ===== HEADER BAR ===== */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2 text-center shrink-0">

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#263238]"
        >
          Our <span className="text-red-600">Gallery</span>
        </motion.h1>
      </div>

      {/* ===== 3D DOME GALLERY CANVAS ===== */}
      <div className="relative w-full flex-1 min-h-0">
        <DomeGallery
          images={images}
          fit={0.4}
          fitBasis="auto"
          minRadius={450}
          maxRadius={1100}
          padFactor={0.2}
          overlayBlurColor="#F8FAFC"
          maxVerticalRotationDeg={10}
          dragSensitivity={18}
          enlargeTransitionMs={350}
          segments={35}
          dragDampening={2}
          openedImageWidth="440px"
          openedImageHeight="440px"
          imageBorderRadius="24px"
          openedImageBorderRadius="24px"
          grayscale={false}
          autoRotateSpeed={0.12}
        />
      </div>

    </div>
  );
}
