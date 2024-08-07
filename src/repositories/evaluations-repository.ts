import { Prisma, Evaluation } from '@prisma/client'

export interface IEvaluationsRepository {
  create(data: Prisma.EvaluationUncheckedCreateInput): Promise<Evaluation>
  delete(userId: string, serviceId: string, liked: boolean): Promise<void>
}
