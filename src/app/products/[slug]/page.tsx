'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound, useParams } from 'next/navigation'
import { ArrowLeft, Check, Package, Shield, Truck } from 'lucide-react'
import { getProductBySlug, getRelatedProducts } from '@/data/products'
import { localize, localizeFeatures } from '@/types/product'
import ProductCard from '@/app/components/ui/ProductCard'
import { useLanguage } from '@/lib/LanguageContext'

export default function ProductDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const { t, lang } = useLanguage()

  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product.slug, product.category)
  const categoryLabel = t(`cat.${product.category}`)
  const isInStock = product.availability === 'instock'
  const name = localize(product.name, lang)
  const fullDesc = localize(product.fullDescription, lang)
  const features = localizeFeatures(product.features, lang)

  return (
    <div className="pt-20 lg:pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center gap-2 text-sm text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition-colors">{t('nav.home')}</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-stone-900 transition-colors">{t('nav.products')}</Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`} className="hover:text-stone-900 transition-colors">{categoryLabel}</Link>
          <span>/</span>
          <span className="text-stone-900 truncate max-w-[180px]">{name}</span>
        </nav>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div>
            <div className="relative aspect-square rounded-md overflow-hidden bg-stone-100 mb-4">
              <Image src={product.image} alt={name} fill priority
                className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              {product.badge && (
                <div className="absolute top-4 left-4 bg-amber-400 text-stone-900 text-xs font-medium px-3 py-1 rounded-sm">
                  {localize(product.badge, lang)}
                </div>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <div key={i} className="relative aspect-square rounded-sm overflow-hidden bg-stone-100 border-2 border-transparent hover:border-pink-400 cursor-pointer transition-colors">
                    <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="25vw" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-pink-600 mb-2">{categoryLabel}</p>
            <h1 className="font-display text-4xl sm:text-5xl font-light text-stone-900 mb-4">{name}</h1>

            {product.price && (
              <p className="text-2xl font-medium text-stone-900 mb-2">NT$ {product.price.toLocaleString()}</p>
            )}

            <div className="flex items-center gap-3 mb-6">
              <span className={`text-sm font-medium px-3 py-1 rounded-sm ${isInStock ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                {isInStock ? t('products.instock') : t('products.preorder')}
              </span>
            </div>

            <p className="text-stone-600 leading-relaxed mb-8">{fullDesc}</p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link href="/contact" className="flex-1 bg-pink-600 text-white text-sm font-medium text-center py-4 rounded-sm hover:bg-pink-700 transition-colors">
                {t('products.inquire')}
              </Link>
              <Link href="/contact" className="flex-1 border border-stone-300 text-stone-700 text-sm font-medium text-center py-4 rounded-sm hover:bg-stone-50 transition-colors">
                {t('products.visit')}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-stone-200 mb-8">
              {[
                { icon: Shield, label: t('products.warranty') },
                { icon: Truck, label: t('products.delivery') },
                { icon: Package, label: t('products.packaging') },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon size={20} className="text-pink-600" />
                  <span className="text-xs text-stone-500">{label}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="mb-8">
              <h2 className="font-medium text-stone-900 mb-4">{t('products.features')}</h2>
              <ul className="space-y-2.5">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-stone-600">
                    <div className="w-5 h-5 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                      <Check size={11} className="text-pink-600" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="font-medium text-stone-900 mb-4">{t('products.specs')}</h2>
              <div className="rounded-md border border-stone-200 overflow-hidden">
                {product.specifications.map((spec, i) => (
                  <div key={i} className={`flex items-start gap-4 px-4 py-3 text-sm ${i % 2 === 0 ? 'bg-stone-50' : 'bg-white'}`}>
                    <span className="w-32 shrink-0 text-stone-400 font-medium">{localize(spec.label, lang)}</span>
                    <span className="text-stone-700">{localize(spec.value, lang)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/products" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-900 transition-colors">
          <ArrowLeft size={15} />
          {t('products.back')}
        </Link>
      </div>

      {related.length > 0 && (
        <section className="bg-stone-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-light text-stone-900 mb-8">{t('products.related')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
