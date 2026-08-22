# Martins_AI — Project Overview

## What Is This?

**Martins_AI** is the personal brand, portfolio, and technical publication website of **Martins Michael** — an AI Agent Architect, Full-Stack Developer, Developer Relations professional, and Technical Writer based in Abuja, Nigeria.

It's built as a **Payload CMS 4.0 (canary) + Next.js 16** application with a SQLite database (dev) / PostgreSQL (production) backend.

---

## Core Purpose

The site exists to:

1. **Showcase production-grade AI agent systems** — framed as "projects I can build for your business"
2. **Generate jobs, projects, and contracts** — primary commercial objective
3. **Establish authority** in AI Agentic Architecture, Full-Stack Development, DevRel, and Technical Writing
4. **Recommend tools/frameworks** for AI agentic development (vendor-neutral)
5. **Attract speaking engagements** at conferences
6. **Build developer communities** (WhatsApp-based, expanding)
6. **Create content developers actually read** — not SEO fluff

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **CMS** | Payload CMS 4.0.0-canary.28 |
| **Framework** | Next.js 16.3.0 (App Router) |
| **Database** | SQLite (dev) / PostgreSQL (prod) via `@payloadcms/db-sqlite` & `@payloadcms/db-postgres` |
| **Rich Text** | Lexical (`@payloadcms/richtext-lexical`) |
| **Styling** | Tailwind CSS 4.x + `@wrksz/themes` |
| **UI Components** | Radix UI primitives + custom components |
| **Animations** | Framer Motion |
| **Fonts** | Hanken Grotesk, JetBrains Mono, Newsreader (variable) |
| **AI SDK** | `@ai-sdk/react`, `ai`, `@openrouter/ai-sdk-provider` |
| **Deployment** | Vercel (implied by `@vercel/analytics`, `@vercel/speed-insights`, `@payloadcms/storage-vercel-blob`) |
| **Package Manager** | Bun (lockfile: `bun.lock`) |
| **Language** | TypeScript (strict), React 19 |

---

## Key Payload Plugins Used

- `@payloadcms/plugin-form-builder` — Contact/service forms
- `@payloadcms/plugin-mcp` — Model Context Protocol server
- `@payloadcms/plugin-nested-docs` — Hierarchical content (industries, categories)
- `@payloadcms/plugin-redirects` — URL redirects management
- `@payloadcms/plugin-search` — Full-text search
- `@payloadcms/plugin-seo` — SEO fields on collections
- `@payloadcms/live-preview-react` — Live preview in admin
- `@payloadcms/admin-bar` — Frontend admin bar

---

## Site Structure (Frontend Routes)

| Route | Purpose |
|-------|---------|
| `/` | Homepage — Hero, Works, Services, Process, Pain Points, Industries, Insights, Testimonials, CTA |
| `/about` | About page — Origin story, philosophy, timeline, skills, speaking, credentials |
| `/works` | Portfolio grid — Filterable project showcase |
| `/works/[slug]` | Individual project case study |
| `/services` | Services overview with pricing/timelines |
| `/services/[slug]` | Service detail page |
| `/insights` | Blog/technical publication — paginated, searchable |
| `/insights/[slug]` | Individual article (build logs, architecture decisions, tool reviews, tutorials, commentary) |
| `/case-studies` | Deep-dive case studies |
| `/industries` | Industry-specific expertise pages |
| `/resume` | Interactive + downloadable resume |
| `/now` | "Now" page (current focus) |
| `/uses` | Tools/gear/stack page |
| `/contact` | Contact form with project scoping |
| `/search` | Global search |
| `/payload` | Payload Admin Panel |

---

## Content Architecture (Collections & Globals)

