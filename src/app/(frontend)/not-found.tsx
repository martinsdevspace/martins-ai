import Link from 'next/link'
import React from 'react'

import { IconArrowUpRight, IconSearch } from '@tabler/icons-react'

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/insights', label: 'Insights' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/ideas', label: 'Ideas' },
  { href: '/contact', label: 'Contact' },
]

export const metadata = {
  title: '404 | Not Found',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="px-5 lg:px-[6vw] pt-24">
      <div className="max-w-3xl">
        <div className="font-mono-label text-synthesis mb-4 flex items-center gap-2">
          <span className="w-1 h-1 bg-synthesis animate-pulse" />
          // — 404
        </div>

        <h1 className="font-heading text-4xl md:text-6xl font-light tracking-tight text-balance">
          This page doesn&apos;t exist.
        </h1>

        <p className="mt-4 max-w-xl text-foreground/80">
          The page you&apos;re looking for may have moved, been renamed, or never existed. Try
          searching the site, or jump to one of the pages below.
        </p>

        <form action="/search" className="mt-8 flex max-w-md items-center border border-border bg-card">
          <IconSearch className="ml-4 h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            type="text"
            name="q"
            placeholder="Search insights, portfolio, services…"
            aria-label="Search the site"
            className="w-full bg-transparent px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 border-l border-border px-4 py-3 font-mono-label text-foreground transition-colors hover:text-synthesis"
          >
            Go
          </button>
        </form>
      </div>

      <div className="mt-16 max-w-3xl">
        <p className="font-mono-label text-muted-foreground mb-4 text-xs uppercase">
          // WHERE YOU MIGHT WANT TO GO
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-2 border border-border bg-card px-4 py-3 font-mono-label text-foreground/80 transition-colors hover:border-synthesis hover:text-synthesis"
            >
              {link.label}
              <IconArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
