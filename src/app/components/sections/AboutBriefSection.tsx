'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function AboutBriefSection() {
  const { t } = useLanguage()
  return (
    <section className="py-20" style={{ background: C.aboutBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
              style={{ border: `2px solid ${C.primaryColor}33` }}>
              <Image src={C.aboutImage} alt="Sakura Bubble Tea" fill className="object-cover" sizes="50vw" />
              <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.primaryColor}44 0%, transparent 60%)` }} />
            </div>
            <div className="absolute -bottom-5 -right-4 rounded-2xl px-6 py-4 shadow-xl"
              style={{ background: 'rgba(255,255,255,0.95)', border: `1px solid ${C.primaryColor}22` }}>
              <p className="font-display text-3xl font-light" style={{ color: C.primaryColor, fontFamily: C.fontHeading }}>40+</p>
              <p className="text-xs" style={{ color: C.aboutTextColor }}>Arome disponibile</p>
            </div>
            <div className="absolute -top-4 -left-4 text-4xl drop-shadow-lg">🌸</div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: C.primaryColor }} />
              <p className="text-xs font-medium tracking-[0.2em] uppercase" style={{ color: C.primaryColor }}>Povestea Noastră</p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-light leading-tight mb-6"
              style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>{C.aboutTitle}</h2>
            <p className="leading-relaxed mb-4 text-sm" style={{ color: C.aboutTextColor }}>{C.aboutP1.split('\n')[0]}</p>
            <p className="leading-relaxed mb-8 text-sm" style={{ color: C.aboutTextColor }}>{C.aboutP2}</p>
            <div className="flex flex-wrap gap-2 mb-10">
              {['🍃 Natural', '🇹🇼 Taiwan', '🌸 Japonia', '❤️ Brașov'].map(item => (
                <span key={item} className="px-4 py-2 text-sm font-medium rounded-full"
                  style={{ background: 'rgba(255,255,255,0.8)', border: `1px solid ${C.primaryColor}33`, color: C.primaryColor }}>
                  {item}
                </span>
              ))}
            </div>
            <Link href="/about"
              className="group inline-flex items-center gap-2 text-sm font-medium transition-colors"
              style={{ color: C.primaryColor }}>
              {t('about.cta')} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
