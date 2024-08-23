import { PrismaClient } from '.prisma/client'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'

const client = new PrismaClient()

async function main() {
  const date = await new Date()

  const countLocations = await client.location.count()
  if (countLocations === 0) {
    await client.location.create({
      data: {
        id: 1,
        name: 'Novo araças',
        created_at: date,
        updated_at: date,
        deleted_at: null,
      },
    })

    const passwordHash = await hash('admin', 5)

    const countUsers = await client.user.count()

    if (countUsers === 0) {
      await client.user.create({
        data: {
          id: randomUUID(),
          name: 'admin',
          phone: '99999999999',
          password_hash: passwordHash,
          is_verified: true,
          location_id: 1,
          role: 'ADMIN',
          created_at: date,
          updated_at: date,
          deleted_at: null,
        },
      })
      console.log('Seeder executed: Error to create user.')
    } else {
      console.log('Seeder not executed: Count users is diff 0.')
    }
  } else {
    console.log('Seeder not executed: Count locations is diff 0.')
  }
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