### Collections
- **projects** — Portfolio work with thumbnails, stack, metrics, live/GitHub links
- **services** — Service offerings with pricing, timeline, deliverables
- **insights** — Blog posts (rich text, SEO, categories, series)
- **case-studies** — Long-form project narratives
- **industries** — Vertical expertise pages
- **testimonials** — Client quotes
- **media** — Uploads (images, files) with Vercel Blob storage
- **forms** — Form builder submissions
- **redirects** — URL redirects

### Globals
- **site-settings** — Identity, homepage config, contact form fields, footer
- **about** — About page content (portrait, origin story, values, timeline, skills, speaking)
- **resume** — Resume data (experience, education, projects, skills)
- **now** — Current focus/activities
- **uses** — Tools, hardware, software stack

---

## Design System

- **Theme**: Dark-first, high-contrast, terminal-inspired aesthetic
- **Colors**: Custom CSS variables (`src/cssVariables.js`) — carbon, synthesis (accent), background, foreground, muted, border
- **Typography**: Variable fonts — Hanken Grotesk (UI), JetBrains Mono (code/terminal), Newsreader (long-form reading)
- **Components**: Radix UI primitives wrapped in custom styled components (`src/components/ui/`)
- **Animation**: Framer Motion for scroll reveals, hover states, page transitions

---

## Content Philosophy (from SOUL.md)

> **"I build software that thinks, works, and scales."**

**Brand Equation:**
```
Martins_AI = Engineering Credibility × AI Authority × Writing Clarity × Personality
```

**Technical Philosophy (7 Principles):**
1. Architecture before implementation
2. Optimize for change, not just today
3. Simplest system that solves the real problem wins
4. Correctness over cleverness
5. Observability over optimism
6. Shipping over perfect
7. Deterministic systems should remain deterministic

**AI/Agentic Architecture Philosophy:**
- Agents are software systems, not magical employees
- Reliability beats autonomy
- The future is software becoming agentic, not AI replacing software
- Context is a first-class architectural primitive
- Multi-agent is an architectural choice, not a status symbol
- Evaluation is part of development, not a QA afterthought
- Human-in-the-loop = designed collaboration, not failure recovery
- The real moat is the system around the model
- Agentic AI should be boring in production

---

## Development Commands

```bash
bun dev              # Start dev server (Next.js + Payload)
bun build            # Production build
bun start            # Start production server
bun run lint         # ESLint
bun run lint:fix     # ESLint with auto-fix
bun run gen:types    # Generate Payload types
bun run gen:map      # Generate import map
bun run test         # Run integration + e2e tests
bun run test:int     # Vitest integration tests
bun run test:e2e     # Playwright e2e tests
bun run payload      # Payload CLI
```

---

## Seed Data

Comprehensive seed scripts in `src/endpoints/seed/` for:
- Homepage content
- About page
- Services (5 core offerings)
- Projects (6 showcase projects)
- Case studies
- Industries
- Insights (5 blog posts)
- Testimonials
- Resume, Now, Uses globals
- Contact page/forms
- Newsletter form

Run via: `POST /api/next/seed` (or `bun run src/scripts/seed.ts`)

---

## Target Audiences

1. **Primary**: Technical founders & engineering leads (CTOs, VPEs)
2. **Secondary**: AI builders & senior developers
3. **Tertiary**: Conference organizers & community leaders
4. **Quaternary**: Developer tool companies (for partnerships)

---

## Differentiation

| Demo-First Engineers | Production-First (Martins_AI) |
|---------------------|-------------------------------|
| Optimizes for screenshot | Optimizes for error log |
| Adds tools until it works | Removes tools until it breaks |
| Treats prompts as architecture | Treats prompts as one component |
| Measures token usage | Measures business outcomes |
| Ships when it looks right | Ships when it fails predictably |

---

## Current Status

- **Active development** — Payload 4.0 canary, Next.js 16
- **Database**: SQLite (`payload.db`) for local dev
- **Content**: Fallback data in components, seeded via API
- **Deploy target**: Vercel (implied by dependencies)
- **Domain**: `martinsai.name.ng` (per SOUL.md)
