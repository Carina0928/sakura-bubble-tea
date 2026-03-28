'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// ═══════════════════════════════
// TYPES
// ═══════════════════════════════
interface ProductConfig { id: string; name: string; image: string; category: string }
interface SiteConfig {
  primaryColor: string; secondaryColor: string; bgColor: string
  fontHeading: string; fontBody: string
  navbarBg: string; navbarTextColor: string; navbarLogoSize: string
  heroTitle: string; heroSubtitle: string; heroTagline: string; heroDescription: string
  heroBg: string; heroTitleColor: string; heroTextColor: string
  heroBtnColor: string; heroBtnTextColor: string; heroBtnRadius: string
  heroBgImage: string; heroBgType: string
  stat1Value: string; stat1Label: string; stat2Value: string; stat2Label: string; stat3Value: string; stat3Label: string
  mainCircleImage: string
  smallCircle1Image: string; smallCircle1Label: string
  smallCircle2Image: string; smallCircle2Label: string
  smallCircle3Image: string; smallCircle3Label: string
  aboutTitle: string; aboutSubtitle: string; aboutP1: string; aboutP2: string
  aboutImage: string; aboutBgColor: string; aboutTextColor: string; aboutFoundedYear: string
  productsTitle: string; productsSubtitle: string; productsBg: string
  productsCardBg: string; productsCardBorder: string
  contactTitle: string; contactSubtitle: string; contactEmail: string
  contactAddress: string; contactHours: string; contactBgColor: string
  footerBg: string; footerTextColor: string; footerTagline: string
  ctaTitle: string; ctaDesc: string; ctaBg: string; ctaTextColor: string
  featuresBg: string
  products: Record<string, string>  // productId -> imageUrl
}

