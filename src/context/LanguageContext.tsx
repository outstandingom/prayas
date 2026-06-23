// src/context/LanguageContext.tsx
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'hi' | 'en' | 'mr' | 'gu';

interface Translations {
  [key: string]: string;
}

// Translation dictionary – add more keys as needed
const translations: Record<Language, Translations> = {
  hi: {
    // Navbar
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.programs': 'कार्यक्रम',
    'nav.gallery': 'गैलरी',
    'nav.stories': 'कहानियाँ',
    'nav.volunteer': 'स्वयंसेवक',
    'nav.contact': 'संपर्क',
    'nav.about.story': 'हमारी कहानी और मिशन',
    'nav.about.members': 'हमारे सदस्य',
    'nav.about.certifications': 'प्रमाणपत्र और उपलब्धियाँ',
    'nav.donate': 'दान करें',
    'nav.signin': 'साइन इन',
    'nav.profile': 'प्रोफ़ाइल',
    'nav.admin': 'व्यवस्थापक',

    // Hero
    'hero.title': 'हर बच्चे को सीखने का अधिकार',
    'hero.subtitle': 'शिक्षा, स्वास्थ्य और सशक्तिकरण के माध्यम से जीवन बदलना',
    'hero.cta': 'दान करें',

    // Home
    'home.impact.heading': 'हमारा प्रभाव',
    'home.impact.stats.education': 'शिक्षित बच्चे',
    'home.impact.stats.health': 'स्वास्थ्य शिविर',
    'home.impact.stats.women': 'सशक्त महिलाएँ',
    // Add more keys as needed
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.programs': 'Programs',
    'nav.gallery': 'Gallery',
    'nav.stories': 'Stories',
    'nav.volunteer': 'Volunteer',
    'nav.contact': 'Contact',
    'nav.about.story': 'Our Story & Mission',
    'nav.about.members': 'Our Members',
    'nav.about.certifications': 'Certifications & Achievements',
    'nav.donate': 'Donate Now',
    'nav.signin': 'Sign In',
    'nav.profile': 'Profile',
    'nav.admin': 'Admin',

    'hero.title': 'Every child deserves a chance to learn',
    'hero.subtitle': 'Changing lives through education, health, and empowerment',
    'hero.cta': 'Donate Now',

    'home.impact.heading': 'Our Impact',
    'home.impact.stats.education': 'Children Educated',
    'home.impact.stats.health': 'Health Camps',
    'home.impact.stats.women': 'Women Empowered',
  },
  mr: {
    'nav.home': 'मुख्यपृष्ठ',
    'nav.about': 'आमच्याबद्दल',
    'nav.programs': 'कार्यक्रम',
    'nav.gallery': 'गॅलरी',
    'nav.stories': 'कथा',
    'nav.volunteer': 'स्वयंसेवक',
    'nav.contact': 'संपर्क',
    'nav.about.story': 'आमची कथा आणि ध्येय',
    'nav.about.members': 'आमचे सदस्य',
    'nav.about.certifications': 'प्रमाणपत्रे आणि यश',
    'nav.donate': 'दान करा',
    'nav.signin': 'साइन इन',
    'nav.profile': 'प्रोफाइल',
    'nav.admin': 'व्यवस्थापक',

    'hero.title': 'प्रत्येक मुलाला शिकण्याची संधी मिळाली पाहिजे',
    'hero.subtitle': 'शिक्षण, आरोग्य आणि सक्षमीकरणाद्वारे जीवन बदलणे',
    'hero.cta': 'आता दान करा',

    'home.impact.heading': 'आमचा प्रभाव',
    'home.impact.stats.education': 'शिक्षित मुले',
    'home.impact.stats.health': 'आरोग्य शिबिरे',
    'home.impact.stats.women': 'सक्षम महिला',
  },
  gu: {
    'nav.home': 'હોમ',
    'nav.about': 'અમારા વિશે',
    'nav.programs': 'કાર્યક્રમો',
    'nav.gallery': 'ગેલેરી',
    'nav.stories': 'વાર્તાઓ',
    'nav.volunteer': 'સ્વયંસેવક',
    'nav.contact': 'સંપર્ક',
    'nav.about.story': 'અમારી વાર્તા અને મિશન',
    'nav.about.members': 'અમારા સભ્યો',
    'nav.about.certifications': 'પ્રમાણપત્રો અને સિદ્ધિઓ',
    'nav.donate': 'દાન કરો',
    'nav.signin': 'સાઇન ઇન',
    'nav.profile': 'પ્રોફાઇલ',
    'nav.admin': 'વ્યવસ્થાપક',

    'hero.title': 'દરેક બાળકને શીખવાની તક મળવી જોઈએ',
    'hero.subtitle': 'શિક્ષણ, આરોગ્ય અને સશક્તિકરણ દ્વારા જીવન બદલવું',
    'hero.cta': 'હવે દાન કરો',

    'home.impact.heading': 'અમારી અસર',
    'home.impact.stats.education': 'શિક્ષિત બાળકો',
    'home.impact.stats.health': 'આરોગ્ય શિબિરો',
    'home.impact.stats.women': 'સશક્ત મહિલાઓ',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to load from localStorage, default to 'hi' (Hindi)
    const saved = localStorage.getItem('language') as Language;
    return saved && ['hi', 'en', 'mr', 'gu'].includes(saved) ? saved : 'hi';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    // Optionally set html lang attribute
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
