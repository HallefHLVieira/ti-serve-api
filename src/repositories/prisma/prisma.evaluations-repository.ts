import { prisma } from '@/lib/prisma'
import { Evaluation, Prisma } from '@prisma/client'
import { IEvaluationsRepository } from '../evaluations-repository'

export class PrismaEvaluationsRepository implements IEvaluationsRepository {
  async create(data: Prisma.EvaluationUncheckedCreateInput) {
    const evaluations = await prisma.evaluation.create({
      data,
    })
    return evaluations
  }

  async findByServiceAndUser(
    userId: string,
    serviceId: string,
  ): Promise<Evaluation> {
    const evaluation = await prisma.evaluation.findFirst({
      where: {
        service_id: serviceId,
        user_id: userId,
      },
    })

    if (!evaluation) {
      throw new Error('não achei follow')
    }
    return evaluation
  }

  async delete(userId: string, serviceId: string): Promise<void> {
    const evaluation = await prisma.evaluation.findFirst({
      where: {
        service_id: serviceId,
        user_id: userId,
      },
    })

    if (!evaluation) {
      throw new Error('não achei follow')
    }

    await prisma.evaluation.delete({
      where: {
        id: evaluation.id,
      },
    })
  }
}
