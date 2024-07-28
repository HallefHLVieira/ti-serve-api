import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByPhone(phone: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  updateProfile(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User | null>
}
