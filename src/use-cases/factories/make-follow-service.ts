import { PrismaEvaluationsRepository } from '@/repositories/prisma/prisma.evaluations-repository'
import { UserFollowServiceUseCase } from '../user-follow-service'

export function makeUserProfileUseCase() {
  const evaluationsRepository = new PrismaEvaluationsRepository()
  const auserFollowServiceUseCase = new UserFollowServiceUseCase(
    evaluationsRepository,
  )
  return auserFollowServiceUseCase
}
