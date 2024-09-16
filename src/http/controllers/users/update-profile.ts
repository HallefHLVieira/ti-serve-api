import { InvalidPhoneToUpdateError } from '@/tests/domain/use-cases/errors/invalid-phone-to-update-error'
import { ResourceNotFoundError } from '@/tests/domain/use-cases/errors/resource-not-found-error'
import { makeUpdateUserProfileUseCase } from '@/tests/domain/use-cases/factories/make-update-user-profile-use-case copy'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function updateProfileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateProfileBodySchema = z.object({
    name: z.string(),
    phone: z.string().min(11),
  })

  const { name, phone } = updateProfileBodySchema.parse(request.body)

  try {
    const updateUserProfile = makeUpdateUserProfileUseCase()
    const { user } = await updateUserProfile.execute({
      userId: request.user.sub,
      data: { name, phone },
    })

    return reply.status(200).send({
      user: {
        ...user,
        password_hash: undefined, // remove pass on data
      },
    })
  } catch (err) {
    if (err instanceof InvalidPhoneToUpdateError) {
      return reply.status(409).send({ message: err.message })
    }
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    return reply
      .status(500)
      .send({ message: 'Server error to update user profile.' })
  }
}
