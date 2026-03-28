'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function CtaSection() {
  const { t } = useLanguage()
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: C.ctaBg }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15 pointer-events-none"
        style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%,-30%)' }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-5xl mb-6">🌸🧋🌸</div>
        <p className="text-xs font-medium tracking-[0.25em] uppercase mb-5" style={{ color: `${C.ctaTextColor}cc` }}>{t('cta.eyebrow')}</p>
        <h2 className="font-display text-4xl sm:text-5xl font-light leading-tight mb-6 max-w-2xl mx-auto"
          style={{ color: C.ctaTextColor, fontFamily: C.fontHeading }}>{C.ctaTitle}</h2>
        <p className="text-lg max-w-md mx-auto mb-10" style={{ color: `${C.ctaTextColor}cc` }}>{C.ctaDesc}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/products"
            className="group inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold rounded-full shadow-xl hover:scale-105 transition-all"
            style={{ background: 'rgba(255,255,255,0.95)', color: C.primaryColor }}>
            {t('cta.shop')} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium rounded-full border transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.5)', color: C.ctaTextColor, background: 'rgba(255,255,255,0.15)' }}>
            {t('cta.consult')}
          </Link>
        </div>
      </div>
    </section>
  )
}
