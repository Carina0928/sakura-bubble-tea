import type { Language } from '@/lib/LanguageContext'

export type LocalizedString = string | Record<Language, string>

export interface ProductSpecification {
  label: LocalizedString
  value: LocalizedString
}

export interface Product {
  id: string
  slug: string
  name: LocalizedString
  category: string
  shortDescription: LocalizedString
  fullDescription: LocalizedString
  price: number | null
  image: string
  images?: string[]
  features: LocalizedString[] | Record<Language, string[]>
  specifications: ProductSpecification[]
  availability: 'instock' | 'preorder'
  badge?: LocalizedString
  featured?: boolean
}

export interface Category {
  id: string
  label: string
}

// Helper to resolve a LocalizedString given a language
export function localize(value: LocalizedString, lang: Language): string {
  if (typeof value === 'string') return value
  return value[lang] ?? value['en'] ?? ''
}

// Helper for features array
export function localizeFeatures(features: LocalizedString[] | Record<Language, string[]>, lang: Language): string[] {
  if (Array.isArray(features)) return features.map(f => localize(f, lang))
  return features[lang] ?? features['en'] ?? []
}
