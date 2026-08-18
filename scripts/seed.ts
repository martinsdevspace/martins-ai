#!/usr/bin/env node
/**
 * Standalone seed script — runs without HTTP timeout constraints.
 *
 * Usage:
 *   bun run seed          # via package.json script
 *   npx tsx scripts/seed.ts  # direct
 *
 * Automatically runs during Vercel build (via migrate-if-pg.cjs) after
 * migrations are applied, but only when the users collection is empty,
 * so it is safe for existing deploys.
 */
import { getPayload, createLocalReq } from 'payload'
import config from '../src/payload.config'
import { seed } from '../src/endpoints/seed/index'

async function run() {
  const payload = await getPayload({ config })

  payload.logger.info('[seed] Seeding database…')

  const req = await createLocalReq({}, payload)

  await seed({ payload, req })

  payload.logger.info('[seed] Done!')
  process.exit(0)
}

run().catch((err) => {
  console.error('[seed] Fatal:', err)
  process.exit(1)
})
