// ═══════════════════════════════════════════════════════════════
// SITE CONFIG — auto-updated by admin panel
// Last updated: 2026-04-12T21:35:01.697Z
// ═══════════════════════════════════════════════════════════════

export const SITE_CONFIG = {
    // — Global Colors ─────────────────────────────────────
    primaryColor: '#f90b5a',
    secondaryColor: '#ffc2d4',
    accentColor: '#ffc2d4',
    bgColor: '#fff5f8',
    // — Fonts ─────────────────────────────────────────────
    fontHeading: 'Poppins',
    fontBody: 'Poppins',
    // — Navbar ────────────────────────────────────────────
    navbarBg: 'rgba(255,240,248,0.95)',
    navbarTextColor: '#be185d',
    navbarLogoSize: '110',
    navbarBtnRadius: '9999px',
    // — Hero ──────────────────────────────────────────────
    heroTitle: 'Sakura Bubble Tea',
    heroSubtitle: 'Experiența autentică de bubble tea din Taiwan, reinterpretată în Brașov',
    heroTagline: '🌸 Gust autentic din Taiwan, chiar aici în Brașov',
    heroDescription: 'Nu este doar bubble tea. Este o experiență. Ingrediente premium, rețete originale și peste 50 de arome care te fac să revii din nou și din nou.',
    heroBg: 'linear-gradient(150deg, #ffffff 0%, #ffc2d4 30%, #f90b5a 100%)',
    heroBgType: 'image',
    heroBgImage: 'https://i.ibb.co/6cBBtZqY/e1951d31b511.jpg',
    heroTitleColor: '#f90b5a',
    heroTextColor: '#fcfcfc',
    heroBtnColor: '#f90b5a',
    heroBtnTextColor: '#ffffff',
    heroBtnRadius: '12px',
    // — Stats ─────────────────────────────────────────────
    stat1Value: '50+',
    stat1Label: 'Arome',
    stat2Value: '4.6★',
    stat2Label: 'Google',
    stat3Value: '2019',
    stat3Label: 'Fondată',
    // — Circles ───────────────────────────────────────────
    mainCircleImage: 'https://i.ibb.co/jkKCW30d/61970e1cb2ff.jpg',
    smallCircle1Image: 'https://i.ibb.co/5WStb7x0/d8124e3f10a7.png',
    smallCircle1Label: 'Matcha 🍵',
    smallCircle2Image: 'https://i.ibb.co/yFPgWc6z/52e0466b5207.png',
    smallCircle2Label: 'Taro 🧋',
    smallCircle3Image: 'https://i.ibb.co/Q7NcvNRb/6660e98a4e2d.png',
    smallCircle3Label: 'Strawberry 🍓',
    // — About ─────────────────────────────────────────────
    aboutTitle: 'Un colț de sakura, în inima Brașovului',
    aboutSubtitle: 'Povestea Noastră',
    aboutImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=85',
    aboutBg: 'linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)',
    aboutTextColor: '#6b2149',
    aboutFoundedYear: '2019',
    aboutP1: 'Sunt originar din Taiwan — locul unde s-a născut bubble tea-ul.',
    aboutQuote: 'Când cineva cumpără de la Sakura Bubble Tea, nu cumpără doar o băutură. Cumpără un moment de bucurie.',
    aboutCta: '„Vino să descoperi gustul autentic."',
    aboutP2: 'La Sakura Bubble Tea, redefinim experiența bubble tea prin eleganță și rafinament.',
    aboutP3: 'Fiecare produs este creat cu precizie — de la selecția ceaiului, la textura perfectă a perlelor de tapioca și echilibrul fin al aromelor.',
    aboutBrandSlogan: 'Nu vindem doar băuturi. Creăm experiențe premium.',
    // — Products Page ─────────────────────────────────────
    productsTitle: 'Produsele Noastre',
    productsSubtitle: '40+ arome autentice din Taiwan',
    productsBg: 'linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)',
    productsCardBg: 'rgba(255,255,255,0.8)',
    productsCardBorder: 'rgba(249,11,90,0.2)',
    // — Contact ───────────────────────────────────────────
    contactTitle: 'Contactează-ne',
    contactSubtitle: 'Suntem aici pentru tine',
    contactBg: 'linear-gradient(180deg, #fff5f8 0%, #ffe8f0 100%)',
    contactBgColor: '#fff5f8',
    contactEmail: 'sakura.bubble.tea.ro@gmail.com',
    contactAddress: 'Strada Diaconu Coresi nr. 2, Brașov',
    contactHours: 'Lun–Vin 13–20 · Sâm–Dum 11–21',
    // — Footer ────────────────────────────────────────────
    footerBg: 'linear-gradient(180deg, #ffb6cc 0%, #f90b5a 100%)',
    footerTextColor: '#ffffff',
    footerTagline: '🌸 Bubble tea autentic taiwanez în inima Brașovului.',
    // — CTA Section ───────────────────────────────────────
    ctaTitle: 'Vino să ne cunoști!',
    ctaDesc: 'Strada Diaconu Coresi nr. 2, Brașov · Lun–Vin 13–20 · Sâm–Dum 11–21',
    ctaBg: 'linear-gradient(150deg, #ffffff 0%, #ffe0ec 30%, #f90b5a 100%)',
    ctaTextColor: '#ffffff',
    // — Features Section ──────────────────────────────────
    featuresBg: 'linear-gradient(150deg, #ffffff 0%, #ffe0ec 30%, #f90b5a 100%)',
    featuresTextColor: '#ffffff',
    // — Other ──────────────────────────────────────────
    aboutBgColor: '#fff5f8',
} as const

export type SiteConfig = typeof SITE_CONFIG
