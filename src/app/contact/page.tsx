'use client'
import { MapPin, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import { company } from '@/data/company'
import ContactForm from './ContactForm'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function ContactPage() {
  const { t } = useLanguage()
  const faqs = [
    { q: t('contact.faq.q1'), a: t('contact.faq.a1') },
    { q: t('contact.faq.q2'), a: t('contact.faq.a2') },
    { q: t('contact.faq.q3'), a: t('contact.faq.a3') },
  ]
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-14 relative overflow-hidden"
        style={{ background: `linear-gradient(150deg, #ffffff 0%, #ffe0ec 25%, ${C.primaryColor} 100%)` }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 20% 20%, #ffffff 0%, transparent 55%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'rgba(255,255,255,0.75)' }}>🌸 {t('contact.page.eyebrow')}</p>
          <h1 className="font-display text-5xl sm:text-6xl font-light text-white mb-4 drop-shadow-sm"
            style={{ fontFamily: C.fontHeading }}>{C.contactTitle}</h1>
          <p className="text-lg max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>{C.contactSubtitle}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 50" fill="none">
            <path d="M0,25 C480,50 960,0 1440,25 L1440,50 L0,50 Z" fill={C.bgColor} fillOpacity="0.95" />
          </svg>
        </div>
      </section>

      {/* 3-column layout */}
      <section className="py-16" style={{ background: C.contactBg }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Info */}
            <div className="bg-white/80 rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: `${C.primaryColor}22` }}>
              <div className="px-6 py-5 text-white" style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)` }}>
                <h2 className="font-display text-2xl font-light" style={{ fontFamily: C.fontHeading }}>{t('contact.info.title')}</h2>
                <p className="text-sm mt-1 opacity-80">🌸 Sakura Bubble Tea</p>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { Icon: MapPin, label: t('contact.address.label'), text: C.contactAddress },
                  { Icon: Mail, label: 'Email', text: C.contactEmail, href: `mailto:${C.contactEmail}` },
                  { Icon: Clock, label: t('contact.hours.label'), text: C.contactHours },
                ].map(({ Icon, label, text, href }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${C.primaryColor}11` }}>
                      <Icon size={16} style={{ color: C.primaryColor }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: C.primaryColor, opacity: 0.6 }}>{label}</p>
                      {href ? <a href={href} className="text-sm hover:opacity-80 break-all" style={{ color: C.primaryColor }}>{text}</a>
                        : <p className="text-sm text-stone-700">{text}</p>}
                    </div>
                  </div>
                ))}
                <div className="border-t pt-5" style={{ borderColor: `${C.primaryColor}22` }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: C.primaryColor, opacity: 0.6 }}>{t('contact.social.title')}</p>
                  <div className="flex gap-2">
                    {[{ href: company.social.instagram, label: 'Instagram', Icon: Instagram },
                      { href: company.social.facebook, label: 'Facebook', Icon: Facebook }].map(({ href, label, Icon }) => (
                      <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium transition-colors"
                        style={{ background: `${C.primaryColor}11`, border: `1px solid ${C.primaryColor}33`, color: C.primaryColor }}>
                        <Icon size={13} /> {label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white/80 rounded-2xl border overflow-hidden shadow-sm" style={{ borderColor: `${C.primaryColor}22` }}>
              <div className="px-6 py-5 text-white" style={{ background: `linear-gradient(135deg, ${C.primaryColor}dd, ${C.primaryColor}99)` }}>
                <h2 className="font-display text-2xl font-light" style={{ fontFamily: C.fontHeading }}>{t('contact.form.title')}</h2>
                <p className="text-sm mt-1 opacity-80">{t('contact.form.desc')}</p>
              </div>
              <div className="p-6"><ContactForm /></div>
            </div>

            {/* Map */}
            <div className="bg-white/80 rounded-2xl border overflow-hidden shadow-sm flex flex-col" style={{ borderColor: `${C.primaryColor}22` }}>
              <div className="px-6 py-5 text-white" style={{ background: `linear-gradient(135deg, ${C.primaryColor}bb, ${C.primaryColor}77)` }}>
                <h2 className="font-display text-2xl font-light" style={{ fontFamily: C.fontHeading }}>📍 Locație</h2>
                <p className="text-sm mt-1 opacity-80">Brașov, România</p>
              </div>
              <div className="flex-1 min-h-[400px] lg:min-h-0">
                <iframe src={company.mapEmbedUrl} width="100%" height="100%"
                  style={{ border: 0, minHeight: '400px' }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" title="Sakura Bubble Tea" />
              </div>
              <div className="px-6 py-4 border-t" style={{ borderColor: `${C.primaryColor}22`, background: `${C.primaryColor}08` }}>
                <a href="https://maps.app.goo.gl/uN1wY1GtZVrZMimM9" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: C.primaryColor }}>
                  <MapPin size={14} />{C.contactAddress} — Deschide în Maps →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" style={{ background: C.bgColor }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-light mb-8 text-center"
            style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>🌸 {t('contact.faq.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {faqs.map(faq => (
              <div key={faq.q} className="p-6 border rounded-2xl hover:shadow-md transition-shadow"
                style={{ borderColor: `${C.primaryColor}22`, background: `${C.primaryColor}06` }}>
                <p className="font-semibold text-stone-800 mb-2 text-sm">{faq.q}</p>
                <p className="text-sm leading-relaxed" style={{ color: C.aboutTextColor }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
