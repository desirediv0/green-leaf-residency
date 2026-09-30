import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import { PageTransition } from '@/components/common/PageTransition'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import './globals.css'

const heading = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-heading',
  display: 'swap',
})

const body = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  alternates: { canonical: '/' },
  title: 'Green Leaf Residency | Serviced Residences in Gurugram',
  description:
    'Green Leaf Residency offers fully furnished 1RK and 1 BHK serviced residences in Sector 15 Part 2, Gurugram, designed for comfortable and hassle-free modern living.',
  keywords: ['serviced apartments Gurugram', '1RK Gurugram', '1 BHK serviced residence', 'Green Leaf Residency'],
  openGraph: {
    title: 'Green Leaf Residency | Serviced Residences in Gurugram',
    description: 'Not Just a Stay, A Standard.',
    type: 'website',
    images: ['/images/img-7039.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Green Leaf Residency',
    description: 'Premium serviced residences in Sector 15 Part 2, Gurugram.',
    images: ['/images/img-7039.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#f7f5ec',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${heading.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
