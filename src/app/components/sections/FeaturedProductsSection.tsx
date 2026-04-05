'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
// Image replaced with img
import { getFeaturedProducts } from '@/data/products'
import { useLanguage } from '@/lib/LanguageContext'
import { localize } from '@/types/product'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function FeaturedProductsSection() {
  const featured = getFeaturedProducts()
  const { t, lang } = useLanguage()
  return (
    <section className="py-20" style={{ background: C.productsBg }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-xs font-medium tracking-[0.25em] uppercase mb-3" style={{ color: C.primaryColor }}>🌸 {t('featured.eyebrow')}</p>
          <h2 className="font-display text-4xl sm:text-5xl font-light" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>{t('featured.title')}</h2>
          <p className="mt-2" style={{ color: C.primaryColor, opacity: 0.7 }}>{t('featured.desc')}</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {featured.map((product) => {
            const name = localize(product.name, lang)
            const desc = localize(product.shortDescription, lang)
            return (
              <Link key={product.id} href={`/products/${product.slug}`}
                className="group flex flex-col items-center hover:-translate-y-2 transition-all duration-300">
                <div className="relative w-full aspect-square rounded-3xl overflow-hidden mb-3 shadow-md group-hover:shadow-xl transition-shadow"
                  style={{ background: C.productsCardBg, border: `1.5px solid ${C.productsCardBorder}` }}>
                  <img src={product.image} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.primaryColor}33 0%, transparent 60%)` }} />
                  {product.badge && (
                    <div className="absolute top-2 right-2 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow"
                      style={{ background: C.primaryColor }}>{localize(product.badge, lang)}</div>
                  )}
                </div>
                <div className="w-3/4 h-4 rounded-full mb-2" style={{ background: `${C.primaryColor}33` }} />
                <h3 className="font-display text-sm font-medium text-center" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>{name}</h3>
                <p className="text-xs text-center mt-0.5" style={{ color: C.primaryColor, opacity: 0.6 }}>{desc.slice(0,40)}...</p>
              </Link>
            )
          })}
        </div>
        <div className="text-center">
          <Link href="/products"
            className="inline-flex items-center gap-2 text-white px-8 py-3.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)` }}>
            {t('featured.all')} <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
