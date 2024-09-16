import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { FollowerAlreadyExistsError } from '@/tests/domain/use-cases/errors/followers-already-exists'
import { makeUserUnFollowRepositoryUseCase } from '@/tests/domain/use-cases/factories/make-unfollow-service'

export async function unFollowController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const unFollowBodySchema = z.object({
    serviceId: z.string(),
  })

  const { serviceId } = unFollowBodySchema.parse(request.body)

  try {
    const unFollowUseCase = makeUserUnFollowRepositoryUseCase()

    await unFollowUseCase.execute({
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
