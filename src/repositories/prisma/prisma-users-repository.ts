import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async updateProfile(
    userId: string,
    data: Prisma.UserUpdateInput,
  ): Promise<User | null> {
    const userToUpdate = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userToUpdate) {
      return null
    }
    const updatedUser = Object.assign(userToUpdate, data)
    return updatedUser
  }

  async findById(userId: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    return user
  }

  async findByPhone(phone: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        phone,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
