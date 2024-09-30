import { PrismaFollowersRepository } from '@/domain/repositories/prisma/prisma.followers-repository'
import { UserUnFollowServiceUseCase } from '../user-unfollow-service'

export function makeUserUnFollowRepositoryUseCase() {
  const followersRepository = new PrismaFollowersRepository()
  const userFollowServiceUseCase = new UserUnFollowServiceUseCase(
    followersRepository,
  )
  return userFollowServiceUseCase
}
