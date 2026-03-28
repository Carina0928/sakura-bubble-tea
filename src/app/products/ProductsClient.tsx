'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, X } from 'lucide-react'
import { products } from '@/data/products'
import ProductCard from '@/app/components/ui/ProductCard'
import { useLanguage } from '@/lib/LanguageContext'
import clsx from 'clsx'

const categories = [
  { id: 'all',     labelEn: 'All',          labelRo: 'Toate',    icon: '🌸' },
  { id: 'tea',     labelEn: 'Tea',          labelRo: 'Ceai',     icon: '🍵' },
  { id: 'popping', labelEn: 'Popping Boba', labelRo: 'Popping',  icon: '🫧' },
  { id: 'matcha',  labelEn: 'Matcha',       labelRo: 'Matcha',   icon: '🍵' },
  { id: 'tapioca', labelEn: 'Tapioca',      labelRo: 'Tapioca',  icon: '🧋' },
  { id: 'oreo',    labelEn: 'Oreo',         labelRo: 'Oreo',     icon: '🍪' },
  { id: 'special', labelEn: 'Special',      labelRo: 'Speciale', icon: '⭐' },
]

// Exact sakura shape from reference image 1:
// 5 petals, each petal has rounded tip with small center notch, soft veins, center dot
function SakuraSVG({ active }: { active: boolean }) {
  const fill = active ? '#f472b6' : '#fce7f3'
  const fillDark = active ? '#ec4899' : '#fbcfe8'
  const vein = active ? 'rgba(255,255,255,0.4)' : 'rgba(236,72,153,0.2)'
  const center = active ? '#be185d' : '#f9a8d4'

  // Each petal path: rounded shape with small notch at tip (like real sakura)
  // Generated from the reference image shape
  const petalPath = `
    M 50,50
    C 50,50 38,32 35,22
    C 32,12 36,2 43,4
    C 47,5 50,10 50,10
    C 50,10 53,5 57,4
    C 64,2 68,12 65,22
    C 62,32 50,50 50,50 Z
  `

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" style={{ overflow: 'visible' }}>
      <defs>
        <filter id={`glow-${active}`}>
          {active && <feGaussianBlur stdDeviation="2" result="coloredBlur"/>}
          {active && <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>}
        </filter>
      </defs>

      {/* 5 petals rotated around center */}
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <g key={i} transform={`rotate(${angle}, 50, 50)`}>
          {/* Petal body */}
          <path
            d={petalPath}
            fill={fill}
            stroke={fillDark}
            strokeWidth="0.8"
          />
          {/* Vein line from center to tip */}
          <line
            x1="50" y1="50"
            x2="50" y2="7"
            stroke={vein}
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Center circle */}
      <circle cx="50" cy="50" r="7" fill={center} opacity="0.9" />
      <circle cx="50" cy="50" r="3.5" fill={active ? '#fff' : '#fda4af'} opacity="0.8" />
    </svg>
  )
}

function CategoryButton({ icon, label, active, onClick }: {
  icon: string; label: string; active: boolean; onClick: () => void
}) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-2 group">
      <div className={clsx(
        'relative w-16 h-16 transition-all duration-300',
        active ? 'scale-115 drop-shadow-lg' : 'hover:scale-110',
      )}
        style={{ filter: active ? 'drop-shadow(0 3px 8px rgba(236,72,153,0.45))' : 'drop-shadow(0 1px 3px rgba(0,0,0,0.1))' }}>
        <SakuraSVG active={active} />
        {/* Icon on top */}
        <span className="absolute inset-0 flex items-center justify-center text-xl pb-1">{icon}</span>
      </div>
      <span className={clsx(
        'text-xs font-medium transition-colors whitespace-nowrap',
        active ? 'text-pink-600 font-semibold' : 'text-stone-500 group-hover:text-pink-400'
      )}>
        {label}
      </span>
    </button>
  )
}

export default function ProductsClient() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') ?? 'all'
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(initialCategory)
  const { lang, t } = useLanguage()

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchCat = activeCategory === 'all' || p.category === activeCategory
      const name = typeof p.name === 'string' ? p.name : (p.name as Record<string,string>)[lang] ?? ''
      const desc = typeof p.shortDescription === 'string' ? p.shortDescription : (p.shortDescription as Record<string,string>)[lang] ?? ''
      const matchSearch = search.trim() === '' ||
        name.toLowerCase().includes(search.toLowerCase()) ||
        desc.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchSearch
    })
  }, [search, activeCategory, lang])

  const getLabel = (cat: typeof categories[0]) => lang === 'ro' ? cat.labelRo : cat.labelEn

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 lg:top-20 z-30 bg-white/96 backdrop-blur-md border-b border-pink-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-end gap-5 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((cat) => (
                <CategoryButton
                  key={cat.id}
                  icon={cat.icon}
                  label={getLabel(cat)}
                  active={activeCategory === cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                />
              ))}
            </div>
            <div className="relative w-full sm:w-56 shrink-0">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-300" />
              <input type="text" placeholder={t('products.search.placeholder')} value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-8 py-2 text-sm border border-pink-200 rounded-full bg-white focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition placeholder-stone-300"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-sm text-stone-400 mb-8">
          🌸 <span className="font-medium text-stone-700">{filtered.length}</span> {t('products.count')}
        </p>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌸</div>
            <p className="font-display text-3xl text-stone-300 mb-3">{t('products.empty.title')}</p>
            <p className="text-stone-400 text-sm mb-6">{t('products.empty.desc')}</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all') }}
              className="px-6 py-2.5 bg-pink-500 text-white text-sm rounded-full hover:bg-pink-600 transition-colors">
              {t('products.empty.clear')}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
