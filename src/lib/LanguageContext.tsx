'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'en' | 'ro'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

// ─── Translation Dictionary ───────────────────────────────────────────────────

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    'nav.shop': 'Our Menu',

    // Footer
    'footer.navigation': 'Navigation',
    'footer.categories': 'Categories',
    'footer.contact': 'Contact Info',
    'footer.rights': 'All rights reserved.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.address': '301 Renai Rd. Sec.4, Da\'an District, Taipei 2F',
    'footer.hours': 'Mon–Fri 10:00–19:00 / Sat 11:00–18:00',

    // Home Hero
    'hero.eyebrow': 'Scandinavian Design × Taiwanese Craft',
    'hero.title': 'Authentic Bubble Tea from Taiwan',
    'hero.subtitle': 'Fresh ingredients, original recipes, unforgettable moments.',
    'hero.desc': 'Discover the true taste of Taiwanese bubble tea right in the heart of Brașov.',
    'hero.cta.explore': 'See Our Menu',
    'hero.cta.about': 'Find Us',
    'hero.stat.founded': 'Founded',
    'hero.stat.clients': 'Flavors Available',
    'hero.stat.warranty': 'Open Daily',

    // About Brief
    'about.eyebrow': 'About Nordvik Studio',
    'about.title': 'Believing Good Design Changes Lives',
    'about.p1': 'In 2015, we founded Nordvik Studio in Taipei with one simple belief: every family deserves truly quality, soulful furniture.',
    'about.p2': 'We collaborate with local Taiwanese craftsmen, use sustainably certified timber, and draw from Scandinavian design philosophy to create home pieces that are both beautiful and enduring.',
    'about.check1': 'Handcrafted by Taiwanese artisans — every piece unique',
    'about.check2': 'FSC sustainable certified materials',
    'about.check3': '5-year structural warranty on all products',
    'about.check4': 'Custom design service available',
    'about.cta': 'Our Full Story',
    'about.years': '10 Years',
    'about.years.label': 'Shaping Taiwanese furniture design',

    // Featured Products
    'featured.eyebrow': 'Featured Products',
    'featured.title': 'Season\'s Picks',
    'featured.desc': 'Each piece is the finest interpretation of spatial aesthetics.',
    'featured.all': 'View All Products',

    // Features Section
    'features.eyebrow': 'Why Choose Nordvik',
    'features.title': 'Quality Is Our Only Compromise',
    'features.desc': 'From material sourcing to final delivery, every step reflects our commitment to excellence.',
    'features.leaf.title': 'Sustainable Materials',
    'features.leaf.desc': 'All timber comes from FSC-certified sustainable forests. Our responsibility to the planet equals our pursuit of aesthetics.',
    'features.hammer.title': 'Artisan Spirit',
    'features.hammer.desc': 'Every product is handcrafted by Taiwanese artisans using traditional joinery techniques, far more durable than industrial mass production.',
    'features.sparkles.title': 'Design Thinking',
    'features.sparkles.desc': 'Human-centered design philosophy. Every curve and proportion undergoes rigorous ergonomic testing and aesthetic scrutiny.',
    'features.shield.title': 'Quality Guarantee',
    'features.shield.desc': 'All products come with a 5-year structural warranty. Our confidence in our products is your best assurance.',

    // Contact Brief
    'contact.eyebrow': 'Find Us',
    'contact.title': 'Welcome to Experience Our Showroom',
    'contact.desc': 'Words and photos can\'t fully convey the warmth of materials and the refinement of details. We sincerely invite you to visit our showroom.',
    'contact.address.label': 'Showroom Address',
    'contact.hours.label': 'Business Hours',
    'contact.phone.label': 'Phone',
    'contact.email.label': 'Email',
    'contact.cta': 'Send Us a Message',

    // CTA Section
    'cta.eyebrow': 'Start Your Journey',
    'cta.title': 'Let Every Corner Tell a Story Worth Savoring',
    'cta.desc': 'From single pieces to full room planning, we offer complete home aesthetic solutions.',
    'cta.shop': 'Shop Now',
    'cta.consult': 'Book a Consultation',

    // About Page
    'about.page.eyebrow': 'About Us',
    'about.page.hero.title': 'We Are Nordvik Studio',
    'about.page.hero.desc': 'A Taiwanese furniture brand that believes great design can change everyday life. Since 2015, with Scandinavian design as our spiritual core, we partner with local Taiwanese craftsmen to create home pieces with warmth and soul.',
    'about.story.eyebrow': 'Our Story',
    'about.story.title': 'From One Belief, to One Brand',
    'about.story.p1': 'Founder Daniel Lin spent three years in Stockholm, deeply influenced by Nordic design culture. Upon returning to Taiwan, he found a huge gap between Taiwanese consumers\' desire for design furniture and the truly design-depth options available.',
    'about.story.p2': 'In 2015, Nordvik Studio was born in a small Taipei workshop with three members, two craftsmen partners, and an obsession with bringing great design into Taiwanese homes.',
    'about.story.p3': 'Ten years later, we\'ve grown into a design brand with over 120 products, collaborating with 30 local artisans island-wide, serving over 8,000 customers — but that obsession has never changed.',
    'about.values.eyebrow': 'Brand Values',
    'about.values.title': 'Four Beliefs We Stand By',
    'about.services.eyebrow': 'Our Services',
    'about.services.title': 'With You From Selection to Move-In',
    'about.services.desc': 'We offer more than products — complete home aesthetic solutions.',
    'about.cta.title': 'Ready to Begin?',
    'about.cta.desc': 'Browse our product collection, or contact our design consultant to make your ideal space a reality.',
    'about.cta.products': 'Browse Products',
    'about.cta.contact': 'Contact a Designer',
    'about.quote': '"Every piece carries the warmth of the artisan\'s hands"',

    // Products Page
    'products.eyebrow': 'Products',
    'products.title': 'Our Collection',
    'products.desc': 'Each piece is an expression of beautiful living — find the value of design in everyday use.',
    'products.count': 'drinks',
    'products.search.placeholder': 'Search drinks...',
    'products.empty.title': 'No matching products',
    'products.empty.desc': 'Try different keywords or categories',
    'products.empty.clear': 'Clear filters',
    'products.detail': 'View Details',
    'products.instock': 'In Stock',
    'products.preorder': 'Pre-order',
    'products.back': 'Back to Products',
    'products.inquire': 'Inquire Now',
    'products.visit': 'Book Showroom Visit',
    'products.related': 'Related Products',
    'products.features': 'Product Features',
    'products.specs': 'Specifications',
    'products.warranty': '5-Year Warranty',
    'products.delivery': 'White-Glove Delivery',
    'products.packaging': 'Original Packaging',

    // Categories
    'cat.all': 'All Drinks',
    'cat.tea': 'Tea Series',
    'cat.popping': 'Popping Boba',
    'cat.matcha': 'Matcha',
    'cat.tapioca': 'Tapioca',
    'cat.oreo': 'Oreo',
    'cat.special': 'Specials',

    // Contact Page
    'contact.page.eyebrow': 'Contact',
    'contact.page.title': 'Contact Us',
    'contact.page.desc': 'Whether it\'s a product inquiry, custom design, or simply wanting to visit the showroom — you\'re always welcome.',
    'contact.info.title': 'Contact Information',
    'contact.social.title': 'Social Media',
    'contact.form.title': 'Send a Message',
    'contact.form.desc': 'Fill in the form below and we\'ll reply within 1–2 business days.',
    'contact.form.name': 'Name',
    'contact.form.name.placeholder': 'John Smith',
    'contact.form.email.placeholder': 'example@email.com',
    'contact.form.phone': 'Phone',
    'contact.form.phone.placeholder': '+40 712 345 678',
    'contact.form.subject': 'Subject',
    'contact.form.subject.placeholder': 'Select a subject',
    'contact.form.subject.product': 'Product Inquiry',
    'contact.form.subject.custom': 'Custom Design',
    'contact.form.subject.visit': 'Book Showroom Visit',
    'contact.form.subject.aftersales': 'After-Sales Service',
    'contact.form.subject.corporate': 'Corporate Purchase',
    'contact.form.subject.other': 'Other',
    'contact.form.message': 'Message',
    'contact.form.message.placeholder': 'Tell us your needs, products you\'re interested in, or any questions...',
    'contact.form.submit': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.privacy': 'We usually reply within 1–2 business days. Your data is used only to respond to this inquiry.',
    'contact.form.success.title': 'Message Sent!',
    'contact.form.success.desc': 'Thank you for reaching out. We\'ll reply within 1–2 business days. For urgent matters, please call us directly.',
    'contact.form.success.again': 'Send another message',
    'contact.form.error.name': 'Please enter your name',
    'contact.form.error.email': 'Please enter your email',
    'contact.form.error.email.invalid': 'Invalid email format',
    'contact.form.error.message': 'Please enter your message',
    'contact.faq.title': 'Frequently Asked Questions',
    'contact.faq.q1': 'Can I visit the showroom without an appointment?',
    'contact.faq.a1': 'You\'re welcome to visit anytime during business hours. For a dedicated designer tour, we recommend calling or emailing in advance.',
    'contact.faq.q2': 'Do you offer custom furniture?',
    'contact.faq.a2': 'Yes, we offer customization options for dimensions, materials, and colors. Some products can be adjusted for your space. Contact us to discuss.',
    'contact.faq.q3': 'How long does delivery take?',
    'contact.faq.a3': 'In-stock items typically arrive in 5–7 business days. Pre-order or custom items take 3–6 weeks, with estimated timelines provided at purchase.',

    // 404
    'notfound.title': 'Page Not Found',
    'notfound.desc': 'The page you\'re looking for may have been removed, renamed, or is temporarily unavailable.',
    'notfound.home': 'Back to Home',
    'notfound.products': 'Browse Products',
  },

  ro: {
    // Navbar
    'nav.home': 'Acasă',
    'nav.about': 'Despre Noi',
    'nav.products': 'Produse',
    'nav.contact': 'Contact',
    'nav.shop': 'Meniul Nostru',

    // Footer
    'footer.navigation': 'Navigare',
    'footer.categories': 'Categorii',
    'footer.contact': 'Informații Contact',
    'footer.rights': 'Toate drepturile rezervate.',
    'footer.privacy': 'Politica de Confidențialitate',
    'footer.terms': 'Termeni și Condiții',
    'footer.address': 'Str. Renai Nr. 301, Sector Da\'an, Taipei, Et. 2',
    'footer.hours': 'Lun–Vin 10:00–19:00 / Sâm 11:00–18:00',

    // Home Hero
    'hero.eyebrow': 'Design Scandinav × Meșteșug Taiwanez',
    'hero.title': 'Bubble Tea Autentic din Taiwan',
    'hero.subtitle': 'Ingrediente proaspete, rețete originale, momente de neuitat.',
    'hero.desc': 'Descoperă gustul autentic al bubble tea-ului taiwanez în inima Brașovului.',
    'hero.cta.explore': 'Vezi Meniul',
    'hero.cta.about': 'Găsește-ne',
    'hero.stat.founded': 'Fondată în',
    'hero.stat.clients': 'Arome Disponibile',
    'hero.stat.warranty': 'Deschis zilnic',

    // About Brief
    'about.eyebrow': 'Despre Nordvik Studio',
    'about.title': 'Credem că Design-ul Bun Schimbă Viețile',
    'about.p1': 'În 2015, am fondat Nordvik Studio în Taipei cu o credință simplă: fiecare familie merită mobilier de calitate autentică și cu suflet.',
    'about.p2': 'Colaborăm cu meșteșugari locali din Taiwan, folosim lemn certificat sustenabil și ne inspirăm din filosofia de design scandinavă pentru a crea piese de casă frumoase și durabile.',
    'about.check1': 'Lucrat manual de meșteșugari taiwanezi — fiecare piesă unică',
    'about.check2': 'Materiale certificate FSC sustenabile',
    'about.check3': 'Garanție structurală de 5 ani pentru toate produsele',
    'about.check4': 'Serviciu de design personalizat disponibil',
    'about.cta': 'Povestea Noastră Completă',
    'about.years': '10 Ani',
    'about.years.label': 'În designul mobilierului taiwanez',

    // Featured Products
    'featured.eyebrow': 'Produse Recomandate',
    'featured.title': 'Selecția Sezonului',
    'featured.desc': 'Fiecare piesă este cea mai bună interpretare a esteticii spațiale.',
    'featured.all': 'Vezi Toate Produsele',

    // Features Section
    'features.eyebrow': 'De ce Nordvik',
    'features.title': 'Calitatea Este Singurul Nostru Compromis',
    'features.desc': 'De la aprovizionarea cu materiale până la livrarea finală, fiecare pas reflectă angajamentul nostru față de excelență.',
    'features.leaf.title': 'Materiale Sustenabile',
    'features.leaf.desc': 'Tot lemnul provine din păduri sustenabile certificate FSC. Responsabilitatea față de planetă este la fel de importantă ca urmărirea esteticii.',
    'features.hammer.title': 'Spirit Artizanal',
    'features.hammer.desc': 'Fiecare produs este lucrat manual de meșteșugari taiwanezi, folosind tehnici tradiționale de îmbinare, mult mai durabile decât producția industrială.',
    'features.sparkles.title': 'Gândire de Design',
    'features.sparkles.desc': 'Filosofie de design centrată pe om. Fiecare curbă și proporție trece prin teste ergonomice riguroase și analiză estetică.',
    'features.shield.title': 'Garanție de Calitate',
    'features.shield.desc': 'Toate produsele vin cu garanție structurală de 5 ani. Încrederea noastră în produse este cea mai bună asigurare a ta.',

    // Contact Brief
    'contact.eyebrow': 'Găsește-ne',
    'contact.title': 'Bine ai Venit să Experimentezi Showroom-ul Nostru',
    'contact.desc': 'Cuvintele și fotografiile nu pot transmite pe deplin căldura materialelor și rafinamentul detaliilor. Te invităm sincer să vizitezi showroom-ul nostru.',
    'contact.address.label': 'Adresa Showroom',
    'contact.hours.label': 'Program',
    'contact.phone.label': 'Telefon',
    'contact.email.label': 'Email',
    'contact.cta': 'Trimite-ne un Mesaj',

    // CTA Section
    'cta.eyebrow': 'Începe Călătoria Ta',
    'cta.title': 'Lasă Fiecare Colț să Spună o Poveste',
    'cta.desc': 'De la piese individuale la planificarea întregii camere, oferim soluții complete de estetică pentru casă.',
    'cta.shop': 'Cumpără Acum',
    'cta.consult': 'Rezervă o Consultație',

    // About Page
    'about.page.eyebrow': 'Despre Noi',
    'about.page.hero.title': 'Suntem Nordvik Studio',
    'about.page.hero.desc': 'Un brand de mobilier taiwanez care crede că designul excelent poate schimba viața de zi cu zi. Din 2015, cu designul scandinav ca nucleu spiritual, colaborăm cu meșteșugari locali taiwanezi pentru a crea piese de casă cu căldură și suflet.',
    'about.story.eyebrow': 'Povestea Noastră',
    'about.story.title': 'De la O Credință, la Un Brand',
    'about.story.p1': 'Fondatorul Daniel Lin a petrecut trei ani la Stockholm, profund influențat de cultura de design nordică. La întoarcerea în Taiwan, a descoperit un decalaj imens între dorința consumatorilor taiwanezi pentru mobilier de design și opțiunile cu adevărat de profunzime disponibile.',
    'about.story.p2': 'În 2015, Nordvik Studio s-a născut într-un mic atelier din Taipei, cu trei membri, doi parteneri meșteșugari și o obsesie de a aduce design excelent în casele taiwaneze.',
    'about.story.p3': 'Zece ani mai târziu, am crescut într-un brand de design cu peste 120 de produse, colaborând cu 30 de artizani locali, servind peste 8.000 de clienți — dar acea obsesie nu s-a schimbat niciodată.',
    'about.values.eyebrow': 'Valorile Brandului',
    'about.values.title': 'Patru Credințe pe Care Le Susținem',
    'about.services.eyebrow': 'Serviciile Noastre',
    'about.services.title': 'Cu Tine de la Selecție până la Mutare',
    'about.services.desc': 'Oferim mai mult decât produse — soluții complete de estetică pentru casă.',
    'about.cta.title': 'Ești Pregătit să Începi?',
    'about.cta.desc': 'Răsfoiește colecția noastră sau contactează consultantul nostru de design pentru a-ți transforma spațiul ideal în realitate.',
    'about.cta.products': 'Răsfoiește Produsele',
    'about.cta.contact': 'Contactează un Designer',
    'about.quote': '"Fiecare piesă poartă căldura mâinilor meșteșugarului"',

    // Products Page
    'products.eyebrow': 'Produse',
    'products.title': 'Colecția Noastră',
    'products.desc': 'Fiecare piesă este o expresie a vieții frumoase — descoperă valoarea designului în utilizarea zilnică.',
    'products.count': 'băuturi',
    'products.search.placeholder': 'Caută băuturi...',
    'products.empty.title': 'Niciun produs găsit',
    'products.empty.desc': 'Încearcă alte cuvinte cheie sau categorii',
    'products.empty.clear': 'Șterge filtrele',
    'products.detail': 'Vezi Detalii',
    'products.instock': 'În Stoc',
    'products.preorder': 'Pre-comandă',
    'products.back': 'Înapoi la Produse',
    'products.inquire': 'Solicită Informații',
    'products.visit': 'Rezervă Vizită Showroom',
    'products.related': 'Produse Similare',
    'products.features': 'Caracteristici Produs',
    'products.specs': 'Specificații',
    'products.warranty': 'Garanție 5 Ani',
    'products.delivery': 'Livrare Premium',
    'products.packaging': 'Ambalaj Original',

    // Categories
    'cat.all': 'Toate Băuturile',
    'cat.tea': 'Seria Ceai',
    'cat.popping': 'Popping Boba',
    'cat.matcha': 'Matcha',
    'cat.tapioca': 'Tapioca',
    'cat.oreo': 'Oreo',
    'cat.special': 'Speciale',

    // Contact Page
    'contact.page.eyebrow': 'Contact',
    'contact.page.title': 'Contactează-ne',
    'contact.page.desc': 'Fie că este o întrebare despre produse, design personalizat sau pur și simplu dorești să vizitezi showroom-ul — ești mereu binevenit.',
    'contact.info.title': 'Informații de Contact',
    'contact.social.title': 'Rețele Sociale',
    'contact.form.title': 'Trimite un Mesaj',
    'contact.form.desc': 'Completează formularul de mai jos și vom răspunde în 1–2 zile lucrătoare.',
    'contact.form.name': 'Nume',
    'contact.form.name.placeholder': 'Ion Popescu',
    'contact.form.email.placeholder': 'exemplu@email.com',
    'contact.form.phone': 'Telefon',
    'contact.form.phone.placeholder': '+40 712 345 678',
    'contact.form.subject': 'Subiect',
    'contact.form.subject.placeholder': 'Selectează un subiect',
    'contact.form.subject.product': 'Întrebare despre produs',
    'contact.form.subject.custom': 'Design personalizat',
    'contact.form.subject.visit': 'Rezervare vizită showroom',
    'contact.form.subject.aftersales': 'Service post-vânzare',
    'contact.form.subject.corporate': 'Achiziție corporativă',
    'contact.form.subject.other': 'Altele',
    'contact.form.message': 'Mesaj',
    'contact.form.message.placeholder': 'Spune-ne despre nevoile tale, produsele care te interesează sau orice întrebări...',
    'contact.form.submit': 'Trimite Mesajul',
    'contact.form.sending': 'Se trimite...',
    'contact.form.privacy': 'De obicei răspundem în 1–2 zile lucrătoare. Datele tale sunt folosite doar pentru a răspunde la această solicitare.',
    'contact.form.success.title': 'Mesaj Trimis!',
    'contact.form.success.desc': 'Mulțumim că ne-ai contactat. Vom răspunde în 1–2 zile lucrătoare. Pentru urgențe, te rugăm să ne suni direct.',
    'contact.form.success.again': 'Trimite alt mesaj',
    'contact.form.error.name': 'Te rugăm să introduci numele',
    'contact.form.error.email': 'Te rugăm să introduci emailul',
    'contact.form.error.email.invalid': 'Format email invalid',
    'contact.form.error.message': 'Te rugăm să introduci mesajul',
    'contact.faq.title': 'Întrebări Frecvente',
    'contact.faq.q1': 'Pot vizita showroom-ul fără programare?',
    'contact.faq.a1': 'Ești binevenit să vizitezi oricând în timpul programului de lucru. Pentru un tur dedicat cu un designer, recomandăm să ne suni sau să ne trimiți un email în avans.',
    'contact.faq.q2': 'Oferiți mobilier personalizat?',
    'contact.faq.a2': 'Da, oferim opțiuni de personalizare pentru dimensiuni, materiale și culori. Unele produse pot fi ajustate pentru spațiul tău. Contactează-ne pentru a discuta.',
    'contact.faq.q3': 'Cât durează livrarea?',
    'contact.faq.a3': 'Produsele din stoc ajung de obicei în 5–7 zile lucrătoare. Produsele pre-comandate sau personalizate durează 3–6 săptămâni, cu termene estimate furnizate la cumpărare.',

    // 404
    'notfound.title': 'Pagina Nu a Fost Găsită',
    'notfound.desc': 'Pagina pe care o cauți poate fi eliminată, redenumită sau temporar indisponibilă.',
    'notfound.home': 'Înapoi la Pagina Principală',
    'notfound.products': 'Răsfoiește Produsele',
  },
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('nordvik-lang') as Language | null
    if (saved === 'en' || saved === 'ro') setLangState(saved)
  }, [])

  const setLang = (l: Language) => {
    setLangState(l)
    localStorage.setItem('nordvik-lang', l)
  }

  const t = (key: string): string => {
    return translations[lang][key] ?? translations['en'][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
