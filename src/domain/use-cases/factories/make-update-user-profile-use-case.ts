import { PrismaUsersRepository } from '@/domain/repositories/prisma/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile'

export function makeGetUserProfileUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new GetUserProfileUseCase(usersRepository)

  return authenticateUseCase
}
