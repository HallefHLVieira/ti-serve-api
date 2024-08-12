import { Prisma, Evaluation } from '@prisma/client'

export interface IEvaluationsRepository {
  createOrUpdate(
    data: Prisma.EvaluationUncheckedCreateInput,
  ): Promise<Evaluation>
  findByServiceAndUser(
    userId: string,
    serviceId: string,
  ): Promise<Evaluation | null>
  delete(userId: string, serviceId: string, liked: boolean): Promise<void>
}
