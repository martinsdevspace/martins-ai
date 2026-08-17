#!/usr/bin/env node
/**
 * Conditionally runs `payload migrate` only when DATABASE_URL points to a
 * real Postgres database (not a local SQLite file). This keeps the build
 * script simple and cross-platform.
 */
const { execSync } = require('child_process')

const url = process.env.DATABASE_URL

if (!url || url.startsWith('file:')) {
  console.log('[migrate-if-pg] Skipping — DATABASE_URL is SQLite or unset.')
  process.exit(0)
}

console.log(`[migrate-if-pg] DATABASE_URL detected (${url.split('@')[1]?.split('?')[0] || 'postgres'}) — running payload migrate…`)
execSync('payload migrate', { stdio: 'inherit', env: process.env })