const ALL_PRODUCTS: ProductConfig[] = [
  // Tea Series
  { id:'c1', name:'Ceai Simplu', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  { id:'c2', name:'Lychee Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'c3', name:'Lămâie Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
  { id:'c4', name:'Mango Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
  { id:'c5', name:'Căpșuni Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { id:'c6', name:'Piersică Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  { id:'c7', name:'Fructul Pasiunii Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'c8', name:'Pepene Roșu Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
  { id:'c9', name:'Guava Tea', category:'🍵 Seria Ceai', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
  // Popping Boba
  { id:'p1', name:'Lămâie Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  { id:'p2', name:'Lychee Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'p3', name:'Piersică Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { id:'p4', name:'Mango Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
  { id:'p5', name:'Fructul Pasiunii Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
  { id:'p6', name:'Căpșuni Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { id:'p7', name:'Ananas Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'p8', name:'Pepene Roșu Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
  { id:'p9', name:'Guava + Lămâie Popping Boba', category:'🫧 Popping Boba', image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
  // Matcha
  { id:'m1', name:'Matcha + Tapioca', category:'🍵 Matcha', image:'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80' },
  { id:'m2', name:'Matcha + Lychee + Căpșuni', category:'🍵 Matcha', image:'https://images.unsplash.com/photo-1572490122747-3a2ac3d5ff56?w=400&q=80' },
  { id:'m3', name:'Matcha + Dulceață Căpșuni + Jeleu Mango', category:'🍵 Matcha', image:'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80' },
  { id:'m4', name:'Matcha + Ananas + Jeleu Mango', category:'🍵 Matcha', image:'https://images.unsplash.com/photo-1572490122747-3a2ac3d5ff56?w=400&q=80' },
  { id:'m5', name:'Matcha cu Lapte + Căpșuni', category:'🍵 Matcha', image:'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=400&q=80' },
  // Tapioca
  { id:'t1', name:'Lapte Ceai Negru + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'t2', name:'Lapte Ceai Verde + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1572490122747-3a2ac3d5ff56?w=400&q=80' },
  { id:'t3', name:'Taro + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1594488467017-7e38a26e7c93?w=400&q=80' },
  { id:'t4', name:'Căpșuni + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { id:'t5', name:'Piersici + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&q=80' },
  { id:'t6', name:'Budincă + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'t7', name:'Gumă de Mestecat + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
  { id:'t8', name:'Ciocolată + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
  { id:'t9', name:'Banane + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { id:'t10', name:'Cafe Latte + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'t11', name:'Cocos + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
  { id:'t12', name:'Vanilie + Tapioca', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
  { id:'t13', name:'Lapte cu Zahăr Brun', category:'🧋 Tapioca', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  // Oreo
  { id:'o1', name:'Oreo cu Căpșuni', category:'🍪 Oreo', image:'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80' },
  { id:'o2', name:'Oreo cu Mentă', category:'🍪 Oreo', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'o3', name:'Oreo cu Nucă de Cocos', category:'🍪 Oreo', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
  { id:'o4', name:'Oreo cu Gust de Budincă', category:'🍪 Oreo', image:'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&q=80' },
  { id:'o5', name:'Oreo cu Taro', category:'🍪 Oreo', image:'https://images.unsplash.com/photo-1594488467017-7e38a26e7c93?w=400&q=80' },
  // Special
  { id:'s1', name:'Taro & Căpșuni Special', category:'⭐ Speciale', image:'https://images.unsplash.com/photo-1594488467017-7e38a26e7c93?w=400&q=80' },
  { id:'s2', name:'Caramel Milk Tea + Coffee Jelly', category:'⭐ Speciale', image:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id:'s3', name:'Brown Sugar Milk (Special)', category:'⭐ Speciale', image:'https://images.unsplash.com/photo-1546173159-315724a31696?w=400&q=80' },
]

const DEFAULT_CONFIG: SiteConfig = {
  primaryColor: '#f90b5a', secondaryColor: '#ffc2d4', bgColor: '#fff5f8',
  fontHeading: 'Cormorant Garamond', fontBody: 'DM Sans',
  navbarBg: 'rgba(255,240,248,0.95)', navbarTextColor: '#be185d', navbarLogoSize: '130',
  heroTitle: 'Sakura', heroSubtitle: 'Bubble Tea',
  heroTagline: '🌸 Autentic Taiwanez în Brașov',
  heroDescription: 'Ingrediente proaspete, rețete originale. 40+ arome care îți cuceresc simțurile.',
  heroBg: 'linear-gradient(150deg, #ffffff 0%, #ffe0ec 20%, #ffb3cc 45%, #ff5090 75%, #f90b5a 100%)',
  heroTitleColor: '#f90b5a', heroTextColor: '#6b2149',
  heroBtnColor: '#f90b5a', heroBtnTextColor: '#ffffff', heroBtnRadius: '9999px',
  heroBgImage: '', heroBgType: 'gradient',
  stat1Value: '40+', stat1Label: 'Arome',
  stat2Value: '4.5★', stat2Label: 'Google',
  stat3Value: '2020', stat3Label: 'Fondată',
  mainCircleImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=90',
  smallCircle1Image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=300&q=85',
  smallCircle1Label: 'Matcha 🍵',
  smallCircle2Image: 'https://images.unsplash.com/photo-1594488467017-7e38a26e7c93?w=300&q=85',
  smallCircle2Label: 'Taro 🧋',
  smallCircle3Image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=300&q=85',
  smallCircle3Label: 'Strawberry 🍓',
  aboutTitle: 'Un colț de sakura, în inima Brașovului', aboutSubtitle: 'Povestea Noastră',
  aboutP1: 'Sunt originar din Taiwan — locul unde s-a născut bubble tea-ul. Pentru mine, această băutură nu este un trend, ci o parte din viață.',
  aboutP2: 'La Sakura Bubble Tea, redefinim experiența bubble tea prin eleganță, rafinament și atenție la detalii.',
  aboutImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',
  aboutBgColor: '#fff5f8', aboutTextColor: '#6b2149', aboutFoundedYear: '2019',
  productsTitle: 'Produsele Noastre', productsSubtitle: '40+ arome autentice din Taiwan',
  productsBg: 'linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)',
  productsCardBg: 'rgba(255,255,255,0.8)', productsCardBorder: 'rgba(249,11,90,0.2)',
  contactTitle: 'Contactează-ne', contactSubtitle: 'Suntem aici pentru tine',
  contactEmail: 'sakura.bubble.tea.ro@gmail.com',
  contactAddress: 'Strada Diaconu Coresi nr. 2, Brașov',
  contactHours: 'Lun–Vin 13–20 · Sâm–Dum 11–21', contactBgColor: '#fff5f8',
  footerBg: 'linear-gradient(180deg, #ffb6cc 0%, #f90b5a 100%)',
  footerTextColor: '#ffffff', footerTagline: '🌸 Bubble tea autentic taiwanez în inima Brașovului.',
  ctaTitle: 'Vino să ne cunoști!', ctaDesc: 'Strada Diaconu Coresi nr. 2, Brașov · Lun–Vin 13–20 · Sâm–Dum 11–21',
  ctaBg: 'linear-gradient(150deg, #ffffff 0%, #ffe0ec 30%, #f90b5a 100%)', ctaTextColor: '#ffffff',
  featuresBg: 'linear-gradient(150deg, #ffffff 0%, #ffe0ec 30%, #f90b5a 100%)',
  products: Object.fromEntries(ALL_PRODUCTS.map(p => [p.id, p.image])),
}

const KEY = 'sakura-admin-v3'
const PASS = 'sakura2024'
const FONTS = ['Cormorant Garamond','Playfair Display','Great Vibes','Dancing Script','Lato','DM Sans','Poppins','Montserrat','Nunito','Inter']
const THEMES = [
  { n:'🌸 Sakura',  p:'#f90b5a', s:'#ffc2d4', bg:'#fff5f8' },
  { n:'🍑 Piersic', p:'#ff7043', s:'#ffccbc', bg:'#fff8f5' },
  { n:'💜 Taro',   p:'#9c27b0', s:'#e1bee7', bg:'#faf5ff' },
  { n:'🍵 Matcha', p:'#388e3c', s:'#c8e6c9', bg:'#f5fff5' },
  { n:'🫐 Berry',  p:'#3949ab', s:'#c5cae9', bg:'#f5f5ff' },
  { n:'🌊 Ocean',  p:'#0097a7', s:'#b2ebf2', bg:'#f0feff' },
]

// ═══ HELPERS ═══
function Img({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f) return
    const r = new FileReader(); r.onload = ev => onChange(ev.target?.result as string); r.readAsDataURL(f)
  }
  return (
    <div className="mb-3">
      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#be185d' }}>{label}</p>
      {value && <img src={value} className="w-full h-28 object-cover rounded-xl mb-1 border border-pink-200" />}
      <button onClick={() => ref.current?.click()}
        className="w-full py-2 text-xs font-semibold border-2 border-dashed rounded-xl mb-1 hover:bg-pink-50 transition-colors"
        style={{ borderColor: '#f90b5a', color: '#f90b5a' }}>
        📤 Upload foto din calculator
      </button>
      <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden" />
      <input value={value} onChange={e => onChange(e.target.value)} placeholder="Sau lipește URL imagine..."
        className="w-full px-3 py-1.5 text-xs border rounded-xl focus:outline-none focus:border-pink-400"
        style={{ borderColor: '#fca5a5' }} />
    </div>
  )
}

function Col({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#be185d' }}>{label}</p>
      <div className="flex gap-2 items-center">
        <input type="color" value={value.match(/^#[0-9a-f]{6}$/i) ? value : '#f90b5a'}
          onChange={e => onChange(e.target.value)}
          className="w-10 h-9 rounded-lg border-2 cursor-pointer flex-shrink-0" style={{ borderColor: '#fca5a5' }} />
        <input value={value} onChange={e => onChange(e.target.value)}
          className="flex-1 px-3 py-2 text-xs border rounded-xl focus:outline-none"
          style={{ borderColor: '#fca5a5' }} />
      </div>
    </div>
  )
}

function Txt({ label, value, onChange, multi = false }: { label: string; value: string; onChange: (v: string) => void; multi?: boolean }) {
  const cls = "w-full px-3 py-2 text-sm border rounded-xl focus:outline-none focus:border-pink-400 mb-3"
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#be185d' }}>{label}</p>
      {multi
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3} className={cls + ' resize-none'} style={{ borderColor: '#fca5a5' }} />
        : <input value={value} onChange={e => onChange(e.target.value)} className={cls} style={{ borderColor: '#fca5a5' }} />}
    </div>
  )
}

function Sel({ label, value, onChange, opts }: { label: string; value: string; onChange: (v: string) => void; opts: string[] }) {
  return (
    <div className="mb-3">
      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#be185d' }}>{label}</p>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2 text-sm border rounded-xl focus:outline-none bg-white" style={{ borderColor: '#fca5a5' }}>
        {opts.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <p className="mt-1 text-sm" style={{ fontFamily: value }}>{value}: Sakura 桜 🌸</p>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border rounded-2xl overflow-hidden mb-3" style={{ borderColor: '#fce7f3' }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-bold text-left hover:bg-pink-50 transition-colors bg-white"
        style={{ color: '#be185d' }}>
        {title} <span>{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="p-4 bg-white">{children}</div>}
    </div>
  )
}

// ═══ MAIN ═══
export default function AdminPage() {
  const [cfg, setCfg] = useState<SiteConfig>(DEFAULT_CONFIG)
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState('global')
  const [catFilter, setCatFilter] = useState('all')

  useEffect(() => {
    try { const s = localStorage.getItem(KEY); if (s) setCfg({...DEFAULT_CONFIG, ...JSON.parse(s)}) } catch {}
  }, [])

  const set = useCallback((k: keyof SiteConfig, v: string) => setCfg(p => ({ ...p, [k]: v })), [])
  const setProduct = useCallback((id: string, url: string) => {
    setCfg(p => ({ ...p, products: { ...p.products, [id]: url } }))
  }, [])

  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(cfg))
    setSaved(true); setTimeout(() => setSaved(false), 2000)
  }

  const exportCfg = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(cfg, null, 2)], { type: 'application/json' }))
    a.download = 'sakura-config.json'; a.click()
  }

  const applyTheme = (t: typeof THEMES[0]) => setCfg(p => ({
    ...p, primaryColor: t.p, secondaryColor: t.s, bgColor: t.bg,
    heroBtnColor: t.p, heroTitleColor: t.p,
    heroBg: `linear-gradient(150deg, #ffffff 0%, ${t.s} 30%, ${t.p} 100%)`,
  }))

  if (!authed) return (
    <div className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(150deg, #ffd0e0, #f90b5a)' }}>
      <div className="bg-white rounded-3xl p-10 w-80 text-center shadow-2xl">
        <div className="text-6xl mb-3">🌸</div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#be185d' }}>Admin Panel</h1>
        <p className="text-xs mb-5" style={{ color: '#f9a8d4' }}>Sakura Bubble Tea</p>
        <input type="password" placeholder="Parolă" value={pw} onChange={e => setPw(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && pw === PASS && setAuthed(true)}
          className="w-full px-4 py-3 border rounded-xl text-sm mb-3 focus:outline-none"
          style={{ borderColor: '#fca5a5' }} />
        <button onClick={() => pw === PASS ? setAuthed(true) : alert('Parolă greșită')}
          className="w-full py-3 text-white text-sm font-bold rounded-xl"
          style={{ background: 'linear-gradient(135deg, #f90b5a, #c4004a)' }}>
          Intră în Admin
        </button>
        <p className="text-xs mt-3" style={{ color: '#fca5a5' }}>Parola: sakura2024</p>
      </div>
    </div>
  )

  const TABS = [
    { id:'global',   icon:'🌐', label:'Global' },
    { id:'hero',     icon:'🏠', label:'Hero' },
    { id:'images',   icon:'🖼️', label:'Imagini Hero' },
    { id:'products', icon:'🧋', label:'Produse (44)' },
    { id:'about',    icon:'📖', label:'About' },
    { id:'contact',  icon:'📞', label:'Contact' },
    { id:'footer',   icon:'🔻', label:'Footer' },
  ]

  const cats = ['all', ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))]
  const filtered = catFilter === 'all' ? ALL_PRODUCTS : ALL_PRODUCTS.filter(p => p.category === catFilter)

  return (
    <div style={{ background: '#fdf4f7', minHeight: '100vh' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b shadow-sm" style={{ borderColor: '#fce7f3' }}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌸</span>
            <div>
              <p className="font-bold text-sm" style={{ color: '#be185d' }}>Admin Panel</p>
              <p className="text-xs" style={{ color: '#f9a8d4' }}>Sakura Bubble Tea</p>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="/" target="_blank" className="px-3 py-1.5 text-xs border rounded-full hover:bg-pink-50"
              style={{ borderColor: '#fca5a5', color: '#6b7280' }}>🌐 Site</a>
            <button onClick={exportCfg} className="px-3 py-1.5 text-xs border rounded-full hover:bg-pink-50"
              style={{ borderColor: '#f90b5a', color: '#f90b5a' }}>📥 Export</button>
            <button onClick={save}
              className="px-5 py-1.5 text-xs text-white font-bold rounded-full shadow"
              style={{ background: saved ? '#22c55e' : 'linear-gradient(135deg, #f90b5a, #c4004a)' }}>
              {saved ? '✅ Salvat!' : '💾 Salvează'}
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto border-t" style={{ borderColor: '#fce7f3' }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-all flex items-center gap-1.5 ${
                tab === t.id ? 'border-pink-500 text-pink-600 bg-pink-50/50' : 'border-transparent text-stone-400 hover:text-pink-400'
              }`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">

          {/* LEFT: Edit Panel */}
          <div className="xl:col-span-3">

            {tab === 'global' && (
              <div>
                <Card title="🎨 Teme rapide">
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {THEMES.map(t => (
                      <button key={t.n} onClick={() => applyTheme(t)}
                        className="py-2.5 rounded-xl text-white text-xs font-bold hover:scale-105 transition-all shadow"
                        style={{ background: `linear-gradient(135deg, ${t.s}, ${t.p})` }}>
                        {t.n}
                      </button>
                    ))}
                  </div>
                </Card>
                <Card title="🎨 Culori site">
                  <div className="grid grid-cols-2 gap-3">
                    <Col label="Culoare principală" value={cfg.primaryColor} onChange={v => set('primaryColor', v)} />
                    <Col label="Culoare secundară" value={cfg.secondaryColor} onChange={v => set('secondaryColor', v)} />
                    <Col label="Fundal site" value={cfg.bgColor} onChange={v => set('bgColor', v)} />
                  </div>
                </Card>
                <Card title="✍️ Fonturi">
                  <Sel label="Font Titluri" value={cfg.fontHeading} onChange={v => set('fontHeading', v)} opts={FONTS} />
                  <Sel label="Font Text Normal" value={cfg.fontBody} onChange={v => set('fontBody', v)} opts={FONTS} />
                </Card>
                <Card title="🧭 Navbar">
                  <div className="grid grid-cols-2 gap-3">
                    <Col label="Fundal navbar" value={cfg.navbarBg} onChange={v => set('navbarBg', v)} />
                    <Col label="Culoare text" value={cfg.navbarTextColor} onChange={v => set('navbarTextColor', v)} />
                  </div>
                  <Txt label="Mărime logo (px)" value={cfg.navbarLogoSize} onChange={v => set('navbarLogoSize', v)} />
                </Card>
              </div>
            )}

            {tab === 'hero' && (
              <div>
                <Card title="✏️ Texte Hero">
                  <Txt label="Titlu mare" value={cfg.heroTitle} onChange={v => set('heroTitle', v)} />
                  <Txt label="Subtitlu italic" value={cfg.heroSubtitle} onChange={v => set('heroSubtitle', v)} />
                  <Txt label="Tagline (cu emoji)" value={cfg.heroTagline} onChange={v => set('heroTagline', v)} />
                  <Txt label="Descriere" value={cfg.heroDescription} onChange={v => set('heroDescription', v)} multi />
                </Card>
                <Card title="📊 Statistici">
                  <div className="grid grid-cols-3 gap-2">
                    {[['stat1Value','stat1Label'],['stat2Value','stat2Label'],['stat3Value','stat3Label']].map(([v,l],i) => (
                      <div key={i} className="border rounded-xl p-3" style={{ borderColor: '#fce7f3' }}>
                        <p className="text-xs font-bold mb-1" style={{ color: '#f9a8d4' }}>Statistica {i+1}</p>
                        <input value={cfg[v as keyof SiteConfig] as string} onChange={e => set(v as keyof SiteConfig, e.target.value)}
                          placeholder="ex: 40+" className="w-full px-2 py-1.5 text-sm border rounded-lg mb-1 focus:outline-none" style={{ borderColor: '#fca5a5' }} />
                        <input value={cfg[l as keyof SiteConfig] as string} onChange={e => set(l as keyof SiteConfig, e.target.value)}
                          placeholder="ex: Arome" className="w-full px-2 py-1.5 text-xs border rounded-lg focus:outline-none" style={{ borderColor: '#fca5a5' }} />
                      </div>
                    ))}
                  </div>
                </Card>
                <Card title="🖼️ Fundal Hero">
                  <div className="flex gap-2 mb-3">
                    {[['gradient','🌈 Gradient'],['image','🖼️ Imagine'],['solid','🟥 Culoare']].map(([v,l]) => (
                      <button key={v} onClick={() => set('heroBgType', v)}
                        className={`flex-1 py-2 text-xs rounded-xl font-semibold border transition-all ${cfg.heroBgType === v ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-pink-200 text-stone-400'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                  {cfg.heroBgType === 'gradient' && (
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#be185d' }}>Gradient CSS</p>
                      <textarea value={cfg.heroBg} onChange={e => set('heroBg', e.target.value)} rows={3}
                        className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none resize-none mb-1" style={{ borderColor: '#fca5a5' }} />
                      <div className="h-8 rounded-lg" style={{ background: cfg.heroBg }} />
                    </div>
                  )}
                  {cfg.heroBgType === 'image' && (
                    <Img label="Imagine fundal" value={cfg.heroBgImage} onChange={v => set('heroBgImage', v)} />
                  )}
                  {cfg.heroBgType === 'solid' && (
                    <Col label="Culoare fundal" value={cfg.primaryColor} onChange={v => set('primaryColor', v)} />
                  )}
                </Card>
                <Card title="🎨 Culori Hero">
                  <div className="grid grid-cols-2 gap-3">
                    <Col label="Culoare titlu" value={cfg.heroTitleColor} onChange={v => set('heroTitleColor', v)} />
                    <Col label="Culoare text" value={cfg.heroTextColor} onChange={v => set('heroTextColor', v)} />
                    <Col label="Culoare buton" value={cfg.heroBtnColor} onChange={v => set('heroBtnColor', v)} />
                    <Col label="Text buton" value={cfg.heroBtnTextColor} onChange={v => set('heroBtnTextColor', v)} />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: '#be185d' }}>Formă butoane</p>
                  <div className="flex gap-2">
                    {[['9999px','💊 Rotund'],['12px','⬜ Mediu'],['4px','🟥 Pătrat']].map(([v,l]) => (
                      <button key={v} onClick={() => set('heroBtnRadius', v)}
                        className={`flex-1 py-2 text-xs rounded-xl font-semibold border transition-all ${cfg.heroBtnRadius === v ? 'border-pink-500 bg-pink-50 text-pink-600' : 'border-pink-200 text-stone-400'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {tab === 'images' && (
              <div>
                <Card title="🔵 Cercul mare (imagine principală)">
                  <Img label="Fotografie principală" value={cfg.mainCircleImage} onChange={v => set('mainCircleImage', v)} />
                </Card>
                <Card title="⭕ Cercul mic 1">
                  <Img label="Fotografie" value={cfg.smallCircle1Image} onChange={v => set('smallCircle1Image', v)} />
                  <Txt label="Etichetă" value={cfg.smallCircle1Label} onChange={v => set('smallCircle1Label', v)} />
                </Card>
                <Card title="⭕ Cercul mic 2">
                  <Img label="Fotografie" value={cfg.smallCircle2Image} onChange={v => set('smallCircle2Image', v)} />
                  <Txt label="Etichetă" value={cfg.smallCircle2Label} onChange={v => set('smallCircle2Label', v)} />
                </Card>
                <Card title="⭕ Cercul mic 3">
                  <Img label="Fotografie" value={cfg.smallCircle3Image} onChange={v => set('smallCircle3Image', v)} />
                  <Txt label="Etichetă" value={cfg.smallCircle3Label} onChange={v => set('smallCircle3Label', v)} />
                </Card>
              </div>
            )}

            {tab === 'products' && (
              <div>
                <div className="bg-white rounded-2xl p-4 mb-4 border" style={{ borderColor: '#fce7f3' }}>
                  <p className="font-bold text-sm mb-2" style={{ color: '#be185d' }}>
                    🧋 Schimbă fotografiile produselor ({ALL_PRODUCTS.length} produse)
                  </p>
                  <p className="text-xs mb-3" style={{ color: '#9ca3af' }}>
                    Poți uploada fotografii din calculator sau lipi un URL pentru fiecare produs.
                  </p>
                  {/* Category filter */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {cats.map(c => (
                      <button key={c} onClick={() => setCatFilter(c)}
                        className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${catFilter === c ? 'text-white' : 'text-stone-500 bg-stone-100 hover:bg-pink-50'}`}
                        style={catFilter === c ? { background: '#f90b5a' } : {}}>
                        {c === 'all' ? '🌸 Toate' : c}
                      </button>
                    ))}
                  </div>
                  {/* Product grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filtered.map(p => {
                      const ref = useRef<HTMLInputElement>(null)
                      const currentImg = cfg.products[p.id] || p.image
                      const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
                        const f = e.target.files?.[0]; if (!f) return
                        const r = new FileReader(); r.onload = ev => setProduct(p.id, ev.target?.result as string); r.readAsDataURL(f)
                      }
                      return (
                        <div key={p.id} className="border rounded-2xl overflow-hidden" style={{ borderColor: '#fce7f3' }}>
                          <div className="relative">
                            <img src={currentImg} alt={p.name} className="w-full h-32 object-cover" />
                            <button onClick={() => ref.current?.click()}
                              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                              style={{ background: 'rgba(249,11,90,0.75)' }}>
                              <span className="text-white text-xs font-bold">📤 Schimbă</span>
                            </button>
                          </div>
                          <div className="p-2">
                            <p className="text-xs font-semibold leading-tight mb-1" style={{ color: '#be185d' }}>{p.name}</p>
                            <p className="text-[10px] mb-2" style={{ color: '#9ca3af' }}>{p.category}</p>
                            <input type="text" value={currentImg}
                              onChange={e => setProduct(p.id, e.target.value)}
                              placeholder="URL imagine..."
                              className="w-full px-2 py-1 text-[10px] border rounded-lg focus:outline-none"
                              style={{ borderColor: '#fca5a5' }} />
                          </div>
                          <input ref={ref} type="file" accept="image/*" onChange={onFile} className="hidden" />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <Card title="🎨 Stilul cardurilor de produse">
                  <Col label="Fundal card" value={cfg.productsCardBg} onChange={v => set('productsCardBg', v)} />
                  <Col label="Bordură card" value={cfg.productsCardBorder} onChange={v => set('productsCardBorder', v)} />
                  <Txt label="Titlu pagină Produse" value={cfg.productsTitle} onChange={v => set('productsTitle', v)} />
                  <Txt label="Subtitlu pagină" value={cfg.productsSubtitle} onChange={v => set('productsSubtitle', v)} />
                </Card>
              </div>
            )}

            {tab === 'about' && (
              <div>
                <Card title="✏️ Texte About">
                  <Txt label="Titlu" value={cfg.aboutTitle} onChange={v => set('aboutTitle', v)} />
                  <Txt label="Eyebrow (subtitlu mic)" value={cfg.aboutSubtitle} onChange={v => set('aboutSubtitle', v)} />
                  <Txt label="An fondare" value={cfg.aboutFoundedYear} onChange={v => set('aboutFoundedYear', v)} />
                  <Txt label="Paragraful poveștii" value={cfg.aboutP1} onChange={v => set('aboutP1', v)} multi />
                  <Txt label="Paragraful brandului" value={cfg.aboutP2} onChange={v => set('aboutP2', v)} multi />
                </Card>
                <Card title="🖼️ Imagine About">
                  <Img label="Fotografie principală" value={cfg.aboutImage} onChange={v => set('aboutImage', v)} />
                </Card>
                <Card title="🎨 Culori About">
                  <div className="grid grid-cols-2 gap-3">
                    <Col label="Fundal" value={cfg.aboutBgColor} onChange={v => set('aboutBgColor', v)} />
                    <Col label="Culoare text" value={cfg.aboutTextColor} onChange={v => set('aboutTextColor', v)} />
                  </div>
                </Card>
              </div>
            )}

            {tab === 'contact' && (
              <div>
                <Card title="✏️ Texte Contact">
                  <Txt label="Titlu pagină" value={cfg.contactTitle} onChange={v => set('contactTitle', v)} />
                  <Txt label="Subtitlu" value={cfg.contactSubtitle} onChange={v => set('contactSubtitle', v)} />
                  <Txt label="Email" value={cfg.contactEmail} onChange={v => set('contactEmail', v)} />
                  <Txt label="Adresă" value={cfg.contactAddress} onChange={v => set('contactAddress', v)} />
                  <Txt label="Program" value={cfg.contactHours} onChange={v => set('contactHours', v)} />
                </Card>
                <Card title="🎨 Culori Contact">
                  <Col label="Fundal pagină" value={cfg.contactBgColor} onChange={v => set('contactBgColor', v)} />
                </Card>
              </div>
            )}

            {tab === 'footer' && (
              <div>
                <Card title="🔻 Footer">
                  <Txt label="Tagline" value={cfg.footerTagline} onChange={v => set('footerTagline', v)} />
                  <Col label="Culoare text" value={cfg.footerTextColor} onChange={v => set('footerTextColor', v)} />
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#be185d' }}>Gradient fundal CSS</p>
                  <textarea value={cfg.footerBg} onChange={e => set('footerBg', e.target.value)} rows={2}
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none resize-none mb-1" style={{ borderColor: '#fca5a5' }} />
                  <div className="h-8 rounded-lg mb-3" style={{ background: cfg.footerBg }} />
                </Card>
                <Card title="📣 Secțiunea CTA">
                  <Txt label="Titlu CTA" value={cfg.ctaTitle} onChange={v => set('ctaTitle', v)} />
                  <Txt label="Descriere CTA" value={cfg.ctaDesc} onChange={v => set('ctaDesc', v)} multi />
                  <Col label="Culoare text CTA" value={cfg.ctaTextColor} onChange={v => set('ctaTextColor', v)} />
                  <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#be185d' }}>Gradient fundal CTA</p>
                  <textarea value={cfg.ctaBg} onChange={e => set('ctaBg', e.target.value)} rows={2}
                    className="w-full px-3 py-2 text-xs border rounded-xl focus:outline-none resize-none mb-1" style={{ borderColor: '#fca5a5' }} />
                  <div className="h-8 rounded-lg" style={{ background: cfg.ctaBg }} />
                </Card>
              </div>
            )}
          </div>

          {/* RIGHT: Preview + Actions */}
          <div className="xl:col-span-2">
            <div className="sticky top-28 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: '#be185d' }}>👁️ Previzualizare Live</h3>

              {/* Mini preview */}
              <div className="rounded-2xl overflow-hidden shadow-xl border" style={{ aspectRatio: '16/9', borderColor: '#fce7f3' }}>
                <div className="w-full h-full relative overflow-hidden"
                  style={{ background: cfg.heroBgType === 'image' && cfg.heroBgImage ? `url(${cfg.heroBgImage}) center/cover` : cfg.heroBg }}>
                  {/* Navbar */}
                  <div className="absolute top-0 inset-x-0 h-7 flex items-center px-3 gap-2"
                    style={{ background: cfg.navbarBg }}>
                    <div className="w-10 h-5 bg-white/50 rounded" />
                    <div className="flex-1" />
                    {['Home','Menu','Contact'].map(n => (
                      <span key={n} className="text-[7px] font-medium" style={{ color: cfg.navbarTextColor }}>{n}</span>
                    ))}
                    <span className="text-[7px] text-white px-2 py-0.5"
                      style={{ background: cfg.heroBtnColor, borderRadius: cfg.heroBtnRadius }}>Menu</span>
                  </div>
                  {/* Content */}
                  <div className="absolute inset-0 pt-8 flex items-center px-4">
                    <div className="flex-1">
                      <p style={{ fontSize: '18px', fontFamily: cfg.fontHeading, color: cfg.heroTitleColor, lineHeight: 1.1 }}>{cfg.heroTitle}</p>
                      <p style={{ fontSize: '9px', fontFamily: cfg.fontHeading, color: cfg.heroTextColor, opacity: 0.8 }} className="italic">{cfg.heroSubtitle}</p>
                      <p style={{ fontSize: '6px', color: cfg.heroTextColor, opacity: 0.65, maxWidth: 120, lineHeight: 1.4, marginTop: 3 }}>{cfg.heroDescription.slice(0,60)}...</p>
                      <div className="flex gap-3 mt-2">
                        {[[cfg.stat1Value,cfg.stat1Label],[cfg.stat2Value,cfg.stat2Label],[cfg.stat3Value,cfg.stat3Label]].map(([v,l]) => (
                          <div key={l} className="text-center">
                            <p style={{ fontSize:'8px', color: cfg.heroTitleColor, fontFamily: cfg.fontHeading, fontWeight: 'bold' }}>{v}</p>
                            <p style={{ fontSize:'5px', color: cfg.heroTextColor, opacity: 0.6 }}>{l}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="relative w-28 h-24 mr-2">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full overflow-hidden border-2 border-white/80">
                        <img src={cfg.mainCircleImage} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="absolute -top-1 left-1 w-10 h-10 rounded-full overflow-hidden border border-white/80">
                        <img src={cfg.smallCircle1Image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="absolute -top-2 right-0 w-11 h-11 rounded-full overflow-hidden border border-white/80">
                        <img src={cfg.smallCircle2Image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="absolute top-1/3 -right-2 w-9 h-9 rounded-full overflow-hidden border border-white/80">
                        <img src={cfg.smallCircle3Image} className="w-full h-full object-cover" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colors preview */}
              <div className="flex gap-1.5">
                {[cfg.primaryColor, cfg.secondaryColor, cfg.bgColor, cfg.heroBtnColor].map((c, i) => (
                  <div key={i} className="flex-1 h-8 rounded-lg border border-white/50 shadow-sm" style={{ background: c }} title={c} />
                ))}
              </div>

              {/* Font preview */}
              <div className="bg-white rounded-xl p-3 border" style={{ borderColor: '#fce7f3' }}>
                <p style={{ fontFamily: cfg.fontHeading, color: cfg.primaryColor, fontSize: '18px' }}>Titlu: {cfg.fontHeading}</p>
                <p style={{ fontFamily: cfg.fontBody, color: '#6b7280', fontSize: '12px' }}>Text: {cfg.fontBody} — Sakura 🌸</p>
              </div>

              {/* Actions */}
              <div className="bg-white rounded-xl p-4 border" style={{ borderColor: '#fce7f3' }}>
                <p className="text-xs font-bold mb-3" style={{ color: '#be185d' }}>⚡ Acțiuni</p>
                <div className="space-y-2">
                  <button onClick={save}
                    className="w-full py-2.5 text-xs text-white font-bold rounded-xl"
                    style={{ background: 'linear-gradient(135deg, #f90b5a, #c4004a)' }}>
                    💾 Salvează toate modificările
                  </button>
                  <button onClick={exportCfg}
                    className="w-full py-2 text-xs rounded-xl border font-medium hover:bg-pink-50"
                    style={{ borderColor: '#f90b5a', color: '#f90b5a' }}>
                    📥 Export JSON → Trimite-mi pentru actualizare
                  </button>
                  <a href="/" target="_blank"
                    className="block w-full py-2 text-xs text-center rounded-xl border hover:bg-stone-50"
                    style={{ borderColor: '#d1d5db', color: '#6b7280' }}>
                    🌐 Deschide site-ul live
                  </a>
                </div>
              </div>

              <div className="bg-pink-50 rounded-xl p-3 border" style={{ borderColor: '#fce7f3' }}>
                <p className="text-xs font-bold mb-2" style={{ color: '#be185d' }}>📋 Cum funcționează</p>
                <ul className="text-xs space-y-1" style={{ color: '#9ca3af' }}>
                  <li>• <strong>Produse:</strong> mergi la tab 🧋 și schimbă orice poză</li>
                  <li>• <strong>Fundal:</strong> Hero → alege Imagine și uploadează</li>
                  <li>• <strong>Modifică</strong> → Salvează → Export JSON</li>
                  <li>• <strong>Trimite-mi</strong> fișierul → aplic în 5 min</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
