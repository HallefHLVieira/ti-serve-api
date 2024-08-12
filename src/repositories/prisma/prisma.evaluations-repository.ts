import { prisma } from '@/lib/prisma'
import { Evaluation, Prisma } from '@prisma/client'
import { IEvaluationsRepository } from '../evaluations-repository'
import { EvaluationNotFoundError } from '@/use-cases/errors/evaluations-not-found'

export class PrismaEvaluationsRepository implements IEvaluationsRepository {
  async createOrUpdate(data: Prisma.EvaluationUncheckedCreateInput) {
    const evaluation = await prisma.evaluation.findFirst({
      where: {
        service_id: data.service_id,
        user_id: data.user_id,
      },
    })

    if (!evaluation) {
      const evaluation = await prisma.evaluation.create({
        data,
      })
      return evaluation
    }

    if (evaluation.liked === false) {
      evaluation.liked = true
      evaluation.updated_at = new Date()

      await prisma.evaluation.update({
        where: {
          id: evaluation.id,
        },
        data: {
          ...evaluation,
        },
      })

      return evaluation
    }

    throw new Error('Invalid data!')
  }

  async findByServiceAndUser(
    userId: string,
    serviceId: string,
  ): Promise<Evaluation> {
    const evaluation = await prisma.evaluation.findFirst({
      where: {
        service_id: serviceId,
        user_id: userId,
        deleted_at: null,
      },
    })

    if (!evaluation) {
      throw new EvaluationNotFoundError()
    }
    return evaluation
  }

  async delete(userId: string, serviceId: string): Promise<void> {
    const evaluation = await prisma.evaluation.findFirst({
      where: {
        service_id: serviceId,
        user_id: userId,
        deleted_at: null,
        liked: true,
      },
    })

    if (!evaluation) {
      throw new EvaluationNotFoundError()
    }

    evaluation.deleted_at = new Date()
    evaluation.liked = false

    await prisma.evaluation.update({
      where: {
        id: evaluation.id,
      },
      data: { ...evaluation },
    })
  }
}
