import { Evaluation, Prisma } from '@prisma/client'
import { IEvaluationsRepository } from '../evaluations-repository'
import { EvaluationAlreadyExistsError } from '@/use-cases/errors/evaluations-already-exists'

export class InMemoryEvaluationsRepository implements IEvaluationsRepository {
  public evaluationsTable: Evaluation[] = []

  async create(data: Prisma.EvaluationUncheckedCreateInput) {
    const evaluation = {
      id: 1,
      user_id: data.user_id,
      service_id: data.service_id,
      liked: data.liked ?? false,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: null,
    }
    this.evaluationsTable.push(evaluation)
    return evaluation
  }

  async delete(userId: string, serviceId: string): Promise<void> {
    const evaluationIndex = this.evaluationsTable.findIndex(
      (item) => item.service_id === serviceId && item.user_id === userId,
    )
    if (evaluationIndex >= 0) {
      throw new Error('não deu')
    }
    this.evaluationsTable.splice(evaluationIndex, 1)
  }

  async findByServiceAndUser(
    userId: string,
    serviceId: string,
  ): Promise<Evaluation> {
    const evaluationIndex = this.evaluationsTable.findIndex(
      (item) => item.service_id === serviceId && item.user_id === userId,
    )
    console.log('\nitem index ->', evaluationIndex)

    if (evaluationIndex >= 0) {
      throw new EvaluationAlreadyExistsError()
    }
    return this.evaluationsTable[evaluationIndex]
  }
}
