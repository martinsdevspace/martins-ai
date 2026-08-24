import { getPayload, createLocalReq } from 'payload'
import config from '@payload-config'
import { seed } from '@/endpoints/seed'

const payload = await getPayload({ config })

const adminEmail = 'hello@martinsai.name.ng'
const { docs } = await payload.find({
  collection: 'users',
  where: { email: { equals: adminEmail } },
  limit: 1,
})

let adminUser = docs[0]
if (!adminUser) {
  adminUser = await payload.create({
    collection: 'users',
    data: { name: 'Martins Michael', email: adminEmail, password: 'Youhear5xmore.' },
  })
}

const req = await createLocalReq({ user: adminUser }, payload)
await seed({ payload, req })
console.log('✔ Seeding complete')
process.exit(0)
