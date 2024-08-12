import type { Evaluation } from '@prisma/client'
import { IEvaluationsRepository } from '@/repositories/evaluations-repository'
import { EvaluationAlreadyExistsError } from './errors/evaluations-already-exists'

interface FollowUseCaseRequest {
  userId: string
  serviceId: string
}

interface FollowUseCaseResponse {
  evaluation: Evaluation
}

export class UserFollowServiceUseCase {
  constructor(private evaluationsRepository: IEvaluationsRepository) {}

  async execute({
    userId,
    serviceId,
  }: FollowUseCaseRequest): Promise<FollowUseCaseResponse> {
    const evaluationAlreadyExists =
      await this.evaluationsRepository.findByServiceAndUser(userId, serviceId)

    if (evaluationAlreadyExists) {
      throw new EvaluationAlreadyExistsError()
    }

    const evaluation = await this.evaluationsRepository.createOrUpdate({
      user_id: userId,
      service_id: serviceId,
    })

    return {
      evaluation,
    }
  }
}
