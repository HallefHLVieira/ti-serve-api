import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public usersTable: User[] = []

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      phone: data.phone,
      password_hash: data.password_hash,
      is_valid: false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }

    this.usersTable.push(user)
    return user
  }

  async findByPhone(phone: string) {
    const user = this.usersTable.find((item) => item.phone === phone)
    if (!user) {
      return null
    }
    return user
  }
}
