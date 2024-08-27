import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { InvalidPhoneToUpdateError } from '@/use-cases/errors/invalid-phone-to-update-error'

export class PrismaUsersRepository implements IUsersRepository {
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

  async create(data: Prisma.UserUncheckedCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async updateProfile(
    userId: string,
    data: Prisma.UserUncheckedUpdateInput,
  ): Promise<User | null> {
    const userWithSamePhone = await prisma.user.findUnique({
      where: {
        phone: data.phone as string,
      },
    })

    if (userWithSamePhone) {
      throw new InvalidPhoneToUpdateError()
    }

    const userToUpdate = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!userToUpdate) {
      throw new ResourceNotFoundError()
    }

    const updatedUser = Object.assign(userToUpdate, data)
    const userUpdated = await prisma.user.update({
      where: { id: userId },
      data: updatedUser,
    })

    return userUpdated
  }
}
