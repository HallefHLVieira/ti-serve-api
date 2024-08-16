import { PrismaFollowersRepository } from '@/repositories/prisma/prisma.followers-repository'
import { UserFollowServiceUseCase } from '../user-follow-service'

export function makeUserProfileUseCase() {
  const followersRepository = new PrismaFollowersRepository()
  const auserFollowServiceUseCase = new UserFollowServiceUseCase(
    followersRepository,
  )
  return auserFollowServiceUseCase
}
