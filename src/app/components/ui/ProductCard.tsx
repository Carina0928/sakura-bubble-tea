'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Product, localize } from '@/types/product'
import { useLanguage } from '@/lib/LanguageContext'
import { SITE_CONFIG as C } from '@/lib/siteConfig'

export default function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLanguage()
  const name = localize(product.name, lang)
  const desc = localize(product.shortDescription, lang)
  return (
    <Link href={`/products/${product.slug}`}
      className="group flex flex-col rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
      style={{ background: C.productsCardBg, border: `1.5px solid ${C.productsCardBorder}`, boxShadow: `0 4px 20px ${C.primaryColor}18` }}>
      <div className="relative aspect-square overflow-hidden">
        <Image src={product.image} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="25vw" />
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${C.primaryColor}33 0%, transparent 50%)` }} />
        {product.badge && (
          <div className="absolute top-2.5 right-2.5 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow"
            style={{ background: C.primaryColor }}>{localize(product.badge, lang)}</div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display text-base font-medium leading-tight mb-1" style={{ color: '#2d1b24', fontFamily: C.fontHeading }}>{name}</h3>
        <p className="text-xs flex-1 leading-relaxed" style={{ color: C.primaryColor, opacity: 0.65 }}>{desc}</p>
        <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: `${C.primaryColor}22` }}>
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: C.primaryColor, opacity: 0.7 }}>
            {product.availability === 'instock' ? '✅ ' + t('products.instock') : '⏳ ' + t('products.preorder')}
          </span>
          <span className="text-xs font-medium group-hover:translate-x-1 transition-transform inline-flex items-center gap-1" style={{ color: C.primaryColor }}>
            {t('products.detail')} →
          </span>
        </div>
      </div>
    </Link>
  )
}
