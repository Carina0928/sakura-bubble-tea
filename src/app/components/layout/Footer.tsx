'use client'
import Link from 'next/link'
import { MapPin, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import { company } from '@/data/company'
import { useLanguage } from '@/lib/LanguageContext'
// Image replaced with img
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function Footer() {
  const { t } = useLanguage()
  return (
    <footer style={{ background: C.footerBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="relative w-32 h-16 mb-4">
              <img src="/images/logo.png" alt="Sakura Bubble Tea" className="absolute inset-0 w-full h-full object-contain" />
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: `${C.footerTextColor}cc` }}>{C.footerTagline}</p>
            <div className="flex gap-3">
              {[{ href: company.social.instagram, Icon: Instagram }, { href: company.social.facebook, Icon: Facebook }].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.25)' }}>
                  <Icon size={16} style={{ color: C.footerTextColor }} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: C.footerTextColor }}>{t('footer.navigation')}</h3>
            <ul className="space-y-3">
              {[{href:'/',l:t('nav.home')},{href:'/about',l:t('nav.about')},{href:'/products',l:t('nav.products')},{href:'/contact',l:t('nav.contact')}].map(({href,l})=>(
                <li key={href}><Link href={href} className="text-sm hover:opacity-100 transition-opacity" style={{ color: `${C.footerTextColor}cc` }}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: C.footerTextColor }}>Categorii</h3>
            <ul className="space-y-3">
              {[['tea','Seria Ceai'],['popping','Popping Boba'],['matcha','Matcha'],['tapioca','Tapioca'],['oreo','Oreo'],['special','Speciale']].map(([id,l])=>(
                <li key={id}><Link href={`/products?category=${id}`} className="text-sm hover:opacity-100 transition-opacity" style={{ color: `${C.footerTextColor}cc` }}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-widest uppercase mb-5" style={{ color: C.footerTextColor }}>{t('footer.contact')}</h3>
            <ul className="space-y-4">
              {[
                { Icon: MapPin, text: C.contactAddress },
                { Icon: Mail, text: C.contactEmail, href: `mailto:${C.contactEmail}` },
                { Icon: Clock, text: C.contactHours },
              ].map(({ Icon, text, href }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm" style={{ color: `${C.footerTextColor}cc` }}>
                  <Icon size={15} className="mt-0.5 shrink-0" style={{ color: C.footerTextColor }} />
                  {href ? <a href={href} className="hover:opacity-100 transition-opacity break-all">{text}</a> : <span>{text}</span>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'rgba(255,255,255,0.2)' }}>
          <p className="text-xs" style={{ color: `${C.footerTextColor}88` }}>© {new Date().getFullYear()} {company.name}. {t('footer.rights')}</p>
          <p className="text-xs" style={{ color: `${C.footerTextColor}88` }}>🌸 Made with love in Brașov</p>
        </div>
      </div>
    </footer>
  )
}
