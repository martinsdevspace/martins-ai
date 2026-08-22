import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { resendAdapter } from '@payloadcms/email-resend'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Categories } from './collections/Categories'
import { CaseStudies } from './collections/CaseStudies'
import { Comments } from './collections/Comments'
import { Industries } from './collections/Industries'
import { Insights } from './collections/Insights'
import { Leads } from './collections/Leads'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Projects } from './collections/Projects'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { About } from './globals/About'
import { Home } from './globals/Home'
import { Now } from './globals/Now'
import { Resume } from './globals/Resume'
import { SiteSettings } from './globals/SiteSettings'
import { Speaking } from './globals/Speaking'
import { Uses } from './globals/Uses'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { generateMcpToken } from './utilities/generateMcpToken'
import { getServerSideURL } from './utilities/getURL'
import { upstashKVAdapter } from './adapters/upstash.kv'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    components: {
      // Renders an MCP access token generator + copy button on the dashboard.
      beforeDashboard: ['@/components/McpToken'],
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below.
      // beforeLogin: ['@/components/BeforeLogin'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db:
    process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('file:')
      ? postgresAdapter({
        pool: {
          connectionString: process.env.DATABASE_URL || '',
        },
      })
      : sqliteAdapter({
        client: {
          url: process.env.DATABASE_URL || 'file:./payload.db',
        },
        busyTimeout: 10000,
        wal: true,
      }),
  collections: [
    {
      slug: 'folders',
      folders: true,
      admin: {
        useAsTitle: 'name',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Folder Name',
        },
      ],
    },
    Pages,
    Insights,
    Projects,
    Services,
    Industries,
    CaseStudies,
    Testimonials,
    Leads,
    Comments,
    Media,
    Categories,
    Users,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  endpoints: [
    {
      // Generates a signed JWT for MCP server access (POST /api/mcp-token).
      // Requires an authenticated admin user.
      method: 'post',
      path: '/mcp-token',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ error: 'Unauthorized.' }, { status: 401 })
        }

        const { expiresAt, token } = await generateMcpToken({
          id: req.user.id,
          email: req.user.email,
        })

        return Response.json({
          email: req.user.email,
          expiresAt,
          token: `JWT ${token}`,
        })
      },
    },
  ],
  globals: [Header, Footer, SiteSettings, About, Home, Resume, Uses, Now, Speaking],
  email:
    process.env.NODE_ENV === 'production'
      ? resendAdapter({
          apiKey: process.env.RESEND_API_KEY || '',
          defaultFromAddress: process.env.EMAIL_FROM || 'hello@martinsmichael.dev',
          defaultFromName: process.env.EMAIL_FROM_NAME || "Martin's AI",
        })
      : undefined,
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  storage: process.env.BLOB_READ_WRITE_TOKEN?.startsWith('vercel_blob_')
    ? [
      vercelBlobStorage({
        collections: {
          media: true,
        },
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }),
    ]
    : [],
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        const secret = process.env.CRON_SECRET
        if (!secret) return false

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
  kv:
    process.env.NODE_ENV === 'production'
      ? upstashKVAdapter({
          keyPrefix: 'payload-kv:',
        })
      : undefined,
})
