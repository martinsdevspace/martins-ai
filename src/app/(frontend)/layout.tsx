import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { ThemeProvider } from '@wrksz/themes/next'
import React, { Suspense } from 'react'

import { AdminBar } from '@/components/AdminBar'
import ChatWidget from '@/components/ChatWidget'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

import '@fontsource-variable/hanken-grotesk'
import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/newsreader'
import './globals.css'

const SITE_URL = getServerSideURL()

export const GEO = {
  region: 'NG-FC',
  placename: 'Abuja, Nigeria',
  latitude: '9.0765',
  longitude: '7.3986',
}

async function getPersonJsonLd() {
  const siteSettings = await getCachedGlobal('site-settings', 0)()

  const name = siteSettings?.name || 'Martins Michael'
  const tagline = siteSettings?.tagline || 'Full-Stack Developer & AI Agent Architect'
  const email = siteSettings?.email || 'hello@martinsmichael.dev'
  const location = siteSettings?.location || 'Abuja, Nigeria · Remote Worldwide'

  const roles =
    siteSettings?.roles
      ?.map((role) => role.role)
      .filter((role): role is string => Boolean(role)) || []

  const jobTitle = roles.join(' · ') || 'Full-Stack Developer & AI Agent Architect'

  const sameAs = (siteSettings?.socials || [])
    .map((social) => social.url)
    .filter((url): url is string => Boolean(url && /^https?:\/\//.test(url)))

  const locality = location.includes('Abuja') ? 'Abuja' : location.split(',')[0]?.trim() || 'Abuja'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name,
    url: SITE_URL,
    email,
    image: `${SITE_URL}/website-template-OG.webp`,
    jobTitle,
    description: tagline,
    knowsAbout: roles.length ? roles : ['Full-Stack Development', 'AI Agent Architecture'],
    sameAs,
    address: {
      '@type': 'PostalAddress',
      addressLocality: locality,
      addressCountry: 'NG',
    },
    nationality: {
      '@type': 'Country',
      name: 'Nigeria',
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = await getPersonJsonLd()

  return (
    <html className={cn('font-body')} lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider
          attribute="data-theme"
          storageKey="payload-theme"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <Providers>
            <Suspense fallback={null}>
              <DraftAdminBar />
            </Suspense>

            <Header />
            {children}
            <Footer />
            <ChatWidget />
          </Providers>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

async function DraftAdminBar() {
  const { isEnabled } = await draftMode()

  return <AdminBar adminBarProps={{ preview: isEnabled }} />
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Martin's AI",
  alternates: {
    canonical: '/',
  },
  authors: [{ name: 'Martins Michael', url: SITE_URL }],
  creator: 'Martins Michael',
  publisher: 'Martins Michael',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    'geo.region': GEO.region,
    'geo.placename': GEO.placename,
    'geo.position': `${GEO.latitude};${GEO.longitude}`,
    ICBM: `${GEO.latitude}, ${GEO.longitude}`,
  },
  openGraph: mergeOpenGraph(),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@martinai',
  },
}
