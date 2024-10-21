import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateServiceUseCase } from '@/domain/use-cases/factories/make-create-service-use-case'
import { ServiceAlreadyExistsError } from '@/domain/use-cases/errors/service-already-exists'

export async function createServiceController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const phonesDataSchema = z.object({
    number: z.string(),
    isWhatsapp: z.boolean(),
  })

  const serviceBodySchema = z.object({
    name: z.string(),
    description: z.string().max(250),
    street: z.string(),
    number: z.string(),
    locationId: z.number(),
    phones: z.array(phonesDataSchema),
  })

  const { name, description, number, street, locationId, phones } =
    serviceBodySchema.parse(request.body)

  try {
    const createServiceUseCase = makeCreateServiceUseCase()

    await createServiceUseCase.execute({
      name,
      description,
      street,
      number,
      userId: request.user.sub,
      locationId,
      phones,
    })
  } catch (err) {
    if (err instanceof ServiceAlreadyExistsError) {
      return reply.status(412).send({ message: err.message })
    }
    throw err
  }

  return reply.status(200).send()
}
