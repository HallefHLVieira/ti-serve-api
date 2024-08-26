import { Prisma, Role, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'
import { UserNotFoundOrInvalidError } from '@/use-cases/errors/user-not-found-or-invalid-error'
import { InvalidPhoneToUpdateError } from '@/use-cases/errors/invalid-phone-to-update-error'

export class InMemoryUsersRepository implements IUsersRepository {
  public usersTable: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.usersTable.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = {
      id: 'user-1',
      name: data.name,
      phone: data.phone,
      password_hash: data.password_hash,
      location_id: data.location_id,
      is_verified: false,
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

  async updateProfile(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    console.log('user id in repository: ', userId)
    const checkIfUserPhoneAlreadyExists = this.usersTable.find(
      (item) => item.phone === data.phone,
    )

    if (checkIfUserPhoneAlreadyExists) {
      throw new InvalidPhoneToUpdateError()
    }
    const userIndex = this.usersTable.findIndex((item) => item.id === userId)
    console.log('userIndex: ', userIndex)

    if (!(userIndex >= 0)) {
      throw new UserNotFoundOrInvalidError()
    }
    const { name, phone } = data
    const user = this.usersTable[userIndex]
    const updateUser = Object.assign(user, {
      name,
      phone,
      updated_at: new Date(),
    })

    this.usersTable[userIndex] = updateUser
    return updateUser
  }
}
