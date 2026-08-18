import crypto from 'node:crypto'
import { SignJWT } from 'jose'

const TOKEN_EXPIRATION = 31536000 // 1 year in seconds

// Replicate Payload's deriveSecretKey so the JWT signature matches
// what payload.secret holds at runtime (see packages/payload/src/auth/crypto.ts).
const deriveSecretKey = (secret: string) =>
  crypto.createHash('sha256').update(secret).digest('hex').slice(0, 32)

/**
 * Generates a long-lived Payload JWT for MCP server access.
 * The token is signed with the same derived key Payload uses internally.
 */
export const generateMcpToken = async ({
  email,
  id,
}: {
  email?: string | null
  id: string | number
}) => {
  const secret = process.env.PAYLOAD_SECRET
  if (!secret) {
    throw new Error('PAYLOAD_SECRET is not set. Cannot sign MCP token.')
  }

  const secretKey = new TextEncoder().encode(deriveSecretKey(secret))
  const issuedAt = Math.floor(Date.now() / 1000)
  const exp = issuedAt + TOKEN_EXPIRATION

  const token = await new SignJWT({
    id: String(id),
    collection: 'users',
    email,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt(issuedAt)
    .setExpirationTime(exp)
    .sign(secretKey)

  return {
    token,
    expiresAt: new Date(exp * 1000).toISOString(),
  }
}