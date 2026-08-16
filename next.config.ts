import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
    qualities: [100],
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', '') as 'http' | 'https',
        }
      }),
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  reactStrictMode: true,
  turbopack: {
    root: path.resolve(dirname),
  },
  // use in production only
  // async headers() {
  //   // Baseline hardening headers applied to every response, including the
  //   // Payload admin panel and API routes — none of these constrain script
  //   // sources, so they're safe to apply everywhere.
  //   const baselineHeaders = [
  //     { key: 'X-Content-Type-Options', value: 'nosniff' },
  //     { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  //     { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  //     {
  //       key: 'Permissions-Policy',
  //       value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  //     },
  //     {
  //       key: 'Strict-Transport-Security',
  //       value: 'max-age=63072000; includeSubDomains; preload',
  //     },
  //   ]

  //   return [
  //     {
  //       source: '/:path*',
  //       headers: baselineHeaders,
  //     },
  //     {
  //       // A stricter Content-Security-Policy for the public marketing/
  //       // content routes only. Deliberately excluded from /admin and /api
  //       // — Payload's admin bundle needs a more permissive script/style
  //       // policy, and a mismatched CSP there breaks the CMS editor rather
  //       // than protecting anything.
  //       source:
  //         '/((?!admin|api|_next/static|_next/image|favicon.ico|favicon.svg).*)',
  //       headers: [
  //         {
  //           key: 'Content-Security-Policy',
  //           value: [
  //             "default-src 'self'",
  //             "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
  //             "style-src 'self' 'unsafe-inline'",
  //             "img-src 'self' data: blob: https:",
  //             "font-src 'self' data:",
  //             "connect-src 'self' https://vitals.vercel-insights.com",
  //             "frame-ancestors 'self'",
  //             "base-uri 'self'",
  //             "form-action 'self'",
  //           ].join('; '),
  //         },
  //       ],
  //     },
  //   ]
  // },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
