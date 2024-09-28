import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeUserUnFollowRepositoryUseCase } from '@/domain/use-cases/factories/make-unfollow-service'
import { FollowerAlreadyExistsError } from '@/domain/use-cases/errors/followers-already-exists'

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
