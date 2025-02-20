import { withPayload } from '@payloadcms/next/withPayload'

import redirects from './redirects.js'

// Ensure NEXT_PUBLIC_SERVER_URL and VERCEL_URL are valid URLs
const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// VERCEL_URL may be set as a wildcard, so we manually allow all Vercel domains
const VERCEL_DOMAINS = ['vercel.app'] // Allows all *.vercel.app domains

/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      // Allow main server URL if it's valid
      ...(NEXT_PUBLIC_SERVER_URL
        ? [
            {
              hostname: new URL(NEXT_PUBLIC_SERVER_URL).hostname,
              protocol: 'https',
            },
          ]
        : []),

      // Allow all Vercel deployments (*.vercel.app)
      ...VERCEL_DOMAINS.map((domain) => ({
        hostname: `*.${domain}`,
        protocol: 'https',
      })),
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig)
