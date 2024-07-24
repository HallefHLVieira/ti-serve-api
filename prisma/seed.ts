import { PrismaClient } from '.prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

const client = new PrismaClient()

async function main() {
  const passwordHash = await hash('admin', 5)
  const date = await new Date()

  await client.user.create({
    data: {
      id: randomUUID(),
      name: 'admin',
      phone: '99999999999',
      password_hash: passwordHash,
      is_valid: true,
      role: 'ADMIN',
      created_at: date,
      updated_at: date,
      deleted_at: null,
    },
  })
  // console.log('prisma seed superuser: ', userAdmin)
}
main()
  .then(async () => {
    await client.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await client.$disconnect()
    process.exit(1)
  })
