'use client'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMenu2,
  IconMoon,
  IconSun,
  IconX,
} from '@tabler/icons-react'
import { useTheme } from '@wrksz/themes/client'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header as HeaderType, SiteSetting } from '@/payload-types'

interface HeaderClientProps {
  data: HeaderType
  siteSettings?: SiteSetting
}

const socialIcon = (label?: string | null) => {
  const l = (label || '').toLowerCase()
  if (l.includes('github')) return IconBrandGithub
  if (l.includes('linkedin')) return IconBrandLinkedin
  if (l.includes('x') || l.includes('twitter')) return IconBrandX
  return null
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, siteSettings }) => {
  const navItems = data?.navItems || []
  const socials = siteSettings?.socials || []
  const email = siteSettings?.email
  const [open, setOpen] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    if (href.includes('#')) return pathname.split('#')[0] === href.split('#')[0]
    return pathname.startsWith(href)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-5 lg:px-[6vw] h-14">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <span className="w-1.5 h-1.5 bg-synthesis rounded-full animate-pulse" />
          <span className="font-mono-label text-foreground">MARTINS_AI</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
          {navItems.map(({ link }, i) => {
            const href =
              link?.type === 'reference' && typeof link?.reference?.value === 'object'
                ? link.reference.value.slug
                : link?.url
            const active = href ? isActive(href) : false

            return (
              <CMSLink
                key={i}
                {...link}
                appearance="link"
                className={`font-mono-label transition-colors ${
                  active ? 'text-synthesis' : 'text-muted-foreground hover:text-foreground'
                }`}
              />
            )
          })}
        </nav>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolvedTheme === 'dark' ? <IconSun className="w-4 h-4" /> : <IconMoon className="w-4 h-4" />}
          </button>

          <div className="hidden lg:flex items-center gap-0">
            {socials.map((social, i) => {
              const Icon = socialIcon(social.label)
              if (!Icon) return null
              return (
                <a
                  key={i}
                  href={social.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.label || ''}
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-2 bg-foreground text-background px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <span className="font-mono-label">Contact ↗</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-foreground"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <IconX className="w-4 h-4" /> : <IconMenu2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-border bg-background" aria-label="Mobile navigation">
          <div className="flex flex-col py-1">
            {navItems.map(({ link }, i) => (
              <div
                key={i}
                className="px-5 py-3.5 border-b border-border/50 flex items-center justify-between"
              >
                <CMSLink {...link} appearance="link" className="font-mono-label text-foreground" />
              </div>
            ))}
            <Link href="/contact" className="px-5 py-3.5 flex items-center bg-foreground text-background">
              <span className="font-mono-label text-primary">Contact ↗</span>
            </Link>
            {email && (
              <a href={`mailto:${email}`} className="px-5 py-3.5 font-mono-label text-muted-foreground">
                {email}
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  )
}
