import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/app/components/layout/Navbar'
import Footer from '@/app/components/layout/Footer'
import { company } from '@/data/company'
import { LanguageProvider } from '@/lib/LanguageContext'
import CherryBlossoms from '@/app/components/ui/CherryBlossoms'

export const metadata: Metadata = {
  metadataBase: new URL('https://sakura-bubble-tea.ro'),
  title: {
    default: `${company.name} | Bubble Tea Autentic în Brașov`,
    template: `%s | ${company.name}`,
  },
  description:
    'Sakura Bubble Tea Brașov — Bubble tea autentic din Taiwan. 44 de arome, ingrediente proaspete, Strada Diaconu Coresi nr. 2. Deschis zilnic.',
  keywords: ['bubble tea', 'boba', 'brașov', 'taiwan', 'ceai', 'tapioca', 'popping boba', 'matcha'],
  openGraph: {
    type: 'website',
    locale: 'ro_RO',
    url: 'https://sakura-bubble-tea.ro',
    siteName: company.name,
    title: `${company.name} | Bubble Tea Autentic în Brașov`,
    description: 'Bubble tea autentic din Taiwan în inima Brașovului. 44 de arome disponibile.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro">
      <body className="flex flex-col min-h-screen">
        <LanguageProvider>
          <CherryBlossoms />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
