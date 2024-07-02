import { prisma } from '@/lib/prisma'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  password: string
  phone: string
}

export async function registerUseCase({
  name,
  password,
  phone,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 5)

  const userWithSamePhone = await prisma.user.findUnique({
    where: {
      phone,
    },
  })

  if (userWithSamePhone) {
    throw new Error('Phone already exists.')
  }

  const prismaUsersRepository = new PrismaUsersRepository()
  prismaUsersRepository.create({
    name,
    password_hash,
    phone,
  })
}
