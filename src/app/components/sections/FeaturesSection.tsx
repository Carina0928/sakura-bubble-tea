'use client'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

const values = [
  { tk: 'features.leaf', emoji: '🍃' },
  { tk: 'features.sparkles', emoji: '✨' },
  { tk: 'features.hammer', emoji: '🧋' },
  { tk: 'features.shield', emoji: '❤️' },
]

export default function FeaturesSection() {
  const { t } = useLanguage()
  return (
    <section className="py-20" style={{ background: C.featuresBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: `${C.featuresTextColor}cc` }}>🌸 {t('features.eyebrow')}</p>
          <h2 className="font-display text-4xl sm:text-5xl font-light drop-shadow-sm"
            style={{ color: C.featuresTextColor, fontFamily: C.fontHeading }}>{t('features.title')}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ tk, emoji }) => (
            <div key={tk} className="p-7 rounded-3xl text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.25)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.4)' }}>
              <div className="text-4xl mb-4">{emoji}</div>
              <h3 className="font-display text-xl font-medium mb-2 drop-shadow-sm"
                style={{ color: C.featuresTextColor, fontFamily: C.fontHeading }}>{t(`${tk}.title`)}</h3>
              <p className="text-sm leading-relaxed" style={{ color: `${C.featuresTextColor}bb` }}>{t(`${tk}.desc`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
