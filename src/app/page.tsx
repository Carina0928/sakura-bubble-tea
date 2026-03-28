import type { Metadata } from 'next'
import HeroSection from '@/app/components/sections/HeroSection'
import AboutBriefSection from '@/app/components/sections/AboutBriefSection'
import FeaturedProductsSection from '@/app/components/sections/FeaturedProductsSection'
import FeaturesSection from '@/app/components/sections/FeaturesSection'
import ContactBriefSection from '@/app/components/sections/ContactBriefSection'
import CtaSection from '@/app/components/sections/CtaSection'

export const metadata: Metadata = {
  title: 'Nordvik Studio | 為生活打造美好空間',
  description:
    'Nordvik Studio — 北歐風格家具、燈具與生活美學商品。台灣工匠手工製作，永續材料，5年品質保固。',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutBriefSection />
      <FeaturedProductsSection />
      <FeaturesSection />
      <ContactBriefSection />
      <CtaSection />
    </>
  )
}
