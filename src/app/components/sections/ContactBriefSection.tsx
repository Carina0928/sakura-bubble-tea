'use client'

import Link from 'next/link'
import { MapPin, Mail, Clock, ArrowRight } from 'lucide-react'
import { company } from '@/data/company'
import { useLanguage } from '@/lib/LanguageContext'

export default function ContactBriefSection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.15em] uppercase text-pink-500 mb-4">{t('contact.eyebrow')}</p>
            <h2 className="font-display text-4xl sm:text-5xl font-light text-stone-900 leading-tight mb-6">{t('contact.title')}</h2>
            <p className="text-stone-500 leading-relaxed mb-10">{t('contact.desc')}</p>

            <ul className="space-y-5 mb-10">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800 mb-0.5">{t('contact.address.label')}</p>
                  <p className="text-sm text-stone-500">{company.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                  <Clock size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800 mb-1">{t('contact.hours.label')}</p>
                  {company.businessHours.map((h) => (
                    <div key={h.day} className="flex gap-3 text-sm text-stone-500">
                      <span className="w-36 shrink-0">{h.day}:</span>
                      <span className="font-medium text-stone-700">{h.hours}</span>
                    </div>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-pink-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-800 mb-0.5">{t('contact.email.label')}</p>
                  <a href={`mailto:${company.email}`} className="text-sm text-stone-500 hover:text-pink-500 transition-colors">{company.email}</a>
                </div>
              </li>
            </ul>

            <Link href="/contact" className="group inline-flex items-center gap-2 bg-pink-500 text-white px-6 py-3 text-sm font-medium rounded-full hover:bg-pink-600 transition-colors">
              {t('contact.cta')}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-[480px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={company.mapEmbedUrl}
              width="100%" height="100%"
              style={{ border: 0 }} allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sakura Bubble Tea — Strada Diaconu Coresi 2, Brașov"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
