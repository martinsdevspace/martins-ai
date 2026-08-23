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
  const email = siteSettings?.email || 'hello@martinsmichael.dev'
  const location = siteSettings?.location || 'Abuja, NG · Remote Worldwide'
  const availability = siteSettings?.availability || 'Available for projects'
  // const clients = siteSettings?.clients || []

  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="px-5 lg:px-[6vw] py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 bg-synthesis animate-pulse" />
              <span className="font-mono-label text-foreground">MARTINS_AI</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground mb-4 max-w-xs">
              Full-Stack Developer &amp; AI Agent Architect. Building production systems that handle
              real money, real users, and real scale.
            </p>
            <div className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              <span className="flex items-center gap-2 mb-1">
                <span className="w-1 h-1 bg-green-500 animate-pulse" /> {availability}
              </span>
              {location}
            </div>
          </div>

          {navItems.length > 0 && (
            <div>
              <div className="font-mono-label text-muted-foreground mb-4">// NAVIGATE</div>
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
              <div className="font-mono-label text-muted-foreground mb-4">// CONNECT</div>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                {socials.map((social, i) => {
                  const Icon = socialIcon(social.label)
                  if (!Icon) return null
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

          <div>
            <div className="font-mono-label text-muted-foreground mb-4">// CONTACT & AVAILABILITY</div>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-2.5 text-base lg:text-lg font-medium text-foreground/90 hover:text-synthesis transition-colors mb-2 break-all group"
            >
              <IconMail className="w-4 h-4 text-muted-foreground group-hover:text-synthesis transition-colors shrink-0" />
              <span className="italic">{email}</span>
            </a>
            <div className="space-y-1.5 text-xs text-muted-foreground/80 mt-2">
              <p>Typical response time: &lt; 24h on weekdays.</p>
              <p className="text-muted-foreground/60">Based in GMT+1 </p>
            </div>
          </div>
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

      <div className="border-t border-border bg-card px-5 lg:px-[6vw] py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
          © {new Date().getFullYear()} Martins Michael — Engineering Intelligence, Architecting Impact
        </div>
        <div className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase flex items-center gap-2">
          <span className="w-1 h-1 bg-green-500 animate-pulse" />
          SYSTEM_ONLINE · v2.0.26
        </div>
      </div>
    </footer>
  )
}
