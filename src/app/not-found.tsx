'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function NotFound() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: C.bgColor }}>
      <div className="text-center">
        <p className="font-display text-9xl font-light leading-none mb-4" style={{ color: `${C.primaryColor}33`, fontFamily: C.fontHeading }}>404</p>
        <div className="text-5xl mb-4">🌸</div>
        <h1 className="font-display text-3xl font-light mb-4" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>{t('notfound.title')}</h1>
        <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: C.primaryColor, opacity: 0.7 }}>{t('notfound.desc')}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 text-white px-6 py-3 text-sm font-medium rounded-full"
            style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)` }}>
            <ArrowLeft size={14} />{t('notfound.home')}
          </Link>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-full border hover:opacity-80 transition-opacity"
            style={{ borderColor: C.primaryColor, color: C.primaryColor }}>
            {t('notfound.products')}
          </Link>
        </div>
      </div>
    </div>
  )
}
