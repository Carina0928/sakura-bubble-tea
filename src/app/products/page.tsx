import type { Metadata } from 'next'
import { Suspense } from 'react'
import ProductsClient from './ProductsClient'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Produse | Sakura Bubble Tea',
  description: '40+ arome autentice din Taiwan.',
}

export default function ProductsPage() {
  return (
    <>
      <section className="pt-28 pb-14 relative overflow-hidden"
        style={{ background: `linear-gradient(150deg, #ffffff 0%, #ffe0ec 25%, ${C.primaryColor} 100%)` }}>
        <div className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 20%, #ffffff 0%, transparent 55%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.8)' }}>🌸 Meniu</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-white mb-4 drop-shadow-sm"
            style={{ fontFamily: C.fontHeading }}>{C.productsTitle}</h1>
          <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>{C.productsSubtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none">
            <path d="M0,25 C480,50 960,0 1440,25 L1440,50 L0,50 Z" fill={C.bgColor} fillOpacity="0.95" />
          </svg>
        </div>
      </section>
      <Suspense fallback={<div className="h-20" style={{ background: C.bgColor }} />}>
        <ProductsClient />
      </Suspense>
    </>
  )
}
