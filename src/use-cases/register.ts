import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  phone: string
}

export async function registerUseCase({
  name,
  email,
  password,
  phone,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 5)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password_hash,
    },
  })
}
