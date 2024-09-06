import { PrismaFollowersRepository } from '@/repositories/prisma/prisma.followers-repository'
import { GetFollowersByServiceUseCase } from '../fetch-followers-by-service'

export function makeFetchFollowersByServiceUseCase() {
  const followersRepository = new PrismaFollowersRepository()
  const fetchFollowersByServiceUseCase = new GetFollowersByServiceUseCase(
    followersRepository,
  )

  return fetchFollowersByServiceUseCase
}
