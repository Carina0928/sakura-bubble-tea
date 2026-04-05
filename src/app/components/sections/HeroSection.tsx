'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function HeroSection() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0" style={{ background: C.heroBg }} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-2/3 h-2/3 opacity-35"
          style={{ background: 'radial-gradient(ellipse at 15% 10%, #ffffff 0%, transparent 60%)' }} />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 opacity-20"
          style={{ background: 'radial-gradient(ellipse at 85% 5%, #ffe8f0 0%, transparent 55%)' }} />
      </div>
      <div className="absolute top-0 inset-x-0 h-52 z-0 pointer-events-none overflow-hidden">
        {[{l:'-2%',w:'280px',o:'0.18'},{l:'10%',w:'210px',o:'0.12'},{r:'5%',w:'290px',o:'0.18'},{r:'18%',w:'220px',o:'0.12'}].map((s,i)=>(
          <div key={i} className="absolute -top-14 rounded-full"
            style={{left:s.l,right:s.r,width:s.w,height:s.w,opacity:s.o,
              background:'radial-gradient(ellipse, #ffccd8 0%, transparent 70%)'}} />
        ))}
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
              <span className="text-xs tracking-[0.3em] uppercase font-light" style={{ color: C.heroTextColor, opacity: 0.7 }}>桜 Sakura Bubble Tea</span>
              <div className="h-px w-16" style={{ background: C.primaryColor, opacity: 0.3 }} />
              <span className="text-xs tracking-widest" style={{ color: C.heroTextColor, opacity: 0.6 }}>Brașov · România</span>
            </div>
            <h1 className="font-display font-light leading-tight mb-5" style={{ fontFamily: C.fontHeading }}>
              <span className="block text-5xl sm:text-6xl lg:text-7xl drop-shadow-sm" style={{ color: C.heroTitleColor }}>{C.heroTitle}</span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl italic mt-1" style={{ color: C.heroTextColor, opacity: 0.85 }}>{C.heroSubtitle}</span>
              <span className="block text-base lg:text-lg font-light mt-3 tracking-wider" style={{ color: C.heroTextColor, opacity: 0.7 }}>{C.heroTagline}</span>
            </h1>

            {/* Mobile image - show on small screens only */}
            <div className="flex lg:hidden justify-center mb-8">
              <div className="relative">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden mx-auto"
                  style={{ border: '4px solid rgba(255,255,255,0.9)', boxShadow: `0 12px 40px ${C.primaryColor}33` }}>
                  <img src={C.mainCircleImage} alt="Sakura Bubble Tea" className="w-full h-full object-cover" />
                </div>
                {/* Small circles on mobile */}
                <div className="absolute -top-3 -left-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden"
                  style={{ border: '3px solid rgba(255,255,255,0.9)', boxShadow: `0 4px 16px ${C.primaryColor}33` }}>
                  <img src={C.smallCircle1Image} alt={C.smallCircle1Label} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -top-4 -right-3 w-18 h-18 sm:w-22 sm:h-22 rounded-full overflow-hidden"
                  style={{ width: '4.5rem', height: '4.5rem', border: '3px solid rgba(255,255,255,0.9)', boxShadow: `0 4px 16px ${C.primaryColor}33` }}>
                  <img src={C.smallCircle2Image} alt={C.smallCircle2Label} className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 -right-5 w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden"
                  style={{ border: '3px solid rgba(255,255,255,0.9)', boxShadow: `0 4px 16px ${C.primaryColor}33` }}>
                  <img src={C.smallCircle3Image} alt={C.smallCircle3Label} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap"
                  style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)` }}>
                  🌸 Taiwan Authentic
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed mb-8 max-w-sm mx-auto lg:mx-0" style={{ color: C.heroTextColor, opacity: 0.75, fontFamily: C.fontBody }}>
              {C.heroDescription.split('40+ arome').map((part, i, arr) => i < arr.length - 1
                ? <span key={i}>{part}<span className="font-semibold" style={{ color: C.primaryColor }}>40+ arome</span></span>
                : <span key={i}>{part}</span>)}
            </p>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-10">
              <Link href="/products"
                className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                style={{ background: C.heroBtnColor, color: C.heroBtnTextColor, borderRadius: C.heroBtnRadius }}>
                {t('hero.cta.explore')} <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/contact"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium border-2 transition-all hover:opacity-90"
                style={{ borderColor: C.primaryColor, color: C.primaryColor, background: 'rgba(255,255,255,0.8)', borderRadius: C.heroBtnRadius }}>
                📍 Găsește-ne
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 sm:gap-8 justify-center lg:justify-start pt-8 border-t" style={{ borderColor: `${C.primaryColor}22` }}>
              {[[C.stat1Value,C.stat1Label],[C.stat2Value,C.stat2Label],[C.stat3Value,C.stat3Label]].map(([v,l])=>(
                <div key={l} className="text-center">
                  <p className="font-display text-2xl sm:text-3xl font-light drop-shadow" style={{ color: C.heroTitleColor, fontFamily: C.fontHeading }}>{v}</p>
                  <p className="text-xs uppercase tracking-widest mt-0.5" style={{ color: C.heroTextColor, opacity: 0.6 }}>{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop circles - hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center relative h-[520px]">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-96 h-96 rounded-full" style={{ border: `1.5px solid ${C.primaryColor}33`, animation: 'spin 45s linear infinite' }} />
              <div className="absolute w-[430px] h-[430px] rounded-full" style={{ border: `1px solid ${C.primaryColor}18` }} />
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="relative w-80 h-80 rounded-full overflow-hidden"
                style={{ border: '4px solid rgba(255,255,255,0.9)', boxShadow: `0 20px 60px ${C.primaryColor}33` }}>
                <img src={C.mainCircleImage} alt="Sakura Bubble Tea" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 45%, ${C.primaryColor}18 100%)` }} />
              </div>
              <div className="mt-4 text-white text-xs font-semibold px-5 py-2 rounded-full shadow-lg"
                style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)` }}>
                🌸 Taiwan Authentic
              </div>
              {/* Small circles */}
              {[
                { img: C.smallCircle1Image, label: C.smallCircle1Label, pos: 'absolute -top-8 -left-16' },
                { img: C.smallCircle2Image, label: C.smallCircle2Label, pos: 'absolute -top-10 -right-20' },
                { img: C.smallCircle3Image, label: C.smallCircle3Label, pos: 'absolute top-1/3 -right-24' },
              ].map(({ img, label, pos }, i) => (
                <div key={i} className={`${pos} z-20 flex flex-col items-center`}>
                  <div className={`relative ${i === 1 ? 'w-28 h-28' : 'w-24 h-24'} rounded-full overflow-hidden`}
                    style={{ border: '3px solid rgba(255,255,255,0.9)', boxShadow: `0 8px 24px ${C.primaryColor}33` }}>
                    <img src={img} alt={label} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <p className="text-xs font-medium mt-1.5 drop-shadow" style={{ color: C.primaryColor }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 70" fill="none"><path d="M0,40 C360,70 1080,10 1440,40 L1440,70 L0,70 Z" fill={C.bgColor} fillOpacity="0.95" /></svg>
      </div>
    </section>
  )
}
