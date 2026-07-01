// src/pages/Home.tsx
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import HeroSection from '../components/HeroSection'
import ImpactCounter from '../components/ImpactCounter'
import ScrollStory from '../components/ScrollStory'
import ImpactCategories from '../components/ImpactCategories'
import ImageCarousel from '../components/ImageCarousel'

export default function Home() {
  const { t } = useTranslation();


  return (
    <div className="w-full">
      <HeroSection />
      <ScrollStory />
      <ImpactCounter />
      <ImpactCategories />
      <ImageCarousel />


    </div>
  )
}