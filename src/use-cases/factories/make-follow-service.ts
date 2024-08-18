import { PrismaFollowersRepository } from '@/repositories/prisma/prisma.followers-repository'
import { UserFollowServiceUseCase } from '../user-follow-service'

export function makeUserFollowRepositoryUseCase() {
  const followersRepository = new PrismaFollowersRepository()
  const userFollowServiceUseCase = new UserFollowServiceUseCase(
    followersRepository,
  )
  return userFollowServiceUseCase
}
