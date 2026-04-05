'use client'

import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/lib/LanguageContext'

export default function ContactForm() {
  const { t } = useLanguage()
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof form>>({})

  const validate = () => {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = t('contact.form.error.name')
    if (!form.email.trim()) e.email = t('contact.form.error.email')
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = t('contact.form.error.email.invalid')
    if (!form.message.trim()) e.message = t('contact.form.error.message')
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof form]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 px-8 bg-pink-50 rounded-md border border-pink-100">
        <CheckCircle size={48} className="text-pink-600 mb-4" />
        <h3 className="font-display text-2xl font-medium text-stone-900 mb-2">{t('contact.form.success.title')}</h3>
        <p className="text-stone-500 text-sm max-w-sm">{t('contact.form.success.desc')}</p>
        <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }) }}
          className="mt-6 text-sm text-pink-600 hover:text-pink-700 underline">
          {t('contact.form.success.again')}
        </button>
      </div>
    )
  }

  const inputClass = (field: keyof typeof errors) =>
    `w-full px-4 py-3 text-sm border rounded-sm bg-white focus:outline-none focus:ring-1 transition ${
      errors[field] ? 'border-red-400 focus:border-red-400 focus:ring-red-200' : 'border-stone-300 focus:border-pink-400 focus:ring-pink-100'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 mb-1.5">
            {t('contact.form.name')} <span className="text-red-500">*</span>
          </label>
          <input id="name" name="name" type="text" value={form.name} onChange={handleChange}
            placeholder={t('contact.form.name.placeholder')} className={inputClass('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-stone-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange}
            placeholder={t('contact.form.email.placeholder')} className={inputClass('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-stone-700 mb-1.5">{t('contact.form.phone')}</label>
          <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange}
            placeholder={t('contact.form.phone.placeholder')}
            className="w-full px-4 py-3 text-sm border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition" />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-stone-700 mb-1.5">{t('contact.form.subject')}</label>
          <select id="subject" name="subject" value={form.subject} onChange={handleChange}
            className="w-full px-4 py-3 text-sm border border-stone-300 rounded-sm bg-white focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-100 transition text-stone-700">
            <option value="">{t('contact.form.subject.placeholder')}</option>
            <option value="product">{t('contact.form.subject.product')}</option>
            <option value="custom">{t('contact.form.subject.custom')}</option>
            <option value="visit">{t('contact.form.subject.visit')}</option>
            <option value="aftersales">{t('contact.form.subject.aftersales')}</option>
            <option value="corporate">{t('contact.form.subject.corporate')}</option>
            <option value="other">{t('contact.form.subject.other')}</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-stone-700 mb-1.5">
          {t('contact.form.message')} <span className="text-red-500">*</span>
        </label>
        <textarea id="message" name="message" rows={5} value={form.message} onChange={handleChange}
          placeholder={t('contact.form.message.placeholder')} className={`${inputClass('message')} resize-none`} />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-pink-600 text-white py-4 text-sm font-medium rounded-sm hover:bg-pink-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all">
        {loading ? (
          <><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>{t('contact.form.sending')}</>
        ) : (
          <><Send size={15} />{t('contact.form.submit')}</>
        )}
      </button>
      <p className="text-xs text-stone-400 text-center">{t('contact.form.privacy')}</p>
    </form>
  )
}
