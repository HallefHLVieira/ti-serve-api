import { Prisma, Role, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public usersTable: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.usersTable.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      phone: data.phone,
      password_hash: data.password_hash,
      is_valid: false,
      role: Role.MEMBER,
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
