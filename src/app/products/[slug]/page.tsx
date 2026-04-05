'use client'

// Image replaced with img
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { ArrowLeft, Check, Clock, MapPin, Star } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { localize, localizeFeatures } from '@/types/product'
import ProductCard from '@/app/components/ui/ProductCard'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t, lang } = useLanguage()

  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.slug, product.category)
  const catKey = `cat.${product.category}` as any
  const categoryLabel = t(catKey) || product.category
  const isInStock = product.availability === 'instock'
  const name = localize(product.name, lang)
  const fullDesc = localize(product.fullDescription, lang)
  const features = localizeFeatures(product.features, lang)

  return (
    <div className="pt-20 lg:pt-24" style={{ background: C.bgColor }}>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm flex-wrap" style={{ color: `${C.primaryColor}99` }}>
          <Link href="/" className="hover:opacity-80 transition-opacity">{t('nav.home')}</Link>
          <span style={{ color: `${C.primaryColor}44` }}>/</span>
          <Link href="/products" className="hover:opacity-80 transition-opacity">{t('nav.products')}</Link>
          <span style={{ color: `${C.primaryColor}44` }}>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:opacity-80 transition-opacity">{categoryLabel}</Link>
          <span style={{ color: `${C.primaryColor}44` }}>/</span>
          <span style={{ color: C.primaryColor }} className="font-medium truncate max-w-[180px]">{name}</span>
        </nav>
      </div>

      {/* Main section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Image */}
          <div>
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: `3px solid ${C.primaryColor}22` }}>
              <img src={product.image} alt={name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to top, ${C.primaryColor}33 0%, transparent 60%)` }} />
              {product.badge && (
                <div className="absolute top-4 left-4 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow"
                  style={{ background: C.primaryColor }}>
                  {localize(product.badge, lang)}
                </div>
              )}
              {/* Taiwan authentic badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
                <span className="text-xs">🇹🇼</span>
                <span className="text-xs font-semibold" style={{ color: C.primaryColor }}>Taiwan Authentic</span>
              </div>
            </div>

            {/* Extra images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {product.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all hover:scale-105"
                    style={{ borderColor: `${C.primaryColor}44` }}>
                    <img src={img} alt={`${name} ${i+1}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {/* Category + name */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-4"
              style={{ background: `${C.primaryColor}11`, color: C.primaryColor }}>
              🌸 {categoryLabel}
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-light mb-4"
              style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>
              {name}
            </h1>

            {/* Stock status */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`text-sm font-semibold px-4 py-1.5 rounded-full ${isInStock ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>
                {isInStock ? '✅ ' + t('products.instock') : '⏳ ' + t('products.preorder')}
              </span>
            </div>

            {/* Description */}
            <p className="leading-relaxed mb-8 text-base" style={{ color: `${C.primaryColor}99`, fontFamily: C.fontBody }}>
              {fullDesc}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/contact"
                className="flex-1 text-white text-sm font-bold text-center py-4 rounded-full transition-all hover:scale-105 hover:shadow-lg"
                style={{ background: `linear-gradient(135deg, ${C.primaryColor}, ${C.primaryColor}cc)` }}>
                {t('products.inquire')}
              </Link>
              <Link href="/contact"
                className="flex-1 text-sm font-semibold text-center py-4 rounded-full transition-all hover:opacity-80 border-2"
                style={{ borderColor: C.primaryColor, color: C.primaryColor, background: 'white' }}>
                📍 {t('products.visit')}
              </Link>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-3 py-6 border-y mb-8" style={{ borderColor: `${C.primaryColor}22` }}>
              {[
                { icon: Star,    text: t('products.warranty') },
                { icon: Clock,   text: t('products.delivery') },
                { icon: MapPin,  text: t('products.packaging') },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex flex-col items-center gap-2 text-center p-3 rounded-2xl"
                  style={{ background: `${C.primaryColor}08` }}>
                  <Icon size={18} style={{ color: C.primaryColor }} />
                  <span className="text-xs font-medium" style={{ color: `${C.primaryColor}99` }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="font-display text-xl font-light mb-4" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>
                {t('products.features')}
              </h2>
              <ul className="space-y-2.5">
                {features.map(f => (
                  <li key={f} className="flex items-center gap-3 text-sm" style={{ color: `${C.primaryColor}99` }}>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${C.primaryColor}15` }}>
                      <Check size={11} style={{ color: C.primaryColor }} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            <div>
              <h2 className="font-display text-xl font-light mb-4" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>
                {t('products.specs')}
              </h2>
              <div className="rounded-2xl overflow-hidden border" style={{ borderColor: `${C.primaryColor}22` }}>
                {product.specifications.map((spec, i) => (
                  <div key={i} className="flex items-start gap-4 px-4 py-3 text-sm"
                    style={{ background: i % 2 === 0 ? `${C.primaryColor}06` : 'white' }}>
                    <span className="w-32 shrink-0 font-semibold text-xs uppercase tracking-wider"
                      style={{ color: `${C.primaryColor}77` }}>
                      {localize(spec.label, lang)}
                    </span>
                    <span style={{ color: '#2d1b24' }}>{localize(spec.value, lang)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Link href="/products"
          className="inline-flex items-center gap-2 text-sm font-medium transition-all hover:gap-3"
          style={{ color: C.primaryColor }}>
          <ArrowLeft size={15} /> {t('products.back')}
        </Link>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: `linear-gradient(180deg, ${C.bgColor} 0%, ${C.secondaryColor}44 100%)` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1" style={{ background: `${C.primaryColor}22` }} />
              <h2 className="font-display text-2xl font-light" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>
                🌸 {t('products.related')}
              </h2>
              <div className="h-px flex-1" style={{ background: `${C.primaryColor}22` }} />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
