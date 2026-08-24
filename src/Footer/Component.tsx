import { CMSLink } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandMedium,
  IconBrandOpenSource,
  IconBrandX,
  IconMail,
  IconRss,
  IconLink,
  IconCalendar,
} from '@tabler/icons-react'
import Link from 'next/link'

const socialIcon = (label?: string | null) => {
  const l = (label || '').toLowerCase()
  if (l.includes('github')) return IconBrandGithub
  if (l.includes('linkedin')) return IconBrandLinkedin
  if (l.includes('x') || l.includes('twitter')) return IconBrandX
  if (l.includes('mail') || l.includes('email')) return IconMail
  if (l.includes('medium')) return IconBrandMedium
  if (l.includes('dev')) return IconBrandOpenSource
  if (l.includes('hashnode')) return IconLink
  if (l.includes('daily')) return IconLink
  if (l.includes('hackerno')) return IconLink
  if (l.includes('cal')) return IconCalendar
  return IconLink
}

export async function Footer() {
  const [footerData, siteSettings] = await Promise.all([
    getCachedGlobal('footer', 1)(),
    getCachedGlobal('site-settings', 1)(),
  ])

  const navItems = footerData?.navItems || []
  const socials = siteSettings?.socials || []
  const email = siteSettings?.email
  const location = siteSettings?.location
  const availability = siteSettings?.availability
  const brandName = siteSettings?.siteName || ''
  const footerNote = siteSettings?.footerNote || ''
  const navigateLabel = siteSettings?.navigateLabel || ''
  const connectLabel = siteSettings?.connectLabel || ''
  const contactColumnLabel = siteSettings?.contactColumnLabel || ''
  const responseTimeNote = siteSettings?.responseTimeNote || ''
  const timezoneNote = siteSettings?.timezoneNote || ''
  const copyrightText = (siteSettings?.copyrightText || '').replace('{year}', String(new Date().getFullYear()))
  const statusLabel = siteSettings?.statusLabel || ''

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="px-5 lg:px-[6vw] py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            {brandName ? (
              <Link href="/" className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 bg-synthesis animate-pulse" />
                <span className="font-mono-label text-foreground">{brandName}</span>
              </Link>
            ) : null}
            {footerNote ? (
              <p className="text-sm leading-relaxed text-muted-foreground mb-4 max-w-xs">
                {footerNote}
              </p>
            ) : null}
            {(availability || location) && (
              <div className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                {availability ? (
                  <span className="flex items-center gap-2 mb-1">
                    <span className="w-1 h-1 bg-green-500 animate-pulse" /> {availability}
                  </span>
                ) : null}
                {location}
              </div>
            )}
          </div>

          {navItems.length > 0 && (
            <div>
              {navigateLabel ? (
                <div className="font-mono-label text-muted-foreground mb-4">{navigateLabel}</div>
              ) : null}
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      {...link}
                      appearance="link"
                      className="block text-sm text-foreground/70 hover:text-synthesis transition-colors"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {socials.length > 0 && (
            <div>
              {connectLabel ? (
                <div className="font-mono-label text-muted-foreground mb-4">{connectLabel}</div>
              ) : null}
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {socials.map((social, i) => {
                  const Icon = socialIcon(social.label)
                  return (
                    <li key={i}>
                      <a
                        href={social.url || '#'}
                        target={social.url?.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-foreground/70 hover:text-synthesis transition-colors"
                      >
                        <Icon className="w-4 h-4" /> {social.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {(email || responseTimeNote || timezoneNote) && (
            <div>
              {contactColumnLabel ? (
                <div className="font-mono-label text-muted-foreground mb-4">{contactColumnLabel}</div>
              ) : null}
              {email ? (
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-2.5 text-base lg:text-lg font-medium text-foreground/90 hover:text-synthesis transition-colors mb-2 break-all group"
                >
                  <IconMail className="w-4 h-4 text-muted-foreground group-hover:text-synthesis transition-colors shrink-0" />
                  <span className="italic">{email}</span>
                </a>
              ) : null}
              {(responseTimeNote || timezoneNote) && (
                <div className="space-y-1.5 text-xs text-muted-foreground/80 mt-2">
                  {responseTimeNote ? <p>{responseTimeNote}</p> : null}
                  {timezoneNote ? <p className="text-muted-foreground/60">{timezoneNote}</p> : null}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* {clients.length > 0 && (
        <div className="border-t border-border px-5 lg:px-[6vw] py-8">
          <div className="font-mono-label text-muted-foreground mb-5">// TRUSTED_BY</div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {clients.map((client) => (
              <span
                key={client.name}
                className="font-heading text-base lg:text-lg font-light text-muted-foreground/50 hover:text-foreground transition-colors"
              >
                {client.name}
              </span>
            ))}
          </div>
        </div>
      )} */}

      {(copyrightText || statusLabel) && (
        <div className="border-t border-border bg-card px-5 lg:px-[6vw] py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          {copyrightText ? (
            <div className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {copyrightText}
            </div>
          ) : null}
          {statusLabel ? (
            <div className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase flex items-center gap-2">
              <span className="w-1 h-1 bg-green-500 animate-pulse" />
              {statusLabel}
            </div>
          ) : null}
        </div>
      )}
    </footer>
  )
}
