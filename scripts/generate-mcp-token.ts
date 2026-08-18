#!/usr/bin/env npx tsx
/**
 * Generates a long-lived Payload JWT for MCP server access.
 *
 * Usage:
 *   npx tsx scripts/generate-mcp-token.ts <user-id>               # generate token
 *   npx tsx scripts/generate-mcp-token.ts <user-id> --write-env   # generate + write to .env
 *
 * Requires PAYLOAD_SECRET env var (same value as in .env).
 * Token expires in 1 year (31536000 seconds).
 */
import { SignJWT } from 'jose'
import { loadEnv } from 'payload/node'
import { createClient } from '@libsql/client'
import crypto from 'node:crypto'
import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'

const TOKEN_EXPIRATION = 31536000 // 1 year in seconds

// Replicate Payload's deriveSecretKey so the JWT signature matches
// what payload.secret holds at runtime (see packages/payload/src/auth/crypto.ts).
const deriveSecretKey = (secret: string) =>
  crypto.createHash('sha256').update(secret).digest('hex').slice(0, 32)

async function main() {
  loadEnv()

  const secret = process.env.PAYLOAD_SECRET
  if (!secret) {
    console.error('PAYLOAD_SECRET is not set. Cannot sign JWT.')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  const userId = args.find((a) => !a.startsWith('-'))

  if (!userId) {
    console.error('Usage: npx tsx scripts/generate-mcp-token.ts <user-id>')
    console.error('')
    console.error('Find your user ID from the Payload admin or database.')
    process.exit(1)
  }

  // Look up user email from the database
  const db = createClient({ url: 'file:./payload.db' })
  const result = await db.execute({
    sql: 'SELECT email FROM users WHERE id = ?',
    args: [userId],
  })
  db.close()

  const email = result.rows.length > 0 ? String(result.rows[0].email) : 'unknown'

  // Use the derived key that Payload uses internally, not the raw PAYLOAD_SECRET
  const secretKey = new TextEncoder().encode(deriveSecretKey(secret))
  const issuedAt = Math.floor(Date.now() / 1000)
  const exp = issuedAt + TOKEN_EXPIRATION

  const token = await new SignJWT({
    id: userId,
    collection: 'users',
    email,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(issuedAt)
    .setExpirationTime(exp)
    .sign(secretKey)

  const expiresDate = new Date(exp * 1000).toISOString()

  console.log('\n--- MCP Authorization Token ---')
  console.log('User ID:', userId)
  console.log('Email:  ', email)
  console.log('Expires:', expiresDate)
  console.log('\nJWT ' + token + '\n')

  if (args.includes('--write-env')) {
    const envPath = path.resolve(process.cwd(), '.env')
    let envContent = ''
    try {
      envContent = await readFile(envPath, 'utf-8')
    } catch {
      // .env doesn't exist yet
    }

    const envLine = 'PAYLOAD_MCP_AUTHORIZATION=JWT ' + token
    const regex = /^PAYLOAD_MCP_AUTHORIZATION=.*/m

    if (regex.test(envContent)) {
      envContent = envContent.replace(regex, envLine)
    } else {
      envContent = envContent.trimEnd() + '\n\n' + envLine + '\n'
    }

    await writeFile(envPath, envContent, 'utf-8')
    console.log('Wrote PAYLOAD_MCP_AUTHORIZATION to .env')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
