'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'
import LanguageSwitcher from '@/app/components/ui/LanguageSwitcher'
// Image replaced with img
import clsx from 'clsx'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { t } = useLanguage()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  useEffect(() => { setOpen(false) }, [pathname])

  const isTransparent = isHome && !scrolled
  const navLinks = [
    { href: '/', label: t('nav.home') },
    { href: '/about', label: t('nav.about') },
    { href: '/products', label: t('nav.products') },
    { href: '/contact', label: t('nav.contact') },
  ]

  return (
    <header className={clsx('fixed top-0 left-0 right-0 z-50 transition-all duration-500',
      !isTransparent && 'border-b shadow-sm')}
      style={!isTransparent ? { background: C.navbarBg, backdropFilter: 'blur(20px)', borderColor: `${C.primaryColor}22` } : {}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center shrink-0">
            <div className="relative shrink-0" style={{ width: `${C.navbarLogoSize}px`, height: `${Math.round(C.navbarLogoSize * 0.6)}px` }}>
              <img src="/images/logo.png" alt="Sakura Bubble Tea" className="absolute inset-0 w-full h-full object-contain" />
            </div>
          </Link>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="text-sm font-medium transition-colors relative group"
                style={{ color: isTransparent ? '#6b2149' : C.navbarTextColor, fontFamily: C.fontBody }}>
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-0.5 rounded-full transition-all duration-300"
                  style={{ background: C.primaryColor, width: pathname === link.href ? '100%' : '0' }} />
              </Link>
            ))}
            <LanguageSwitcher transparent={isTransparent} />
            <Link href="/products"
              className="px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105 text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)`, borderRadius: C.navbarBtnRadius }}>
              {t('nav.shop')}
            </Link>
          </nav>
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher transparent={isTransparent} />
            <button onClick={() => setOpen(!open)} className="p-2 rounded-full" style={{ color: C.navbarTextColor }}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>
      <div className={clsx('lg:hidden overflow-hidden transition-all duration-300 border-t', open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0')}
        style={{ background: C.navbarBg, backdropFilter: 'blur(20px)', borderColor: `${C.primaryColor}22` }}>
        <nav className="px-4 py-4 flex flex-col gap-1">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              className="px-4 py-3 rounded-2xl text-sm font-medium"
              style={{ color: C.navbarTextColor, background: pathname === link.href ? `${C.primaryColor}11` : 'transparent' }}>
              {link.label}
            </Link>
          ))}
          <Link href="/products"
            className="mt-2 px-4 py-3 text-white text-sm font-semibold text-center"
            style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)`, borderRadius: C.navbarBtnRadius }}>
            {t('nav.shop')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
