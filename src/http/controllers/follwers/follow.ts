import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { FollowerAlreadyExistsError } from '@/tests/domain/use-cases/errors/followers-already-exists'
import { makeUserFollowRepositoryUseCase } from '@/tests/domain/use-cases/factories/make-follow-service'

export async function followController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const followBodySchema = z.object({
    serviceId: z.string(),
  })

  const { serviceId } = followBodySchema.parse(request.body)

  try {
    const followUseCase = makeUserFollowRepositoryUseCase()

    await followUseCase.execute({
      serviceId,
      userId: request.user.sub,
    })
    return reply.status(201).send()
  } catch (err) {
    if (err instanceof FollowerAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
