import { ResourceNotFoundError } from '@/tests/domain/use-cases/errors/resource-not-found-error'
import { makeGetServiceByIdUseCase } from '@/tests/domain/use-cases/factories/make-get-service-by-id-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function fetchServicesByIdController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getServiceByIdParamsSchema = z.object({
      serviceId: z.string(),
    })
    const { serviceId } = getServiceByIdParamsSchema.parse(request.params)

    const fetchServiceByIdUseCase = makeGetServiceByIdUseCase()

    const result = await fetchServiceByIdUseCase.execute({
      serviceId,
    })

    return reply.status(200).send({ result })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    return reply.status(500).send({ message: err.message })
  }
}
