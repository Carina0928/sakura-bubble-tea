'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Hammer, Sparkles, Shield } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

const values = [
  { tk: 'features.leaf', emoji: '🍃' },
  { tk: 'features.hammer', emoji: '🧋' },
  { tk: 'features.sparkles', emoji: '✨' },
  { tk: 'features.shield', emoji: '❤️' },
]

export default function AboutPage() {
  const { t } = useLanguage()
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 overflow-hidden"
        style={{ background: `linear-gradient(150deg, #ffffff 0%, #ffe0ec 25%, ${C.primaryColor} 100%)` }}>
        <div className="absolute inset-0 opacity-25 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 20%, #ffffff 0%, transparent 55%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: 'rgba(255,255,255,0.75)' }}>🌸 {C.aboutSubtitle}</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-white mb-6 drop-shadow-sm"
            style={{ fontFamily: C.fontHeading }}>{C.aboutTitle}</h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Autenticitate taiwaneză · Estetică japoneză · Inimă românească
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill={C.bgColor} fillOpacity="0.95" />
          </svg>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20" style={{ background: C.aboutBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="relative">
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
                style={{ border: `3px solid ${C.primaryColor}22` }}>
                <Image src={C.aboutImage} alt="Sakura Bubble Tea" fill className="object-cover" sizes="50vw" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.primaryColor}44 0%, transparent 60%)` }} />
              </div>
              <div className="absolute -bottom-5 -right-4 rounded-2xl px-6 py-4 shadow-xl text-center"
                style={{ background: 'rgba(255,255,255,0.97)', border: `1px solid ${C.primaryColor}22` }}>
                <p className="font-display text-3xl font-light" style={{ color: C.primaryColor, fontFamily: C.fontHeading }}>{C.aboutFoundedYear}</p>
                <p className="text-xs" style={{ color: C.aboutTextColor }}>Fondată în Brașov</p>
              </div>
              <div className="absolute -top-4 -left-4 text-4xl drop-shadow-lg">🌸</div>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8" style={{ background: C.primaryColor }} />
                <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: C.primaryColor }}>Povestea Fondatorului</p>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-light leading-tight mb-6"
                style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>{C.aboutTitle}</h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: C.aboutTextColor }}>
                {C.aboutP1.split('\n').filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
                <blockquote className="border-l-4 pl-4 font-display text-lg italic my-6"
                  style={{ borderColor: C.primaryColor, color: '#2d1b24', fontFamily: C.fontHeading }}>
                  „{C.aboutQuote}"
                </blockquote>
                <p className="font-semibold" style={{ color: C.primaryColor }}>{C.aboutCta}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-8 mb-10">
                {['🍃 Natural', '🇹🇼 Taiwan', '🌸 Japonia', '❤️ Brașov'].map(item => (
                  <span key={item} className="px-4 py-2 text-sm font-medium rounded-full"
                    style={{ background: 'rgba(255,255,255,0.8)', border: `1px solid ${C.primaryColor}33`, color: C.primaryColor }}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Description */}
      <section className="py-16" style={{ background: C.bgColor }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: C.primaryColor }}>🌸 Despre Brand</p>
          <h2 className="font-display text-3xl sm:text-4xl font-light mb-8" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>
            Redefinim experiența bubble tea
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: C.aboutTextColor }}>
            <p>{C.aboutP2}</p>
            <p>{C.aboutP3}</p>
            <p className="font-display text-xl italic" style={{ color: C.primaryColor, fontFamily: C.fontHeading }}>{C.aboutBrandSlogan}</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: C.featuresBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: 'rgba(255,255,255,0.75)' }}>🌸 {t('about.values.eyebrow')}</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-white drop-shadow-sm"
              style={{ fontFamily: C.fontHeading }}>{t('about.values.title')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ tk, emoji }) => (
              <div key={tk} className="p-7 rounded-3xl text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
                style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)' }}>
                <div className="text-4xl mb-4">{emoji}</div>
                <h3 className="font-display text-xl font-medium text-white mb-2 drop-shadow-sm"
                  style={{ fontFamily: C.fontHeading }}>{t(`${tk}.title`)}</h3>
                <p className="text-sm text-white/75 leading-relaxed">{t(`${tk}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: C.aboutBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-4xl mb-6">🌸🧋🌸</div>
          <h2 className="font-display text-4xl sm:text-5xl font-light mb-4"
            style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>Vino să ne cunoști!</h2>
          <p className="text-lg max-w-lg mx-auto mb-10" style={{ color: C.primaryColor, opacity: 0.8 }}>
            {C.contactAddress} · {C.contactHours}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products"
              className="group inline-flex items-center gap-2 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:-translate-y-0.5 transition-all"
              style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)` }}>
              {t('about.cta.products')} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact"
              className="inline-flex items-center gap-2 border-2 px-8 py-4 rounded-full font-medium hover:opacity-80 transition-opacity"
              style={{ borderColor: C.primaryColor, color: C.primaryColor }}>
              {t('about.cta.contact')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
