import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByPhone(phone: string): Promise<User | null>
}
