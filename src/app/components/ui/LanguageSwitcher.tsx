'use client'

import { useLanguage, type Language } from '@/lib/LanguageContext'
import clsx from 'clsx'

interface Props {
  transparent?: boolean
}

const flags: Record<Language, string> = {
  en: '🇬🇧',
  ro: '🇷🇴',
}

const labels: Record<Language, string> = {
  en: 'EN',
  ro: 'RO',
}

export default function LanguageSwitcher({ transparent }: Props) {
  const { lang, setLang } = useLanguage()

  const other: Language = lang === 'en' ? 'ro' : 'en'

  return (
    <div className="flex items-center gap-1 rounded-sm overflow-hidden border border-white/20">
      {(['en', 'ro'] as Language[]).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          title={l === 'en' ? 'English' : 'Română'}
          className={clsx(
            'flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium transition-all duration-200',
            lang === l
              ? transparent
                ? 'bg-white/20 text-white'
                : 'bg-pink-600 text-white'
              : transparent
                ? 'text-white/60 hover:text-white hover:bg-white/10'
                : 'text-stone-500 hover:text-stone-800 hover:bg-stone-100'
          )}
        >
          <span>{flags[l]}</span>
          <span>{labels[l]}</span>
        </button>
      ))}
    </div>
  )
}
